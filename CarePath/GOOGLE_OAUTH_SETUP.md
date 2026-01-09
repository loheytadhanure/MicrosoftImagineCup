# Google OAuth Setup Guide

This guide explains how to set up Google OAuth authentication for CarePath.

## Prerequisites

- A Google Cloud Platform account
- Your CarePath application running locally or deployed

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project name/ID

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click on it and press **Enable**

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (or Internal if using Google Workspace)
3. Fill in the required information:
   - **App name**: CarePath
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Add scopes:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
5. Add test users (if in testing mode)
6. Click **Save and Continue**

## Step 4: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: CarePath Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - `http://localhost:5174`
     - Your production URL (e.g., `https://carepath.com`)
   - **Authorized redirect URIs**:
     - `http://localhost:5173`
     - `http://localhost:5174`
     - Your production URL
5. Click **Create**
6. Copy your **Client ID** (it looks like: `xxxxx.apps.googleusercontent.com`)

## Step 5: Configure Environment Variables

1. Open the `.env` file in your CarePath project root
2. Add your Google Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
```

3. Save the file
4. **Important**: Restart your development server for changes to take effect

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Step 6: Test the Integration

1. Open your application at `http://localhost:5174`
2. Navigate to the Login or Signup page
3. Click "Continue with Google"
4. You should see Google's account chooser
5. Select an account and authorize
6. You should be redirected to the CarePath dashboard

## How It Works

### Authentication Flow

1. **User clicks "Continue with Google"**
   - The GoogleLoginButton component renders Google's official button
   - Clicking triggers Google's OAuth flow

2. **Google Authentication**
   - User is shown Google's account picker
   - User selects account and grants permissions
   - Google returns a JWT credential token

3. **Token Processing**
   - The `handleGoogleLogin` function in AuthContext receives the credential
   - JWT is decoded to extract user information (id, name, email, avatar)
   - User data is stored in state and localStorage
   - **TODO**: Send credential to your backend for verification

4. **Session Management**
   - User is redirected to the dashboard
   - Profile dropdown shows user's name and avatar
   - User remains logged in until they click Logout

### Code Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Handles auth state and Google login
├── components/
│   └── auth/
│       ├── GoogleLoginButton.tsx # Renders Google's official button
│       └── ProtectedRoute.tsx    # Guards authenticated routes
└── pages/
    ├── Login.tsx                 # Login page with Google button
    └── Signup.tsx                # Signup page with Google button
```

## Security Considerations

### Current Implementation (Development)
- ✅ Real Google OAuth with JWT tokens
- ✅ Token stored in localStorage
- ✅ User data decoded from Google's JWT
- ⚠️ **No backend verification** (development only)

### Production Requirements
You MUST implement backend verification:

```typescript
// In AuthContext.tsx, replace the TODO with:
const response = await fetch('/api/auth/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    credential: credentialResponse.credential 
  })
});

const data = await response.json();
// data should contain: { user, token, sessionId }
```

### Backend Implementation (Node.js Example)

```javascript
// server.js
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  
  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    // Create or fetch user from database
    const user = await findOrCreateUser({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture
    });
    
    // Generate session token
    const sessionToken = generateSessionToken(user);
    
    res.json({ user, token: sessionToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
```

## Troubleshooting

### "Google login failed"
- Check that your Client ID is correctly set in `.env`
- Ensure you've restarted the dev server after changing `.env`
- Verify your domain is in Authorized JavaScript origins

### Button doesn't appear
- Check browser console for errors
- Ensure the Google script is loaded (check Network tab)
- Verify your Client ID is valid

### "redirect_uri_mismatch" error
- Go to Google Cloud Console > Credentials
- Add your current URL to Authorized redirect URIs
- Include the exact URL with protocol and port

### Testing with different accounts
- Use Chrome's Incognito mode
- Or clear localStorage: `localStorage.clear()`

## Environment Variables Reference

```env
# Required
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com

# Optional (for backend)
VITE_API_URL=http://localhost:3000/api
```

## Additional Resources

- [Google Identity Documentation](https://developers.google.com/identity)
- [OAuth 2.0 Overview](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
- [JWT.io](https://jwt.io/) - Decode and inspect JWTs

## Next Steps

1. ✅ Set up Google OAuth credentials
2. ✅ Configure environment variables  
3. ✅ Test the login flow
4. ⚠️ **Implement backend token verification**
5. ⚠️ **Set up proper session management**
6. ⚠️ **Add HTTPS in production**
7. ⚠️ **Implement token refresh logic**
8. ⚠️ **Add logout functionality to revoke tokens**
