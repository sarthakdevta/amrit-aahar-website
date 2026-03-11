import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MapPin } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold sm:text-4xl text-balance">
            Ready to Taste Authentic Indian Flavors?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl">
            Visit us today or call to place your order. We are ready to serve you the best Indian fast food in town!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <a href="tel:+919009585458">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/contact">
                <MapPin className="h-4 w-4" />
                Find Us
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span>Open Now</span>
            </div>
            <div>Mon - Sat: 10 AM - 10 PM</div>
            <div>Sunday: 11 AM - 9 PM</div>
          </div>
        </div>
      </div>
    </section>
  )
}
