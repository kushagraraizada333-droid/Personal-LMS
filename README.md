# HSB Jaipur — Personal Academic LMS Portal

An offline-first, 100% local Personal Academic Learning Management System (LMS) built for **Kushagra Raizada** (**Roll No: `2026MBAPM018`** | **Resource ID: `MBA26/0463`**) at the **Harishankar Singhania School of Business (HSB), Jaipur**, MBA (Product Management), Trimester II (AY 2026–27).

---

## 🏛️ Institutional Branding & Design Language
- **Official HSB Aesthetic**: Styled with HSB Royal Brand Blue (`#004B93`), Deep Cobalt (`#003870`), Soft Tint (`#EBF3FA`), and Crisp White surfaces (`#FFFFFF` on `#F4F7FA` canvas).
- **Dual Logo Support**: Renders `hsb.jpg` in a crisp white rounded tile with click-to-upload persistence (Base64 saved locally) and high-fidelity inline SVG monogram fallback.
- **Dark Mode Support**: Seamless toggle between Executive Light Mode and Deep Navy Dark Mode (`#0B1426` / `#0F172A`).

---

## ⚡ Core Features & Capabilities

### 1. Smart Excel Master Sync (`Tentative_Timetable_TermII_Batch2026-28.xlsx`)
- **SheetJS (`xlsx`) Parser**: Reads the master institutional timetable and attendance workbook.
- **Timetable Parser**: Extracts Weeks 1 to 12 schedules, daily slots (`09:30–11:00`, `11:15–12:45`, `14:00–15:30`, `15:45–17:15`, `17:30–19:00`), CXO Talks, TCC sessions, Quizzes, Midterms, and End-Term Exams.
- **Attendance Forensics Parser**: Auto-locates row where Column A matches `2026MBAPM018`.
- **Conducted vs. Scheduled Forensics**: Distinguishes between conducted sessions and upcoming sessions so future lectures are never counted as absences.

### 2. 8 Trimester II Course Catalog (16 Total Credits)
Configured with official faculties, Teaching Assistants, credits, and session counts:
- **IET** — *Introduction to Emerging Technologies* | Mr. Laxminarayanan G | TA: Aman (2 Credits, 15 Sessions)
- **UX** — *Introduction to UI/UX* | Ms. Avni Mathur | TA: Kusum (1 Credit, 10 Sessions)
- **LA** — *Leadership Accelerator* | Col. Rajiv Bhargava | TA: Kusum (3 Credits, 20 Sessions)
- **MRM** — *Market Research Methods* | Dr. Amar Saxena | TA: Aman (3 Credits, 20 Sessions)
- **ME** — *Micro Economics* | Prof. Gopal Naik | TA: Aman (2 Credits, 15 Sessions)
- **PM2** — *Product Management-II* | Dr. Anand Fadte | TA: Kusum (3 Credits, 20 Sessions)
- **CV2** — *CV Interview Workshop (26-28)* | The Career Company (1 Credit, 6 Sessions)
- **EM** — *Entrepreneurial Mindset* | Mr. Gagan Jain | TA: Aman (1 Credit, 10 Sessions)

### 3. Attendance Forensics & Safe-Bunk Calculator
- **Dynamic Bunk Buffer**:
  $$\text{Safe Bunks}_{75} = \max\left(0, (\text{Attended} + \text{Upcoming}) - \lceil\text{Planned} \times 0.75\rceil\right)$$
- **Manual Status Toggle**: Click any session badge ($S_1 \dots S_{20}$) to toggle between `Present`, `Absent`, or `Upcoming`.

### 4. Zero Demo Data Guarantee
- All evaluation marks, gradebooks, assignments, and syllabus checklists start at **0 / Empty State**.
- No fabricated scores or fake percentages. Enter or upload only authentic academic records.

### 5. 100% Local IndexedDB File Storage & In-Browser PDF Preview
- **Zero Cloud Dependencies**: Stores `.pdf`, `.ppt`, `.pptx`, `.doc`, `.docx`, and `.xlsx` directly in browser **IndexedDB** (`HSB_Jaipur_LMS_DB`) as binary `Blob`s.
- **In-Browser PDF Viewer**: Instant document preview using `URL.createObjectURL` without external plugins.

### 6. Executive Study Utilities
- **Pomodoro Study Timer**: 25m Focus, 5m Short Break, and 15m Long Break with acoustic chimes and course tagging.
- **Offline Backup & Restore**: Export and restore the complete portal database as a `.json` backup file.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 5
- **Styling**: Tailwind CSS 3 with custom HSB color system
- **Icons**: Lucide React
- **Excel Processing**: SheetJS (`xlsx`)
- **Storage**: Browser IndexedDB (`idb` pattern) + LocalStorage
- **Animations & Effects**: Canvas Confetti, Web Audio API synthetic chimes

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/kushagraraizada333-droid/Personal-LMS.git

# Enter project directory
cd Personal-LMS

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173/` in your browser.
