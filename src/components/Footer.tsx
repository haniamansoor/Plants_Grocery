import { ArrowRight } from "lucide-react"
import { useState, type FormEvent } from "react"
import { useApp } from "../context/AppContext"
import type { Page } from "../types"

export default function Footer() {
  const { setCurrentPage } = useApp()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const nav = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <>
      <section className="section-screen bg-primary text-primary-foreground">
        <div className="section-shell max-w-3xl text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            The Verde Letter
          </span>
          <h2 className="mb-6 text-4xl font-serif md:text-6xl">
            A little greenery in your inbox.
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Plant care tips, new arrivals, and thoughtful ideas for a greener
            home.
          </p>
          {subscribed ? (
            <p className="text-lg font-medium text-primary-foreground/90">
              Welcome to the garden.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mx-auto flex max-w-xl flex-col gap-3 rounded-full sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="min-h-14 flex-1 rounded-full border border-white/20 bg-white/10 px-6 text-primary-foreground placeholder:text-primary-foreground/50 transition-colors focus:border-white/60 focus:outline-none"
              />
              <button className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-medium text-primary transition-colors hover:bg-white/90">
                Join the garden <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="section-screen border-t border-border bg-background">
        <div className="section-shell">
          <div className="mb-16 grid grid-cols-2 gap-10 md:mb-20 md:grid-cols-5 md:gap-8">
            <div className="col-span-2">
              <button
                onClick={() => nav("home")}
                className="mb-6 block font-serif text-3xl font-semibold tracking-wide text-primary"
              >
                VERDE
              </button>
              <p className="max-w-sm text-sm leading-relaxed text-foreground/60">
                Premium botanical arrangements and curated plants for modern
                living spaces.
              </p>
            </div>

            <div>
              <h4 className="mb-6 text-sm font-medium">Shop</h4>
              <ul className="space-y-4 text-sm text-foreground/70">
                <li>
                  <button
                    onClick={() => nav("plants")}
                    className="transition-colors hover:text-primary"
                  >
                    All Plants
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => nav("flowers")}
                    className="transition-colors hover:text-primary"
                  >
                    Fresh Flowers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => nav("collections")}
                    className="transition-colors hover:text-primary"
                  >
                    Collections
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => nav("favorites")}
                    className="transition-colors hover:text-primary"
                  >
                    Favorites
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-sm font-medium">About</h4>
              <ul className="space-y-4 text-sm text-foreground/70">
                <li>
                  <span className="cursor-default">Our Story</span>
                </li>
                <li>
                  <span className="cursor-default">Sustainability</span>
                </li>
                <li>
                  <span className="cursor-default">Journal</span>
                </li>
                <li>
                  <span className="cursor-default">Careers</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-sm font-medium">Help</h4>
              <ul className="space-y-4 text-sm text-foreground/70">
                <li>
                  <span className="cursor-default">Plant Care</span>
                </li>
                <li>
                  <span className="cursor-default">Shipping & Returns</span>
                </li>
                <li>
                  <span className="cursor-default">FAQ</span>
                </li>
                <li>
                  <span className="cursor-default">Contact Us</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-border/50 pt-8 md:flex-row">
            <p className="text-xs text-foreground/50">
              Copyright {new Date().getFullYear()} Verde. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-foreground/70 sm:gap-6">
              <span className="cursor-pointer transition-colors hover:text-primary">
                Instagram
              </span>
              <span className="cursor-pointer transition-colors hover:text-primary">
                Pinterest
              </span>
              <span className="cursor-pointer transition-colors hover:text-primary">
                LinkedIn
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
