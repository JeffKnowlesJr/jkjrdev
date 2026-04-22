import { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'
import { generateContactMetadata } from '@/utils/metadata'
import { generateBreadcrumbSchema, BREADCRUMBS } from '@/utils/schema'
import NodeMeshBackground from '@/components/backgrounds/NodeMeshBackground'

export const metadata: Metadata = generateContactMetadata()

const breadcrumbJsonLd = generateBreadcrumbSchema(BREADCRUMBS.contact)

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 bg-midnight relative overflow-hidden">
      <NodeMeshBackground
        circleConstraint
        circleCoverViewport
        rotationSpeed={0.0004}
        highlightColor="245, 158, 11"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Hero */}
        <div className="text-center mb-14">
          <span className="tag tag-electric mb-4">Get in Touch</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cloud mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-xl text-mist max-w-2xl mx-auto">
            Whether you have a project in mind, need technical consulting, or
            just want to chat about technology, I&apos;d love to hear from you.
          </p>
        </div>

        {/* 60/40 grid: form left, all sidebar content right */}
        <div className="grid md:grid-cols-[3fr_2fr] gap-8 items-start">

          {/* Left: contact form */}
          <div className="card p-0">
            <div className="p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-cloud mb-6">Send a message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Right: stacked sidebar cards */}
          <div className="space-y-6">

            {/* Quick Contact */}
            <div className="card p-0">
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-cloud mb-5">Quick Contact</h2>
                <div className="space-y-4">
                  <a
                    href="tel:+18042230822"
                    className="flex items-center text-mist hover:text-electric transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (804) 223-0822
                  </a>
                  <a
                    href="mailto:hello@jeffknowlesjr.com"
                    className="flex items-center text-mist hover:text-electric transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    hello@jeffknowlesjr.com
                  </a>
                  <a
                    href="https://calendly.com/hello-jeffknowlesjr/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-mist hover:text-electric transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 201 205" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_contact_calendly)">
                        <path d="M137.269 132.956C130.801 138.695 122.725 145.837 108.08 145.837H99.3222C88.7246 145.837 79.0855 141.985 72.1861 135.003C65.4464 128.181 61.7364 118.843 61.7364 108.707V96.725C61.7364 86.5889 65.4464 77.2516 72.1861 70.4291C79.0855 63.4469 88.7246 59.6007 99.3222 59.6007H108.08C122.742 59.6007 130.801 66.7368 137.269 72.4765C143.985 78.3936 149.778 83.5652 165.228 83.5652C167.584 83.5647 169.936 83.3765 172.263 83.0031L172.21 82.867C171.284 80.5688 170.199 78.3386 168.961 76.1925L158.636 58.3049C153.98 50.2412 147.283 43.5451 139.219 38.8898C131.154 34.2344 122.007 31.7838 112.695 31.7842H92.0382C82.7263 31.7838 73.579 34.2344 65.5145 38.8898C57.4505 43.5451 50.7536 50.2412 46.0973 58.3049L35.7719 76.1925C31.1172 84.257 28.6667 93.4049 28.6667 102.716C28.6667 112.027 31.1172 121.175 35.7719 129.24L46.0973 147.127C50.7536 155.191 57.4505 161.887 65.5145 166.543C73.579 171.198 82.7263 173.649 92.0382 173.648H112.695C122.007 173.649 131.154 171.198 139.219 166.543C147.283 161.887 153.98 155.191 158.636 147.127L168.961 129.269C170.199 127.123 171.284 124.893 172.21 122.595L172.263 122.465C169.938 122.078 167.585 121.881 165.228 121.873C149.778 121.873 143.985 127.015 137.269 132.962" fill="currentColor"/>
                        <path d="M108.08 70.459H99.3223C83.1921 70.459 72.5945 81.9797 72.5945 96.7253V108.708C72.5945 123.453 83.1921 134.974 99.3223 134.974H108.08C131.583 134.974 129.736 111.009 165.228 111.009C168.59 111.005 171.946 111.315 175.251 111.932C176.328 105.835 176.328 99.5969 175.251 93.5004C171.945 94.1152 168.59 94.4241 165.228 94.4235C129.725 94.4235 131.583 70.459 108.08 70.459Z" fill="currentColor"/>
                        <path d="M195.642 120.689C189.598 116.263 182.628 113.266 175.257 111.926C175.257 111.991 175.257 112.044 175.257 112.104C174.623 115.637 173.631 119.096 172.299 122.429C178.387 123.372 184.164 125.751 189.151 129.37C189.151 129.417 189.121 129.476 189.103 129.53C182.685 150.312 169.026 168.102 150.606 179.67C132.186 191.237 110.228 195.814 88.721 192.569C67.2139 189.323 47.5841 178.471 33.3978 161.984C19.2115 145.496 11.4097 124.467 11.4097 102.716C11.4097 80.9652 19.2115 59.9362 33.3978 43.4487C47.5841 26.961 67.2139 16.1089 88.721 12.8635C110.228 9.61807 132.186 14.1948 150.606 25.7622C169.026 37.3296 182.685 55.1203 189.103 75.9025C189.103 75.9557 189.133 76.0149 189.151 76.0622C184.165 79.6812 178.387 82.0587 172.299 82.9971C173.63 86.3344 174.621 89.7977 175.257 93.3344C175.254 93.3894 175.254 93.4451 175.257 93.5001C182.628 92.1622 189.597 89.1675 195.642 84.7427C201.452 80.4409 200.328 75.5829 199.446 72.7072C192.262 49.4061 176.957 29.4555 156.312 16.4807C135.668 3.50592 111.053 -1.63198 86.9417 2.00063C62.8305 5.63324 40.8223 17.7953 24.9167 36.2768C9.011 54.7582 0.263428 78.3326 0.263428 102.716C0.263428 127.099 9.011 150.674 24.9167 169.155C40.8223 187.637 62.8305 199.799 86.9417 203.431C111.053 207.064 135.668 201.926 156.312 188.952C176.957 175.976 192.262 156.026 199.446 132.725C200.328 129.849 201.452 124.991 195.642 120.689Z" fill="currentColor"/>
                        <path d="M172.263 82.9974C169.938 83.3837 167.585 83.5814 165.228 83.5891C149.778 83.5891 143.985 78.4471 137.275 72.5003C130.802 66.7607 122.742 59.6187 108.08 59.6187H99.3224C88.7188 59.6187 79.0857 63.4707 72.1863 70.453C65.4466 77.2755 61.7366 86.6127 61.7366 96.7488V108.731C61.7366 118.867 65.4466 128.204 72.1863 135.027C79.0857 142.009 88.7188 145.855 99.3224 145.855H108.08C122.742 145.855 130.802 138.719 137.275 132.98C143.985 127.062 149.778 121.891 165.228 121.891C167.584 121.891 169.937 122.08 172.263 122.453C173.599 119.121 174.59 115.661 175.222 112.128C175.225 112.068 175.225 112.009 175.222 111.95C171.916 111.337 168.56 111.03 165.198 111.033C129.695 111.033 131.553 135.003 108.05 135.003H99.2928C83.1626 135.003 72.565 123.477 72.565 108.731V96.7252C72.565 81.9796 83.1626 70.4589 99.2928 70.4589H108.05C131.553 70.4589 129.707 94.4175 165.198 94.4175C168.561 94.4234 171.916 94.1163 175.222 93.5003C175.222 93.4471 175.222 93.3938 175.222 93.3346C174.586 89.7979 173.595 86.3346 172.263 82.9974Z" fill="currentColor" opacity="0.6"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_contact_calendly">
                          <rect width="200" height="204.734" fill="none" transform="translate(0.239502 0.275391)"/>
                        </clipPath>
                      </defs>
                    </svg>
                    Calendly
                  </a>
                </div>
              </div>
            </div>

            {/* Find Me Online */}
            <div className="card p-0">
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-cloud mb-5">Find Me Online</h2>
                <div className="grid grid-cols-2 gap-3">
                  <a href="https://linkedin.com/in/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="flex items-center text-mist hover:text-electric transition-colors">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a href="https://github.com/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="flex items-center text-mist hover:text-electric transition-colors">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  <a href="https://www.facebook.com/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="flex items-center text-mist hover:text-electric transition-colors">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </a>
                  <a href="https://www.behance.net/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="flex items-center text-mist hover:text-electric transition-colors">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                    </svg>
                    Behance
                  </a>
                  <a href="https://share.google/9WQ8rvyJpMbn6kSGu" target="_blank" rel="noopener noreferrer" className="flex items-center text-mist hover:text-electric transition-colors col-span-2">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    Google
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="card p-0">
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-cloud mb-5">Services</h2>
                <ul className="space-y-3">
                  {[
                    { slug: 'web-development', label: 'Web Development', desc: 'Custom sites and web apps.' },
                    { slug: 'wordpress-development', label: 'WordPress Development', desc: 'Themes, plugins, and migrations.' },
                    { slug: 'seo', label: 'SEO', desc: 'On-page and technical optimization.' },
                    { slug: 'analytics', label: 'Analytics', desc: 'GA4 implementation and reporting.' },
                    { slug: 'hosting-maintenance', label: 'Hosting & Maintenance', desc: 'Reliable hosting and site care.' },
                    { slug: 'consulting-training', label: 'Consulting & Training', desc: 'Architecture guidance.' },
                  ].map(({ slug, label, desc }) => (
                    <li key={slug} className="flex gap-2">
                      <span className="text-electric mt-0.5 flex-shrink-0 text-sm">✓</span>
                      <div>
                        <Link href={`/services/${slug}`} className="font-display font-semibold text-cloud hover:text-electric transition-colors text-sm">
                          {label}
                        </Link>
                        <p className="text-mist text-xs mt-0.5">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
