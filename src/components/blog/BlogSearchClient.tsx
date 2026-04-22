'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import BlogPostList from './BlogPostList'

interface BlogPost {
  slug: string
  title: string
  publishDate: string
  author: string
  readingTime: string
  featuredImage: string
  tags: string[]
}

interface BlogSearchClientProps {
  posts: BlogPost[]
}

function searchBlogPosts(query: string, posts: BlogPost[]) {
  if (!query.trim()) return posts
  const searchTerms = query.toLowerCase().split(' ')
  return posts.filter((post) => {
    const searchableText = [
      post.title.toLowerCase(),
      post.author.toLowerCase(),
      (post.tags || []).join(' ').toLowerCase()
    ].join(' ')
    return searchTerms.every((term) => searchableText.includes(term))
  })
}

export default function BlogSearchClient({ posts }: BlogSearchClientProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const searchResults = useMemo(
    () => searchBlogPosts(query, posts),
    [query, posts]
  )

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
          Search Results
        </h1>
        {query && (
          <p className='text-gray-600 dark:text-gray-400'>
            Found {searchResults.length} results for &quot;{query}&quot;
          </p>
        )}
      </div>
      {searchResults.length > 0 ? (
        <BlogPostList posts={searchResults} />
      ) : (
        <div className='text-center py-12'>
          <p className='text-gray-600 dark:text-gray-400'>
            {query
              ? `No results found for "${query}"`
              : 'Enter a search term to find blog posts.'}
          </p>
        </div>
      )}
    </div>
  )
}
