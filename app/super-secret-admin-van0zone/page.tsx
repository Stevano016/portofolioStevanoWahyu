"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Save, X, Mail, MessageSquare, Shield, Lock } from "lucide-react"
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

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  published: boolean
  createdAt: string
}

interface Message {
  id: number
  name: string
  email: string
  message: string
  createdAt: string
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [isAddingBlog, setIsAddingBlog] = useState(false)
  const { toast } = useToast()

  // Fetch data
  useEffect(() => {
    fetchProjects()
    fetchBlogPosts()
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

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blog")
      const data = await response.json()
      setBlogPosts(data)
    } catch (error) {
      console.error("Failed to fetch blog posts:", error)
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

  // Blog functions
  const saveBlogPost = async (post: Omit<BlogPost, "id" | "createdAt"> | BlogPost) => {
    try {
      const method = "id" in post ? "PUT" : "POST"
      const url = "id" in post ? `/api/blog/admin/${post.id}` : "/api/blog"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Blog post saved successfully!" })
        fetchBlogPosts()
        setEditingBlog(null)
        setIsAddingBlog(false)
      } else {
        throw new Error("Failed to save blog post")
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save blog post", variant: "destructive" })
    }
  }

  const deleteBlogPost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/blog/admin/${id}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Success", description: "Blog post deleted successfully!" })
        fetchBlogPosts()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" })
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
          <p className="text-muted-foreground">Manage your projects, blog posts, and messages</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
                  <p className="text-2xl font-bold">{blogPosts.length}</p>
                </div>
                <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-green-500 rounded-full" />
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
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
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

          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blog Posts</h2>
              <Button onClick={() => setIsAddingBlog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Blog Post
              </Button>
            </div>

            {isAddingBlog && <BlogForm onSave={saveBlogPost} onCancel={() => setIsAddingBlog(false)} />}

            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {post.title}
                          {post.published && <Badge>Published</Badge>}
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">{post.excerpt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingBlog(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteBlogPost(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {editingBlog && <BlogForm post={editingBlog} onSave={saveBlogPost} onCancel={() => setEditingBlog(null)} />}
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

// Blog Form Component
function BlogForm({
  post,
  onSave,
  onCancel,
}: {
  post?: BlogPost
  onSave: (post: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    image: post?.image || "",
    published: post?.published || false,
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
      slug: post ? formData.slug : generateSlug(title),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...post,
      ...formData,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? "Edit Blog Post" : "Add New Blog Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Blog Title"
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
            rows={10}
            required
          />
          <Input
            placeholder="Image URL (optional)"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
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
