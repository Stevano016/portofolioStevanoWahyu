import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        createdAt: true,
        published: true,
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, excerpt, content, image, published } = body

    // Validate required fields
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Title, slug, excerpt, and content are required" }, { status: 400 })
    }

    const newPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        published: published || false,
      },
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Failed to create blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
