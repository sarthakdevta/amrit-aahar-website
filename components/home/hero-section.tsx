import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                Welcome to Client Restaurant Website
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Authentic Indian Fast Food, Made Fresh Daily
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Experience the perfect blend of traditional Indian flavors and quick service. From crispy samosas to flavorful biryanis, we bring you the taste of India.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/menu">
                  Explore Menu
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Years of Service</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Menu Items</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src="/images/hero-food.jpg"
                alt="Delicious Indian food platter with various dishes"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🍴</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">100% Vegetarian</p>
                  <p className="text-sm text-muted-foreground">Pure Veg Options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
