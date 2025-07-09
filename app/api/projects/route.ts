import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    })

    // Parse techStack JSON strings back to arrays
    const projectsWithParsedTechStack = projects.map((project) => ({
      ...project,
      techStack: JSON.parse(project.techStack),
    }))

    return NextResponse.json(projectsWithParsedTechStack)
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, image, techStack, githubUrl, demoUrl, featured } = body

    // Validate required fields
    if (!title || !description || !image || !techStack) {
      return NextResponse.json({ error: "Title, description, image, and techStack are required" }, { status: 400 })
    }

    const newProject = await prisma.project.create({
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

    return NextResponse.json(
      {
        ...newProject,
        techStack: JSON.parse(newProject.techStack),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to create project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
