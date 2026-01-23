import { NextRequest, NextResponse } from 'next/server'
import { captureServerEvent } from '@/app/lib/posthogServer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { distinctId, event, properties } = body

    if (!distinctId || !event) {
      return NextResponse.json(
        { error: 'distinctId and event are required' },
        { status: 400 }
      )
    }

    // Capture the event server-side
    await captureServerEvent(distinctId, event, properties)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking event:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}
