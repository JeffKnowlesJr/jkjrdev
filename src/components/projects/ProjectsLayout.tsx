import { ReactNode } from 'react'
import ProjectSidebar from './ProjectSidebar'

interface ProjectsLayoutProps {
  children: ReactNode
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <div className="container-custom px-4 sm:px-6 lg:px-8 py-4 md:py-8 bg-midnight">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        <aside className="lg:w-1/4 order-2 lg:order-1">
          <div className="sticky top-24">
            <ProjectSidebar />
          </div>
        </aside>
        <main className="lg:w-3/4 order-1 lg:order-2">{children}</main>
      </div>
    </div>
  )
}
