import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GalleryGrid } from "@/components/gallery/gallery-grid"

export const metadata: Metadata = {
  title: "Gallery - Client Restaurant Website",
  description: "Take a visual tour of our restaurant, dishes, and happy customers at Client Restaurant Website.",
}

export default async function GalleryPage() {
  const supabase = await createClient()
  
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
                Visual Tour
              </p>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                Our Gallery
              </h1>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Take a peek into our kitchen, delicious dishes, and the warm ambiance of Client Restaurant Website
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <GalleryGrid images={images || []} />
      </main>
      <Footer />
    </div>
  )
}
