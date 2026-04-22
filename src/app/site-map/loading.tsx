export default function SitemapLoading() {
  return (
    <main className='section bg-midnight'>
      <div className='container-custom px-4 sm:px-6 lg:px-8'>
        <div className='h-12 w-48 bg-steel/20 rounded-lg animate-pulse mb-4 mx-auto' />
        <div className='h-5 w-80 bg-steel/20 rounded-lg animate-pulse mb-12 mx-auto' />

        <div className='space-y-8'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='card p-6 sm:p-8'>
              <div className='h-7 w-40 bg-steel/20 rounded-lg animate-pulse mb-6' />
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {[...Array(3)].map((_, j) => (
                  <div key={j} className='p-4 bg-slate/40 border border-steel/20 rounded-lg'>
                    <div className='h-5 w-28 bg-steel/20 rounded animate-pulse mb-2' />
                    <div className='h-4 w-40 bg-steel/20 rounded animate-pulse' />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-12 pt-8 border-t border-steel/20'>
          <div className='h-4 w-64 bg-steel/20 rounded animate-pulse mx-auto' />
        </div>
      </div>
    </main>
  )
}
