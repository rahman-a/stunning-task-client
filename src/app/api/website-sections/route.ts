import { NextRequest, NextResponse } from 'next/server'
import { Section } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const idea = searchParams.get('idea')

    if (!idea) {
      return NextResponse.json(
        { error: 'Website idea parameter is required' },
        { status: 400 }
      )
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate random error (8% chance)
    if (Math.random() < 0.08) {
      return NextResponse.json(
        { error: 'Failed to fetch website sections. Please try again.' },
        { status: 500 }
      )
    }

    // Generate mock sections based on the idea
    const sections: Section[] = [
      {
        _id: uuidv4(),
        title: 'Hero',
        content: `Welcome to ${idea}! We're excited to share our story with you and help you achieve your goals.`,
      },
      {
        _id: uuidv4(),
        title: 'About',
        content: `We are passionate about ${idea.toLowerCase()}. Our dedicated team works tirelessly to deliver exceptional experiences and innovative solutions for our valued customers.`,
      },
      {
        _id: uuidv4(),
        title: 'Services',
        content: `Our comprehensive range of services for ${idea.toLowerCase()} includes consultation, design, development, and ongoing support to ensure your success.`,
      },
      {
        _id: uuidv4(),
        title: 'Contact',
        content: `Ready to get started with ${idea.toLowerCase()}? Reach out to us today and let's create something truly amazing together.`,
      },
    ]

    return NextResponse.json({
      success: true,
      data: sections,
      metadata: {
        idea,
        generatedAt: new Date().toISOString(),
        sectionCount: sections.length,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
