import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MenuDisplay } from "@/components/menu/menu-display"

export const metadata: Metadata = {
  title: "Our Menu - Amrit Aahar Fast Food Cafe",
  description: "Explore our delicious menu featuring authentic Indian fast food items - samosas, chaats, biryanis, and more!",
}

export default async function MenuPage() {
  const supabase = await createClient()
  
  const { data: categories } = await supabase
    .from("menu_categories")
    .select("*")
    .order("sort_order")

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*, category:menu_categories(*)")
    .eq("is_available", true)
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
                Explore Our
              </p>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                Delicious Menu
              </h1>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                From traditional starters to mouthwatering main courses, discover the authentic flavors of India
              </p>
            </div>
          </div>
        </section>

        {/* Menu Display */}
        <MenuDisplay categories={categories || []} items={menuItems || []} />
      </main>
      <Footer />
    </div>
  )
}
