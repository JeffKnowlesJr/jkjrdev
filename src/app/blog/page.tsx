import { Metadata } from 'next'
import { BlogPost, getContentList } from '@/utils/content-loader'
import BlogCard from '@/components/blog/BlogCard'
import BlogLayout from '@/components/blog/BlogLayout'
import { generateBlogIndexMetadata } from '@/utils/metadata'
import { generateBreadcrumbSchema, BREADCRUMBS } from '@/utils/schema'

export const metadata: Metadata = generateBlogIndexMetadata()

const breadcrumbJsonLd = generateBreadcrumbSchema(BREADCRUMBS.blog)

async function getBlogPosts(): Promise<{
  posts: BlogPost[]
  error: string | null
}> {
  try {
    const posts = await getContentList<BlogPost>('blog')
    if (posts?.length > 0) {
      return {
        posts: [...posts].sort((a, b) => {
          const dateA = new Date(a.publishedAt || a.datePublished || a.publishDate || '').getTime()
          const dateB = new Date(b.publishedAt || b.datePublished || b.publishDate || '').getTime()
          return dateB - dateA
        }),
        error: null
      }
    }
    return { posts: [], error: 'No blog posts found in content directory. Add markdown files to the content/blog directory.' }
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return {
      posts: [],
      error: error instanceof Error ? `Error loading blog posts: ${error.message}` : 'Unknown error loading blog posts'
    }
  }
}

export default async function BlogPage() {
  const { posts, error } = await getBlogPosts()

  return (
    <BlogLayout showHeader={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="w-full">
        <h1 className="font-display text-4xl font-bold text-cloud mb-4">
          Blog
        </h1>
        <p className="text-mist mb-8 max-w-2xl">
          Articles on web development, cloud architecture, and technical implementation.
        </p>

        {error && (
          <div className="card p-4 mb-8 border-amber/50 bg-amber/5">
            <p className="text-sm text-amber">{error}</p>
          </div>
        )}

        {posts.length === 0 && !error && (
          <div className="card p-12 text-center">
            <h3 className="font-display text-lg font-semibold text-cloud mb-2">No blog posts yet</h3>
            <p className="text-mist text-sm">Add markdown files to content/blog.</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                id={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                image={
                  post.featuredImage ||
                  post.image ||
                  '/images/blog/default-post.jpg'
                }
                author={post.author}
                publishDate={
                  post.publishedAt || post.datePublished || post.publishDate || ''
                }
                readingTime={post.readingTime}
                tags={post.tags || []}
                slug={post.slug}
              />
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  )
}
