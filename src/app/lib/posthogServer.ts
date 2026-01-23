import { PostHog } from 'posthog-node'

// Initialize PostHog server-side client
// This is a singleton that will be reused across requests
let posthogClient: PostHog | null = null

export function getPostHogClient(): PostHog {
  if (!posthogClient) {
    posthogClient = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        // Flush events every 30 seconds or when 20 events are queued
        flushAt: 20,
        flushInterval: 30000,
      }
    )
  }
  return posthogClient
}

// Helper function to capture events with common properties
export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, any>
) {
  const client = getPostHogClient()
  
  client.capture({
    distinctId,
    event,
    properties: {
      ...properties,
      $lib: 'posthog-node',
      tracking_source: 'server-side',  // Clear indicator
      environment: process.env.NODE_ENV,
    },
  })
  
  // Flush immediately for critical events
  // Remove this if you want to batch events for better performance
  await client.flush()
}

// Helper to identify users on the server
export async function identifyServerUser(
  distinctId: string,
  properties?: Record<string, any>
) {
  const client = getPostHogClient()
  
  client.identify({
    distinctId,
    properties,
  })
  
  await client.flush()
}

// Graceful shutdown - call this when your app is shutting down
export async function shutdownPostHog() {
  if (posthogClient) {
    await posthogClient.shutdown()
  }
}
