# Deployment Guide for The Study Shack

## GitHub Repository Setup

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Repository name: `study-shack`
3. Description: "The Study Shack - A warm, welcoming space for AI-powered tutoring"
4. Set to **Public**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Push to GitHub
Once you've created the repository, run these commands in your terminal:

```bash
cd /Users/paddy/Downloads/lightning-tutor
git remote add origin https://github.com/YOUR_USERNAME/study-shack.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

Your repository will be available at: `https://github.com/YOUR_USERNAME/study-shack`

---

## Vercel Deployment

### Step 1: Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### Step 2: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository (`study-shack`)
4. Configure project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. **Environment Variables** - Add the following:
   - Key: `FRIENDLI_API_KEY`
   - Value: `tm4fwtIhbUiI` (or your actual API key)
   - Environment: Production, Preview, Development (check all)

6. Click "Deploy"

### Step 3: Custom Domain (Optional)
After deployment:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add domain: `study-shack.vercel.app` (or your custom domain)
4. If you want a custom domain like `studyshack.com`:
   - Purchase the domain
   - Add it in Vercel domains section
   - Update your DNS settings as instructed by Vercel

### Step 4: Deployment via CLI (Alternative)
```bash
cd /Users/paddy/Downloads/lightning-tutor
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **study-shack**
- In which directory is your code located? **.**
- Want to override settings? **N**

Then deploy to production:
```bash
vercel --prod
```

---

## Post-Deployment Checklist

- [ ] Repository is public on GitHub
- [ ] All files are pushed successfully
- [ ] Vercel deployment is successful
- [ ] Environment variable `FRIENDLI_API_KEY` is set in Vercel
- [ ] Test the live site
- [ ] Custom domain configured (if applicable)

---

## Environment Variables

Make sure these are set in Vercel:

| Variable | Value | Description |
|----------|-------|-------------|
| `FRIENDLI_API_KEY` | Your API key | Friendli AI API authentication |

**Important**: Never commit `.env.local` to GitHub. It's already in `.gitignore`.

---

## Vercel Auto-Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch (Production)
- Create preview deployments for pull requests
- Provide deployment URLs for testing

---

## Domain Suggestions

If `study-shack.vercel.app` is taken, try:
- `the-study-shack.vercel.app`
- `studyshack-ai.vercel.app`
- `mystudyshack.vercel.app`
- `studyshack-tutor.vercel.app`

Or purchase a custom domain:
- `studyshack.com`
- `thestudyshack.com`
- `studyshack.ai`
- `studyshack.io`

---

## Troubleshooting

### Build fails on Vercel
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

### API not working
- Verify `FRIENDLI_API_KEY` is set in Vercel environment variables
- Check API route is not blocked by CORS
- Review Vercel function logs

### Images not loading
- Ensure `studyshack.png` is in the `public` folder
- Check file path is `/studyshack.png` (not `./public/studyshack.png`)

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Docs](https://docs.github.com)
