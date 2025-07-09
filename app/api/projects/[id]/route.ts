import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { title, description, image, techStack, githubUrl, demoUrl, featured } = body

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        image,
        techStack: JSON.stringify(techStack),
        githubUrl,
        demoUrl,
        featured: featured || false,
      },
    })

    return NextResponse.json({
      ...updatedProject,
      techStack: JSON.parse(updatedProject.techStack),
    })
  } catch (error) {
    console.error("Failed to update project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Failed to delete project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
