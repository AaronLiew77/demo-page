# PostHog to Mida Pipeline Configuration

## ✅ Updated Configuration

Now that your PostHog events include `mida_uuid`, here's the correct body configuration for your PostHog → Mida pipeline:

### **PostHog Destination Body:**

```json
{
  "project_key": "E3jxwZ6ldLqbzYg90mMX8O",
  "event_name": "{event}",
  "mida_uuid": "{properties.mida_uuid}",
  "id": "{distinct_id}",
  "properties": {
    "tracking_source": "{properties.tracking_source}",
    "page_version": "{properties.page_version}",
    "button_name": "{properties.button_name}",
    "location": "{properties.location}",
    "link_name": "{properties.link_name}",
    "timestamp": "{timestamp}"
  }
}
```

### **Alternative: Send All Properties**

```json
{
  "project_key": "E3jxwZ6ldLqbzYg90mMX8O",
  "event_name": "{event}",
  "mida_uuid": "{properties.mida_uuid}",
  "id": "{distinct_id}",
  "properties": "{properties}"
}
```

---

## 🔍 What Changed in Your Code

### **1. Added Mida UUID State**

```typescript
const [midaUuid, setMidaUuid] = useState<string | null>(null);

useEffect(() => {
  const getMidaUuid = async () => {
    if (window.mida?.uuid) {
      try {
        const uuid = await window.mida.uuid();
        setMidaUuid(uuid);
      } catch (error) {
        console.error('Error getting Mida UUID:', error);
      }
    }
  };
  
  setTimeout(getMidaUuid, 500);
}, []);
```

### **2. Helper Function to Add Mida UUID**

```typescript
const getEventProperties = (properties: Record<string, any>) => {
  if (midaUuid) {
    return { ...properties, mida_uuid: midaUuid };
  }
  return properties;
};
```

### **3. Updated All Event Handlers**

All events now include `mida_uuid`:

```typescript
posthog.capture('button_clicked', getEventProperties({
  button_name: 'Start Free Trial',
  page_version: isV3 ? 'v3' : 'v1',
  location: 'hero_section',
  tracking_source: 'client-side'
}));
```

---

## 📊 Event Structure

Your PostHog events now look like this:

```json
{
  "event": "button_clicked",
  "distinct_id": "user_123",
  "timestamp": "2024-01-23T10:00:00Z",
  "properties": {
    "button_name": "Start Free Trial",
    "page_version": "v1",
    "location": "hero_section",
    "tracking_source": "client-side",
    "mida_uuid": "85a35aca4df9"  // ← Now included!
  }
}
```

---

## 🎯 Benefits

### **1. Better User Matching**

Mida can now match events to users using their own UUID system, which is more reliable than distinct_id.

### **2. Cross-Platform Tracking**

If a user is tracked by Mida across multiple platforms, the UUID stays consistent.

### **3. Offline Event Correlation**

When you send offline events to Mida, you can use the same `mida_uuid` to correlate online and offline behavior.

---

## 🧪 Testing

### **1. Check Browser Console**

Open your browser console and run:

```javascript
// Get Mida UUID
await window.mida.uuid()
// Should return something like: "85a35aca4df9"
```

### **2. Check PostHog Events**

1. Go to PostHog → Activity
2. Click on any event
3. Look for `mida_uuid` in properties
4. Should see something like: `"mida_uuid": "85a35aca4df9"`

### **3. Test Pipeline**

1. In PostHog, go to your Mida destination
2. Click "Test"
3. Check the payload being sent
4. Verify `mida_uuid` is included

---

## 🔧 Troubleshooting

### **Issue: `mida_uuid` is null or undefined**

**Possible causes:**
1. Mida script hasn't loaded yet
2. User is blocking tracking scripts
3. Mida initialization failed

**Solution:**
The code already waits 500ms for Mida to initialize. If still having issues, increase the timeout:

```typescript
setTimeout(getMidaUuid, 1000); // Wait 1 second instead
```

### **Issue: Events sent before UUID is available**

**Solution:**
Events will be sent without `mida_uuid` initially, then include it once available. This is fine - Mida can still match using `id` or `email`.

### **Issue: PostHog pipeline shows `mida_uuid` as empty**

**Check:**
1. Verify events in PostHog Activity tab have `mida_uuid`
2. Make sure pipeline body uses `{properties.mida_uuid}`
3. Test with a real event, not just the test button

---

## 📋 Complete PostHog Pipeline Setup

### **Step 1: Destination Configuration**

```
Name: Mida Webhook
Type: HTTP Webhook
URL: https://api-us.mida.so/abtest/event/webhook
Method: POST
```

### **Step 2: Headers**

```
Content-Type: application/json
```

### **Step 3: Body Template**

```json
{
  "project_key": "E3jxwZ6ldLqbzYg90mMX8O",
  "event_name": "{event}",
  "mida_uuid": "{properties.mida_uuid}",
  "id": "{distinct_id}",
  "properties": "{properties}"
}
```

### **Step 4: Filters (Optional)**

Add filters to only send specific events:
- `tracking_source = "client-side"` (only client events)
- `event = "button_clicked"` (only button clicks)
- Or leave empty to send all events

### **Step 5: Enable**

Toggle the destination to "Enabled"

---

## ✅ Verification Checklist

- [ ] Mida script loads on page
- [ ] `window.mida.uuid()` returns a UUID
- [ ] PostHog events include `mida_uuid` property
- [ ] Pipeline body includes `{properties.mida_uuid}`
- [ ] Test destination shows successful response
- [ ] Events appear in Mida dashboard

---

## 🎉 You're All Set!

Your PostHog events now include the Mida UUID, which means:

✅ **Better tracking** - Mida can match events more accurately  
✅ **Cross-platform** - Same UUID across all platforms  
✅ **Offline correlation** - Link online and offline events  
✅ **Future-proof** - Ready for advanced Mida features  

Events will flow from PostHog → Mida with full user context! 🚀
