import { z } from 'zod'

export interface Section {
  _id: string
  title: string
  content: string
}

export const websiteIdeaSchema = z.object({
  idea: z
    .string()
    .min(1, 'Website idea is required')
    .max(200, 'Website idea must be less than 200 characters'),
})

export type WebsiteIdeaFormData = z.infer<typeof websiteIdeaSchema>
