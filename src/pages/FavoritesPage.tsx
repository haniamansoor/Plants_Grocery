import { Heart, ArrowRight } from "lucide-react"
import { useApp } from "../context/AppContext"
import { allProducts } from "../data/products"
import ProductCard from "../components/ProductCard"

export default function FavoritesPage() {
  const { favorites, setCurrentPage } = useApp()

  const favProducts = allProducts.filter((p) => favorites.includes(p.id))

  return (
    <div className="bg-background">
      <section className="section-screen section-screen--top bg-background">
        <div className="section-shell">
          <div className="mb-10 border-b border-border pb-8 md:mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Heart size={20} className="text-primary" strokeWidth={1.5} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Your Wishlist
              </span>
            </div>
            <h1 className="text-5xl font-serif text-foreground md:text-6xl">
              Favorites
            </h1>
            {favProducts.length > 0 && (
              <p className="mt-3 text-foreground/60">
                {favProducts.length}{" "}
                {favProducts.length === 1 ? "item" : "items"} saved
              </p>
            )}
          </div>

          {favProducts.length === 0 ? (
            <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                <Heart
                  size={36}
                  strokeWidth={1}
                  className="text-foreground/30"
                />
              </div>
              <h2 className="mb-4 text-3xl font-serif text-foreground">
                Nothing saved yet
              </h2>
              <p className="mb-10 max-w-sm text-foreground/60">
                Tap the heart icon on any plant or flower to save it here for
                later.
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <button
                  onClick={() => {
                    setCurrentPage("plants")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Browse Plants <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("flowers")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-white/50 px-8 text-sm font-medium transition-colors hover:bg-white"
                >
                  Browse Flowers
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
                {favProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="mb-1 text-xl font-serif text-foreground">
                    Keep exploring
                  </p>
                  <p className="text-sm text-foreground/60">
                    Find more beautiful plants and flowers.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => {
                      setCurrentPage("plants")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Plants
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("flowers")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-white/50 px-6 text-sm font-medium transition-colors hover:bg-white"
                  >
                    Flowers
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
