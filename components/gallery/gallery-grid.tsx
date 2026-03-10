"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { GalleryImage } from "@/lib/types"

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  if (images.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No gallery images available yet.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <img
                  src={image.image_url}
                  alt={image.caption || "Gallery image"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {image.caption && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="p-4 text-sm text-white">{image.caption}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-h-[90vh] max-w-[90vw]">
            <img
              src={selectedImage.image_url}
              alt={selectedImage.caption || "Gallery image"}
              className="max-h-[85vh] max-w-full object-contain"
            />
            {selectedImage.caption && (
              <p className="mt-4 text-center text-white">{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
