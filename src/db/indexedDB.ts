import { StoredFileBlob, StoredFileMetadata, StorageQuotaInfo } from '../types';

const DB_NAME = 'HSB_Jaipur_LMS_DB';
const DB_VERSION = 1;

const STORES = {
  FILES: 'files',
  METADATA: 'metadata',
} as const;

let dbInstance: IDBDatabase | null = null;

export const initDB = (): Promise<IDBDatabase> => {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // File storage for binary Blobs (PDF, PPT, DOCX, XLSX, etc.)
      if (!db.objectStoreNames.contains(STORES.FILES)) {
        const fileStore = db.createObjectStore(STORES.FILES, { keyPath: 'id' });
        fileStore.createIndex('subjectId', 'subjectId', { unique: false });
        fileStore.createIndex('uploadDate', 'uploadDate', { unique: false });
        fileStore.createIndex('moduleTag', 'moduleTag', { unique: false });
      }

      // Metadata store for JSON structures
      if (!db.objectStoreNames.contains(STORES.METADATA)) {
        db.createObjectStore(STORES.METADATA);
      }
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onerror = () => {
      console.error('Failed to open IndexedDB:', request.error);
      reject(request.error);
    };
  });
};

/**
 * Stores a file blob (PDF, PPTX, etc.) directly in IndexedDB.
 * Completely eliminates the 5MB localStorage limit.
 */
export const saveFileBlob = async (fileData: StoredFileBlob): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.FILES, 'readwrite');
    const store = transaction.objectStore(STORES.FILES);
    const request = store.put(fileData);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Stores multiple file blobs in a single fast, atomic transaction.
 * Optimized for bulk uploads of dozens or hundreds of files.
 */
export const saveFileBlobsBatch = async (filesData: StoredFileBlob[]): Promise<void> => {
  if (filesData.length === 0) return;
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.FILES, 'readwrite');
    const store = transaction.objectStore(STORES.FILES);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error || new Error('Batch transaction aborted'));

    for (const fileData of filesData) {
      store.put(fileData);
    }
  });
};

/**
 * Retrieves the full file object including the binary Blob
 */
export const getFileBlob = async (id: string): Promise<StoredFileBlob | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.FILES, 'readonly');
    const store = transaction.objectStore(STORES.FILES);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Deletes a file blob from IndexedDB
 */
export const deleteFileBlob = async (id: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.FILES, 'readwrite');
    const store = transaction.objectStore(STORES.FILES);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Deletes multiple file blobs in a single batch transaction.
 */
export const deleteFileBlobsBatch = async (ids: string[]): Promise<void> => {
  if (ids.length === 0) return;
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.FILES, 'readwrite');
    const store = transaction.objectStore(STORES.FILES);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);

    for (const id of ids) {
      store.delete(id);
    }
  });
};

/**
 * Retrieves all stored file metadata (without loading large blobs into memory at once)
 */
export const getAllFileMetadata = async (): Promise<StoredFileMetadata[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.FILES, 'readonly');
    const store = transaction.objectStore(STORES.FILES);
    const request = store.openCursor();
    const results: StoredFileMetadata[] = [];

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        const val = cursor.value;
        results.push({
          id: val.id,
          subjectId: val.subjectId,
          name: val.name,
          size: val.size,
          type: val.type,
          moduleTag: val.moduleTag,
          uploadDate: val.uploadDate,
          assignmentId: val.assignmentId,
          tag: val.tag ?? 'General',
          scratchpadNotes: val.scratchpadNotes ?? '',
        });
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    request.onerror = () => reject(request.error);
  });
};

/**
 * Retrieves file metadata for a specific subject
 */
export const getFilesForSubject = async (subjectId: string): Promise<StoredFileMetadata[]> => {
  const all = await getAllFileMetadata();
  return all.filter((file) => file.subjectId === subjectId);
};

/**
 * Updates a file's metadata (e.g. tag or scratchpadNotes) non-destructively
 */
export const updateFileMetadata = async (
  fileId: string,
  updates: Partial<StoredFileMetadata>
): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.FILES, 'readwrite');
    const store = transaction.objectStore(STORES.FILES);
    const getRequest = store.get(fileId);

    getRequest.onsuccess = () => {
      const existing = getRequest.result;
      if (!existing) {
        resolve();
        return;
      }
      const updated = {
        ...existing,
        ...updates,
      };
      const putRequest = store.put(updated);
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
};

/**
 * Saves metadata to IndexedDB
 */
export const setMeta = async (key: string, value: unknown): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.METADATA, 'readwrite');
    const store = transaction.objectStore(STORES.METADATA);
    const request = store.put(value, key);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Gets metadata from IndexedDB
 */
export const getMeta = async <T>(key: string): Promise<T | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.METADATA, 'readonly');
    const store = transaction.objectStore(STORES.METADATA);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result !== undefined ? request.result : null);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Computes storage metrics for the user interface, including high-capacity browser quota
 */
export const getStorageUsage = async (): Promise<StorageQuotaInfo> => {
  const db = await initDB();
  const dbUsage = await new Promise<{ fileCount: number; totalBytes: number }>((resolve, reject) => {
    const transaction = db.transaction(STORES.FILES, 'readonly');
    const store = transaction.objectStore(STORES.FILES);
    const request = store.openCursor();
    let fileCount = 0;
    let totalBytes = 0;

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        fileCount++;
        totalBytes += cursor.value.size || 0;
        cursor.continue();
      } else {
        resolve({ fileCount, totalBytes });
      }
    };

    request.onerror = () => reject(request.error);
  });

  let quotaBytes: number | undefined;
  let usageBytes: number | undefined;
  let isPersistent: boolean | undefined;

  try {
    if (typeof navigator !== 'undefined' && navigator.storage) {
      if (navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        quotaBytes = estimate.quota;
        usageBytes = estimate.usage;
      }
      if (navigator.storage.persisted) {
        isPersistent = await navigator.storage.persisted();
      }
    }
  } catch (err) {
    console.warn('Storage estimate check failed:', err);
  }

  const availableBytes =
    quotaBytes !== undefined && usageBytes !== undefined
      ? Math.max(0, quotaBytes - usageBytes)
      : undefined;

  return {
    fileCount: dbUsage.fileCount,
    totalBytes: dbUsage.totalBytes,
    quotaBytes,
    usageBytes,
    availableBytes,
    isPersistent,
  };
};

/**
 * Requests persistent storage from the browser.
 * Removes automatic eviction and grants access to high-capacity disk storage (up to dozens/hundreds of GBs).
 */
export const requestStoragePersistence = async (): Promise<boolean> => {
  try {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
      const granted = await navigator.storage.persist();
      return granted;
    }
  } catch (err) {
    console.warn('Storage persistence request failed:', err);
  }
  return false;
};
