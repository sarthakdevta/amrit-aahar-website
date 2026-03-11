import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const features = [
  "Fresh ingredients sourced daily",
  "Traditional family recipes",
  "Hygienic kitchen practices",
  "Quick and friendly service",
  "Affordable prices",
  "100% vegetarian options available",
]

export function AboutPreview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <img
                src="/images/restaurant-interior.jpg"
                alt="Client Restaurant Website restaurant interior"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-lg">
              <p className="text-4xl font-bold">X+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
                About Us
              </p>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
                A Legacy of Authentic Indian Flavors
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 20XX, Client Restaurant Website Fast Food Cafe has been serving the community with authentic Indian fast food that brings families together. Our recipes have been passed down through generations, ensuring every dish carries the warmth and tradition of Indian cuisine.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe in using only the freshest ingredients and maintaining the highest standards of hygiene to provide you with a dining experience that is both delicious and safe.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
