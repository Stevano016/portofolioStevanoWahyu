"use client"

import { motion } from "framer-motion"
import { Download, Mail, Github, Linkedin, Twitter, Eye, Instagram, Facebook, Youtube, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const [imageError, setImageError] = useState(false)
  const [cvDownloading, setCvDownloading] = useState(false)

  const handleHireMe = () => {
    const element = document.querySelector("#contact")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const handleDownloadCV = async () => {
    setCvDownloading(true)
    try {
      // Check if CV file exists
      const response = await fetch("/cv/CV-Stevano-Wahyu-Alfandi.pdf")
      if (response.ok) {
        // Create download link
        const link = document.createElement("a")
        link.href = "/cv/CV-Stevano-Wahyu-Alfandi.pdf"
        link.download = "CV-Stevano-Wahyu-Alfandi.pdf"
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // Fallback: redirect to CV page
        window.location.href = "/cv"
      }
    } catch (error) {
      console.error("Error downloading CV:", error)
      // Fallback: redirect to CV page
      window.location.href = "/cv"
    } finally {
      setCvDownloading(false)
    }
  }

  // 🔗 KONFIGURASI SOCIAL MEDIA - GANTI URL DI SINI
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Stevano016", // 👈 GANTI DENGAN USERNAME GITHUB ANDA
      color: "hover:text-gray-900 dark:hover:text-white",
      show: true, // Set false untuk menyembunyikan
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/stevano-wahyu-al-fandi-2a9250295/", // 👈 GANTI DENGAN PROFIL LINKEDIN ANDA
      color: "hover:text-blue-600",
      show: true, // Set false untuk menyembunyikan
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/handle-anda", // 👈 GANTI DENGAN HANDLE TWITTER ANDA
      color: "hover:text-blue-400",
      show: false, // Set false untuk menyembunyikan
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/ssevxx/?next=%2F", // 👈 GANTI DENGAN USERNAME INSTAGRAM ANDA
      color: "hover:text-pink-500",
      show: true, // 👈 SET true UNTUK MENAMPILKAN
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/profil-anda", // 👈 GANTI DENGAN PROFIL FACEBOOK ANDA
      color: "hover:text-blue-500",
      show: false, // 👈 SET true UNTUK MENAMPILKAN
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@channel-anda", // 👈 GANTI DENGAN CHANNEL YOUTUBE ANDA
      color: "hover:text-red-500",
      show: false, // 👈 SET true UNTUK MENAMPILKAN
    },
    {
      name: "Website",
      icon: Globe,
      url: "https://website-anda.com", // 👈 GANTI DENGAN WEBSITE PRIBADI ANDA
      color: "hover:text-green-500",
      show: false, // 👈 SET true UNTUK MENAMPILKAN
    },
  ]

  // Filter hanya social media yang ingin ditampilkan
  const visibleSocialLinks = socialLinks.filter((link) => link.show)

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-2xl">
            {!imageError ? (
              <Image
                src="/images/Homs.png"
                alt="Stevano Wahyu Al'fandi"
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary">SW</div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Stevano Wahyu Al'fandi
            </h1>
            <div className="text-2xl md:text-3xl text-muted-foreground mb-6 font-medium">Full-Stack Developer</div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Passionate about creating exceptional digital experiences through clean code, innovative solutions, and
              cutting-edge technologies. Specialized in React, Next.js, Node.js, and modern web development.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Button
            size="lg"
            onClick={handleHireMe}
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            <Mail className="mr-2 h-5 w-5" />
            Hire Me
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDownloadCV}
            disabled={cvDownloading}
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:bg-primary/5 bg-transparent"
          >
            <Download className={`mr-2 h-5 w-5 ${cvDownloading ? "animate-spin" : ""}`} />
            {cvDownloading ? "Downloading..." : "Download CV"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center gap-4 mb-12"
        >
          {/* <Button variant="ghost" size="sm" asChild>
            <Link href="/cv">
              <Eye className="mr-2 h-4 w-4" />
              View CV
            </Link>
          </Button> */}
        </motion.div>

        {/* 🎨 SOCIAL MEDIA ICONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4 mb-16 flex-wrap"
        >
          {visibleSocialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full w-12 h-12 hover:bg-primary/10 transition-all duration-300 ${social.color}`}
                asChild
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer" title={`Follow me on ${social.name}`}>
                  <social.icon className="h-6 w-6" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full mx-auto relative">
              <div className="w-1 h-3 bg-primary rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Scroll to explore</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
