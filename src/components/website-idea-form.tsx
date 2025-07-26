'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { websiteIdeaSchema, type WebsiteIdeaFormData } from '@/types'
import { WebsiteSectionsPreview } from './website-sections-preview'
import { useSubmitIdea } from '@/service'

export function WebsiteIdeaForm() {
  const [submittedIdea, setSubmittedIdea] = useState<{
    id: string
    description: string
  }>()

  const form = useForm<WebsiteIdeaFormData>({
    resolver: zodResolver(websiteIdeaSchema),
    defaultValues: {
      idea: '',
    },
  })

  const submitIdeaMutation = useSubmitIdea()

  const onSubmit = async (data: WebsiteIdeaFormData) => {
    try {
      const result = await submitIdeaMutation.mutateAsync({ idea: data.idea })
      if (result.success) {
        setSubmittedIdea(result.data.idea)
        form.reset()
      }
    } catch (error) {
      // Error handling is done by the mutation hook
      console.error('Form submission error:', error)
    }
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Website Idea Generator</CardTitle>
          <CardDescription>
            Enter your website idea and we'll generate some sections for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='idea'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Idea</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='e.g., Landing page for bakery'
                        disabled={submitIdeaMutation.isPending}
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={submitIdeaMutation.isPending}
                className='w-full'
              >
                {submitIdeaMutation.isPending
                  ? 'Submitting...'
                  : 'Submit Idea & Generate Sections'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {submitIdeaMutation.isError && (
        <Alert variant='destructive'>
          <AlertDescription>
            {submitIdeaMutation.error?.message ||
              'Failed to submit website idea. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {submitIdeaMutation.isSuccess && (
        <Alert>
          <AlertDescription>
            {submitIdeaMutation.data?.message ||
              'Website idea submitted successfully!'}
          </AlertDescription>
        </Alert>
      )}

      {submittedIdea && (
        <WebsiteSectionsPreview
          idea={submittedIdea}
          onRetry={() => {
            submitIdeaMutation.reset()
          }}
        />
      )}
    </div>
  )
}
