'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { submitContactForm, type ContactFormData } from './ContactForm'

export interface MockupProject {
  slug: string
  title: string
  description: string
  image?: string
  technologies: string[]
}

export interface MockupBlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
}

interface HeroBrowserMockupProps {
  projects?: MockupProject[]
  latestPosts?: MockupBlogPost[]
}

const TABS = [
  { label: 'Home',     path: '' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog',     path: '/blog' },
  { label: 'Contact',  path: '/contact' },
]

function HomeView({ onNavigate }: { onNavigate: (tab: number) => void }) {
  return (
    <div className="h-full flex flex-row gap-3">
      {/* Profile + bio — compact left column */}
      <div className="w-[200px] flex-shrink-0 relative z-10 -mr-4 flex flex-col items-start justify-center gap-2.5" style={{ transform: 'translateY(0px)' }}>
        {/* Headshot */}
        <div className="relative flex-shrink-0 self-end" style={{ marginBottom: '-30px', marginRight: '15px', transform: 'translateY(-25px)' }}>
          <div
            className="rounded-full overflow-hidden ring-1 ring-electric/50"
            style={{ width: '58px', height: '58px', boxShadow: '0 0 0 3px rgba(16,185,129,0.15)' }}
          >
            <Image
              src="/images/jeff-profile.jpg"
              alt="Jeff Knowles Jr."
              width={58}
              height={58}
              className="object-cover object-top w-full h-full"
            />
          </div>
          <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-mint rounded-full border-2 border-slate" />
        </div>

        {/* Bio — left-aligned */}
        <div className="flex flex-col items-start text-left gap-1.5" style={{ marginTop: '-50px' }}>
          <p className="text-[13px] font-bold text-cloud tracking-wide leading-tight">Jeff Knowles Jr.</p>
          <p className="text-[10px] font-medium gradient-text">Full Stack Developer</p>
          <div className="flex items-center gap-1.5 justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-mint flex-shrink-0" />
            <span className="text-[9px] text-mint font-mono tracking-wide">Available for projects</span>
          </div>
          <div className="flex gap-1 justify-start flex-wrap mt-0.5" style={{ maxWidth: '148px' }}>
            <span className="text-[8px] px-1.5 py-0.5 bg-electric/20 text-electric rounded-full font-mono border border-electric/20">Webflow</span>
            <span className="text-[8px] px-1.5 py-0.5 bg-volt/20 text-volt rounded-full font-mono border border-volt/20">React</span>
            <span className="text-[8px] px-1.5 py-0.5 bg-mint/20 text-mint rounded-full font-mono border border-mint/20">Cloud</span>
            <span className="text-[8px] px-1.5 py-0.5 bg-electric/20 text-electric rounded-full font-mono border border-electric/20">TypeScript</span>
            <span className="text-[8px] px-1.5 py-0.5 bg-amber/20 text-amber rounded-full font-mono border border-amber/20">GA4</span>
          </div>
          <div className="flex gap-2 justify-start mt-0.5">
            <button
              onClick={() => onNavigate(3)}
              className="h-5 w-14 bg-electric/70 rounded text-[8px] font-mono text-midnight font-semibold flex items-center justify-center hover:bg-electric transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => onNavigate(1)}
              className="h-5 w-14 bg-slate/60 border border-steel/40 rounded text-[8px] font-mono text-mist flex items-center justify-center hover:border-electric/50 hover:text-electric transition-colors"
            >
              Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Night scene panel — wide landscape, southwestern desert */}
      <div className="flex-1 min-w-0 max-w-[60%] rounded-lg bg-coral/8 border border-coral/15 relative overflow-hidden">
        {/* Sky — base coral fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-coral/10" />
        {/* Sky — purple zenith */}
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-purple-900/10 to-transparent" />
        {/* Sky — teal atmospheric mid wash */}
        <div className="absolute top-[25%] left-0 right-0 h-[30%] bg-gradient-to-b from-transparent via-teal-800/8 to-transparent" />
        {/* Sky — amber horizon glow */}
        <div className="absolute bottom-[36%] left-0 right-0 h-[25%] bg-gradient-to-t from-amber/10 to-transparent" />

        {/* Crescent moon — top-right, amber disc carved by offset slate circle */}
        <div className="absolute top-4 right-8 w-5 h-5">
          <div className="w-5 h-5 rounded-full bg-amber/45" />
          <div className="absolute w-4 h-4 rounded-full bg-[#1e2a3a] top-0 -right-1.5" />
        </div>

        {/* Stars — spread across wide sky */}
        <div className="absolute top-2 left-4 w-1 h-1 rounded-full bg-amber/40" />
        <div className="absolute top-5 left-10 w-0.5 h-0.5 rounded-full bg-amber/30" />
        <div className="absolute top-3 left-[22%] w-0.5 h-0.5 rounded-full bg-amber/25" />
        <div className="absolute top-7 left-[35%] w-1 h-1 rounded-full bg-amber/30" />
        <div className="absolute top-2 left-[50%] w-0.5 h-0.5 rounded-full bg-amber/20" />
        <div className="absolute top-6 left-[62%] w-0.5 h-0.5 rounded-full bg-amber/25" />
        <div className="absolute top-3 left-[75%] w-1 h-1 rounded-full bg-amber/20" />
        <div className="absolute top-8 right-14 w-0.5 h-0.5 rounded-full bg-amber/20" />

        {/* Distant mesa — wide flat silhouette mid-scene, left of center */}
        <div className="absolute bottom-[40%] left-[18%] w-[22%] h-[18%] bg-coral/12 rounded-sm" />
        <div className="absolute bottom-[40%] left-[16%] w-[8%] h-[10%] bg-coral/10 rounded-t-sm" />

        {/* Smaller butte — far right side */}
        <div className="absolute bottom-[40%] right-[12%] w-[12%] h-[14%] bg-coral/10 rounded-sm" />

        {/* Ground line */}
        <div className="absolute bottom-[36%] left-0 right-0 h-px bg-coral/30" />

        {/* Desert floor — subtle coral gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[36%] bg-gradient-to-t from-coral/15 via-coral/8 to-transparent" />

        {/* Cactuses — far background (thin, short, barely there) */}
        <div className="absolute bottom-[36%] left-[8%] w-px h-3 bg-coral/12 rounded-t-full" />
        <div className="absolute bottom-[36%] left-[38%] w-px h-4 bg-coral/10 rounded-t-full" />
        <div className="absolute bottom-[36%] right-[25%] w-px h-3 bg-coral/10 rounded-t-full" />

        {/* Cactuses — midground (medium weight) */}
        <div className="absolute bottom-[36%] left-[18%] w-[2px] h-7 bg-coral/22 rounded-t-sm" />
        <div className="absolute bottom-[36%] left-[52%] w-[2px] h-5 bg-coral/20 rounded-t-sm" />
        <div className="absolute bottom-[36%] right-[15%] w-[2px] h-6 bg-coral/18 rounded-t-sm" />

        {/* Cactuses — foreground (boldest, tallest, warmest) */}
        <div className="absolute bottom-[36%] left-3 w-[3px] h-10 bg-coral/35 rounded-t-sm" />
        <div className="absolute bottom-[36%] left-[32%] w-[3px] h-7 bg-coral/30 rounded-t-sm" />
        <div className="absolute bottom-[36%] right-[8%] w-[2px] h-5 bg-coral/28 rounded-t-sm" />

        {/* Rock — far right foreground */}
        <div className="absolute bottom-[36%] right-3 w-[4px] h-1.5 bg-coral/20 rounded-full" />
      </div>
    </div>
  )
}

const PROJECT_COLORS = [
  { border: 'border-mint/20', bar: 'from-mint/70 to-mint/20', pill: 'bg-mint/20 text-mint', cta: 'text-mint/60 hover:text-mint' },
  { border: 'border-electric/20', bar: 'from-electric/70 to-electric/20', pill: 'bg-electric/20 text-electric', cta: 'text-electric/60 hover:text-electric' },
]

function ProjectsView({ projects }: { projects?: MockupProject[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="h-full flex flex-col gap-2">
        <p className="text-[9px] font-mono text-steel uppercase tracking-widest flex-shrink-0">My Work</p>
        <div className="grid grid-cols-2 gap-2 flex-1">
          {PROJECT_COLORS.map((c, i) => (
            <div key={i} className={`rounded-lg bg-midnight/60 border ${c.border} overflow-hidden flex flex-col`}>
              <div className={`h-1.5 w-full bg-gradient-to-r ${c.bar} flex-shrink-0`} />
              <div className="p-2 space-y-1.5 flex-1">
                <div className="h-2 w-3/4 bg-steel/40 rounded" />
                <div className="h-1.5 w-full bg-steel/25 rounded" />
                <div className="h-1.5 w-4/5 bg-steel/20 rounded" />
              </div>
            </div>
          ))}
        </div>
        <a href="/projects" className="text-[8px] font-mono text-steel/60 hover:text-electric transition-colors self-end flex-shrink-0">
          View all →
        </a>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col gap-2">
      <p className="text-[9px] font-mono text-steel uppercase tracking-widest flex-shrink-0">My Work</p>
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {projects.slice(0, 2).map((project, i) => {
          const c = PROJECT_COLORS[i] ?? PROJECT_COLORS[0]
          const desc = project.description?.slice(0, 100) ?? ''
          const techs = project.technologies?.slice(0, 2) ?? []
          return (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`rounded-lg bg-midnight/60 border ${c.border} overflow-hidden flex flex-col hover:brightness-110 transition-all`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${c.bar} flex-shrink-0`} />
              <div className="p-2 flex flex-col gap-1 flex-1 min-h-0">
                <p className="text-[9px] font-semibold text-cloud leading-tight line-clamp-1">{project.title}</p>
                <p className="text-[7.5px] text-steel/80 leading-snug line-clamp-8 flex-1">{desc}{desc.length < (project.description?.length ?? 0) ? '…' : ''}</p>
                <div className="flex gap-1 flex-wrap mt-auto pt-0.5">
                  {techs.map((t) => (
                    <span key={t} className={`text-[7px] px-1 py-0.5 ${c.pill} rounded font-mono`}>{t}</span>
                  ))}
                </div>
                <div className="flex justify-end flex-shrink-0 pt-0.5">
                  <span className={`text-[8px] font-mono ${c.cta} transition-colors`}>View project →</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
      <a href="/projects" className="text-[8px] font-mono text-steel/60 hover:text-electric transition-colors self-end flex-shrink-0">
        View all →
      </a>
    </div>
  )
}

function formatBlogDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

const BLOG_COLORS = [
  { border: 'border-volt/20', bar: 'from-volt/20 via-electric/10', date: 'text-volt/70', cta: 'text-volt/60 hover:text-volt' },
  { border: 'border-coral/20', bar: 'from-coral/20 via-amber/10', date: 'text-coral/70', cta: 'text-coral/60 hover:text-coral' },
]

function BlogView({ latestPosts }: { latestPosts?: MockupBlogPost[] }) {
  const posts = latestPosts && latestPosts.length > 0 ? latestPosts.slice(0, 2) : []
  const hasPosts = posts.length > 0 && posts[0].slug

  if (!hasPosts) {
    return (
      <div className="h-full flex flex-col gap-2">
        <p className="text-[9px] font-mono text-steel uppercase tracking-widest flex-shrink-0">Latest Posts</p>
        <div className="grid grid-cols-2 gap-2 flex-1">
          {BLOG_COLORS.map((c, i) => (
            <div key={i} className={`rounded-lg bg-midnight/60 border ${c.border} overflow-hidden flex flex-col`}>
              <div className={`h-1.5 w-full bg-gradient-to-r ${c.bar} to-transparent flex-shrink-0`} />
              <div className="p-2 space-y-1.5 flex-1">
                <div className="h-2 w-3/4 bg-steel/40 rounded" />
                <div className="h-1.5 w-full bg-steel/25 rounded" />
                <div className="h-1.5 w-4/5 bg-steel/20 rounded" />
              </div>
            </div>
          ))}
        </div>
        <a href="/blog" className="text-[8px] font-mono text-steel/60 hover:text-electric transition-colors self-end flex-shrink-0">
          View all →
        </a>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col gap-2">
      <p className="text-[9px] font-mono text-steel uppercase tracking-widest flex-shrink-0">
        {posts.length > 1 ? 'Latest Posts' : 'Latest Post'}
      </p>
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {posts.map((post, i) => {
          const c = BLOG_COLORS[i] ?? BLOG_COLORS[0]
          const excerpt = post.excerpt ?? ''
          const shortExcerpt = excerpt.slice(0, 300)
          const dateLabel = formatBlogDate(post.date)
          return (
            <a
              key={post.slug}
              href={post.slug ? `/blog/${post.slug}` : '/blog'}
              className={`rounded-lg bg-midnight/60 border ${c.border} overflow-hidden flex flex-col hover:brightness-110 transition-all`}
            >
              <div className={`h-6 bg-gradient-to-br ${c.bar} to-transparent flex-shrink-0 flex items-end px-2 pb-1`}>
                {dateLabel && (
                  <span className={`text-[7px] font-mono ${c.date} uppercase tracking-widest`}>{dateLabel}</span>
                )}
              </div>
              <div className="p-2 flex flex-col gap-1 flex-1 min-h-0">
                <p className="text-[9px] font-semibold text-cloud leading-tight line-clamp-2">{post.title}</p>
                {shortExcerpt ? (
                  <p className="text-[7.5px] text-steel/80 leading-snug line-clamp-6 flex-1 whitespace-pre-line">
                    {shortExcerpt}{shortExcerpt.length < excerpt.length ? '…' : ''}
                  </p>
                ) : (
                  <div className="space-y-1 flex-1">
                    <div className="h-1.5 w-full bg-steel/20 rounded" />
                    <div className="h-1.5 w-3/4 bg-steel/20 rounded" />
                  </div>
                )}
                <div className="flex justify-end flex-shrink-0 mt-auto pt-0.5">
                  <span className={`text-[8px] font-mono ${c.cta} transition-colors`}>Read post →</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
      <a href="/blog" className="text-[8px] font-mono text-steel/60 hover:text-electric transition-colors self-end flex-shrink-0">
        View all →
      </a>
    </div>
  )
}

function ContactView() {
  const [formData, setFormData] = useState<Omit<ContactFormData, 'subject'>>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    try {
      await submitContactForm({ ...formData, subject: 'Hero Quick Message' })
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2 text-center">
        <div className="text-mint text-[10px] font-mono">Message sent!</div>
        <div className="text-[9px] text-steel">{"I'll get back to you soon."}</div>
        <button
          onClick={() => setStatus('idle')}
          className="mt-1 px-3 py-1 rounded border border-steel/30 text-[8px] font-mono text-steel hover:text-cloud transition-colors"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-1.5">
      <p className="text-[9px] font-mono text-steel uppercase tracking-widest flex-shrink-0">Quick Message</p>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="flex flex-col gap-0.5">
          <label className="text-[8px] font-mono text-steel/60 uppercase">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="rounded border border-steel/30 bg-midnight/60 px-2 py-1 text-[9px] text-cloud placeholder:text-steel/40 outline-none focus:border-electric/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-[8px] font-mono text-steel/60 uppercase">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="rounded border border-steel/30 bg-midnight/60 px-2 py-1 text-[9px] text-cloud placeholder:text-steel/40 outline-none focus:border-electric/50 transition-colors"
          />
        </div>
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-h-0">
        <label className="text-[8px] font-mono text-steel/60 uppercase">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Your message..."
          className="rounded border border-steel/30 bg-midnight/60 px-2 py-1 text-[9px] text-cloud placeholder:text-steel/40 outline-none focus:border-electric/50 transition-colors resize-none flex-1 min-h-0"
        />
      </div>
      <div className="flex items-center justify-between flex-shrink-0">
        {status === 'error' && (
          <span className="text-[8px] text-coral font-mono">Send failed — try again</span>
        )}
        <div className="ml-auto">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-4 py-1.5 bg-electric/80 rounded text-[9px] font-mono text-midnight font-bold hover:bg-electric transition-colors disabled:opacity-50"
          >
            {status === 'submitting' ? 'Sending…' : 'Quick Send →'}
          </button>
        </div>
      </div>
    </form>
  )
}

const viewVariants = {
  enter: { opacity: 0, y: 6 },
  center: { opacity: 1, y: 0 },
  exit:  { opacity: 0, y: -6 },
}

export default function HeroBrowserMockup({ projects, latestPosts }: HeroBrowserMockupProps) {
  const [active, setActive] = useState(0)

  function renderActiveView() {
    switch (active) {
      case 0: return <HomeView onNavigate={setActive} />
      case 1: return <ProjectsView projects={projects} />
      case 2: return <BlogView latestPosts={latestPosts} />
      case 3: return <ContactView />
      default: return <HomeView onNavigate={setActive} />
    }
  }

  return (
    <div className="relative hidden lg:block w-full p-4">
      <div className="relative animate-float">
        <div className="bg-slate/90 rounded-2xl border border-steel/50 overflow-hidden shadow-2xl animate-glow">

          {/* URL bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-deep to-slate/80 border-b border-steel/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-coral/90" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber/90" />
              <div className="w-2.5 h-2.5 rounded-full bg-mint/90" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-midnight/60 rounded px-2.5 py-1 text-[11px] font-mono text-mist truncate">
                jkjrdev.com{TABS[active].path}
              </div>
            </div>
          </div>

          {/* Mini nav — click to switch, no auto-cycle */}
          <div className="flex border-b border-steel/20 bg-deep/60">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActive(i)}
                className={`flex-1 text-[10px] font-mono py-1.5 transition-colors relative ${
                  active === i ? 'text-electric' : 'text-steel hover:text-mist'
                }`}
              >
                {tab.label}
                {active === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-electric"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Fixed-height content area — never changes size */}
          <div className="p-4 h-[210px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={viewVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-full"
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-mint/20 border border-mint/30 rounded-lg backdrop-blur-sm">
          <span className="text-mint font-mono text-xs">✓ 99.9% uptime</span>
        </div>
        <div className="absolute -bottom-3 -left-3 px-3 py-1.5 bg-electric/20 border border-electric/30 rounded-lg backdrop-blur-sm">
          <span className="text-electric font-mono text-xs">⚡ Fast & secure</span>
        </div>
      </div>
    </div>
  )
}
