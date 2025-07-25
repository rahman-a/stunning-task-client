import { useMutation } from '@tanstack/react-query'
import { websiteApi, SubmitIdeaRequest } from '../api/website'

export const useSubmitIdea = () => {
  return useMutation({
    mutationFn: (data: SubmitIdeaRequest) => websiteApi.submitIdea(data),
    onError: (error) => {
      console.error('Failed to submit idea:', error)
    },
  })
}
