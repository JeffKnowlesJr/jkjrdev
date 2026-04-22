import { ReactNode } from 'react'
import BlogHeader from './BlogHeader'
import ImageSourceToggle from './ImageSourceToggle'

interface BlogLayoutProps {
  children: ReactNode
  showHeader?: boolean
}

export default function BlogLayout({
  children,
  showHeader = false
}: BlogLayoutProps) {
  return (
    <div className="w-full">
      {showHeader && <BlogHeader />}
      <main>{children}</main>

      {process.env.NODE_ENV === 'development' && <ImageSourceToggle />}
    </div>
  )
}
