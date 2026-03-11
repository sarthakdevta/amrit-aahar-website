import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Check, Award, Users, Heart, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Client Restaurant Website",
  description: "Learn about our story, our commitment to quality, and the passion behind Client Restaurant Website.",
}

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every dish is prepared with care and passion, just like home-cooked food.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "We use only the freshest ingredients and maintain strict quality standards.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "We are proud to serve our local community and be part of your celebrations.",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Fast food does not mean compromised quality - we deliver both speed and taste.",
  },
]

const milestones = [
  { year: "2010", event: "Client Restaurant Website opened its doors with a small menu of 15 items" },
  { year: "2013", event: "Expanded kitchen and introduced 20 new dishes" },
  { year: "2016", event: "Recognized as Best Fast Food in the locality" },
  { year: "2019", event: "Served our 50,000th customer" },
  { year: "2022", event: "Renovated with modern amenities while keeping traditional taste" },
  { year: "2024", event: "Launched online ordering and delivery services" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
                Our Story
              </p>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
                About Client Restaurant Website
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                A family-owned restaurant dedicated to bringing authentic Indian fast food to your table since 2010.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Our Journey
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Client Restaurant Website was born out of a simple dream - to share the authentic flavors of Indian street food with our community. Founded by the Sharma family in 2010, we started as a small eatery with just a handful of signature dishes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Over the years, our commitment to quality, taste, and customer satisfaction has helped us grow into one of the most beloved fast food destinations in the area. Our recipes have been passed down through generations, ensuring that every bite carries the warmth and tradition of Indian cuisine.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we are proud to serve thousands of satisfied customers with a diverse menu that celebrates the rich culinary heritage of India. From crispy samosas to aromatic biryanis, each dish is prepared fresh with love and care.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src="/images/about-story.jpg"
                    alt="The Sharma family in front of Client Restaurant Website"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do at Client Restaurant Website
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Our Milestones</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Key moments in our journey
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`flex flex-col md:flex-row gap-4 md:gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className={`inline-block bg-card rounded-lg p-6 border border-border shadow-sm ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
                        <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                        <p className="mt-2 text-muted-foreground">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Promise to You</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                At Client Restaurant Website, we promise to always serve you food that is fresh, hygienic, and made with the finest ingredients. We treat every customer like family and strive to make your dining experience memorable.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2 text-left max-w-xl mx-auto">
                {[
                  "100% fresh ingredients daily",
                  "No artificial preservatives",
                  "Hygienic preparation",
                  "Consistent quality & taste",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-5 w-5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
