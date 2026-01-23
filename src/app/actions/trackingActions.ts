'use server'

import { captureServerEvent, identifyServerUser } from '@/app/lib/posthogServer'

/**
 * Server action to track form submissions
 */
export async function trackFormSubmission(
  userId: string,
  formData: {
    formName: string
    email?: string
    [key: string]: any
  }
) {
  try {
    await captureServerEvent(userId, 'form_submitted_server', {
      form_name: formData.formName,
      email: formData.email,
      timestamp: new Date().toISOString(),
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error tracking form submission:', error)
    return { success: false, error: 'Failed to track event' }
  }
}

/**
 * Server action to track user signup
 */
export async function trackUserSignup(
  userId: string,
  userData: {
    email: string
    name?: string
    plan?: string
  }
) {
  try {
    // Identify the user with their properties
    await identifyServerUser(userId, {
      email: userData.email,
      name: userData.name,
    })
    
    // Track the signup event
    await captureServerEvent(userId, 'user_signed_up_server', {
      plan: userData.plan || 'free',
      signup_method: 'email',
      timestamp: new Date().toISOString(),
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error tracking user signup:', error)
    return { success: false, error: 'Failed to track event' }
  }
}

/**
 * Generic server action to track any event
 */
export async function trackServerEvent(
  userId: string,
  eventName: string,
  properties?: Record<string, any>
) {
  try {
    await captureServerEvent(userId, eventName, properties)
    return { success: true }
  } catch (error) {
    console.error('Error tracking event:', error)
    return { success: false, error: 'Failed to track event' }
  }
}
