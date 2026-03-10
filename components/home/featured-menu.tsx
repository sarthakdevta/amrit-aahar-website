import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { MenuItem } from "@/lib/types"

interface FeaturedMenuProps {
  items: MenuItem[]
}

export function FeaturedMenu({ items }: FeaturedMenuProps) {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
            Our Specialties
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Popular Menu Items
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Discover our most loved dishes, prepared with authentic recipes and the freshest ingredients
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.image_url || "/images/placeholder-food.jpg"}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                  {(item.is_vegetarian ?? true) && (
                    <Badge variant="secondary" className="shrink-0 bg-green-100 text-green-800">
                      Veg
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ₹{item.price}
                  </span>
                  {item.category && (
                    <span className="text-xs text-muted-foreground">
                      {item.category.name}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/menu">
              View Full Menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
