import Link from 'next/link'

export default function BlogPostNotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center'>
      <h1 className='font-display text-4xl font-bold text-cloud mb-4'>
        Post Not Found
      </h1>
      <p className='text-xl text-mist mb-8 max-w-md'>
        The blog post you&apos;re looking for doesn&apos;t exist or has been
        moved.
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
