# 🎂 Birthday Celebration Website

A beautiful, interactive birthday celebration website built with React, Vite, and Framer Motion. Features stunning animations, 3D elements, and a personalized timeline of memories.

## ✨ Features

- 🎨 **Stunning Animations** - Smooth scroll-based animations with Framer Motion
- 🤖 **3D Robot** - Interactive 3D robot that follows cursor movement
- 📸 **Memory Timeline** - Chronological display of photos and videos
- 🎵 **Ambient Audio** - Background music with custom controls
- 🎊 **Confetti Effects** - Custom canvas-based confetti animations
- ✨ **Interactive Background** - Particle effects that react to cursor
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **Performance Optimized** - Preloading, lazy loading, and optimized assets

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Spline** - 3D robot rendering
- **TSParticles** - Interactive particle backgrounds
- **React Animated Cursor** - Custom cursor implementation

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎬 Video Conversion

To optimize video files for web playback, use the provided conversion scripts:

**Windows (PowerShell):**
```powershell
.\convert-videos.ps1
```

**Linux/Mac (Bash):**
```bash
bash convert-videos.sh
```

The scripts will convert videos to H.264 format optimized for web streaming.

## 🌐 Deployment

### Vercel

This project is configured for automatic deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy!

The `vercel.json` configuration file is included for optimal deployment settings.

## 📁 Project Structure

```
src/
├── assets/           # Images, videos, and audio files
├── components/       # React components
│   ├── common/      # Reusable components
│   └── decor/       # Decorative components
├── hooks/           # Custom React hooks
├── styles/          # Global styles and CSS
└── App.jsx          # Main application component
```

## 🎨 Sections

1. **Hero Section** - Welcome screen with animated title and 3D robot
2. **Timeline Section** - Chronological display of memories
3. **Achievements Section** - Interactive achievement cards
4. **Wishes Section** - Birthday wishes and stats
5. **Outro Section** - Final message and replay button

## 🛠️ Development

### Key Features Implementation

- **Preloader** - Ensures all assets are loaded before animations start
- **Scroll Animations** - Elements animate on scroll with parallax effects
- **Video Player** - Custom video player with controls
- **Media Timeline** - Automatic parsing and sorting of media files
- **Responsive Design** - Mobile-first approach with breakpoints

## 📝 License

Private project - All rights reserved

## 👨‍💻 Made by

**Mykyta Olym** ([@VetteIT](https://github.com/VetteIT))

---

Built with ❤️ for a special birthday celebration 🎉
