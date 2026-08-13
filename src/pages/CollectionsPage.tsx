import { ArrowRight } from "lucide-react"
import { useApp } from "../context/AppContext"
import ProductCard from "../components/ProductCard"
import { plants, flowers } from "../data/products"

const collections = [
  {
    id: "home",
    title: "The Home Collection",
    subtitle: "Calm, beautiful everyday spaces",
    description:
      "Plants and arrangements selected for their ability to transform a living space into a sanctuary. Low-maintenance, high-impact.",
    image:
      "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=1200&q=80",
    products: plants.filter((p) =>
      ["monstera-deliciosa", "snake-plant", "zz-plant", "peace-lily"].includes(
        p.id,
      ),
    ),
    color: "bg-secondary",
  },
  {
    id: "gift",
    title: "The Gift Collection",
    subtitle: "For someone you love",
    description:
      "Curated pairings of flowers and plants that arrive gift-ready - wrapped, tied, and accompanied by a personal note card.",
    image:
      "https://images.unsplash.com/photo-1623406795110-99f1c4325084?w=1200&q=80",
    products: flowers.filter((p) =>
      [
        "pink-peony-bouquet",
        "white-rose-arrangement",
        "garden-mix-bouquet",
        "blush-rose-collection",
      ].includes(p.id),
    ),
    color: "bg-muted",
  },
  {
    id: "beginner",
    title: "The Beginner Collection",
    subtitle: "Start your plant journey",
    description:
      "Plants so resilient they practically take care of themselves. Perfect first-plant gifting or for those who travel often.",
    image:
      "https://images.unsplash.com/photo-1616961162823-aeba510620c6?w=1200&q=80",
    products: plants.filter((p) => p.careLevel === "Easy").slice(0, 4),
    color: "bg-white",
  },
  {
    id: "statement",
    title: "The Statement Collection",
    subtitle: "Bold, architectural beauty",
    description:
      "When you want the plant to do the talking. These large-form specimens command attention and fill a room with life.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80",
    products: plants.filter((p) =>
      [
        "fiddle-leaf-fig",
        "bird-of-paradise",
        "rubber-plant",
        "bamboo-palm",
      ].includes(p.id),
    ),
    color: "bg-secondary",
  },
]

export default function CollectionsPage() {
  const { setCurrentPage } = useApp()

  return (
    <div className="bg-background">
      <section className="section-screen section-screen--top bg-primary text-primary-foreground">
        <div className="section-shell grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="max-w-xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Curated for You
            </span>
            <h1 className="mb-5 text-5xl font-serif md:text-6xl lg:text-7xl">
              Collections
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Thoughtfully assembled groupings of plants and flowers, each with
              a distinct mood and purpose.
            </p>
          </div>

          <div className="grid h-[42vh] min-h-72 grid-cols-2 gap-3 md:h-[70vh]">
            {collections.map((col) => (
              <div key={col.id} className="image-frame bg-white/10 soft-shadow">
                <img
                  src={col.image}
                  alt={col.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-screen bg-white">
        <div className="section-shell">
          <div className="mb-8 max-w-2xl md:mb-12">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Choose a Mood
            </span>
            <h2 className="text-3xl font-serif text-foreground md:text-5xl">
              Four easy ways to bring nature in.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {collections.map((col) => (
              <a
                key={col.id}
                href={`#${col.id}`}
                className="group image-frame relative block aspect-square bg-secondary soft-shadow"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-black/40 p-4 transition-colors group-hover:bg-black/50 md:p-6">
                  <h3 className="font-serif text-base leading-tight text-white md:text-xl">
                    {col.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {collections.map((col, idx) => (
        <section
          key={col.id}
          id={col.id}
          className={`section-screen ${col.color}`}
        >
          <div className="section-shell">
            <div className="mb-10 grid items-center gap-8 md:mb-12 md:grid-cols-2 lg:gap-16">
              <div className={`max-w-xl ${idx % 2 === 0 ? "" : "md:order-2"}`}>
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {col.subtitle}
                </span>
                <h2 className="mb-4 text-3xl font-serif text-foreground md:text-5xl">
                  {col.title}
                </h2>
                <p className="mb-8 leading-relaxed text-foreground/70">
                  {col.description}
                </p>
                <button
                  onClick={() => {
                    setCurrentPage(
                      col.products[0]?.category === "plant"
                        ? "plants"
                        : "flowers",
                    )
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  Shop the Collection <ArrowRight size={16} />
                </button>
              </div>

              <div
                className={`image-frame h-[32vh] min-h-64 bg-background soft-shadow md:h-[52vh] ${
                  idx % 2 === 0 ? "" : "md:order-1"
                }`}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-7 lg:gap-x-8">
              {col.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-screen bg-primary text-center text-primary-foreground">
        <div className="section-shell max-w-3xl">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            Personal Styling
          </span>
          <h2 className="mb-6 text-4xl font-serif md:text-6xl">
            Can't decide? We can help.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Our plant stylists are available to curate a personal selection
            based on your space and lifestyle.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => {
                setCurrentPage("plants")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-10 text-sm font-medium text-primary transition-colors hover:bg-white/90"
            >
              Browse All Plants
            </button>
            <button
              onClick={() => {
                setCurrentPage("flowers")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-10 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Browse All Flowers
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
