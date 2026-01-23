'use client'

import posthog from 'posthog-js'

/**
 * Helper function to capture client-side events with consistent properties
 * This automatically adds tracking_source: 'client-side' to all events
 */
export function captureClientEvent(
  event: string,
  properties?: Record<string, any>
) {
  posthog.capture(event, {
    ...properties,
    tracking_source: 'client-side',
  })
}

/**
 * Helper function to identify users on the client
 */
export function identifyClientUser(
  distinctId: string,
  properties?: Record<string, any>
) {
  posthog.identify(distinctId, {
    ...properties,
    tracking_source: 'client-side',
  })
}

/**
 * Helper function to capture pageviews with consistent properties
 */
export function capturePageview(properties?: Record<string, any>) {
  posthog.capture('$pageview', {
    ...properties,
    tracking_source: 'client-side',
  })
}

/**
 * Direct access to posthog instance if needed
 */
export { posthog }
