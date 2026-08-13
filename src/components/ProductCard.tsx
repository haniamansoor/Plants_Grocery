import { Heart, ShoppingBag, Star } from "lucide-react"
import { useApp } from "../context/AppContext"
import type { Product } from "../types"

interface Props {
  product: Product
  size?: "default" | "large"
}

export default function ProductCard({ product, size = "default" }: Props) {
  const { addToCart, toggleFavorite, isFavorite } = useApp()
  const favorited = isFavorite(product.id)

  return (
    <article className="group cursor-pointer">
      <div
        className={`bg-secondary relative overflow-hidden mb-4 rounded-[6px] soft-shadow ${
          size === "large" ? "aspect-[3/4]" : "aspect-[4/5]"
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur text-foreground p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
          style={{
            opacity: favorited ? 1 : undefined,
          }}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={16}
            strokeWidth={2}
            className={
              favorited ? "fill-accent text-accent" : "group-hover:text-accent"
            }
          />
        </button>

        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-primary/95 text-primary-foreground text-sm font-medium py-3 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-primary"
        >
          <ShoppingBag size={15} strokeWidth={1.5} />
          Add to Cart
        </button>
      </div>

      <div>
        <span className="text-[11px] uppercase tracking-wider text-foreground/50 block mb-1.5">
          {product.subCategory}
        </span>
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-medium text-foreground text-sm md:text-base leading-snug">
            {product.name}
          </h3>
          <div className="flex flex-col items-end flex-shrink-0">
            {product.originalPrice && (
              <span className="text-xs text-foreground/40 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-primary font-medium text-sm">
              ${product.price}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-olive text-olive"
                    : "text-foreground/20"
                }
              />
            ))}
          </div>
          <span className="text-[11px] text-foreground/50">
            ({product.reviews})
          </span>
        </div>
        {product.careLevel && (
          <span
            className={`inline-block mt-2 rounded-full text-[10px] uppercase tracking-wider px-2.5 py-1 font-medium ${
              product.careLevel === "Easy"
                ? "bg-secondary text-olive"
                : product.careLevel === "Medium"
                  ? "bg-muted/50 text-accent"
                  : "bg-accent/10 text-accent"
            }`}
          >
            {product.careLevel} care
          </span>
        )}
      </div>
    </article>
  )
}
