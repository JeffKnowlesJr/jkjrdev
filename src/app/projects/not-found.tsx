import Link from 'next/link'

export default function ProjectNotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center'>
      <h1 className='font-display text-4xl font-bold text-cloud mb-4'>
        Project Not Found
      </h1>
      <p className='text-xl text-mist mb-8 max-w-md'>
        The project you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Link
        href='/projects'
        className='btn-primary'
      >
        View All Projects
      </Link>
    </div>
  )
}
