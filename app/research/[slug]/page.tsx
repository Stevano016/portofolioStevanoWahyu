import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowLeft, Users, ExternalLink, Download, BookOpen, FileText, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { prisma } from "@/lib/prisma"

interface Research {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  createdAt: Date
  updatedAt: Date
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

async function getResearch(slug: string): Promise<Research | null> {
  try {
    const research = await prisma.research.findUnique({
      where: {
        slug,
        published: true,
      },
    })
    return research
  } catch (error) {
    console.error("Failed to fetch research:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const research = await getResearch(params.slug)

  if (!research) {
    return {
      title: "Research Not Found",
    }
  }

  return {
    title: `${research.title} - Stevano Wahyu Al'fandi`,
    description: research.abstract || research.excerpt,
  }
}

export default async function ResearchPage({ params }: { params: { slug: string } }) {
  const research = await getResearch(params.slug)

  if (!research) {
    notFound()
  }

  const TypeIcon = typeIcons[research.type as keyof typeof typeIcons] || FileText

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/research">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Research
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge className="flex items-center gap-1">
                <TypeIcon className="w-3 h-3" />
                {research.type.charAt(0).toUpperCase() + research.type.slice(1)}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                {research.publicationYear || new Date(research.createdAt).getFullYear()}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{research.title}</h1>

            {research.authors && (
              <div className="flex items-center text-lg text-muted-foreground mb-4">
                <Users className="w-5 h-5 mr-2" />
                {research.authors}
              </div>
            )}

            {research.journalName && <p className="text-lg font-medium text-primary mb-4">{research.journalName}</p>}

            {research.abstract && (
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Abstract</h3>
                <p className="text-muted-foreground leading-relaxed">{research.abstract}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {research.pdfUrl && (
                <Button asChild>
                  <a href={research.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              )}
              {research.externalUrl && (
                <Button variant="outline" asChild>
                  <a href={research.externalUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {research.doi ? `View DOI: ${research.doi}` : "External Link"}
                  </a>
                </Button>
              )}
            </div>

            {/* Keywords */}
            {research.keywords && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {research.keywords.split(",").map((keyword, idx) => (
                    <Badge key={idx} variant="secondary">
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </header>

          {research.image && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image src={research.image || "/placeholder.svg"} alt={research.title} fill className="object-cover" />
            </div>
          )}

          {/* Research Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: research.content.replace(/\n/g, "<br />") }} />
          </div>

          {/* Research Info Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Publication Details</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Type:</strong> {research.type.charAt(0).toUpperCase() + research.type.slice(1)}
                </div>
                {research.publicationYear && (
                  <div>
                    <strong>Year:</strong> {research.publicationYear}
                  </div>
                )}
                {research.journalName && (
                  <div>
                    <strong>Published in:</strong> {research.journalName}
                  </div>
                )}
                {research.doi && (
                  <div>
                    <strong>DOI:</strong> {research.doi}
                  </div>
                )}
                <div>
                  <strong>Created:</strong> {formatDate(research.createdAt)}
                </div>
                <div>
                  <strong>Last Updated:</strong> {formatDate(research.updatedAt)}
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/research">← All Research</Link>
            </Button>
            <Button asChild>
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
