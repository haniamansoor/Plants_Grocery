import { useState, useMemo } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"
import { flowers } from "../data/products"
import ProductCard from "../components/ProductCard"

type CategoryFilter = "All" | "Seasonal Bouquet" | "Classic Arrangement" | "Casual Bouquet" | "Vase Arrangement" | "Mixed Bouquet" | "Rose Collection" | "Statement Bloom"
type SortType = "featured" | "price-asc" | "price-desc" | "rating"

const categories: CategoryFilter[] = [
  "All",
  "Seasonal Bouquet",
  "Classic Arrangement",
  "Casual Bouquet",
  "Vase Arrangement",
  "Mixed Bouquet",
  "Rose Collection",
  "Statement Bloom",
]

export default function FlowersPage() {
  const [category, setCategory] = useState<CategoryFilter>("All")
  const [sort, setSort] = useState<SortType>("featured")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...flowers]
    if (category !== "All")
      result = result.filter((p) => p.subCategory === category)
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return result
  }, [category, sort])

  const chooseCategory = (nextCategory: CategoryFilter) => {
    setCategory(nextCategory)
    setShowFilters(false)
  }

  return (
    <div className="bg-background">
      <section
        className="section-screen section-screen--top overflow-hidden bg-muted"
        style={{
          background: "linear-gradient(135deg, #E8CFC4 0%, #F7F4ED 70%)",
        }}
      >
        <div className="section-shell grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative z-10 max-w-xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Fresh & Seasonal
            </span>
            <h1 className="mb-5 text-5xl font-serif text-foreground md:text-6xl lg:text-7xl">
              Flowers
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-foreground/70 md:text-lg">
              {flowers.length} handcrafted arrangements, bouquets, and statement
              blooms for every occasion.
            </p>
          </div>

          <div className="image-frame h-[42vh] min-h-72 bg-background soft-shadow md:h-[70vh]">
            <img
              src="https://images.unsplash.com/photo-1623406795110-99f1c4325084?w=1400&q=80"
              alt="Fresh flower arrangements"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <div className="sticky top-[64px] z-20 border-b border-border bg-background/95 backdrop-blur-sm md:top-[72px]">
        <div className="section-shell px-5 sm:px-6 md:px-8">
          <div className="hidden items-center justify-between gap-5 py-4 lg:flex">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => chooseCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/60 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="shrink-0 rounded-full border border-border bg-background px-4 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-3 py-3 lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-foreground/70"
            >
              <SlidersHorizontal size={16} />
              Filter
              {category !== "All" && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  1
                </span>
              )}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="max-w-[52vw] rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {showFilters && (
            <div className="pb-4 lg:hidden">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => chooseCategory(cat)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      category === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="section-screen bg-background">
        <div className="section-shell">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm text-foreground/60">
              {filtered.length}{" "}
              {filtered.length === 1 ? "arrangement" : "arrangements"}
              {category !== "All" ? ` - ${category}` : ""}
            </p>
            {category !== "All" && (
              <button
                onClick={() => chooseCategory("All")}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Filter size={12} /> Clear
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
              <p className="mb-4 text-2xl font-serif text-foreground">
                No flowers found
              </p>
              <button
                onClick={() => chooseCategory("All")}
                className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
              >
                Show All Flowers
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} size="large" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-screen bg-muted">
        <div className="section-shell grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="image-frame h-[36vh] min-h-72 bg-background soft-shadow md:h-[66vh]">
            <img
              src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&q=80"
              alt="Premium rose arrangement"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="max-w-xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Gift Giving
            </span>
            <h2 className="mb-4 text-3xl font-serif text-foreground md:text-5xl">
              Send flowers that feel personal.
            </h2>
            <p className="mb-8 max-w-md leading-relaxed text-foreground/70">
              Every arrangement ships with a handwritten note card and arrives
              in beautiful botanical wrapping - ready to gift.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  chooseCategory("Rose Collection")
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Shop Rose Collections
              </button>
              <button
                onClick={() => {
                  chooseCategory("Mixed Bouquet")
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-white/40 px-8 text-sm font-medium transition-colors hover:bg-white"
              >
                Mixed Bouquets
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
