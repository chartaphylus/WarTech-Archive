# 🛡️ WarTech Archive — Terminal Intelligence

![WarTech Archive Banner]

**WarTech Archive** is a high-tech, immersive digital dossier dedicated to military technology, history, and specifications. Built with a "HUD/Cybernetic" aesthetic, it provides an interactive platform to explore the world's most advanced tanks, snipers, and warships.

---

## 🚀 Technical Dossier

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (Real-time Military Intelligence)
- **Styling:** Vanilla CSS + Tailwind Utility Overlays
- **Animations:** Framer Motion (HUD Interactions & Transitions)
- **Icons:** Lucide React
- **Aesthetic:** Immersive Tech-Motif, Glassmorphism, and Neon-Accentuated UI.

## 📡 Features

- **Encrypted Database:** All unit data is served dynamically from Supabase.
- **Immersive Navigation:** Smooth scroll transitions and category-based filtering.
- **Advanced Admin Dashboard:** A full-featured terminal for managing units, site configuration, and analytics.
- **Dossier Management:** Create, edit, and archive military units with full technical specifications.
- **Traffic Tracking:** Real-time monitoring of archive access and visitor patterns.

## 🛠️ Terminal Setup

To initialize the archive locally, follow these protocols:

1. **Clone the Archive:**
   ```bash
   git clone https://github.com/your-repo/WarTech-Archive.git
   cd WarTech-Archive
   ```

2. **Establish Data Link:**
   Create a `.env.local` file and input your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Install Protocols:**
   ```bash
   npm install
   ```

4. **Initialize Terminal:**
   ```bash
   npm run dev
   ```

## 📂 System Architecture

- `app/`: Modern Next.js App Router structure.
- `components/`: Modular HUD UI components.
- `lib/`: Data fetching and storage logic via Supabase.
- `types/`: Strongly typed military data structures.
- `supabase/`: Schema and database configuration.

---

### 🔓 Access Clearance
This terminal is for educational and historical archiving purposes. Maintain operational security.

**CLASSIFIED // WARTECH ARCHIVE SYSTEM**
