# Developer Documentation & Architecture Manual
## Astygma Hope Clinic - Codebase Structure & Maintenance

### 1. Directory Structure Blueprint
```
/astygma-hope-web
├── /docs                       # Complete Enterprise Documentation Suite
├── /public
│   └── /assets
│       ├── /logo               # Brand SVG/PNG Logos
│       ├── /doctors            # Dr. Umesh D. Kalekar portraits
│       ├── /sonography         # SPECIAL USER FOLDER (Sonography Videos & Assets)
│       ├── /clinic             # Facility & Branch photos
│       ├── /reception          # Front desk photos
│       ├── /lab                # Laboratory equipment photos
│       ├── /staff              # Nursing & technical staff photos
│       ├── /gallery            # Health camps & event photo gallery
│       ├── /videos             # Educational healthcare videos
│       ├── /testimonials       # Patient story media
│       ├── /courses            # Online course thumbnails
│       └── /music              # Healing Sound Library MP3/WAV/FLAC files
│           ├── /meditation
│           ├── /pregnancy
│           ├── /healing
│           ├── /relaxation
│           ├── /yoga
│           └── /nature
├── /src
│   ├── /app                    # Next.js App Router (Pages & API routes)
│   ├── /components             # Modular Glassmorphism & UI Components
│   │   ├── /ui                 # Core design system primitives (Button, Card, Input, Modal)
│   │   ├── /layout             # Navbar, Footer, Sidebar, ThemeSwitch, LangSwitch
│   │   ├── /home               # Hero, DoctorProfile, SonographySection, ServicesGrid
│   │   ├── /appointment        # BookingModal, TriageQueue, WhatsAppNotice
│   │   ├── /sound-vault        # PasswordGate, AudioPlayer, Visualizer
│   │   ├── /cms                # StoryBubbles, PostCarousel, BlogGrid
│   │   └── /dashboards         # ReceptionPanel, DoctorPanel, AdminPanel
│   ├── /context                # ThemeContext, AuthContext, LanguageContext
│   ├── /data                   # Authentic Clinic Data (No fake data!)
│   └── /styles                 # Vanilla CSS Variables, Design Tokens, Glassmorphism
├── package.json
└── README.md
```

### 2. Adding Sonography Media
The user has requested a dedicated folder `/public/assets/sonography`. Developers and clinic admins can place raw `.mp4` videos, ultrasound sample clips, and specialist documentation into this folder. The `SonographySection` component automatically scans and displays available media in this directory.
