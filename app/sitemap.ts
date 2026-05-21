import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ersurer.com'

  const services = [
    'saas-mvp-development',
    'ai-automation',
    'business-website',
    'admin-panel-dashboard',
    'product-customization',
    'website-modernization'
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projectRoutes = ['crm-platform', 'admin-panel-system', 'qr-menu-system'].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogRoutes = [
    'nextjs-vercel-saas-mvp-yayina-cikis',
    'ai-otomasyon-isletme-surecleri',
    'isletme-web-sitesi-nextjs-seo',
    'admin-panel-dashboard-veri-takibi',
    'startup-mvp-gelistirme-kapsam-planlama',
    'aspnet-core-enterprise-api-development',
    'clean-architecture-dotnet',
    'rest-api-security-best-practices',
    'scalable-backend-architecture',
    'microservices-vs-modular-monolith'
  ].map((slug, index) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: index < 5 ? 0.8 : 0.55,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...services,
    ...projectRoutes,
    ...blogRoutes
  ]
}
