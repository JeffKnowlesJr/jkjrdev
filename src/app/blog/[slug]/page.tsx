import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogPost, getContentBySlug, getContentList } from '@/utils/content-loader'
import { generateBlogPostMetadata } from '@/utils/metadata'
import {
  generateBlogPostSchema,
  generateBreadcrumbSchema,
  blogPostBreadcrumbs
} from '@/utils/schema'
import BlogLayout from '@/components/blog/BlogLayout'
import BlogImage from '@/components/common/BlogImage'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const posts = await getContentList<BlogPost>('blog')
  return posts.map((p) => ({ slug: p.slug }))
}

// Generate metadata for the blog post
export async function generateMetadata({
  params
}: {
  params: Params
}): Promise<Metadata> {
  const resolvedParams = await params

  // Use the local content for all environments
  const post = await getContentBySlug<BlogPost>('blog', resolvedParams.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return generateBlogPostMetadata(post)
}

// Define markdown component types
type ComponentProps = {
  children?: React.ReactNode
  [key: string]: unknown
}

// Blog post page component
export default async function BlogPostPage({ params }: { params: Params }) {
  // First await the params object itself before accessing its properties
  const resolvedParams = await params

  // Get post from local content for all environments
  const post = await getContentBySlug<BlogPost>('blog', resolvedParams.slug)

  // If not found, show 404
  if (!post) {
    notFound()
  }

  // Code block rendering for markdown
  const codeBlock = ({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean
    className?: string
    children?: React.ReactNode
  }) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <div className='relative group'>
        <pre className={`${className} overflow-x-auto p-4 rounded-lg`}>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    ) : (
      <code className={`${className} px-1 py-0.5 rounded text-sm`} {...props}>
        {children}
      </code>
    )
  }

  const postUrl = `${BASE_URL}/blog/${post.slug}`
  const blogPostSchema = generateBlogPostSchema(post, postUrl)
  const breadcrumbSchema = generateBreadcrumbSchema(blogPostBreadcrumbs(post.title, post.slug))

  return (
    <BlogLayout showHeader={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogPostSchema, breadcrumbSchema]) }}
      />
      <div className='w-full'>
        <Link
          href='/blog'
          className='inline-flex items-center text-electric hover:text-volt transition-colors mb-4 md:mb-8'
        >
          <svg
            className='mr-2 w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back to Blog
        </Link>

        <article className='card p-0 overflow-hidden'>
          <div className='p-6 sm:p-8'>
            <header className='mb-4 md:mb-8'>
              <h1 className='font-display text-2xl sm:text-3xl md:text-4xl font-bold text-cloud mb-3 md:mb-4'>
                {post.title}
              </h1>
              <div className='flex flex-wrap items-center gap-4 text-mist mb-6'>
                <div className='flex items-center'>
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                  <span>{post.author}</span>
                </div>
                <div className='flex items-center'>
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  <time dateTime={post.datePublished}>
                    {post.datePublished
                      ? new Date(post.datePublished).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }
                        )
                      : 'No date available'}
                  </time>
                </div>
                <div className='flex items-center'>
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <div className='flex flex-wrap gap-2 mt-4 mb-6'>
                {(post.tags || []).map((tag: string) => (
                  <span key={tag} className='tag tag-electric'>
                    {tag}
                  </span>
                ))}
              </div>

              {post.featuredImage && (
                <div className='w-full max-h-[500px] relative mb-6 rounded-lg overflow-hidden shadow-md'>
                  <BlogImage
                    src={
                      post.featuredImage ||
                      post.image ||
                      '/images/fallback-image.webp'
                    }
                    alt={post.title}
                    className='object-contain w-full h-full'
                  />
                </div>
              )}
            </header>

            <div className='prose prose-invert max-w-none prose-p:text-base sm:prose-p:text-lg prose-li:text-base sm:prose-li:text-lg prose-p:leading-relaxed prose-li:leading-relaxed prose-headings:text-cloud prose-p:text-mist'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: codeBlock,
                  a: ({ href, children, ...props }: ComponentProps) => (
                    <a
                      href={href as string}
                      className='text-electric hover:text-volt'
                      target='_blank'
                      rel='noopener noreferrer'
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                  h2: ({ children, ...props }: ComponentProps) => (
                    <h2 className='text-2xl font-bold mt-8 mb-4' {...props}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }: ComponentProps) => (
                    <h3 className='text-xl font-bold mt-6 mb-3' {...props}>
                      {children}
                    </h3>
                  ),
                  ul: ({
                    children,
                    ordered: _ordered,
                    ...props
                  }: ComponentProps & { ordered?: boolean }) => (
                    <ul className='list-disc pl-6 my-4' {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({
                    ordered: _orderedOl,
                    children,
                    ...props
                  }: ComponentProps & { ordered?: boolean }) => (
                    <ol className='list-decimal pl-6 my-4' {...props}>
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children, ...props }: ComponentProps) => (
                    <blockquote
                      className='border-l-4 border-electric pl-4 italic my-4 text-mist'
                      {...props}
                    >
                      {children}
                    </blockquote>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        <div className='mt-8 card p-6 sm:p-8'>
          <h3 className='font-display text-xl font-bold text-cloud mb-4'>Share this post</h3>
          <div className='flex gap-4'>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'}/blog/${post.slug}`
              )}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-electric hover:text-volt transition-colors'
              aria-label='Share on Facebook'
            >
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'}/blog/${post.slug}`
              )}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-electric hover:text-volt transition-colors'
              aria-label='Share on LinkedIn'
            >
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </BlogLayout>
  )
}
