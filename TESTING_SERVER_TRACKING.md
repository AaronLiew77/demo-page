# Testing Server-Side Tracking

## 🚀 Quick Start

### Step 1: Start Your Development Server

```bash
npm run dev
```

### Step 2: Open the V2 Page

Navigate to: **http://localhost:3000/v2**

You'll see a "Test Server-Side Tracking" section with a demo component.

---

## 🧪 Testing the Demo Component

The demo component has two interactive elements:

### 1. **Email Form (Server Action)**
- Enter an email address
- Click "Submit Form (Server Action)"
- This triggers `trackFormSubmission()` server action
- Event sent: `form_submitted_server`

### 2. **Track Server Event Button**
- Click "Track Server Event"
- This triggers `trackServerEvent()` server action
- Event sent: `server_button_clicked`

---

## 📊 Verify in PostHog

### Method 1: Activity Tab (Real-time)

1. Open PostHog dashboard: https://app.posthog.com
2. Click **"Activity"** in the left sidebar
3. Perform an action in the demo (submit form or click button)
4. Watch for the event to appear in real-time
5. Click on the event to see properties:
   ```
   tracking_source: "server-side"
   environment: "development"
   form_name: "newsletter_signup" (for form)
   button_name: "Test Server Tracking" (for button)
   ```

### Method 2: Events Page

1. Go to **"Events"** in PostHog
2. Search for:
   - `form_submitted_server`
   - `server_button_clicked`
3. View event counts and properties

### Method 3: Create an Insight

1. Go to **Product Analytics** → **New Insight**
2. Select **Trends**
3. Choose event: `form_submitted_server` or `server_button_clicked`
4. Add filter: `tracking_source = "server-side"`
5. See your test events!

---

## 🔍 What to Look For

### Server-Side Events Should Have:

✅ `tracking_source: "server-side"`  
✅ `environment: "development"` or `"production"`  
✅ `$lib: "posthog-node"`  

### Client-Side Events Should Have:

✅ `tracking_source: "client-side"`  
✅ `$lib: "web"`  

---

## 🎯 Test Scenarios

### Scenario 1: Form Submission
```
1. Enter email: test@example.com
2. Click "Submit Form (Server Action)"
3. See success message: "✅ Form submitted and tracked server-side!"
4. Check PostHog Activity for: form_submitted_server
5. Verify properties:
   - tracking_source: "server-side"
   - form_name: "newsletter_signup"
   - email: "test@example.com"
```

### Scenario 2: Button Click
```
1. Click "Track Server Event"
2. See success message: "✅ Server event tracked!"
3. Check PostHog Activity for: server_button_clicked
4. Verify properties:
   - tracking_source: "server-side"
   - button_name: "Test Server Tracking"
   - page: "example"
```

---

## 🐛 Troubleshooting

### Events Not Showing Up?

**Check Environment Variables:**
```bash
# Make sure these are set in .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Check Server Logs:**
```bash
# Look for errors in your terminal where dev server is running
# You should see no errors when events are captured
```

**Verify PostHog Project:**
- Make sure you're looking at the correct project in PostHog
- Check project settings → API keys

**Check Network Tab:**
- Open browser DevTools → Network tab
- Look for requests to your server actions
- Should see successful responses

---

## 📝 Testing Other Pages

### Add to Any Page

You can add the demo component to any page:

```typescript
import ServerTrackingExample from '@/app/components/ServerTrackingExample'

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <ServerTrackingExample />
    </div>
  )
}
```

### Test in Production

1. Build your app: `npm run build`
2. Start production server: `npm start`
3. Navigate to http://localhost:3000/v2
4. Events will now have `environment: "production"`

---

## 🎨 Customize the Demo

Edit `src/app/components/ServerTrackingExample.tsx` to:

- Change event names
- Add more properties
- Test different server actions
- Customize the UI

---

## 📊 Advanced Testing

### Test API Route Directly

Use curl or Postman:

```bash
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "distinctId": "test_user_123",
    "event": "test_api_event",
    "properties": {
      "test": true,
      "source": "curl"
    }
  }'
```

### Test from Browser Console

```javascript
fetch('/api/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    distinctId: 'console_user',
    event: 'console_test',
    properties: { test: true }
  })
})
.then(r => r.json())
.then(console.log)
```

---

## ✅ Success Checklist

- [ ] Dev server is running
- [ ] Can access http://localhost:3000/v2
- [ ] See "Test Server-Side Tracking" section
- [ ] Form submission works and shows success message
- [ ] Button click works and shows success message
- [ ] Events appear in PostHog Activity tab
- [ ] Events have `tracking_source: "server-side"`
- [ ] Can filter events by `tracking_source` in PostHog

---

## 🎉 Next Steps

Once testing is successful:

1. **Implement in Your App**: Use the server actions in your real forms and API routes
2. **Create Dashboards**: Build PostHog dashboards to visualize server events
3. **Set Up Alerts**: Configure alerts for important server-side events
4. **Monitor Performance**: Track server-side event volumes and latency

---

## 📚 Additional Resources

- [POSTHOG_SERVER_SIDE_TRACKING.md](./POSTHOG_SERVER_SIDE_TRACKING.md) - Full documentation
- [TRACKING_QUICK_REFERENCE.md](./TRACKING_QUICK_REFERENCE.md) - Quick reference guide
- [PostHog Docs](https://posthog.com/docs) - Official documentation
