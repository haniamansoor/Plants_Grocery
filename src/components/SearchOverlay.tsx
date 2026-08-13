import { useState, useEffect, useRef } from "react"
import { Search, X, ArrowRight } from "lucide-react"
import { useApp } from "../context/AppContext"
import { allProducts } from "../data/products"
import type { Product } from "../types"

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, setCurrentPage, addToCart } = useApp()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery("")
      setResults([])
    }
  }, [isSearchOpen])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setResults([])
      return
    }
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q),
    )
    setResults(filtered.slice(0, 8))
  }, [query])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [setIsSearchOpen])

  const handleResultClick = (product: Product) => {
    setCurrentPage(product.category === "plant" ? "plants" : "flowers")
    setIsSearchOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const popularSearches = [
    "Monstera",
    "Snake Plant",
    "Peonies",
    "Sunflowers",
    "Easy Care",
    "Indoor",
  ]

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isSearchOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsSearchOpen(false)}
      />
      <div
        className={`relative bg-background max-w-2xl mx-auto mt-16 mx-4 md:mx-auto shadow-2xl transition-all duration-300 ${
          isSearchOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        }`}
        style={{
          margin: "4rem auto",
          maxWidth: "672px",
          marginLeft: "1rem",
          marginRight: "1rem",
        }}
      >
        <div className="bg-background shadow-2xl" style={{ maxWidth: "672px" }}>
          <div className="flex items-center gap-4 px-6 py-5 border-b border-border">
            <Search size={20} className="text-foreground/50 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search plants, flowers, care tips..."
              className="flex-1 bg-transparent text-foreground text-lg placeholder:text-foreground/40 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-foreground/40 hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-foreground/60 hover:text-foreground transition-colors border-l border-border pl-4"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {query === "" ? (
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-foreground/40 mb-4 font-medium">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 border border-border text-sm text-foreground/70 hover:border-primary hover:text-primary transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setCurrentPage("plants")
                      setIsSearchOpen(false)
                    }}
                    className="flex items-center justify-between p-4 bg-secondary hover:bg-secondary/80 transition-colors group"
                  >
                    <span className="font-medium text-sm">Browse Plants</span>
                    <ArrowRight
                      size={16}
                      className="text-foreground/50 group-hover:text-primary transition-colors"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("flowers")
                      setIsSearchOpen(false)
                    }}
                    className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors group"
                  >
                    <span className="font-medium text-sm">Browse Flowers</span>
                    <ArrowRight
                      size={16}
                      className="text-foreground/50 group-hover:text-primary transition-colors"
                    />
                  </button>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-foreground/60 mb-2">
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-sm text-foreground/40">
                  Try a different search term
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      onClick={() => handleResultClick(product)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-secondary/40 transition-colors text-left group"
                    >
                      <div className="w-14 h-14 bg-secondary flex-shrink-0 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-foreground/50 mb-0.5">
                          {product.subCategory}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-foreground/60 mt-0.5 line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="text-sm font-medium text-primary">
                          ${product.price}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product)
                          }}
                          className="text-xs bg-primary text-primary-foreground px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/90"
                        >
                          Add
                        </button>
                      </div>
                    </button>
                  </li>
                ))}
                <li className="p-4 text-center">
                  <button
                    onClick={() => {
                      setCurrentPage(
                        results[0].category === "plant" ? "plants" : "flowers",
                      )
                      setIsSearchOpen(false)
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    View all {results.length} results
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
