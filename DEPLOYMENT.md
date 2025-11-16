# 🚀 Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/VetteIT
2. Click the **"New"** button (or go to https://github.com/new)
3. Repository name: `birthday`
4. Description: `Birthday celebration website with animations, 3D robot, and interactive timeline`
5. Set to **Private** (or Public if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 2: Push to GitHub

After creating the repository, run these commands:

```bash
git remote add origin https://github.com/VetteIT/birthday.git
git branch -M main
git push -u origin main
```

Or if you already added the remote:

```bash
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click **"Add New Project"**
4. Import the `VetteIT/birthday` repository
5. Vercel will auto-detect Vite configuration
6. Click **"Deploy"**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? birthday
# - Directory? ./
# - Override settings? No
```

## Step 4: Configure Vercel (if needed)

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`
- SPA routing rewrites
- Asset caching headers

## ✅ Done!

Your site will be live at: `https://birthday-[your-username].vercel.app`

You can also add a custom domain in Vercel settings.

