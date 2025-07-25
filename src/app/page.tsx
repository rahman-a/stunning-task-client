import { WebsiteIdeaForm } from '@/components/website-idea-form'

export default function Home() {
  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='container mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold tracking-tight mb-2'>
            Website Section Generator
          </h1>
          <p className='text-muted-foreground text-lg'>
            Transform your website ideas into structured sections
          </p>
        </div>
        <WebsiteIdeaForm />
      </div>
    </div>
  )
}
