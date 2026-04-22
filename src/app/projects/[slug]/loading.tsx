export default function ProjectLoading() {
  return (
    <main className='w-full py-4 md:py-8 bg-midnight'>
      <div className='container-custom px-4 sm:px-6 lg:px-8'>
        <div className='h-5 w-32 bg-steel/20 rounded-lg animate-pulse mb-4 md:mb-8' />
        <div className='flex flex-col lg:flex-row gap-6 md:gap-8'>
          <div className='w-full lg:w-3/4 order-1 lg:order-2'>
            <div className='card p-0 overflow-hidden'>
              <div className='h-56 w-full bg-steel/20 animate-pulse' />
              <div className='p-6 sm:p-8'>
                <div className='h-9 w-2/3 bg-steel/20 rounded-lg mb-3 animate-pulse' />
                <div className='h-4 w-1/2 bg-steel/20 rounded-lg mb-6 animate-pulse' />
                <div className='flex flex-wrap gap-2 mb-8'>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className='h-6 w-20 bg-steel/20 rounded-full animate-pulse' />
                  ))}
                </div>
                <div className='space-y-4'>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className='h-4 w-full bg-steel/20 rounded-lg animate-pulse' />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <aside className='w-full lg:w-1/4 order-2 lg:order-1'>
            <div className='sticky top-24 space-y-6'>
              {[...Array(2)].map((_, i) => (
                <div key={i} className='card p-6 sm:p-8'>
                  <div className='h-5 w-24 bg-steel/20 rounded-lg mb-4 animate-pulse' />
                  <div className='space-y-3'>
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className='h-4 w-full bg-steel/20 rounded-lg animate-pulse' />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
