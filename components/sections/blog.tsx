"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { formatDate } from "@/lib/utils"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  image?: string
  createdAt: string
  published: boolean
}

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog")
        const data = await response.json()
        setPosts(data.slice(0, 6)) // Show only 3 latest posts
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
        // Fallback to static data
        setPosts([
          {
            id: 1,
            title: "Getting Started with Next.js 14",
            slug: "getting-started-nextjs-14",
            excerpt:
              "Learn how to build modern web applications with the latest Next.js features including App Router and Server Components.",
            image: "/placeholder.svg?height=200&width=400",
            createdAt: "2024-01-15",
            published: true,
          },
          {
            id: 2,
            title: "Building Scalable APIs with Node.js",
            slug: "building-scalable-apis-nodejs",
            excerpt:
              "Best practices for creating robust and scalable REST APIs using Node.js, Express, and modern development patterns.",
            image: "/placeholder.svg?height=200&width=400",
            createdAt: "2024-01-10",
            published: true,
          },
          {
            id: 3,
            title: "Database Design Principles",
            slug: "database-design-principles",
            excerpt:
              "Essential principles for designing efficient and maintainable database schemas for web applications.",
            image: "/placeholder.svg?height=200&width=400",
            createdAt: "2024-01-05",
            published: true,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section id="blog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-muted-foreground text-lg">Loading blog posts...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts about web development and technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow">
                {post.image && (
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(post.createdAt)}
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="p-0 h-auto">
                    <Link href={`/blog/${post.slug}`} className="flex items-center">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
