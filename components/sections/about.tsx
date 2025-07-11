"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Code, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export function AboutSection() {
  const [imageError, setImageError] = useState(false);

  // Statistik yang ingin ditampilkan
  const stats = [
    { icon: Code, label: "Projects Completed", value: "50+" },
    { icon: Coffee, label: "Cups of Coffee", value: "1000+" },
    { icon: Calendar, label: "Years Experience", value: "1+" },
    { icon: MapPin, label: "Based in", value: "Indonesia" },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kenali lebih jauh tentang perjalanan saya, pengalaman saya, dan apa
            yang mendorong saya menjadi seorang developer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                {!imageError ? (
                  <Image
                    src="/images/Abt.png"
                    alt="Stevano Wahyu Al'fandi - About Photo"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-primary mb-4">
                        SW
                      </div>
                      <p className="text-muted-foreground">Photo coming soon</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Code className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Hello, I'm Stevano!</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Halo! Aku Stevano, mahasiswa Informatika di Universitas Sugeng
                  Hartono dan udah ngoding-ngoding selama kurang lebih 1 tahun
                  terakhir sebagai software developer.
                </p>
                <p>
                  Aku punya ketertarikan besar sama dunia pendidikan, terutama
                  gimana teknologi kayak AI bisa nyatu bareng kreativitas
                  manusia buat bikin pengalaman belajar yang lebih keren dan
                  manusiawi.
                </p>
                <p>
                  Visi ke depanku adalah ikut ambil peran di era Industri 5.0,
                  di mana manusia dan teknologi bisa saling dukung, bukan saling
                  gantiin.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-4 text-center">
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
