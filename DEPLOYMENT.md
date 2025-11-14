# Deployment Guide - Thai QR Generator

This guide will help you deploy the Thai QR Generator to Vercel.

## Prerequisites

- A Vercel account (free at https://vercel.com)
- Git repository (local or GitHub/GitLab/Bitbucket)
- Node.js 20.x or higher

## Deployment Steps

### 1. Prepare Your Git Repository

If you haven't already, initialize and commit your code:

```bash
git init
git add .
git commit -m "Initial commit: Thai QR Generator"
```

### 2. Push to GitHub (or your Git provider)

Create a new repository on GitHub and push your code:

```bash
git remote add origin https://github.com/yourusername/thai-qr-generator.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

**Option A: Using Vercel CLI**

```bash
npm install -g vercel
vercel
```

Follow the prompts to:
- Select your project folder
- Import from GitHub/GitLab/Bitbucket (optional)
- Configure build settings (defaults should work)
- Add environment variables (see below)

**Option B: Using Vercel Web Dashboard**

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Configure environment variables (see below)
5. Click "Deploy"

### 4. Configure Environment Variables

In your Vercel project settings, add the following environment variables:

```
NODE_ENV = production
PORT = (Leave empty - Vercel sets this automatically)
```

**Optional (if you plan to implement OAuth):**
```
VITE_OAUTH_PORTAL_URL = https://your-oauth-provider.com
VITE_APP_ID = your-app-id
```

## Build Configuration

The `vercel.json` file contains the deployment configuration:
- **Framework**: Vite (automatically detected)
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Runtime**: Node.js 20.x
- **Memory**: 1024 MB

## How It Works

The app is a full-stack application with:
- **Frontend**: React + Vite (builds to `dist/public`)
- **Backend**: Express server (`server/index.ts`)

Vercel will:
1. Install dependencies with `npm install`
2. Build the frontend with Vite
3. Bundle the Express server with esbuild
4. Route requests:
   - `/api/*` → Express server
   - All other routes → Serve React app (SPA)

## Troubleshooting

### Build Fails

- Check that `npm run build` works locally: `npm install && npm run build`
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Port Issues

- Vercel automatically sets the PORT environment variable
- The server code respects `process.env.PORT || 3000`

### Static Files Not Found

- Ensure `dist/public/index.html` exists after build
- Check that Vite build configuration outputs to the correct directory

### CORS or API Errors

- For now, the app doesn't require external APIs
- If you add APIs in the future, configure them in the Express server

## Performance Tips

1. **Enable Caching**: Vercel automatically caches static assets
2. **Optimize Images**: Use modern formats (WebP) where possible
3. **Code Splitting**: Vite automatically splits code for routes
4. **Monitor**: Use Vercel Analytics to track performance

## Next Steps

Once deployed:
1. Test all QR code generation features
2. Check that the Windows 95 retro UI renders correctly
3. Test responsive design on different devices
4. Monitor Vercel dashboard for any errors

## Support

For Vercel-specific issues:
- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://vercel.com/help

For app-specific issues:
- Check the GitHub repository
- Review build logs in Vercel dashboard
