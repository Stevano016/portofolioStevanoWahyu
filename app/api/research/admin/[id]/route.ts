import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const research = await prisma.research.findUnique({
      where: { id },
    })

    if (!research) {
      return NextResponse.json({ error: "Research not found" }, { status: 404 })
    }

    return NextResponse.json(research)
  } catch (error) {
    console.error("Failed to fetch research:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
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

    const updatedResearch = await prisma.research.update({
      where: { id },
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

    return NextResponse.json(updatedResearch)
  } catch (error) {
    console.error("Failed to update research:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    await prisma.research.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Research deleted successfully" })
  } catch (error) {
    console.error("Failed to delete research:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
