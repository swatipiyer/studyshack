# 🚀 Quick Setup Guide - Lightning Tutor

## ⚡ Get Running in 5 Minutes!

### Step 1: Get Your Friendli AI API Key (2 minutes)

1. Go to **https://suite.friendli.ai/**
2. Click **"Sign Up"** or **"Log In"**
3. Navigate to **"API Keys"** in the dashboard
4. Click **"Create New Key"**
5. **Copy your API key** (it looks like: `flp-xxxxxxxxxxxxx`)

### Step 2: Setup Project (2 minutes)

```bash
# Open terminal in the lightning-tutor folder

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Open .env.local in a text editor and paste your API key
# It should look like:
# FRIENDLI_API_KEY=flp-your-actual-key-here
```

### Step 3: Run! (1 minute)

```bash
# Start the development server
npm run dev
```

**Open your browser to: http://localhost:3000**

🎉 **You're done!** Start asking questions and watch the lightning-fast responses!

---

## 📋 Pre-Demo Checklist

Before presenting at your hackathon:

- [ ] Test all 5 subject modes (General, Math, Science, Coding, Language)
- [ ] Prepare 2-3 impressive demo questions
- [ ] Check that response times are showing (<1s)
- [ ] Verify cost tracker is working
- [ ] Test on mobile/different screen sizes
- [ ] Have backup questions ready
- [ ] Clear conversation and start fresh for demo

---

## 🎯 Best Demo Questions

### Math (Shows step-by-step reasoning)
- "Why does e^(iπ) = -1?"
- "Explain the Pythagorean theorem with a real example"

### Science (Shows clear explanations)
- "Explain quantum entanglement simply"
- "How does CRISPR gene editing work?"

### Coding (Shows practical code)
- "Implement binary search in Python"
- "Explain async/await in JavaScript with examples"

### Language (Shows cultural context)
- "Teach me Spanish subjunctive mood"
- "What's the difference between 'tu' and 'vous' in French?"

### General (Shows versatility)
- "What causes economic inflation?"
- "Explain the trolley problem"

---

## 🐛 Quick Troubleshooting

**Problem**: "Cannot find module" errors
**Solution**: Run `npm install` again

**Problem**: "Friendli API key not configured"
**Solution**: 
1. Check `.env.local` exists in project root
2. Make sure the key starts with `flp-`
3. Restart dev server: Stop with Ctrl+C, then `npm run dev`

**Problem**: Slow responses
**Solution**: 
1. Check internet connection
2. Try closing other apps
3. Verify Friendli API is working at https://status.friendli.ai/

**Problem**: Build errors during deployment
**Solution**: Make sure Node.js version is 18 or higher

---

## 🚀 Deploy to Vercel (Optional - for live demo)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# After deployment, add your API key:
# 1. Go to Vercel dashboard
# 2. Select your project
# 3. Settings → Environment Variables
# 4. Add: FRIENDLI_API_KEY = your_key
# 5. Redeploy
```

---

## 💡 Pro Tips for Demo

1. **Start with a WOW**: Ask a complex question first to show off speed
2. **Point out metrics**: "See? 0.8 seconds and only $0.0002!"
3. **Compare to ChatGPT**: "This would take 5-10 seconds on regular APIs"
4. **Switch subjects**: Show different modes for different questions
5. **Let judges try it**: Hand them the keyboard - they'll be impressed
6. **Mention Friendli**: "Powered by Friendli AI's optimized inference"

---

## 📊 Key Talking Points

- **Speed**: "Responds in under 1 second using Friendli AI"
- **Cost**: "70% cheaper than traditional APIs"
- **Quality**: "Using Meta Llama 3.1 70B - high-quality responses"
- **Scalability**: "Serverless endpoints scale automatically"
- **UX**: "Speed enables natural conversation flow for learning"

---

## 🎨 Customization (If you have extra time)

### Change colors:
Edit `app/page.js` - search for color classes like `from-purple-500`

### Change model:
Edit `app/api/chat/route.js` - change the `model` parameter

### Add features:
- Voice input (Web Speech API)
- Save conversations (localStorage)
- Export notes (download as markdown)
- Dark/light mode toggle

---

## ✅ Final Check Before Demo

1. Clear your browser cache
2. Start fresh conversation
3. Have Friendli dashboard open in another tab
4. Charge your laptop
5. Test internet connection
6. Have backup questions written down
7. Practice your 2-minute pitch
8. Smile and have fun! 😄

---

**Need help?** Check the full README.md for detailed documentation!

**Good luck at your hackathon! 🚀⚡**
