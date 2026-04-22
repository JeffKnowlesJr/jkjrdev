'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function UnauthorizedPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-midnight px-4">
      <div className="card p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-rose/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold text-cloud mb-3">
          Unauthorized Access
        </h1>
        <p className="text-mist mb-8">
          You do not have permission to access this page. This area is
          restricted to administrators only.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Go to Homepage
          </button>
          {isAuthenticated && (
            <button
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
