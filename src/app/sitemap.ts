import { siteMetadata } from '@/lib/siteMetadata'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteMetadata.siteUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'yearly',
            priority: 1,
        }
    ]
}