"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Save, X, Mail, MessageSquare, Shield, Lock, BookOpen, FileText, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

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

interface Research {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  published: boolean
  type: string
  authors?: string
  publicationYear?: number
  journalName?: string
  doi?: string
  pdfUrl?: string
  externalUrl?: string
  keywords?: string
  abstract?: string
  createdAt: string
}

interface Message {
  id: number
  name: string
  email: string
  message: string
  createdAt: string
}

const researchTypes = [
  { value: "JOURNAL", label: "Journal", icon: BookOpen },
  { value: "THESIS", label: "Thesis", icon: FileText },
  { value: "CONFERENCE", label: "Conference", icon: Award },
  { value: "BOOK", label: "Book", icon: BookOpen },
  { value: "OTHER", label: "Other", icon: FileText },
]

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [research, setResearch] = useState<Research[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingResearch, setEditingResearch] = useState<Research | null>(null)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [isAddingResearch, setIsAddingResearch] = useState(false)
  const { toast } = useToast()

  // Fetch data
  useEffect(() => {
    fetchProjects()
    fetchResearch()
    fetchMessages()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    }
  }

  const fetchResearch = async () => {
    try {
      const response = await fetch("/api/research")
      const data = await response.json()
      setResearch(data)
    } catch (error) {
      console.error("Failed to fetch research:", error)
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()
      setMessages(data.slice(0, 5)) // Show only latest 5 messages
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  // Project functions
  const saveProject = async (project: Omit<Project, "id"> | Project) => {
    try {
      const method = "id" in project ? "PUT" : "POST"
      const url = "id" in project ? `/api/projects/${project.id}` : "/api/projects"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Project saved successfully!" })
        fetchProjects()
        setEditingProject(null)
        setIsAddingProject(false)
      } else {
        throw new Error("Failed to save project")
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save project", variant: "destructive" })
    }
  }

  const deleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Success", description: "Project deleted successfully!" })
        fetchProjects()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete project", variant: "destructive" })
    }
  }

  // Research functions
  const saveResearch = async (researchItem: Omit<Research, "id" | "createdAt"> | Research) => {
    try {
      const method = "id" in researchItem ? "PUT" : "POST"
      const url = "id" in researchItem ? `/api/research/admin/${researchItem.id}` : "/api/research"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(researchItem),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Research saved successfully!" })
        fetchResearch()
        setEditingResearch(null)
        setIsAddingResearch(false)
      } else {
        throw new Error("Failed to save research")
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save research", variant: "destructive" })
    }
  }

  const deleteResearch = async (id: number) => {
    if (!confirm("Are you sure you want to delete this research?")) return

    try {
      const response = await fetch(`/api/research/admin/${id}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Success", description: "Research deleted successfully!" })
        fetchResearch()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete research", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm">
              <Shield className="w-4 h-4" />
              <Lock className="w-4 h-4" />
              Secure Admin Zone
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">🔐 Super Secret Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects, research, and messages</p>
          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              <strong>⚠️ Security Notice:</strong> This is a protected admin area. Keep this URL confidential.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Projects</p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
                <div className="h-8 w-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-blue-500 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Research</p>
                  <p className="text-2xl font-bold">{research.length}</p>
                </div>
                <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold">{messages.length}</p>
                </div>
                <div className="h-8 w-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Button asChild className="w-full">
                <Link href="/super-secret-admin-van0zone/messages">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View All Messages
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="messages">Recent Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
              <Button onClick={() => setIsAddingProject(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {isAddingProject && <ProjectForm onSave={saveProject} onCancel={() => setIsAddingProject(false)} />}

            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {project.title}
                          {project.featured && <Badge>Featured</Badge>}
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">{project.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {editingProject && (
              <ProjectForm project={editingProject} onSave={saveProject} onCancel={() => setEditingProject(null)} />
            )}
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Research & Publications</h2>
              <Button onClick={() => setIsAddingResearch(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Research
              </Button>
            </div>

            {isAddingResearch && <ResearchForm onSave={saveResearch} onCancel={() => setIsAddingResearch(false)} />}

            <div className="grid gap-6">
              {research.map((item) => {
                const typeConfig = researchTypes.find((t) => t.value === item.type) || researchTypes[0]
                const TypeIcon = typeConfig.icon
                return (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <TypeIcon className="w-5 h-5" />
                            {item.title}
                            {item.published && <Badge>Published</Badge>}
                            <Badge variant="outline">{typeConfig.label}</Badge>
                          </CardTitle>
                          <p className="text-muted-foreground mt-2">{item.abstract || item.excerpt}</p>
                          {item.authors && (
                            <p className="text-sm text-muted-foreground mt-1">
                              <strong>Authors:</strong> {item.authors}
                            </p>
                          )}
                          {item.journalName && (
                            <p className="text-sm text-primary mt-1">
                              <strong>Published in:</strong> {item.journalName}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingResearch(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteResearch(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {item.keywords &&
                          item.keywords
                            .split(",")
                            .slice(0, 5)
                            .map((keyword, idx) => (
                              <Badge key={idx} variant="secondary">
                                {keyword.trim()}
                              </Badge>
                            ))}
                      </div>
                      <div className="mt-3 flex gap-2">
                        {item.pdfUrl && (
                          <Badge variant="outline" className="text-xs">
                            PDF Available
                          </Badge>
                        )}
                        {item.externalUrl && (
                          <Badge variant="outline" className="text-xs">
                            External Link
                          </Badge>
                        )}
                        {item.doi && (
                          <Badge variant="outline" className="text-xs">
                            DOI: {item.doi}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {editingResearch && (
              <ResearchForm
                research={editingResearch}
                onSave={saveResearch}
                onCancel={() => setEditingResearch(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Messages</h2>
              <Button asChild>
                <Link href="/super-secret-admin-van0zone/messages">View All Messages</Link>
              </Button>
            </div>

            {messages.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Messages Yet</h3>
                  <p className="text-muted-foreground">Messages from your contact form will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{message.name}</h4>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                        </div>
                        <Badge variant="secondary">New</Badge>
                      </div>
                      <p className="text-sm line-clamp-2 mb-2">{message.message}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                        <Button size="sm" asChild>
                          <a href={`mailto:${message.email}`}>Reply</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Project Form Component
function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project?: Project
  onSave: (project: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    techStack: project?.techStack.join(", ") || "",
    githubUrl: project?.githubUrl || "",
    demoUrl: project?.demoUrl || "",
    featured: project?.featured || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...project,
      ...formData,
      techStack: formData.techStack.split(",").map((tech) => tech.trim()),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? "Edit Project" : "Add New Project"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Textarea
            placeholder="Project Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <Input
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <Input
            placeholder="Tech Stack (comma separated)"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            required
          />
          <Input
            placeholder="GitHub URL (optional)"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
          />
          <Input
            placeholder="Demo URL (optional)"
            value={formData.demoUrl}
            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <span>Featured Project</span>
          </label>
          <div className="flex gap-2">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Research Form Component
function ResearchForm({
  research,
  onSave,
  onCancel,
}: {
  research?: Research
  onSave: (research: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: research?.title || "",
    slug: research?.slug || "",
    excerpt: research?.excerpt || "",
    content: research?.content || "",
    image: research?.image || "",
    published: research?.published || false,
    type: research?.type || "JOURNAL",
    authors: research?.authors || "",
    publicationYear: research?.publicationYear || new Date().getFullYear(),
    journalName: research?.journalName || "",
    doi: research?.doi || "",
    pdfUrl: research?.pdfUrl || "",
    externalUrl: research?.externalUrl || "",
    keywords: research?.keywords || "",
    abstract: research?.abstract || "",
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: research ? formData.slug : generateSlug(title),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...research,
      ...formData,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{research ? "Edit Research" : "Add New Research"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Research Title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
            <Input
              placeholder="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select research type" />
              </SelectTrigger>
              <SelectContent>
                {researchTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Publication Year"
              type="number"
              value={formData.publicationYear}
              onChange={(e) => setFormData({ ...formData, publicationYear: Number(e.target.value) })}
            />
          </div>

          <Input
            placeholder="Authors (comma separated)"
            value={formData.authors}
            onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
          />

          <Input
            placeholder="Journal/Conference Name"
            value={formData.journalName}
            onChange={(e) => setFormData({ ...formData, journalName: e.target.value })}
          />

          <Textarea
            placeholder="Abstract"
            value={formData.abstract}
            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
            rows={3}
          />

          <Textarea
            placeholder="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
          />

          <Textarea
            placeholder="Content (Markdown supported)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            required
          />

          <Input
            placeholder="Image URL (optional)"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="PDF URL (optional)"
              value={formData.pdfUrl}
              onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
            />
            <Input
              placeholder="External URL (optional)"
              value={formData.externalUrl}
              onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="DOI (optional)"
              value={formData.doi}
              onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
            />
            <Input
              placeholder="Keywords (comma separated)"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            />
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <span>Published</span>
          </label>

          <div className="flex gap-2">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
