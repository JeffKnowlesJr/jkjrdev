import React from 'react'
import Link from 'next/link'
import { getContentList } from '@/utils/content-loader'
import type { Project } from '@/utils/content-loader'

export default async function ProjectSidebar() {
  const projects = await getContentList<Project>('projects')

  // Categories: unique projectType from all projects (e.g. Client Work, Product), sorted
  const projectTypes = new Set<string>()
  projects.forEach((p) => {
    const t = (p.projectType || '').trim()
    if (t) projectTypes.add(t)
  })
  const categories = Array.from(projectTypes).sort((a, b) => a.localeCompare(b))

  // Technologies: unique techStack values from all projects, sorted
  const techSet = new Set<string>()
  projects.forEach((p) => {
    const stack = Array.isArray(p.techStack) ? p.techStack : []
    stack.forEach((t: string) => {
      const s = String(t).trim()
      if (s) techSet.add(s)
    })
  })
  const technologies = Array.from(techSet).sort((a, b) => a.localeCompare(b))

  return (
    <aside className="space-y-6">
      <div className="card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-cloud mb-5 pb-3 border-b border-steel/30">
          Categories
        </h2>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/projects?category=${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`}
                className="text-mist hover:text-electric transition-colors flex items-center text-sm"
              >
                <span className="mr-2">•</span>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-cloud mb-5 pb-3 border-b border-steel/30">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Link
              key={tech}
              href={`/projects?tech=${encodeURIComponent(tech.toLowerCase())}`}
              className="tag tag-electric text-xs"
            >
              {tech}
            </Link>
          ))}
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-cloud mb-5 pb-3 border-b border-steel/30">
          GitHub
        </h2>
        <p className="text-mist text-sm mb-4">
          Open-source projects and contributions on GitHub.
        </p>
        <a
          href="https://github.com/jeffknowlesjr"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
        >
          <svg
            className="mr-2 -ml-1 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
          View GitHub Profile
        </a>
      </div>
    </aside>
  )
}
