import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const research = await prisma.research.findMany({
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
        type: true,
        authors: true,
        publicationYear: true,
        journalName: true,
        doi: true,
        pdfUrl: true,
        externalUrl: true,
        keywords: true,
        abstract: true,
      },
    })

    return NextResponse.json(research)
  } catch (error) {
    console.error("Failed to fetch research:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      image,
      published,
      type,
      authors,
      publicationYear,
      journalName,
      doi,
      pdfUrl,
      externalUrl,
      keywords,
      abstract,
    } = body

    // Validate required fields
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Title, slug, excerpt, and content are required" }, { status: 400 })
    }

    const newResearch = await prisma.research.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        published: published || false,
        type: type || "JOURNAL",
        authors,
        publicationYear,
        journalName,
        doi,
        pdfUrl,
        externalUrl,
        keywords,
        abstract,
      },
    })

    return NextResponse.json(newResearch, { status: 201 })
  } catch (error) {
    console.error("Failed to create research:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
