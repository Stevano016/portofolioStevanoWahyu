import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowLeft, Users, ExternalLink, Download, BookOpen, FileText, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Research & Publications - Stevano Wahyu Al'fandi",
  description:
    "Explore my academic research, publications, and scholarly contributions in computer science and web development.",
}

interface Research {
  id: number
  title: string
  slug: string
  excerpt: string
  image?: string
  createdAt: Date
  type: string
  authors?: string
  publicationYear?: number
  journalName?: string
  doi?: string
  pdfUrl?: string
  externalUrl?: string
  keywords?: string
  abstract?: string
}

const typeIcons = {
  journal: BookOpen,
  thesis: FileText,
  conference: Award,
  book: BookOpen,
  other: FileText,
}

const typeColors = {
  journal: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  thesis: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  conference: "bg-green-500/10 text-green-600 border-green-500/20",
  book: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  other: "bg-gray-500/10 text-gray-600 border-gray-500/20",
}

async function getResearch(): Promise<Research[]> {
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
    return research
  } catch (error) {
    console.error("Failed to fetch research:", error)
    return []
  }
}

export default async function ResearchPage() {
  const research = await getResearch()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">Research & Publications</h1>
          <p className="text-muted-foreground text-lg">
            Academic research, publications, and scholarly contributions in computer science and web development.
          </p>
        </div>

        {research.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No research publications found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {research.map((item) => {
              const TypeIcon = typeIcons[item.type as keyof typeof typeIcons] || FileText
              const typeColorClass = typeColors[item.type as keyof typeof typeColors] || typeColors.other

              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {item.image && (
                    <div className="relative">
                      <div className="relative h-48">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className={`${typeColorClass} border`}>
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.publicationYear || new Date(item.createdAt).getFullYear()}
                    </div>
                    <h2 className="text-xl font-bold mb-2">
                      <Link href={`/research/${item.slug}`} className="hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </h2>
                    {item.authors && (
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="line-clamp-2">{item.authors}</span>
                      </div>
                    )}
                    {item.journalName && <p className="text-sm font-medium text-primary mb-2">{item.journalName}</p>}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{item.abstract || item.excerpt}</p>
                    {item.keywords && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.keywords
                          .split(",")
                          .slice(0, 4)
                          .map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword.trim()}
                            </Badge>
                          ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex gap-2 flex-wrap">
                    {item.pdfUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </a>
                      </Button>
                    )}
                    {item.externalUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {item.doi ? "DOI" : "Link"}
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild className="ml-auto">
                      <Link href={`/research/${item.slug}`}>Read More →</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
