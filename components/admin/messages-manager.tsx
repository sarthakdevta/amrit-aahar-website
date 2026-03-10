"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Phone, Trash2, Eye, EyeOff } from "lucide-react"
import type { ContactMessage } from "@/lib/types"

interface MessagesManagerProps {
  initialMessages: ContactMessage[]
}

export function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  async function markAsRead(message: ContactMessage) {
    if (message.is_read) return

    const supabase = createClient()
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", message.id)

    if (!error) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, is_read: true } : m))
      )
      router.refresh()
    }
  }

  async function toggleReadStatus(message: ContactMessage) {
    const supabase = createClient()
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: !message.is_read })
      .eq("id", message.id)

    if (!error) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, is_read: !m.is_read } : m
        )
      )
      router.refresh()
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return

    const supabase = createClient()
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id)

    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
      router.refresh()
    }
  }

  function openMessage(message: ContactMessage) {
    setSelectedMessage(message)
    markAsRead(message)
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
              !message.is_read ? "border-primary/50 bg-primary/5" : ""
            }`}
            onClick={() => openMessage(message)}
          >
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{message.name}</CardTitle>
                {!message.is_read && (
                  <Badge variant="default" className="text-xs">New</Badge>
                )}
              </div>
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleReadStatus(message)}
                  title={message.is_read ? "Mark as unread" : "Mark as read"}
                >
                  {message.is_read ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(message.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {message.message}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {message.email}
                </span>
                {message.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {message.phone}
                  </span>
                )}
                <span>{formatDate(message.created_at)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No messages yet.</p>
        </div>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="text-primary hover:underline"
                    >
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
                <p className="text-muted-foreground">
                  Received: {formatDate(selectedMessage.created_at)}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => toggleReadStatus(selectedMessage)}
                >
                  {selectedMessage.is_read ? "Mark as Unread" : "Mark as Read"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
