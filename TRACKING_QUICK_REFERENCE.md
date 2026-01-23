# PostHog Tracking Quick Reference

## 🎯 How to Identify Events in PostHog

All events now include a `tracking_source` property to distinguish between client and server tracking:

| Property | Value | Where it's tracked |
|----------|-------|-------------------|
| `tracking_source` | `"client-side"` | Browser/Client |
| `tracking_source` | `"server-side"` | Server/API |

---

## 📊 Client-Side Tracking

### Import the Helper

```typescript
'use client'
import { captureClientEvent } from '@/app/lib/posthogClient'
```

### Track an Event

```typescript
captureClientEvent('button_clicked', {
  button_name: 'Subscribe',
  page: 'home'
})
// ✅ Automatically adds: tracking_source: 'client-side'
```

### Track Pageview

```typescript
import { capturePageview } from '@/app/lib/posthogClient'

capturePageview({
  page_name: 'home',
  page_version: 'v1'
})
// ✅ Automatically adds: tracking_source: 'client-side'
```

### Identify User

```typescript
import { identifyClientUser } from '@/app/lib/posthogClient'

identifyClientUser('user_123', {
  email: 'user@example.com',
  name: 'John Doe'
})
// ✅ Automatically adds: tracking_source: 'client-side'
```

---

## 🖥️ Server-Side Tracking

### Import the Helper

```typescript
import { captureServerEvent } from '@/app/lib/posthogServer'
```

### Track an Event (API Route)

```typescript
import { captureServerEvent } from '@/app/lib/posthogServer'

export async function POST(request: Request) {
  await captureServerEvent('user_123', 'api_called', {
    endpoint: '/api/signup'
  })
  // ✅ Automatically adds: tracking_source: 'server-side'
  
  return Response.json({ success: true })
}
```

### Track with Server Action

```typescript
'use client'
import { trackServerEvent } from '@/app/actions/trackingActions'

const handleClick = async () => {
  await trackServerEvent('user_123', 'button_clicked', {
    button_name: 'Subscribe'
  })
  // ✅ Automatically adds: tracking_source: 'server-side'
}
```

---

## 🔍 Finding Events in PostHog

### Filter by Source

1. Go to **Product Analytics** → **New Insight**
2. Select your event
3. Add filter: `tracking_source = "server-side"` or `"client-side"`

### Create Breakdown

1. Create a Trends insight
2. Select "Breakdown by property"
3. Choose `tracking_source`
4. See client vs server event volumes side-by-side

### Example Queries

**"How many button clicks from client vs server?"**
```
Event: button_clicked
Breakdown: tracking_source
```

**"Server-side form submissions only"**
```
Event: form_submitted_server
Filter: tracking_source = "server-side"
```

**"Compare pageview sources"**
```
Event: $pageview
Breakdown: tracking_source
```

---

## 📋 Event Properties Reference

### Common Properties (All Events)

| Property | Type | Description |
|----------|------|-------------|
| `tracking_source` | string | `"client-side"` or `"server-side"` |
| `environment` | string | `"development"` or `"production"` (server only) |

### Client-Side Events

| Property | Example | Description |
|----------|---------|-------------|
| `page_version` | `"v1"`, `"v3"` | Page layout version |
| `button_name` | `"Start Free Trial"` | Button label |
| `location` | `"hero_section"` | Where on page |
| `link_name` | `"Pricing"` | Navigation link |

### Server-Side Events

| Property | Example | Description |
|----------|---------|-------------|
| `form_name` | `"newsletter_signup"` | Form identifier |
| `endpoint` | `"/api/signup"` | API endpoint |
| `plan` | `"pro"` | Subscription plan |
| `signup_method` | `"email"` | How user signed up |

---

## 🎨 Best Practices

### ✅ DO

- Use `captureClientEvent()` for all client-side tracking
- Use `captureServerEvent()` for all server-side tracking
- Include meaningful properties (button_name, page, etc.)
- Use consistent event naming (`button_clicked`, not `btnClick`)

### ❌ DON'T

- Mix direct `posthog.capture()` calls (loses tracking_source)
- Track sensitive data client-side
- Block user actions waiting for tracking
- Use generic event names (`event1`, `click`)

---

## 🚀 Quick Examples

### Example 1: Track Button Click (Client)

```typescript
'use client'
import { captureClientEvent } from '@/app/lib/posthogClient'

<button onClick={() => captureClientEvent('cta_clicked', {
  cta_text: 'Get Started',
  page: 'home'
})}>
  Get Started
</button>
```

### Example 2: Track Form Submit (Server)

```typescript
'use client'
import { trackFormSubmission } from '@/app/actions/trackingActions'

const handleSubmit = async (e) => {
  e.preventDefault()
  await trackFormSubmission('user_123', {
    formName: 'contact',
    email: formData.email
  })
}
```

### Example 3: Track API Call (Server)

```typescript
import { captureServerEvent } from '@/app/lib/posthogServer'

export async function POST(request: Request) {
  const result = await processPayment()
  
  await captureServerEvent('user_123', 'payment_processed', {
    amount: result.amount,
    currency: 'USD'
  })
  
  return Response.json(result)
}
```

---

## 📞 Need Help?

- Check `POSTHOG_SERVER_SIDE_TRACKING.md` for detailed docs
- View `src/app/components/ServerTrackingExample.tsx` for working examples
- PostHog Docs: https://posthog.com/docs
