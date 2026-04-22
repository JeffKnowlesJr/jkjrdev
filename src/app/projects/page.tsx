import { Metadata } from 'next'
import { Suspense } from 'react'
import ProjectsLayout from '@/components/projects/ProjectsLayout'
import ProjectsFilterableGrid from '@/components/projects/ProjectsFilterableGrid'
import { generateProjectsIndexMetadata } from '@/utils/metadata'
import { getContentList } from '@/utils/content-loader'
import type { Project } from '@/utils/content-loader'
import { generateBreadcrumbSchema, BREADCRUMBS } from '@/utils/schema'

export const metadata: Metadata = generateProjectsIndexMetadata()

const breadcrumbJsonLd = generateBreadcrumbSchema(BREADCRUMBS.projects)

async function getProjects() {
  const projects = await getContentList<Project>('projects')
  return projects
    .sort((a, b) => {
      const aOrder = (a as { sortOrder?: number }).sortOrder ?? 99
      const bOrder = (b as { sortOrder?: number }).sortOrder ?? 99
      return aOrder - bOrder
    })
    .map((p) => ({
      id: p.slug,
      title: p.title,
      description: p.excerpt,
      image: p.featuredImage || p.thumbnailImage || '',
      technologies: Array.isArray(p.techStack) ? p.techStack : p.tags ?? [],
      link: p.liveUrl ?? '',
      github: p.githubUrl ?? '',
      slug: p.slug,
      projectType: p.projectType ?? ''
    }))
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <ProjectsLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="w-full">
        <h1 className="font-display text-4xl font-bold text-cloud mb-4">
          Projects
        </h1>
        <p className="text-mist mb-8 max-w-2xl">
          Here are some of the projects I&apos;ve worked on. Each represents a
          unique challenge and solution in web development, cloud architecture,
          and technical implementation.
        </p>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="card p-6 sm:p-8 animate-pulse h-64 rounded-xl"
                />
              ))}
            </div>
          }
        >
          <ProjectsFilterableGrid projects={projects} />
        </Suspense>
      </div>
    </ProjectsLayout>
  )
}
