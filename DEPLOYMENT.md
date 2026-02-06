# 🚀 Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Create GitHub Repository**
   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `poker-academy`
   - Don't initialize with README (we already have one)

2. **Push Code to GitHub**
   ```bash
   cd /Users/matthewharnisch/.openclaw/workspace/poker-academy
   git remote add origin https://github.com/YOUR_USERNAME/poker-academy.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your `poker-academy` repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at: `https://poker-academy-[random].vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project
cd /Users/matthewharnisch/.openclaw/workspace/poker-academy

# Install dependencies
npm install

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? poker-academy
# - Directory? ./
# - Override settings? No

# For production deployment:
vercel --prod
```

## Build & Test Locally First

```bash
cd /Users/matthewharnisch/.openclaw/workspace/poker-academy

# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production (verify no errors)
npm run build

# Test production build
npm start
# Open http://localhost:3000
```

## Environment Variables (if needed)

No environment variables are required for basic deployment. The app works entirely client-side.

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### App doesn't load
- Check browser console for errors
- Verify all imports are correct
- Test locally with `npm run dev`

## Production Checklist

- ✅ Code committed to git
- ✅ Pushed to GitHub
- ✅ Deployed to Vercel
- ✅ Production URL works
- ✅ All features tested (Learn, Calculator, Practice)
- ✅ Mobile responsive
- ✅ No console errors

## Expected URLs

- **Development**: http://localhost:3000
- **Production**: https://poker-academy-[unique-id].vercel.app
- **Custom**: https://your-custom-domain.com (if configured)

---

Need help? Check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
