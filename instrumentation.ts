export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side instrumentation (if needed)
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation (if needed)
  }
}

// Client-side instrumentation is loaded via instrumentation-client.ts
