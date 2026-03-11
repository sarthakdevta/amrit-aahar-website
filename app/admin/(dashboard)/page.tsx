import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, FolderOpen, Image, MessageSquare, Star } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  
  const [
    { count: categoriesCount },
    { count: menuItemsCount },
    { count: galleryCount },
    { count: messagesCount },
    { count: unreadMessagesCount },
    { count: reviewsCount },
    { count: pendingReviewsCount },
  ] = await Promise.all([
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("menu_items").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("customer_reviews").select("*", { count: "exact", head: true }),
    supabase.from("customer_reviews").select("*", { count: "exact", head: true }).eq("is_approved", false),
  ])

  const stats = [
    {
      title: "Menu Categories",
      value: categoriesCount || 0,
      icon: FolderOpen,
      href: "/admin/categories",
    },
    {
      title: "Menu Items",
      value: menuItemsCount || 0,
      icon: UtensilsCrossed,
      href: "/admin/menu",
    },
    {
      title: "Gallery Images",
      value: galleryCount || 0,
      icon: Image,
      href: "/admin/gallery",
    },
    {
      title: "Messages",
      value: messagesCount || 0,
      subtitle: `${unreadMessagesCount || 0} unread`,
      icon: MessageSquare,
      href: "/admin/messages",
    },
    {
      title: "Reviews",
      value: reviewsCount || 0,
      subtitle: `${pendingReviewsCount || 0} pending`,
      icon: Star,
      href: "/admin/reviews",
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Client Restaurant Website Admin Dashboard
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/menu?new=true"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              Add New Menu Item
            </Link>
            <Link
              href="/admin/gallery?new=true"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              Upload Gallery Image
            </Link>
            <Link
              href="/admin/messages"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              View Messages ({unreadMessagesCount || 0} unread)
            </Link>
            <Link
              href="/admin/reviews"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              Moderate Reviews ({pendingReviewsCount || 0} pending)
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              View Homepage
            </a>
            <a
              href="/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              View Menu Page
            </a>
            <a
              href="/gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              View Gallery Page
            </a>
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              View Contact Page
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
