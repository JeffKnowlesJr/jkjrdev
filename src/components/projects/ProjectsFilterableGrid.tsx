'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ProjectCard from './ProjectCard'

export interface ProjectForGrid {
  id: string
  slug: string
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  projectType: string
}

function normalizeCategory(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-')
}

export default function ProjectsFilterableGrid({
  projects
}: {
  projects: ProjectForGrid[]
}) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')?.toLowerCase() || ''
  const techParam = searchParams.get('tech')?.toLowerCase() || ''

  const filtered = projects.filter((p) => {
    if (categoryParam) {
      const projectTypeSlug = normalizeCategory(p.projectType || '')
      if (projectTypeSlug !== categoryParam) return false
    }
    if (techParam) {
      const hasTech = (p.technologies || []).some(
        (t) => String(t).toLowerCase() === techParam
      )
      if (!hasTech) return false
    }
    return true
  })

  if (filtered.length === 0) {
    return (
      <p className="text-mist">
        No projects match this filter.{' '}
        <Link href="/projects" className="text-electric hover:text-volt underline">
          Clear filters
        </Link>
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filtered.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          image={project.image}
          technologies={project.technologies}
          github={project.github}
          slug={project.slug}
        />
      ))}
    </div>
  )
}
