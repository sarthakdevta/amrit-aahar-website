import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedMenu } from "@/components/home/featured-menu"
import { AboutPreview } from "@/components/home/about-preview"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: menuItems, error: menuError } = await supabase
    .from("menu_items")
    .select("*, category:categories(*)")
    .eq("is_available", true)
    .order("created_at", { ascending: false })
    .limit(6)

  const { data: reviews, error: reviewsError } = await supabase
    .from("customer_reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3)
    
  console.log("[v0] Menu items error:", menuError)
  console.log("[v0] Menu items:", menuItems)
  console.log("[v0] Reviews error:", reviewsError)
  console.log("[v0] Reviews:", reviews)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedMenu items={menuItems || []} />
        <AboutPreview />
        <TestimonialsSection reviews={reviews || []} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
