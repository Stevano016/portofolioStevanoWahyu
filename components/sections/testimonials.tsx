"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

// Edit testmoni disini
// Jangan lupa untuk menambahkan gambar testimoni di folder public/images/testimonials
export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Stevano delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO at StartupXYZ",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Working with Stevano was a pleasure. He understood our requirements perfectly and delivered a scalable solution that exceeded our expectations.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Lead at CreativeAgency",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Stevano brought our designs to life with pixel-perfect precision. His frontend skills are top-notch and he's great to collaborate with.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder at InnovateLab",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The full-stack application Stevano built for us has been running flawlessly. His code quality and documentation are outstanding.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder at InnovateLab",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The full-stack application Stevano built for us has been running flawlessly. His code quality and documentation are outstanding.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take my word for it. Here's what some of my clients have to say about working with me.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-primary mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
