"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { MenuCategory } from "@/lib/types"

interface CategoriesManagerProps {
  initialCategories: MenuCategory[]
}

export function CategoriesManager({ initialCategories }: CategoriesManagerProps) {
  const router = useRouter()
  const [categories, setCategories] = useState(initialCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string || null,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    }

    const supabase = createClient()

    if (editingCategory) {
      const { error } = await supabase
        .from("menu_categories")
        .update(data)
        .eq("id", editingCategory.id)

      if (!error) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id ? { ...cat, ...data } : cat
          )
        )
      }
    } else {
      const { data: newCategory, error } = await supabase
        .from("menu_categories")
        .insert([data])
        .select()
        .single()

      if (!error && newCategory) {
        setCategories((prev) => [...prev, newCategory])
      }
    }

    setIsSubmitting(false)
    setIsDialogOpen(false)
    setEditingCategory(null)
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category?")) return

    const supabase = createClient()
    const { error } = await supabase
      .from("menu_categories")
      .delete()
      .eq("id", id)

    if (!error) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
      router.refresh()
    }
  }

  function openEditDialog(category: MenuCategory) {
    setEditingCategory(category)
    setIsDialogOpen(true)
  }

  function openNewDialog() {
    setEditingCategory(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCategory?.name || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingCategory?.description || ""}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="sort_order" className="text-sm font-medium">
                  Sort Order
                </label>
                <Input
                  id="sort_order"
                  name="sort_order"
                  type="number"
                  defaultValue={editingCategory?.sort_order || 0}
                />
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditDialog(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {category.description || "No description"}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Sort order: {category.sort_order}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories yet. Add your first category!</p>
        </div>
      )}
    </div>
  )
}
