"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, User, Trash2, ArrowLeft } from "lucide-react"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: number
  name: string
  email: string
  message: string
  createdAt: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Message deleted successfully!",
        })
        fetchMessages()
      } else {
        throw new Error("Failed to delete message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading messages...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/super-secret-admin-van0zone">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Contact Messages</h1>
          <p className="text-muted-foreground">
            {messages.length} message{messages.length !== 1 ? "s" : ""} received
          </p>
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
          <div className="space-y-6">
            {messages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {message.name}
                        <Badge variant="secondary">New</Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${message.email}`} className="hover:text-primary transition-colors">
                            {message.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(message.createdAt)}
                        </div>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => deleteMessage(message.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{message.message}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button asChild>
                      <a
                        href={`mailto:${message.email}?subject=Re: Your Message&body=Hi ${message.name},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0ABest regards,%0D%0AStevano`}
                      >
                        Reply via Email
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={`tel:${message.email}`}>Contact</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
