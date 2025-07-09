"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        // Fallback to static data
        setProjects([
          {
            id: 1,
            title: "E-Commerce Platform",
            description:
              "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
            image: "/placeholder.svg?height=300&width=400",
            techStack: ["React", "Node.js", "MySQL", "Stripe", "Tailwind CSS"],
            githubUrl: "https://github.com/stevano/ecommerce",
            demoUrl: "https://ecommerce-demo.com",
            featured: true,
          },
          {
            id: 2,
            title: "Task Management App",
            description:
              "Collaborative task management application with real-time updates and team collaboration features.",
            image: "/placeholder.svg?height=300&width=400",
            techStack: ["Next.js", "TypeScript", "Prisma", "Socket.io", "PostgreSQL"],
            githubUrl: "https://github.com/stevano/taskapp",
            demoUrl: "https://taskapp-demo.com",
            featured: true,
          },
          {
            id: 3,
            title: "Weather Dashboard",
            description: "Beautiful weather dashboard with location-based forecasts and interactive maps.",
            image: "/placeholder.svg?height=300&width=400",
            techStack: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
            githubUrl: "https://github.com/stevano/weather",
            demoUrl: "https://weather-demo.com",
            featured: false,
          },
          {
            id: 4,
            title: "Blog CMS",
            description: "Content management system for bloggers with markdown support and SEO optimization.",
            image: "/placeholder.svg?height=300&width=400",
            techStack: ["Laravel", "Vue.js", "MySQL", "TinyMCE"],
            githubUrl: "https://github.com/stevano/blog-cms",
            demoUrl: undefined,
            featured: false,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I've used to solve real-world problems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  {project.featured && <Badge className="absolute top-4 left-4">Featured</Badge>}
                </div>
                <CardHeader>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button size="sm" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
