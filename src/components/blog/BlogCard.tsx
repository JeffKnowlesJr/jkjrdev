'use client'

import Link from 'next/link'
import BlogImage from '@/components/common/BlogImage'

interface BlogCardProps {
  id?: string
  title: string
  excerpt: string
  image: string
  author: string
  publishDate: string
  readingTime: string | number
  tags: string[]
  slug: string
}

export default function BlogCard({
  title,
  excerpt,
  image,
  author,
  publishDate,
  readingTime,
  tags,
  slug
}: BlogCardProps) {
  const formattedReadingTime =
    typeof readingTime === 'number' ? `${readingTime} min read` : readingTime

  const formatDate = (dateStr: string) => {
    if (!dateStr) return { fullDate: 'No date available', shortDate: 'No date' }
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return { fullDate: 'No date available', shortDate: 'No date' }
      return {
        fullDate: d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        shortDate: d.toLocaleDateString('en-US', { year: '2-digit', month: 'short', day: 'numeric' })
      }
    } catch {
      return { fullDate: 'No date available', shortDate: 'No date' }
    }
  }

  const { fullDate, shortDate } = formatDate(publishDate)
  const imageUrl = image || '/images/blog/default-post.jpg'

  return (
    <Link
      href={`/blog/${slug}`}
      className="card group p-0 overflow-hidden h-full flex flex-col hover:border-electric/30 transition-colors"
    >
      <article className="h-full flex flex-col overflow-hidden">
        <div className="aspect-[16/9] relative overflow-hidden">
          <BlogImage
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2.5 py-1 rounded-full bg-slate/80 backdrop-blur-sm text-xs font-mono text-volt">
            {formattedReadingTime}
          </div>
        </div>
        <div className="p-6 sm:p-8 flex-grow flex flex-col">
          <h2 className="font-display text-lg sm:text-xl font-bold text-cloud mb-2 group-hover:text-electric transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="text-mist text-sm sm:text-base mb-4 flex-grow line-clamp-3">
            {excerpt}
          </p>
          <div className="mt-auto flex flex-wrap items-center text-xs sm:text-sm text-mist mb-3">
            <span className="truncate max-w-[120px] sm:max-w-[150px]">{author}</span>
            <span className="mx-1 sm:mx-2">·</span>
            <span className="hidden sm:inline">{fullDate}</span>
            <span className="inline sm:hidden">{shortDate}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(tags || []).slice(0, 3).map((tag) => (
              <span key={tag} className="tag tag-electric">
                {tag}
              </span>
            ))}
            {(tags || []).length > 3 && (
              <span className="tag tag-mint">+{(tags || []).length - 3}</span>
            )}
          </div>
          <div className="mt-4 text-electric text-sm font-medium group-hover:text-volt transition-colors flex items-center">
            <span className="mr-1">Read more</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
