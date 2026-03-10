"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { MenuItem, MenuCategory } from "@/lib/types"

interface MenuItemsManagerProps {
  initialItems: MenuItem[]
  categories: MenuCategory[]
}

export function MenuItemsManager({ initialItems, categories }: MenuItemsManagerProps) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string || null,
      price: parseFloat(formData.get("price") as string),
      category_id: formData.get("category_id") as string,
      image_url: formData.get("image_url") as string || null,
      is_vegetarian: formData.get("is_vegetarian") === "on",
      is_available: formData.get("is_available") === "on",
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    }

    const supabase = createClient()

    if (editingItem) {
      const { error } = await supabase
        .from("menu_items")
        .update(data)
        .eq("id", editingItem.id)

      if (!error) {
        const category = categories.find((c) => c.id === data.category_id)
        setItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? { ...item, ...data, category }
              : item
          )
        )
      }
    } else {
      const { data: newItem, error } = await supabase
        .from("menu_items")
        .insert([data])
        .select("*, category:menu_categories(*)")
        .single()

      if (!error && newItem) {
        setItems((prev) => [...prev, newItem])
      }
    }

    setIsSubmitting(false)
    setIsDialogOpen(false)
    setEditingItem(null)
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return

    const supabase = createClient()
    const { error } = await supabase.from("menu_items").delete().eq("id", id)

    if (!error) {
      setItems((prev) => prev.filter((item) => item.id !== id))
      router.refresh()
    }
  }

  async function toggleAvailability(item: MenuItem) {
    const supabase = createClient()
    const { error } = await supabase
      .from("menu_items")
      .update({ is_available: !item.is_available })
      .eq("id", item.id)

    if (!error) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, is_available: !i.is_available } : i
        )
      )
      router.refresh()
    }
  }

  function openEditDialog(item: MenuItem) {
    setEditingItem(item)
    setIsDialogOpen(true)
  }

  function openNewDialog() {
    setEditingItem(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingItem?.name || ""}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category_id" className="text-sm font-medium">Category</label>
                <Select name="category_id" defaultValue={editingItem?.category_id || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingItem?.description || ""}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price (INR)</label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingItem?.price || ""}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image_url" className="text-sm font-medium">Image URL</label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={editingItem?.image_url || ""}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sort_order" className="text-sm font-medium">Sort Order</label>
                <Input
                  id="sort_order"
                  name="sort_order"
                  type="number"
                  defaultValue={editingItem?.sort_order || 0}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_vegetarian"
                  name="is_vegetarian"
                  defaultChecked={editingItem?.is_vegetarian ?? true}
                />
                <label htmlFor="is_vegetarian" className="text-sm font-medium">Vegetarian</label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_available"
                  name="is_available"
                  defaultChecked={editingItem?.is_available ?? true}
                />
                <label htmlFor="is_available" className="text-sm font-medium">Available</label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className={!item.is_available ? "opacity-60" : ""}>
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={item.image_url || "/images/placeholder-food.jpg"}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">₹{item.price}</span>
                <div className="flex gap-2">
                  {item.is_vegetarian && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Veg</Badge>
                  )}
                  <Badge
                    variant={item.is_available ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => toggleAvailability(item)}
                  >
                    {item.is_available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              {item.category && (
                <p className="text-xs text-muted-foreground mt-2">{item.category.name}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No menu items yet. Add your first item!</p>
        </div>
      )}
    </div>
  )
}
