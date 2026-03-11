import Link from "next/link"
import { MapPin, Phone, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Amrit Aahar</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fresh and delicious fast food served with hygiene and quality. 
              Visit Amrit Aahar Fast Food Cafe for authentic taste and quick service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="/menu" className="text-sm text-muted-foreground hover:text-primary">
                Menu
              </Link>
              <Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary">
                Gallery
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary mt-1" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Vaibhav+Merige+Garden+Kolar+Road+Bhopal"
                target="_blank"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Shop no 01, Vaibhav Merige Garden,  
                Kolar Rd, Lalita Nagar,  
                Bhopal, Madhya Pradesh 462042
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              <a
                href="tel:+919630155945"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                090095 85458
              </a>
            </div>

            <a
  href="https://wa.me/919009585458"
  target="_blank"
  className="text-sm text-primary hover:underline"
>
  Chat on WhatsApp
</a>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Opening Hours</h4>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              <div className="text-sm text-muted-foreground">
                <p>Monday - Sunday</p>
                <p>10:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Amrit Aahar Fast Food Cafe
          </p>

          <Link
            href="/admin/login"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Admin Login
          </Link>
        </div>

      </div>
    </footer>
  )
}