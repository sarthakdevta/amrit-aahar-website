import { createClient } from "@/lib/supabase/server"
import { ReviewsManager } from "@/components/admin/reviews-manager"

export default async function AdminReviewsPage() {
  const supabase = await createClient()
  
  const { data: reviews } = await supabase
    .from("customer_reviews")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Manage and moderate customer reviews
        </p>
      </div>

      <ReviewsManager initialReviews={reviews || []} />
    </div>
  )
}
