"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || null,
      message: formData.get("message") as string,
    }

    const supabase = createClient()
    const { error: submitError } = await supabase
      .from("contact_messages")
      .insert([data])

    setIsSubmitting(false)

    if (submitError) {
      setError("Failed to send message. Please try again.")
      return
    }

    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-green-700">
            Thank you for reaching out. We will get back to you soon.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@gmail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              Phone (Optional)
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 90095 85458"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="How can we help you?"
              rows={5}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
