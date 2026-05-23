import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ersurer.com'

  const services = [
    'saas-mvp-gelistirme',
    'ai-otomasyon',
    'nextjs-isletme-web-sitesi',
    'admin-panel-dashboard',
    'vercel-danismanlik',
    'hazir-saas-urunleri',
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
    'saas-mvp-nedir-ilk-surumde-neler-olmali',
    'nextjs-ile-isletme-web-sitesi-neden-daha-hizlidir',
    'ai-otomasyon-ile-hangi-isler-otomatiklesir',
    'vercel-nedir-isletmeler-icin-ne-saglar',
    'admin-panel-gelistirmeden-once-bilmeniz-gerekenler',
    'turizm-sirketleri-icin-operasyon-paneli-nasil-kurulur',
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

  const sectorRoutes = [
    'turizm-sirketleri-yazilim',
    'ajans-yonetim-paneli',
    'restoran-qr-menu-sistemi',
    'emlak-ofisi-yazilimi',
    'danisman-web-sitesi',
    'kucuk-isletme-web-sitesi',
  ].map((slug) => ({
    url: `${baseUrl}/sektorler/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
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
    ...sectorRoutes,
    ...projectRoutes,
    ...blogRoutes
  ]
}
