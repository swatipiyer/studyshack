# Netlify Deployment Guide for The Study Shack

## Quick Deploy (Recommended)

### Step 1: Deploy via Netlify Dashboard

1. Go to **https://app.netlify.com** and sign in (use your GitHub account)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select the **`studyshack`** repository
6. Configure build settings:
   - **Base directory:** (leave empty)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** (leave empty, auto-detected)

7. **Environment Variables** - Click "Show advanced" and add:
   - **Key:** `FRIENDLI_API_KEY`
   - **Value:** `tm4fwtIhbUiI`

8. Click **"Deploy site"**

### Step 2: Configure Site Name

After initial deployment:
1. Go to **Site settings** → **Site details**
2. Click **"Change site name"**
3. Enter: `study-shack` or `studyshack` or any available name
4. Your site will be at: `https://study-shack.netlify.app`

---

## Alternative: Netlify CLI Deployment

### Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Login to Netlify
```bash
netlify login
```

### Deploy
```bash
cd /Users/paddy/Downloads/lightning-tutor
netlify init
```

Follow the prompts:
- **Create & configure a new site?** Yes
- **Team:** Select your team
- **Site name:** `study-shack` (or choose your preferred name)
- **Build command:** `npm run build`
- **Directory to deploy:** `.next`

### Set Environment Variables via CLI
```bash
netlify env:set FRIENDLI_API_KEY "tm4fwtIhbUiI"
```

### Deploy to Production
```bash
netlify deploy --prod
```

---

## Post-Deployment Configuration

### 1. Install Next.js Plugin (Important!)

Your site needs the Netlify Next.js plugin for proper functionality:

1. Go to your site dashboard on Netlify
2. Navigate to **Plugins**
3. Search for **"Essential Next.js"** or **"@netlify/plugin-nextjs"**
4. Click **"Install"**
5. Trigger a new deploy (or it will happen automatically)

Alternatively, the plugin is already configured in `netlify.toml`.

### 2. Environment Variables

Ensure the following is set in Netlify:

| Variable | Value | Description |
|----------|-------|-------------|
| `FRIENDLI_API_KEY` | `tm4fwtIhbUiI` | Friendli AI API authentication |

To add/edit:
- Site dashboard → **Site settings** → **Environment variables**
- Click **"Add a variable"**

### 3. Custom Domain (Optional)

To add a custom domain:
1. Go to **Domain settings** → **Add custom domain**
2. Enter your domain (e.g., `studyshack.com`)
3. Follow DNS configuration instructions
4. Netlify will provide an SSL certificate automatically

---

## Automatic Deployments

Once connected to GitHub, Netlify will automatically:
- ✅ Deploy on every push to `main` branch (Production)
- ✅ Create preview deployments for pull requests
- ✅ Provide unique URLs for each deployment

---

## Available Domain Names

Your site will be deployed at:
- `https://study-shack.netlify.app` (if available)
- `https://studyshack.netlify.app`
- `https://the-study-shack.netlify.app`
- Or any custom name you choose

---

## Troubleshooting

### Build Fails
**Issue:** Build fails with dependency errors
**Solution:**
```bash
# Ensure all dependencies are installed
npm install
npm run build  # Test locally first
```

### Next.js Functions Not Working
**Issue:** API routes return 404
**Solution:**
- Install the **Essential Next.js** plugin from Netlify dashboard
- Ensure `netlify.toml` is in the root directory
- Redeploy the site

### Environment Variables Not Working
**Issue:** API calls fail in production
**Solution:**
- Verify `FRIENDLI_API_KEY` is set in Netlify dashboard
- Environment variables should NOT have quotes in Netlify UI
- Redeploy after adding variables

### Images Not Loading
**Issue:** Background image doesn't appear
**Solution:**
- Ensure `studyshack.png` is in `/public` folder
- Image path should be `/studyshack.png` (not `./public/studyshack.png`)
- Clear cache and redeploy

---

## Deployment Checklist

- [ ] GitHub repository is pushed with latest code
- [ ] Netlify site is created and connected to GitHub repo
- [ ] Essential Next.js plugin is installed
- [ ] `FRIENDLI_API_KEY` environment variable is set
- [ ] Site name is configured (e.g., `study-shack.netlify.app`)
- [ ] Initial deployment is successful
- [ ] Test the live site functionality
- [ ] API routes are working (test chat functionality)
- [ ] Images are loading correctly
- [ ] Custom domain configured (if applicable)

---

## Monitoring & Logs

### View Deployment Logs
1. Go to **Deploys** tab
2. Click on the latest deployment
3. View **Deploy log** for build details

### View Function Logs
1. Go to **Functions** tab
2. Click on a function to see invocation logs
3. Useful for debugging API routes

---

## Next.js on Netlify Notes

- Netlify uses the **Essential Next.js** plugin to support Next.js features
- Server-side rendering (SSR) works via Netlify Functions
- API routes are automatically converted to serverless functions
- Image optimization is supported with Next.js Image component
- Static assets are served from CDN automatically

---

## GitHub Integration Benefits

With GitHub connected:
- **Automatic deploys** on every push to main
- **Preview deployments** for pull requests
- **Deploy previews** with unique URLs
- **Rollback capability** to previous deployments
- **Branch deploys** (optional)

---

## Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [Essential Next.js Plugin](https://github.com/netlify/netlify-plugin-nextjs)
- [Netlify CLI Docs](https://cli.netlify.com/)

---

## Support

If you encounter issues:
- Check [Netlify Support Forums](https://answers.netlify.com/)
- Review [Netlify Status](https://www.netlifystatus.com/)
- Contact Netlify support via dashboard
