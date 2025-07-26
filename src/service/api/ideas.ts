import { apiClient } from './axios'
import { Section } from '@/types'

// Types for API responses
export interface SubmitIdeaRequest {
  idea: string
}

export interface SubmitIdeaResponse {
  success: boolean
  message: string
  data: {
    idea: {
      id: string
      description: string
    }
    submittedAt: string
  }
}

export interface SectionsResponse {
  success: boolean
  data: Section[]
  metadata: {
    idea: string
    generatedAt: string
    sectionCount: number
  }
}

// API service functions
export const ideasApi = {
  // Submit website idea
  submitIdea: async (data: SubmitIdeaRequest): Promise<SubmitIdeaResponse> => {
    const response = await apiClient.post<SubmitIdeaResponse>('/sections', data)
    console.log('response: ', response.data)
    return response.data
  },

  // Fetch website sections
  getSections: async (idea: string): Promise<SectionsResponse> => {
    const response = await apiClient.get<SectionsResponse>(`/sections`, {
      params: { ideaId: idea },
    })
    return response.data
  },
}
