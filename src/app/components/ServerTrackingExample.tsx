'use client'

import { useState } from 'react'
import { trackFormSubmission, trackServerEvent } from '@/app/actions/trackingActions'

export default function ServerTrackingExample() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Submitting...')

    // Generate a user ID (in a real app, this would come from your auth system)
    const userId = `user_${Date.now()}`

    // Track form submission using server action
    const result = await trackFormSubmission(userId, {
      formName: 'newsletter_signup',
      email,
    })

    if (result.success) {
      setStatus('✅ Form submitted and tracked server-side!')
      setEmail('')
    } else {
      setStatus('❌ Error tracking event')
    }

    setTimeout(() => setStatus(''), 3000)
  }

  const handleServerEventClick = async () => {
    const userId = `user_${Date.now()}`
    
    const result = await trackServerEvent(userId, 'server_button_clicked', {
      button_name: 'Test Server Tracking',
      page: 'example',
    })

    if (result.success) {
      setStatus('✅ Server event tracked!')
    } else {
      setStatus('❌ Error tracking event')
    }

    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Server-Side Tracking Example
      </h2>
      
      {/* Form Example */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email (tracked server-side)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4 text-gray-900"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          Submit Form (Server Action)
        </button>
      </form>

      {/* Button Example */}
      <button
        onClick={handleServerEventClick}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold mb-4"
      >
        Track Server Event
      </button>

      {/* Status Message */}
      {status && (
        <div className="p-3 bg-gray-100 rounded-lg text-center text-sm text-gray-700">
          {status}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>💡 How it works:</strong> These events are tracked on the server using Next.js Server Actions. 
          Check your PostHog dashboard for events like <code className="bg-blue-100 px-1 rounded">form_submitted_server</code> and <code className="bg-blue-100 px-1 rounded">server_button_clicked</code>.
        </p>
      </div>
    </div>
  )
}
