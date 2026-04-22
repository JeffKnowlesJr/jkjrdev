export default function ProjectsLoading() {
  return (
    <main className='w-full py-4 md:py-8 bg-midnight'>
      <div className='container-custom px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <div className='h-12 w-48 bg-steel/20 rounded-lg animate-pulse mx-auto mb-4' />
          <div className='h-8 w-80 bg-steel/20 rounded-lg animate-pulse mx-auto' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='card p-0 overflow-hidden'>
              <div className='h-48 w-full bg-steel/20 animate-pulse' />
              <div className='p-6 sm:p-8'>
                <div className='h-7 w-3/4 bg-steel/20 rounded-lg mb-3 animate-pulse' />
                <div className='h-4 w-full bg-steel/20 rounded-lg mb-2 animate-pulse' />
                <div className='h-4 w-5/6 bg-steel/20 rounded-lg mb-6 animate-pulse' />
                <div className='flex flex-wrap gap-2'>
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className='h-6 w-16 bg-steel/20 rounded-full animate-pulse' />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
