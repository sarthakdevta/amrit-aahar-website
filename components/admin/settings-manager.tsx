"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, CheckCircle } from "lucide-react"
import type { ContactInfo } from "@/lib/types"

interface SettingsManagerProps {
  initialContactInfo: ContactInfo | null
}

export function SettingsManager({ initialContactInfo }: SettingsManagerProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setIsSaved(false)

    const formData = new FormData(event.currentTarget)
    const data = {
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      opening_hours: formData.get("opening_hours") as string,
      map_url: formData.get("map_url") as string || null,
    }

    const supabase = createClient()

    if (initialContactInfo) {
      await supabase
        .from("contact_info")
        .update(data)
        .eq("id", initialContactInfo.id)
    } else {
      await supabase.from("contact_info").insert([data])
    }

    setIsSubmitting(false)
    setIsSaved(true)
    router.refresh()

    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Address
            </label>
            <Textarea
              id="address"
              name="address"
              defaultValue={initialContactInfo?.address || ""}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={initialContactInfo?.phone || ""}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={initialContactInfo?.email || ""}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="opening_hours" className="text-sm font-medium">
              Opening Hours
            </label>
            <Textarea
              id="opening_hours"
              name="opening_hours"
              defaultValue={initialContactInfo?.opening_hours || ""}
              rows={3}
              placeholder="Mon - Sat: 10:00 AM - 10:00 PM&#10;Sunday: 11:00 AM - 9:00 PM"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="map_url" className="text-sm font-medium">
              Google Maps Embed URL (Optional)
            </label>
            <Input
              id="map_url"
              name="map_url"
              type="url"
              defaultValue={initialContactInfo?.map_url || ""}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-muted-foreground">
              Go to Google Maps, click Share, then Embed, and copy the src URL from the iframe code.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" className="gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            {isSaved && (
              <span className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Saved successfully
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
