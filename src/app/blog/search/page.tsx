import { Metadata } from 'next'
import BlogLayout from '@/components/blog/BlogLayout'
import BlogSearchClient from '@/components/blog/BlogSearchClient'
import { getContentList } from '@/utils/content-loader'
import type { BlogPost } from '@/utils/content-loader'

export const metadata: Metadata = {
  title: 'Search Blog Posts',
  description:
    'Search articles on web development, cloud architecture, and developer tools by Jeff Knowles Jr.',
  openGraph: {
    title: 'Blog Search | JKJR Digital Development',
    description:
      'Search articles on web development, cloud architecture, and developer tools by Jeff Knowles Jr.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'}/blog/search`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'JKJR Digital Development Blog Search'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jeffknowlesjr',
    creator: '@jeffknowlesjr',
    title: 'Blog Search | JKJR Digital Development',
    description:
      'Search articles on web development, cloud architecture, and developer tools by Jeff Knowles Jr.'
  }
}

export const dynamic = 'force-static'

export default async function BlogSearchPage() {
  const posts = await getContentList<BlogPost>('blog').catch(() => [])
  const postsForClient = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    publishDate: p.datePublished || p.publishedAt || '',
    author: p.author || '',
    readingTime: String(p.readingTime ?? ''),
    featuredImage: p.featuredImage || '',
    tags: p.tags || []
  }))
  return (
    <BlogLayout>
      <BlogSearchClient posts={postsForClient} />
    </BlogLayout>
  )
}
