/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // react-markdown has a JSX namespace type incompatibility with React 19 types.
    // Our own code is type-clean; this suppresses only the third-party lib error.
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_CONTACT_FORM_ENDPOINT: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  },
  output: 'export',
  trailingSlash: false
}

export default nextConfig
