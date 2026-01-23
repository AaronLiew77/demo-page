# PostHog Server-Side Tracking Guide

This guide explains how to use PostHog server-side tracking in your Next.js application.

## 📦 What Was Installed

- `posthog-node` - PostHog Node.js SDK for server-side tracking

## 📁 Files Created

### 1. **Server-Side Client** (`src/app/lib/posthogServer.ts`)
Singleton PostHog client for server-side tracking with helper functions.

### 2. **API Route** (`src/app/api/track/route.ts`)
REST API endpoint for tracking events from the server.

### 3. **Server Actions** (`src/app/actions/trackingActions.ts`)
Next.js Server Actions for tracking events directly from components.

### 4. **Example Component** (`src/app/components/ServerTrackingExample.tsx`)
Demo component showing how to use server-side tracking.

---

## 🚀 How to Use

### Client-Side Tracking Helper

For consistent client-side tracking with the `tracking_source` property, use the helper:

```typescript
'use client'

import { captureClientEvent } from '@/app/lib/posthogClient'

export default function MyComponent() {
  const handleClick = () => {
    captureClientEvent('button_clicked', {
      button_name: 'Subscribe',
      page: 'home'
    })
    // Automatically includes tracking_source: 'client-side'
  }

  return <button onClick={handleClick}>Subscribe</button>
}
```

### Method 1: Using Server Actions (Recommended)

Server Actions are the easiest way to track events from client components:

```typescript
'use client'

import { trackServerEvent } from '@/app/actions/trackingActions'

export default function MyComponent() {
  const handleClick = async () => {
    await trackServerEvent(
      'user_123',  // User ID
      'button_clicked',  // Event name
      {  // Properties
        button_name: 'Subscribe',
        page: 'home'
      }
    )
  }

  return <button onClick={handleClick}>Subscribe</button>
}
```

### Method 2: Using API Route

You can also call the API endpoint directly:

```typescript
'use client'

export default function MyComponent() {
  const handleClick = async () => {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        distinctId: 'user_123',
        event: 'button_clicked',
        properties: {
          button_name: 'Subscribe',
          page: 'home'
        }
      })
    })
  }

  return <button onClick={handleClick}>Subscribe</button>
}
```

### Method 3: Direct Server-Side Usage

In API routes or Server Components:

```typescript
import { captureServerEvent } from '@/app/lib/posthogServer'

export async function POST(request: Request) {
  // Your logic here...
  
  // Track the event
  await captureServerEvent(
    'user_123',
    'api_called',
    { endpoint: '/api/signup' }
  )
  
  return Response.json({ success: true })
}
```

---

## 📊 Available Server Actions

### 1. **trackServerEvent**
Generic function to track any event:

```typescript
await trackServerEvent(userId, eventName, properties)
```

### 2. **trackFormSubmission**
Track form submissions:

```typescript
await trackFormSubmission('user_123', {
  formName: 'contact_form',
  email: 'user@example.com'
})
```

### 3. **trackUserSignup**
Track user signups with identification:

```typescript
await trackUserSignup('user_123', {
  email: 'user@example.com',
  name: 'John Doe',
  plan: 'pro'
})
```

---

## 🎯 When to Use Server-Side Tracking

Use server-side tracking when:

✅ **Tracking sensitive data** - Keep user data secure on the server  
✅ **API endpoints** - Track backend operations  
✅ **Form submissions** - Ensure tracking even if client-side fails  
✅ **Server Actions** - Track Next.js server-side operations  
✅ **Webhooks** - Track external integrations  
✅ **Scheduled jobs** - Track cron jobs or background tasks  

Use client-side tracking when:

✅ **User interactions** - Clicks, scrolls, page views  
✅ **Real-time feedback** - Immediate UI updates  
✅ **Browser-specific data** - Screen size, device info  

---

## 🧪 Testing the Implementation

### Option 1: Use the Example Component

Add the example component to any page:

```typescript
import ServerTrackingExample from '@/app/components/ServerTrackingExample'

export default function Page() {
  return (
    <div>
      <ServerTrackingExample />
    </div>
  )
}
```

### Option 2: Test in Your Browser Console

```javascript
// Test the API endpoint
fetch('/api/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    distinctId: 'test_user',
    event: 'test_event',
    properties: { test: true }
  })
})
```

---

## 📈 View Events in PostHog

1. Go to your PostHog dashboard
2. Click **"Activity"** to see live events
3. Look for events with these properties:
   - **Server-side events**: `tracking_source: "server-side"`
   - **Client-side events**: `tracking_source: "client-side"`
4. Create insights to analyze:
   - Filter by `tracking_source` to see server vs client events
   - `form_submitted_server`
   - `server_button_clicked`
   - `user_signed_up_server`

### Distinguishing Server vs Client Events

All events now include a `tracking_source` property:
- **`tracking_source: "server-side"`** - Events tracked from your server
- **`tracking_source: "client-side"`** - Events tracked from the browser

You can filter by this property in PostHog to analyze:
- Which events are tracked where
- Server vs client event volumes
- Reliability differences between sources

---

## 🔧 Configuration

The server-side client uses the same environment variables as client-side:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Performance Settings

In `src/app/lib/posthogServer.ts`, you can adjust:

```typescript
{
  flushAt: 20,        // Flush after 20 events
  flushInterval: 30000, // Flush every 30 seconds
}
```

---

## 🎨 Best Practices

1. **Use meaningful event names**: `user_signed_up` not `event1`
2. **Include context in properties**: page, location, user_type, etc.
3. **Identify users**: Use `identifyServerUser()` for user properties
4. **Handle errors gracefully**: Wrap tracking in try-catch
5. **Don't block user actions**: Track asynchronously
6. **Batch events**: Let PostHog batch events for better performance

---

## 🔒 Security Notes

- Server-side tracking keeps your PostHog API key secure
- User data never leaves your server
- No client-side tracking blockers can interfere
- Better for GDPR/privacy compliance

---

## 📝 Example Events to Track

### E-commerce
- `product_viewed_server`
- `checkout_started_server`
- `payment_processed_server`

### SaaS
- `trial_started_server`
- `subscription_upgraded_server`
- `feature_used_server`

### Content
- `article_published_server`
- `comment_posted_server`
- `content_shared_server`

---

## 🐛 Troubleshooting

**Events not showing up?**
- Check your environment variables
- Look at server logs for errors
- Verify PostHog project key is correct
- Check network tab for API calls

**Performance issues?**
- Increase `flushAt` to batch more events
- Remove `await client.flush()` for non-critical events
- Use background jobs for bulk tracking

---

## 📚 Additional Resources

- [PostHog Node.js Docs](https://posthog.com/docs/libraries/node)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [PostHog API Reference](https://posthog.com/docs/api)
