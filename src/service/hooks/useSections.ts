import { useQuery } from '@tanstack/react-query'
import { websiteApi } from '../api/website'

export const useSections = (idea: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['sections', idea],
    queryFn: () => websiteApi.getSections(idea),
    enabled: enabled && !!idea.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
