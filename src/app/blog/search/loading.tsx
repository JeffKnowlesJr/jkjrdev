export default function BlogSearchLoading() {
  return (
    <div className='w-full py-4 md:py-8 bg-midnight'>
      <div className='container-custom px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
          <main className='w-full md:w-2/3 lg:w-3/4 order-1'>
            <div className='space-y-8'>
              <div className='text-center'>
                <div className='h-8 w-48 bg-steel/20 rounded-lg mx-auto mb-4 animate-pulse' />
                <div className='h-4 w-64 bg-steel/20 rounded-lg mx-auto animate-pulse' />
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='card p-0 overflow-hidden'>
                  <div className='h-48 md:h-64 w-full bg-steel/20 animate-pulse' />
                  <div className='p-6 sm:p-8'>
                    <div className='h-8 w-3/4 bg-steel/20 rounded-lg mb-4 animate-pulse' />
                    <div className='h-4 w-1/2 bg-steel/20 rounded-lg mb-6 animate-pulse' />
                    <div className='flex flex-wrap gap-2'>
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className='h-6 w-16 bg-steel/20 rounded-full animate-pulse' />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
