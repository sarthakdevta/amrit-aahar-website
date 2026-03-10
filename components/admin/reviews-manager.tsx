"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Star, Check, X } from "lucide-react"
import type { CustomerReview } from "@/lib/types"

interface ReviewsManagerProps {
  initialReviews: CustomerReview[]
}

export function ReviewsManager({ initialReviews }: ReviewsManagerProps) {
  const router = useRouter()
  const [reviews, setReviews] = useState(initialReviews)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      customer_name: formData.get("customer_name") as string,
      rating: parseInt(formData.get("rating") as string),
      review_text: formData.get("review_text") as string || null,
      is_approved: true,
    }

    const supabase = createClient()
    const { data: newReview, error } = await supabase
      .from("customer_reviews")
      .insert([data])
      .select()
      .single()

    if (!error && newReview) {
      setReviews((prev) => [newReview, ...prev])
    }

    setIsSubmitting(false)
    setIsDialogOpen(false)
    router.refresh()
  }

  async function toggleApproval(review: CustomerReview) {
    const supabase = createClient()
    const { error } = await supabase
      .from("customer_reviews")
      .update({ is_approved: !review.is_approved })
      .eq("id", review.id)

    if (!error) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === review.id ? { ...r, is_approved: !r.is_approved } : r
        )
      )
      router.refresh()
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this review?")) return

    const supabase = createClient()
    const { error } = await supabase
      .from("customer_reviews")
      .delete()
      .eq("id", id)

    if (!error) {
      setReviews((prev) => prev.filter((r) => r.id !== id))
      router.refresh()
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const pendingCount = reviews.filter((r) => !r.is_approved).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {pendingCount} pending review{pendingCount !== 1 ? "s" : ""}
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="customer_name" className="text-sm font-medium">
                  Customer Name
                </label>
                <Input id="customer_name" name="customer_name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="rating" className="text-sm font-medium">
                  Rating
                </label>
                <Select name="rating" defaultValue="5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Star{num !== 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="review_text" className="text-sm font-medium">
                  Review Text
                </label>
                <Textarea id="review_text" name="review_text" rows={4} />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className={!review.is_approved ? "border-yellow-500/50 bg-yellow-50/50" : ""}
          >
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  {review.customer_name}
                  {!review.is_approved && (
                    <Badge variant="outline" className="text-yellow-700 border-yellow-500">
                      Pending
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleApproval(review)}
                  title={review.is_approved ? "Disapprove" : "Approve"}
                >
                  {review.is_approved ? (
                    <X className="h-4 w-4 text-destructive" />
                  ) : (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(review.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {review.review_text && (
                <p className="text-sm text-muted-foreground mb-2">
                  {`"${review.review_text}"`}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {formatDate(review.created_at)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reviews yet.</p>
        </div>
      )}
    </div>
  )
}
