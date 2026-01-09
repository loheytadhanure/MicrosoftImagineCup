# 🚀 Quick Start: Google OAuth Setup

## 1. Get Your Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable Google+ API
4. Go to **Credentials** → **Create OAuth Client ID**
5. Add authorized origins:
   - `http://localhost:5173`
   - `http://localhost:5174`
6. Copy your Client ID

## 2. Configure Environment

Open `.env` and add your Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
```

## 3. Restart Server

```bash
npm run dev
```

## 4. Test It!

1. Open http://localhost:5174
2. Click "Continue with Google"
3. Select your Google account
4. You'll be redirected to the dashboard! ✅

---

**⚠️ Important:** For production, you MUST implement backend token verification. See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for complete security implementation.

## What's Working Now

✅ Real Google OAuth (not mocked!)  
✅ JWT credential handling  
✅ User data extraction (name, email, avatar)  
✅ Persistent sessions (localStorage)  
✅ Profile dropdown with user info  
✅ Logout functionality  

## What You Need to Add for Production

⚠️ Backend token verification endpoint  
⚠️ Database user storage  
⚠️ Proper session management  
⚠️ HTTPS in production  
⚠️ Token refresh logic  

See the full guide in [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)
