import { Sidebar } from '@/components/Sidebar'
import { getContentList } from '@/utils/content-loader'
import type { BlogPost } from '@/utils/content-loader'

const RECENT_POSTS_COUNT = 5

export default async function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  let recentPosts: { slug: string; title: string; publishDate: string }[] = []
  let categories: Record<string, number> = {}

  try {
    const posts = await getContentList<BlogPost>('blog')
    const sorted = [...posts].sort((a, b) => {
      const dateA = new Date(a.datePublished || a.publishedAt || '').getTime()
      const dateB = new Date(b.datePublished || b.publishedAt || '').getTime()
      return dateB - dateA
    })
    recentPosts = sorted.slice(0, RECENT_POSTS_COUNT).map((p) => ({
      slug: p.slug,
      title: p.title,
      publishDate: p.datePublished || p.publishedAt || ''
    }))
    posts.forEach((p) => {
      ;(p.tags || []).forEach((tag: string) => {
        categories[tag] = (categories[tag] || 0) + 1
      })
    })
  } catch (e) {
    console.error('Error loading blog content for sidebar:', e)
  }

  return (
    <div className="w-full py-4 md:py-8 bg-midnight">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-2/3 lg:w-3/4">{children}</div>
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Sidebar recentPosts={recentPosts} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}
