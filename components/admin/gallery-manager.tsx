"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { GalleryImage } from "@/lib/types"

interface GalleryManagerProps {
  initialImages: GalleryImage[]
}

export function GalleryManager({ initialImages }: GalleryManagerProps) {
  const router = useRouter()
  const [images, setImages] = useState(initialImages)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      image_url: formData.get("image_url") as string,
      caption: formData.get("caption") as string || null,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    }

    const supabase = createClient()

    if (editingImage) {
      const { error } = await supabase
        .from("gallery_images")
        .update(data)
        .eq("id", editingImage.id)

      if (!error) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === editingImage.id ? { ...img, ...data } : img
          )
        )
      }
    } else {
      const { data: newImage, error } = await supabase
        .from("gallery_images")
        .insert([data])
        .select()
        .single()

      if (!error && newImage) {
        setImages((prev) => [...prev, newImage])
      }
    }

    setIsSubmitting(false)
    setIsDialogOpen(false)
    setEditingImage(null)
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return

    const supabase = createClient()
    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id)

    if (!error) {
      setImages((prev) => prev.filter((img) => img.id !== id))
      router.refresh()
    }
  }

  function openEditDialog(image: GalleryImage) {
    setEditingImage(image)
    setIsDialogOpen(true)
  }

  function openNewDialog() {
    setEditingImage(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingImage ? "Edit Image" : "Add New Image"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="image_url" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={editingImage?.image_url || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="caption" className="text-sm font-medium">
                  Caption
                </label>
                <Input
                  id="caption"
                  name="caption"
                  defaultValue={editingImage?.caption || ""}
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
                  defaultValue={editingImage?.sort_order || 0}
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={image.image_url}
                alt={image.caption || "Gallery image"}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {image.caption || "No caption"}
                </p>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(image)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No gallery images yet. Add your first image!</p>
        </div>
      )}
    </div>
  )
}
