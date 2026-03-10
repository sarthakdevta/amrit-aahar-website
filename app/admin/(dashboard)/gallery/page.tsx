import { createClient } from "@/lib/supabase/server"
import { GalleryManager } from "@/components/admin/gallery-manager"

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order")

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
        <p className="text-muted-foreground mt-1">
          Manage your gallery images
        </p>
      </div>

      <GalleryManager initialImages={images || []} />
    </div>
  )
}
