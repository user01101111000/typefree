import { siteMetadata } from '@/lib/siteMetadata'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: siteMetadata.siteUrl + '/sitemap.xml',
    }
};