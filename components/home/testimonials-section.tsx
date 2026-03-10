import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { CustomerReview } from "@/lib/types"

interface TestimonialsSectionProps {
  reviews: CustomerReview[]
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  if (reviews.length === 0) return null

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Hear from our happy customers who keep coming back for more
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
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
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {`"${review.review_text || (review as any).review || ''}"`}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-semibold text-primary">
                      {(review.customer_name || (review as any).name || 'A').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{review.customer_name || (review as any).name}</p>
                    <p className="text-xs text-muted-foreground">Happy Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
