import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Amrit Aahar Fast Food Cafe",
  description: "Get in touch with Amrit Aahar Fast Food Cafe. Find our location, hours, and send us a message.",
}

export default async function ContactPage() {
  const supabase = await createClient()
  
  const { data: contactInfo } = await supabase
    .from("contact_info")
    .select("*")
    .single()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
                Get in Touch
              </p>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We would love to hear from you! Reach out for orders, feedback, or any questions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Visit Us or Call
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Address</h3>
                        <p className="text-muted-foreground">
                          {contactInfo?.address || "Shop no 01, Vaibhav Merrige Garden, Kolar Rd, MP Nagar, Lalita Nagar, Kolar Rd, Bhopal, Madhya Pradesh 462042"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Phone</h3>
                        <a
                          href={`tel:${contactInfo?.phone || "+919009585458"}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {contactInfo?.phone || "+91 9009585458"}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <a
                          href={`mailto:${contactInfo?.email || "sarthakpersonal755@gmail.com"}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {contactInfo?.email || "sarthakpersonal755@gmail.com"}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Opening Hours</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {contactInfo?.opening_hours || "Mon - Sat: 10:00 AM - 10:00 PM\nSunday: 11:00 AM - 9:00 PM"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  {contactInfo?.map_url ? (
                    <iframe
                      src={contactInfo.map_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Restaurant Location"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-muted-foreground">Map coming soon</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
