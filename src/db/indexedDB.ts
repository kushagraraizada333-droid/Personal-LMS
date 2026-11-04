import { StoredFileBlob, StoredFileMetadata } from '../types';

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
 * Computes storage metrics for the user interface
 */
export const getStorageUsage = async (): Promise<{ fileCount: number; totalBytes: number }> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
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
};
