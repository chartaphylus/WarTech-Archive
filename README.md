# 🛡️ WarTech Archive — Terminal Intelligence

![WarTech Archive Banner]

**WarTech Archive** is a high-tech, immersive digital dossier dedicated to military technology, history, and specifications. Built with a "HUD/Cybernetic" aesthetic, it provides an interactive platform to explore the world's most advanced tanks, firearms, warships, and the historical events of the World Wars.

---

## 🚀 Technical Dossier

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (Real-time Military Intelligence & Storage)
- **Styling:** Tailwind CSS v4 + Vanilla CSS (Custom HUD Styling)
- **Animations:** Framer Motion (HUD Interactions & Transitions)
- **Icons:** Lucide React
- **Aesthetic:** Immersive Tech-Motif, Glassmorphism, and Neon-Accentuated UI.

## 📡 Features

- **Encrypted Database:** All unit data and historical events are served dynamically from Supabase.
- **World War Timeline:** Immersive historical timeline of World War I and II, with detailed event cards and dynamic sorting.
- **Advanced Admin Dashboard:** A full-featured terminal for managing units, historical events, site configuration, and analytics.
- **Dossier Management:** Create, edit, and archive military units with full technical specifications and technologies.
- **Media Storage:** Integrated Supabase Storage for seamless image uploads in the admin panel.
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

3. **Initialize Database (Supabase SQL Editor):**
   Run the following SQL scripts in your Supabase project to set up the tables:
   - `supabase/schema.sql` (Unit Data & Analytics)
   - `supabase/world_wars.sql` (WW1 Events)
   - `supabase/world_wars_ww2.sql` (WW2 Events)

4. **Install Protocols:**
   ```bash
   npm install
   ```

5. **Initialize Terminal:**
   ```bash
   npm run dev
   ```

## 📂 System Architecture

- `app/`: Modern Next.js App Router structure (Public & Admin Routes).
- `components/`: Modular HUD UI components (Hero, Timeline, Dashboard).
- `lib/`: Data fetching, utility functions, and Supabase client configuration.
- `types/`: Strongly typed military data structures.
- `supabase/`: SQL Schema and database migration scripts.

---

### 🔓 Access Clearance
Website ini dikembangkan untuk tujuan edukasi, dokumentasi sejarah militer, dan pengenalan inovasi teknologi peperangan di seluruh dunia. Maintain operational security.

**CLASSIFIED // WARTECH ARCHIVE SYSTEM**
