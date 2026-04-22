export default function BlogPostLoading() {
  return (
    <div className='w-full py-4 md:py-8 bg-midnight'>
      <div className='container-custom px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
          <main className='w-full md:w-2/3 lg:w-3/4 order-1'>
            <div className='card p-0 overflow-hidden'>
              <header className='p-6 sm:p-8'>
                <div className='h-8 w-3/4 bg-steel/20 rounded-lg mb-4 animate-pulse' />
                <div className='flex flex-wrap items-center gap-4 mb-6'>
                  <div className='h-4 w-32 bg-steel/20 rounded-lg animate-pulse' />
                  <div className='h-4 w-24 bg-steel/20 rounded-lg animate-pulse' />
                  <div className='h-4 w-32 bg-steel/20 rounded-lg animate-pulse' />
                </div>
                <div className='relative w-full aspect-video mb-6 rounded-xl overflow-hidden bg-steel/20 animate-pulse' />
                <div className='flex flex-wrap gap-2'>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className='h-6 w-20 bg-steel/20 rounded-full animate-pulse' />
                  ))}
                </div>
              </header>
              <div className='px-6 sm:px-8 pb-8 space-y-4'>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className='space-y-3'>
                    <div className='h-5 w-3/4 bg-steel/20 rounded-lg animate-pulse' />
                    <div className='h-4 w-full bg-steel/20 rounded-lg animate-pulse' />
                    <div className='h-4 w-5/6 bg-steel/20 rounded-lg animate-pulse' />
                  </div>
                ))}
              </div>
            </div>
          </main>
          <aside className='w-full md:w-1/3 lg:w-1/4 order-2'>
            <div className='sticky top-24 space-y-8'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='card p-6 sm:p-8'>
                  <div className='h-6 w-32 bg-steel/20 rounded-lg mb-5 animate-pulse' />
                  <div className='space-y-4'>
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
    </div>
  )
}
