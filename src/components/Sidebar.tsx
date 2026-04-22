'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export interface RecentPost {
  slug: string
  title: string
  publishDate: string
}

export interface SidebarProps {
  recentPosts?: RecentPost[]
  categories?: Record<string, number>
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function BehanceIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.739 1.896 1.867 1.896.709 0 1.188-.355 1.368-.927h3.521zm-5.202-4.083c-.065-.877-.537-1.473-1.414-1.473-.901 0-1.437.573-1.527 1.473h2.941zM8.177 7.8c1.737 0 3.03.847 3.03 2.457 0 1.002-.53 1.69-1.405 2.015 1.148.32 1.754 1.11 1.754 2.257 0 1.854-1.458 2.871-3.515 2.871H1V7.8h7.177zM4.073 10.97h2.81c.7 0 1.197-.332 1.197-.981 0-.662-.497-.994-1.197-.994h-2.81v1.975zm0 4.357h3.035c.795 0 1.327-.368 1.327-1.107 0-.714-.532-1.082-1.327-1.082H4.073v2.189z" />
    </svg>
  )
}

export function Sidebar({
  recentPosts: initialRecentPosts = [],
  categories: initialCategories = {}
}: SidebarProps = {}) {
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>(initialRecentPosts)
  const [categories, setCategories] = useState<Record<string, number>>(initialCategories)
  const [loading, setLoading] = useState(initialRecentPosts.length === 0 && Object.keys(initialCategories).length === 0)

  useEffect(() => {
    if (initialRecentPosts.length || Object.keys(initialCategories).length) {
      setRecentPosts(initialRecentPosts)
      setCategories(initialCategories)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [initialRecentPosts, initialCategories])

  return (
    <aside className="w-full">
      <div className="card p-6 sm:p-8 mb-6">
        <h2 className="font-display text-xl font-bold text-cloud mb-4">About</h2>
        <h3 className="font-display font-semibold text-cloud text-lg mb-2">Jeff Knowles Jr</h3>
        <p className="text-sm text-mist mb-4">
          Analytics Engineer & Cloud Architect. Helping businesses with data-driven strategy, SEO, and conversion-focused content.
        </p>
        <Link href="/contact" className="text-electric hover:text-volt text-sm font-medium">
          Get in touch →
        </Link>
      </div>

      <div className="card p-6 sm:p-8 mb-6">
        <h2 className="font-display text-xl font-bold text-cloud mb-4">Recent Posts</h2>
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-slate/50 rounded w-3/4" />
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-mist hover:text-electric transition-colors text-sm"
                >
                  {post.title}
                </Link>
                <span className="text-xs text-steel">
                  {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <Link href="/blog" className="text-electric hover:text-volt text-sm font-medium">
            View all posts →
          </Link>
        </div>
      </div>

      <div className="card p-6 sm:p-8 mb-6">
        <h2 className="font-display text-xl font-bold text-cloud mb-4">Topics</h2>
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-slate/50 rounded w-3/4" />
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {Object.entries(categories).map(([name, count]) => (
              <li key={name}>
                <Link
                  href={`/blog?tag=${encodeURIComponent(name)}`}
                  className="flex items-center justify-between text-mist hover:text-electric transition-colors text-sm"
                >
                  <span>{name}</span>
                  <span className="tag tag-electric">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-cloud mb-4">Connect</h2>
        <div className="flex gap-4">
          <a href="https://linkedin.com/in/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="text-mist hover:text-electric transition-colors" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://www.facebook.com/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="text-mist hover:text-electric transition-colors" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://github.com/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="text-mist hover:text-electric transition-colors" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="https://www.behance.net/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="text-mist hover:text-electric transition-colors" aria-label="Behance">
            <BehanceIcon />
          </a>
        </div>
      </div>
    </aside>
  )
}
