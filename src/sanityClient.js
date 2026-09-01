import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'ey2jemto',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-05-16',
})
