import { useMutation } from '@tanstack/react-query'
import { ideasApi, SubmitIdeaRequest } from '../api/ideas'

export const useSubmitIdea = () => {
  return useMutation({
    mutationFn: (data: SubmitIdeaRequest) => ideasApi.submitIdea(data),
    onError: (error) => {
      console.error('Failed to submit idea:', error)
    },
  })
}
