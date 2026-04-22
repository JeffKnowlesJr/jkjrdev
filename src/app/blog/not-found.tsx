import Link from 'next/link'

export default function BlogNotFound() {
  return (
    <div className='min-h-[50vh] flex flex-col items-center justify-center text-center px-4'>
      <h1 className='font-display text-4xl font-bold text-cloud mb-4'>
        Page Not Found
      </h1>
      <p className='text-xl text-mist mb-8'>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href='/blog'
        className='btn-primary'
      >
        Return to Blog
      </Link>
    </div>
  )
}
