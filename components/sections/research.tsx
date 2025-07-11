"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  ExternalLink,
  Download,
  Users,
  BookOpen,
  Award,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Research {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  createdAt: string;
  published: boolean;
  type: "journal" | "thesis" | "conference" | "book" | "other";
  authors?: string;
  publicationYear?: number;
  journalName?: string;
  doi?: string;
  pdfUrl?: string;
  externalUrl?: string;
  keywords?: string;
  abstract?: string;
}

const typeIcons = {
  journal: BookOpen,
  thesis: FileText,
  conference: Award,
  book: BookOpen,
  other: FileText,
};

const typeColors = {
  journal: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  thesis: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  conference: "bg-green-500/10 text-green-600 border-green-500/20",
  book: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  other: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

export function ResearchSection() {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await fetch("/api/research");
        const data = await response.json();
        setResearch(data.slice(0, 3)); // Show only 3 latest research
      } catch (error) {
        console.error("Failed to fetch research:", error);
        // Fallback to static data
        setResearch([
          {
            id: 1,
            title: "Machine Learning Approach for Web Performance Optimization",
            slug: "ml-web-performance",
            excerpt:
              "A comprehensive study on using machine learning algorithms to optimize web application performance and user experience.",
            image: "https://via.placeholder.com/500x300", //
            createdAt: "2024-01-15",
            published: true,
            type: "journal",
            authors: "Stevano Wahyu Al'fandi, Dr. John Smith",
            publicationYear: 2024,
            journalName: "International Journal of Web Technologies",
            doi: "10.1000/182",
            pdfUrl: "/research/ml-web-performance.pdf",
            externalUrl: "https://doi.org/10.1000/182",
            keywords: "machine learning, web performance, optimization",
            abstract:
              "A comprehensive study on using machine learning algorithms to optimize web application performance and user experience through predictive modeling and automated optimization techniques.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchResearch();
  }, []);

  if (loading) {
    return (
      <section id="research" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Research & Publications
            </h2>
            <p className="text-muted-foreground text-lg">Loading research...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="research" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Research & Publications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exploring the intersection of technology and innovation through
            academic research, publications, and scholarly contributions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {research.map((item, index) => {
            const TypeIcon = typeIcons[item.type] || FileText;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow">
                  {item.image && (
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${typeColors[item.type]} border`}>
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.publicationYear ||
                        new Date(item.createdAt).getFullYear()}
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2">
                      {item.title}
                    </h3>
                    {item.authors && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="line-clamp-1">{item.authors}</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {item.abstract || item.excerpt}
                    </p>
                    {item.journalName && (
                      <p className="text-sm font-medium text-primary mb-2">
                        {item.journalName}
                      </p>
                    )}
                    {item.keywords && (
                      <div className="flex flex-wrap gap-1">
                        {item.keywords
                          .split(",")
                          .slice(0, 3)
                          .map((keyword, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {keyword.trim()}
                            </Badge>
                          ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {item.pdfUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </a>
                      </Button>
                    )}
                    {item.externalUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {item.doi ? "DOI" : "Link"}
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="ml-auto"
                    >
                      <Link href={`/research/${item.slug}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg">
            <Link href="/research">
              View All Research
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
