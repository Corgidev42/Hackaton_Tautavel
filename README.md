a# ArcheoTrace Admin Dashboard

## 📋 Project Structure

```
├── backend/              # Vite + React Admin Dashboard
│   ├── src/
│   │   ├── App.tsx      # Main dashboard component
│   │   ├── main.tsx
│   │   └── index.css
│   ├── Dockerfile
│   └── package.json
├── frontend/            # Next.js Frontend (future expansion)
│   └── Dockerfile
├── compose.yml          # Docker Compose configuration
└── README.md
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
docker-compose up --build
```

The backend (Admin Dashboard) will be available at: **http://localhost:4000**
The frontend will be available at: **http://localhost:3000**

### Option 2: Local Development

Navigate to the backend folder:

```bash
cd backend
npm install
npm run dev
```

Dashboard available at: **http://localhost:5173**

## 🎨 Features

### Admin Dashboard Components

- **Sidebar Navigation**: Dashboard, Validation Queue (with pending count), User Base, Settings
- **Dashboard View**: 
  - 4 KPI Cards (Progress 45%, Conflict Queue 34, Active Users 120, Accuracy 89%)
  - Area Chart showing contributions over 7 days
  - Recent activity feed

- **Conflict Resolution View** (Core Feature):
  - Split-screen interface with archaeological map visualization
  - SVG overlay with 3 user drawings in neon colors (Cyan, Magenta, Yellow)
  - Layer visibility toggles with confidence scores
  - Action buttons: Merge consensus, select individual users, reject all
  - Success notifications on actions
  - Auto-advances through conflict queue

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Charts**: Recharts
- **Containerization**: Docker & Docker Compose

## 📦 Mock Data

All data is hardcoded within the component:
- 3 archaeological conflict items with different priorities
- User contributions over 7 days
- Layer visibility states
- Recent activity timeline

## 🎮 How to Use

1. Click sidebar items to navigate between views
2. In Validation Queue:
   - Toggle layer visibility with eye icons
   - Click "Validate Consensus" to merge drawings
   - Select individual users to approve their drawing only
   - Reject all if drawings are incorrect
3. Conflicts automatically advance or are removed after resolution

## 🔧 Troubleshooting

### Port Already in Use
- Backend (Vite): Port 5173 (Docker: 4000)
- Frontend (Next.js): Port 3000

Modify ports in `compose.yml` or `vite.config.ts` as needed.

### Docker Build Issues
```bash
docker-compose down
docker system prune -a
docker-compose up --build
```

## 📝 Development Notes

- TypeScript strict mode enabled
- Dark mode "Cyberpunk Archaeology" aesthetic
- Fully responsive design
- All state management handled in App.tsx
- Ready for API integration (mock data easily replaceable)
