import { useState, useMemo } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"
import { plants } from "../data/products"
import ProductCard from "../components/ProductCard"

type FilterType = "All" | "Indoor Plant" | "Outdoor Plant" | "Succulent" | "Trailing Plant" | "Hanging Plant" | "Flowering Plant" | "Indoor Tree"
type CareFilter = "All" | "Easy" | "Medium" | "Expert"
type SortType = "featured" | "price-asc" | "price-desc" | "rating"

const categories: FilterType[] = [
  "All",
  "Indoor Plant",
  "Outdoor Plant",
  "Succulent",
  "Trailing Plant",
  "Hanging Plant",
  "Flowering Plant",
  "Indoor Tree",
]
const careLevels: CareFilter[] = ["All", "Easy", "Medium", "Expert"]

export default function PlantsPage() {
  const [category, setCategory] = useState<FilterType>("All")
  const [care, setCare] = useState<CareFilter>("All")
  const [sort, setSort] = useState<SortType>("featured")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...plants]
    if (category !== "All")
      result = result.filter((p) => p.subCategory === category)
    if (care !== "All") result = result.filter((p) => p.careLevel === care)
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
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }
    return result
  }, [category, care, sort])

  const clearFilters = () => {
    setCategory("All")
    setCare("All")
  }

  return (
    <div className="bg-background">
      <section className="section-screen section-screen--top bg-secondary">
        <div className="section-shell grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="max-w-xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Plant Collection
            </span>
            <h1 className="mb-5 text-5xl font-serif text-foreground md:text-6xl lg:text-7xl">
              Plants
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-foreground/70 md:text-lg">
              {plants.length} carefully selected plants for every space and
              skill level.
            </p>
          </div>

          <div className="image-frame h-[42vh] min-h-72 bg-background soft-shadow md:h-[70vh]">
            <img
              src="https://images.unsplash.com/photo-1766469284258-11bf4223e2af?w=1400&q=80"
              alt="Lush indoor plant collection"
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
                  onClick={() => setCategory(cat)}
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
            <div className="flex shrink-0 items-center gap-4">
              <div className="flex items-center gap-2">
                {careLevels.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCare(c)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      care === c
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground/60 hover:border-foreground/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortType)}
                className="rounded-full border border-border bg-background px-4 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 py-3 lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-foreground/70"
            >
              <SlidersHorizontal size={16} />
              Filters
              {(category !== "All" || care !== "All") && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {(category !== "All" ? 1 : 0) + (care !== "All" ? 1 : 0)}
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
            <div className="space-y-4 pb-4 lg:hidden">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-wider text-foreground/50">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
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
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-wider text-foreground/50">
                  Care Level
                </p>
                <div className="flex flex-wrap gap-2">
                  {careLevels.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCare(c)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        care === c
                          ? "border-primary text-primary"
                          : "border-border text-foreground/60"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="section-screen bg-background">
        <div className="section-shell">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm text-foreground/60">
              {filtered.length} {filtered.length === 1 ? "plant" : "plants"}
              {category !== "All" ? ` in ${category}` : ""}
            </p>
            {(category !== "All" || care !== "All") && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Filter size={12} /> Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
              <p className="mb-4 text-2xl font-serif text-foreground">
                No plants found
              </p>
              <p className="mb-8 text-foreground/60">
                Try adjusting your filters
              </p>
              <button
                onClick={clearFilters}
                className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-screen bg-secondary">
        <div className="section-shell grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Plant Care
            </span>
            <h2 className="mb-4 text-3xl font-serif text-foreground md:text-5xl">
              Not sure where to start?
            </h2>
            <p className="mb-8 max-w-md leading-relaxed text-foreground/70">
              Every plant in our collection comes with a detailed care card.
              Beginners love our Easy Care range - beautiful plants that
              practically thrive on their own.
            </p>
            <button
              onClick={() => {
                setCategory("All")
                setCare("Easy")
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Shop Easy Care Plants
            </button>
          </div>
          <div className="image-frame h-[36vh] min-h-72 bg-background soft-shadow md:h-[66vh]">
            <img
              src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80"
              alt="Easy care plants"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
