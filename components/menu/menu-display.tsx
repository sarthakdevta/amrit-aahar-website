"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { MenuCategory, MenuItem } from "@/lib/types"

interface MenuDisplayProps {
  categories: MenuCategory[]
  items: MenuItem[]
}

export function MenuDisplay({ categories, items }: MenuDisplayProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredItems = activeCategory
    ? items.filter((item) => item.category_id === activeCategory)
    : items

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
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
                  {item.is_vegetarian && (
                    <Badge variant="secondary" className="shrink-0 bg-green-100 text-green-800">
                      Veg
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                  {item.category && (
                    <Badge variant="outline">{item.category.name}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found in this category.</p>
          </div>
        )}

        {/* Note Section */}
        <div className="mt-16 bg-muted/50 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-foreground mb-2">Note</h3>
          <p className="text-sm text-muted-foreground">
            Prices are subject to change. All items are freshly prepared and may take 10-15 minutes. 
            For bulk orders, please contact us in advance.
          </p>
        </div>
      </div>
    </section>
  )
}
