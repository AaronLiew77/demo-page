# PostHog Webhooks & Pipelines Guide

## 🔄 What are PostHog Pipelines?

PostHog Pipelines (Destinations) allow you to send your PostHog events to external services in real-time. Think of it as a way to:

- Forward events to your own API
- Trigger actions based on user behavior
- Sync data with other tools
- Build custom integrations

---

## 🎯 Which Option Should You Use?

### **HTTP Webhook** ✅ (Most Common)

**Use when you want to:**
- Send events to your own API/server
- Trigger custom logic based on events
- Forward events to services not natively supported
- Have full control over data processing

**Examples:**
- Send user signup events to your CRM
- Trigger email campaigns based on user actions
- Update your database with analytics data
- Forward events to internal monitoring systems

### **Other Destinations**

| Destination | Use Case |
|------------|----------|
| **Slack** | Send alerts/notifications to Slack channels |
| **Zapier** | Connect to 5000+ apps without code |
| **BigQuery** | Export data for SQL analysis |
| **S3** | Archive events in AWS |
| **Snowflake** | Data warehousing |
| **Redshift** | AWS data warehouse |

---

## 🚀 Setting Up HTTP Webhook

### **Step 1: Create Your Webhook Endpoint**

I've created an example endpoint for you at:
```
/api/posthog-webhook
```

This endpoint:
- ✅ Receives events from PostHog
- ✅ Validates authentication (optional)
- ✅ Processes different event types
- ✅ Can forward to other services
- ✅ Logs all incoming events

### **Step 2: Deploy or Use ngrok (for local testing)**

#### **Option A: Local Testing with ngrok**

```bash
# Install ngrok (if not installed)
brew install ngrok  # macOS
# or download from https://ngrok.com

# Start your Next.js dev server
npm run dev

# In another terminal, start ngrok
ngrok http 3000

# You'll get a URL like: https://abc123.ngrok.io
# Your webhook URL will be: https://abc123.ngrok.io/api/posthog-webhook
```

#### **Option B: Deploy to Production**

Deploy your app to Vercel, Netlify, or any hosting service:
```
https://your-domain.com/api/posthog-webhook
```

### **Step 3: Configure in PostHog**

1. **Go to PostHog Dashboard**
   - Navigate to **Data Pipeline** → **Destinations**

2. **Create New Destination**
   - Click **"New destination"**
   - Select **"HTTP Webhook"**

3. **Configure Webhook**
   ```
   Name: My API Webhook
   Webhook URL: https://your-domain.com/api/posthog-webhook
   ```

4. **Add Authentication (Optional but Recommended)**
   - Add header: `Authorization: Bearer your_secret_token`
   - Set `POSTHOG_WEBHOOK_SECRET=your_secret_token` in your `.env.local`

5. **Filter Events (Optional)**
   - **All events** - Forward everything
   - **Specific events** - Only certain event names
   - **Property filters** - Events matching conditions
   
   Examples:
   - Only server-side: `tracking_source = "server-side"`
   - Only signups: `event = "user_signed_up_server"`
   - High-value users: `plan = "pro"`

6. **Test the Connection**
   - Click **"Test destination"**
   - Check your server logs for incoming webhook

7. **Enable the Destination**
   - Toggle to **"Enabled"**
   - Events will now flow to your webhook!

---

## 📊 Webhook Payload Format

PostHog sends events in this format:

```json
{
  "event": "button_clicked",
  "distinct_id": "user_123",
  "timestamp": "2024-01-23T10:30:00.000Z",
  "properties": {
    "button_name": "Subscribe",
    "tracking_source": "client-side",
    "page_version": "v1",
    "$lib": "web",
    "$browser": "Chrome",
    "$device_type": "Desktop"
  }
}
```

### **Key Fields:**

| Field | Description |
|-------|-------------|
| `event` | Event name (e.g., "button_clicked") |
| `distinct_id` | User identifier |
| `timestamp` | When event occurred (ISO 8601) |
| `properties` | All event properties |

---

## 🔒 Security Best Practices

### **1. Add Authentication**

In your `.env.local`:
```bash
POSTHOG_WEBHOOK_SECRET=your_random_secret_token_here
```

In PostHog webhook settings, add header:
```
Authorization: Bearer your_random_secret_token_here
```

### **2. Validate Requests**

The endpoint already validates:
```typescript
const authHeader = request.headers.get('authorization')
const expectedToken = process.env.POSTHOG_WEBHOOK_SECRET

if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### **3. Rate Limiting**

Consider adding rate limiting for production:
```typescript
// Example with rate limiting
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  try {
    await limiter.check(10, 'WEBHOOK') // 10 requests per minute
    // ... rest of handler
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }
}
```

---

## 💡 Common Use Cases

### **Use Case 1: Send Welcome Email on Signup**

```typescript
async function handleUserSignup(payload: any) {
  const { distinct_id, properties } = payload
  
  // Send welcome email
  await sendEmail({
    to: properties.email,
    subject: 'Welcome to SaaSify!',
    template: 'welcome',
    data: {
      name: properties.name,
      userId: distinct_id
    }
  })
  
  console.log('✅ Welcome email sent to:', properties.email)
}
```

### **Use Case 2: Update CRM**

```typescript
async function handleFormSubmission(payload: any) {
  const { distinct_id, properties } = payload
  
  // Update CRM (e.g., HubSpot, Salesforce)
  await fetch('https://api.your-crm.com/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CRM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: properties.email,
      source: 'PostHog',
      form_name: properties.form_name,
      timestamp: payload.timestamp
    })
  })
  
  console.log('✅ CRM updated for:', distinct_id)
}
```

### **Use Case 3: Trigger Slack Notification**

```typescript
async function notifySlack(payload: any) {
  if (payload.event === 'high_value_conversion') {
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🎉 New high-value conversion!`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*User:* ${payload.distinct_id}\n*Plan:* ${payload.properties.plan}\n*Amount:* $${payload.properties.amount}`
            }
          }
        ]
      })
    })
  }
}
```

### **Use Case 4: Store in Database**

```typescript
async function storeEventInDatabase(payload: any) {
  // Example with Prisma
  await prisma.event.create({
    data: {
      eventName: payload.event,
      userId: payload.distinct_id,
      properties: payload.properties,
      timestamp: new Date(payload.timestamp),
      source: 'posthog'
    }
  })
  
  console.log('✅ Event stored in database')
}
```

---

## 🧪 Testing Your Webhook

### **Method 1: Use PostHog Test Feature**

1. In PostHog webhook settings
2. Click **"Test destination"**
3. Check your server logs

### **Method 2: Trigger Real Events**

1. Go to http://localhost:3000/v2
2. Use the ServerTrackingExample component
3. Submit form or click button
4. Watch your server logs for webhook calls

### **Method 3: Manual Testing**

```bash
curl -X POST http://localhost:3000/api/posthog-webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_secret_token" \
  -d '{
    "event": "test_event",
    "distinct_id": "test_user",
    "timestamp": "2024-01-23T10:00:00.000Z",
    "properties": {
      "test": true,
      "tracking_source": "manual"
    }
  }'
```

### **Method 4: Use webhook.site**

1. Go to https://webhook.site
2. Copy your unique URL
3. Use it as webhook URL in PostHog
4. See requests in real-time
5. Once working, switch to your actual endpoint

---

## 📊 Monitoring & Debugging

### **Check Server Logs**

```bash
# Your terminal should show:
📨 Received PostHog webhook: {
  event: 'button_clicked',
  distinctId: 'user_123',
  timestamp: '2024-01-23T10:00:00.000Z',
  properties: { ... }
}
```

### **Check PostHog Delivery Status**

1. Go to **Data Pipeline** → **Destinations**
2. Click on your webhook
3. View **"Delivery metrics"**
   - Success rate
   - Failed deliveries
   - Response times

### **Common Issues**

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check authentication header matches secret |
| 404 Not Found | Verify webhook URL is correct |
| 500 Server Error | Check server logs for errors |
| Timeout | Optimize webhook handler (use async processing) |

---

## ⚡ Performance Tips

### **1. Process Asynchronously**

Don't block the webhook response:

```typescript
export async function POST(request: NextRequest) {
  const payload = await request.json()
  
  // Return immediately
  const response = NextResponse.json({ success: true })
  
  // Process in background (use queue in production)
  processEventAsync(payload).catch(console.error)
  
  return response
}
```

### **2. Use Message Queue**

For production, use a queue:
- **Redis** + Bull
- **AWS SQS**
- **RabbitMQ**
- **Google Cloud Pub/Sub**

### **3. Batch Processing**

PostHog can batch events:
- Configure in webhook settings
- Receive multiple events per request
- More efficient for high volume

---

## 🎯 Quick Decision Guide

**Choose HTTP Webhook if:**
- ✅ You want to send to your own API
- ✅ You need custom processing logic
- ✅ You want to trigger actions based on events
- ✅ You need real-time event forwarding

**Choose Built-in Destination if:**
- ✅ PostHog has native integration (Slack, BigQuery, etc.)
- ✅ You don't need custom processing
- ✅ You want easier setup

---

## 📚 Next Steps

1. **Test Locally**: Use ngrok to test webhook locally
2. **Deploy**: Deploy your app with webhook endpoint
3. **Configure PostHog**: Set up HTTP webhook destination
4. **Monitor**: Watch events flow through
5. **Customize**: Add your custom logic

---

## 🔗 Resources

- **Your Webhook Endpoint**: `/api/posthog-webhook`
- **PostHog Docs**: https://posthog.com/docs/cdp
- **Webhook Testing**: https://webhook.site
- **ngrok**: https://ngrok.com

---

## ❓ FAQ

**Q: Can I send events to multiple endpoints?**  
A: Yes! Create multiple webhook destinations in PostHog.

**Q: How do I filter which events to send?**  
A: Use property filters in PostHog webhook settings.

**Q: What's the rate limit?**  
A: PostHog doesn't limit, but your endpoint should handle your event volume.

**Q: Can I transform events before sending?**  
A: Not in webhook, but you can use PostHog transformations or process in your endpoint.

**Q: Is it real-time?**  
A: Yes, events are sent within seconds of capture.
