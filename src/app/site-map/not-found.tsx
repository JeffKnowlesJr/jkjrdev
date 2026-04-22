import Link from 'next/link'

export default function SitemapNotFound() {
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
      <h1 className='font-display text-4xl font-bold text-cloud mb-4'>
        Page Not Found
      </h1>
      <p className='text-mist mb-6 max-w-md'>
        The sitemap page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href='/site-map'
        className='text-electric hover:text-volt transition-colors inline-flex items-center gap-2'
      >
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
        </svg>
        Back to Sitemap
      </Link>
    </div>
  )
}
