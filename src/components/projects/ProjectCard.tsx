'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  slug: string
}

function ProjectImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-deep/80 text-steel gap-3">
      <svg
        className="w-12 h-12 opacity-35"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <span className="text-xs font-mono tracking-widest uppercase opacity-30">Confidential</span>
    </div>
  )
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  technologies,
  github,
  slug
}: ProjectCardProps) {
  const [imgError, setImgError] = useState(false)

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (github) window.open(github, '_blank', 'noopener,noreferrer')
  }

  const showImage = image && !imgError

  return (
    <Link href={`/projects/${slug}`} className="group block h-full">
      <div className="card p-0 overflow-hidden h-full flex flex-col hover:border-electric/30 transition-colors">
        <article key={id} className="h-full flex flex-col overflow-hidden">
          <div className="aspect-[16/9] relative overflow-hidden bg-slate/50">
            {showImage ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <ProjectImagePlaceholder />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="p-6 sm:p-8 flex-grow flex flex-col">
            <h2 className="font-display text-lg sm:text-xl font-bold text-cloud mb-2 group-hover:text-electric transition-colors line-clamp-2">
              {title}
            </h2>
            <p className="text-mist text-sm sm:text-base mb-4 flex-grow line-clamp-3">
              {description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 mb-3">
              {(technologies || []).slice(0, 4).map((tech) => (
                <span key={tech} className="tag tag-electric">
                  {tech}
                </span>
              ))}
              {(technologies || []).length > 4 && (
                <span className="tag tag-mint">+{(technologies || []).length - 4}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-electric text-sm font-medium group-hover:text-volt transition-colors flex items-center">
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              {github && (
                <button
                  type="button"
                  className="text-mist hover:text-electric transition-colors flex items-center bg-transparent border-0 p-0 cursor-pointer font-inherit text-sm"
                  onClick={handleGitHubClick}
                  aria-label="View on GitHub"
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    </Link>
  )
}
