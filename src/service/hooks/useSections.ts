import { useQuery } from '@tanstack/react-query'
import { ideasApi } from '../api/ideas'

export const useSections = (idea: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['sections', idea],
    queryFn: () => ideasApi.getSections(idea),
    enabled: enabled && !!idea.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}
