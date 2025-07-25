import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const websiteIdeaSchema = z.object({
  idea: z
    .string()
    .min(1, 'Website idea is required')
    .max(500, 'Website idea must be less than 500 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { idea } = websiteIdeaSchema.parse(body)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate random error (5% chance)
    if (Math.random() < 0.05) {
      return NextResponse.json(
        { error: 'Failed to process website idea. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Website idea submitted successfully',
      data: {
        id: Date.now().toString(),
        idea,
        submittedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
