/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'unqwkhmdzjnmfdapgcxg.supabase.co',
          },
        ],
      },
}

export default nextConfig
