'use client'

import { Section } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useSections } from '@/service'

interface WebsiteSectionsPreviewProps {
  idea: {
    id: string
    description: string
  }
  onRetry?: () => void
}

export function WebsiteSectionsPreview({
  idea,
  onRetry,
}: WebsiteSectionsPreviewProps) {
  const { data, isLoading, error, refetch, isError } = useSections(idea.id)

  const handleRetry = () => {
    refetch()
    onRetry?.()
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <div className='flex items-center justify-center space-x-2'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
            <p>Fetching website sections...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <Alert variant='destructive'>
            <AlertDescription className='flex items-center justify-between'>
              <span>
                {error?.message ||
                  'Failed to fetch website sections. Please try again.'}
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={handleRetry}
                className='ml-4'
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <Alert>
            <AlertDescription>
              No sections have been generated for this idea. Please try a
              different website idea.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const { data: sections, metadata } = data

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Sections Preview</CardTitle>
        <CardDescription>
          Generated sections for: "{idea.description}"
          {metadata && (
            <span className='block text-xs text-muted-foreground mt-1'>
              Generated at {new Date(metadata.generatedAt).toLocaleString()} •{' '}
              {metadata.sectionCount} sections
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {sections.map((section, index) => (
            <div key={section._id} className='border rounded-lg p-4 space-y-2'>
              <h3 className='font-semibold text-lg flex items-center'>
                <span className='bg-primary text-primary-foreground text-xs px-2 py-1 rounded mr-2'>
                  {index + 1}
                </span>
                Section: {section.title}
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
