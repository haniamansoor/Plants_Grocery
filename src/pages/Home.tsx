import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Truck,
  Leaf,
  Recycle,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { plants, flowers } from "../data/products";
import type { Page } from "../types";

const tabs = ["All", "Plants", "Flowers"] as const;
type Tab = (typeof tabs)[number];

const featuredPlants = plants.filter((p) => p.featured).slice(0, 2);
const featuredFlowers = flowers.filter((p) => p.featured).slice(0, 2);
const allFeatured = [...featuredPlants, ...featuredFlowers];

const categories = [
  {
    name: "Indoor Plants",
    img: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=800&q=80",
    page: "plants" as Page,
  },
  {
    name: "Outdoor Plants",
    img: "https://images.unsplash.com/photo-1759773892901-ba0d60124955?w=800&q=80",
    page: "plants" as Page,
  },
  {
    name: "Fresh Flowers",
    img: "https://images.unsplash.com/photo-1572454591674-2739f30d8c40?w=800&q=80",
    page: "flowers" as Page,
  },
  {
    name: "Collections",
    img: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&q=80",
    page: "collections" as Page,
  },
];

const benefits = [
  {
    icon: CheckCircle2,
    title: "Carefully Selected",
    desc: "Healthy, quality plants hand-picked for your space.",
  },
  {
    icon: Truck,
    title: "Delivered Fresh",
    desc: "Handled with care from our greenhouse to your door.",
  },
  {
    icon: Leaf,
    title: "Plant Care Support",
    desc: "Simple guidance and tips for every plant journey.",
  },
  {
    icon: Recycle,
    title: "Sustainable Packaging",
    desc: "Thoughtful materials that protect each order and reduce waste.",
  },
];

const flowerMoments = [
  {
    title: "For Your Home",
    img: "https://images.unsplash.com/photo-1558879860-45f24b366ea1?w=800&q=80",
  },
  {
    title: "For Someone Special",
    img: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80",
  },
  {
    title: "For Every Celebration",
    img: "https://images.unsplash.com/photo-1531120364508-a6b656c3e78d?w=800&q=80",
  },
];

const articles = [
  {
    title: "How often should I water my plant?",
    desc: "A simple guide to understanding your plant's watering needs and avoiding common mistakes.",
    img: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80",
  },
  {
    title: "5 beginner-friendly houseplants",
    desc: "Start your green journey with resilient plants that make the first step feel easy.",
    img: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=800&q=80",
  },
  {
    title: "Signs your plant needs attention",
    desc: "Learn to read your plant's leaves and solve issues before they become serious problems.",
    img: "https://images.unsplash.com/photo-1583753075968-1236ccb83c66?w=800&q=80",
  },
];

export default function Home() {
  const { setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const nav = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayed =
    activeTab === "All"
      ? allFeatured
      : activeTab === "Plants"
        ? featuredPlants
        : featuredFlowers;

  return (
    <div className="bg-background">
      <section className="section-screen section-screen--top hero-landing bg-background">
        <div className="section-shell hero-landing__shell grid items-end gap-10 md:grid-cols-[0.92fr_0.88fr] lg:gap-14">
          <div className="max-w-xl ">
            <h1 className="mb-6 font-salty xl:font-bold text-5xl leading-[0.96] text-foreground text-balance md:text-6xl lg:text-7xl xl:text-7xl">
              Bring a little{" "}
              <span className="italic text-primary">more life</span> home.
            </h1>
            <p className="mb-9 max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
              Discover carefully selected plants and flowers designed to make
              every space feel alive.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={() => nav("plants")}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Shop Plants
              </button>
              <button
                onClick={() => nav("flowers")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-white/50 px-8 text-sm font-medium text-foreground transition-colors hover:bg-white"
              >
                Explore Flowers
              </button>
            </div>
          </div>

          <div className="image-frame soft-shadow h-[38vh] min-h-64 bg-secondary md:h-[60vh] lg:h-[66vh]">
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1080&q=80"
              alt="Curated indoor plants"
              className="h-full w-full object-cover object-center transition-transform duration-1000 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section className="section-screen bg-white">
        <div className="section-shell">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Shop the Greenhouse
              </span>
              <h2 className="text-3xl font-serif text-foreground md:text-5xl">
                Shop by category
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-foreground/60">
              A quick path to the plants, flowers, and collections that fit your
              space.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => nav(cat.page)}
                className="group image-frame relative aspect-[4/5] bg-secondary text-left soft-shadow sm:aspect-[3/4]"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
                  <h3 className="font-serif text-xl leading-tight text-white md:text-2xl">
                    {cat.name}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-transform group-hover:-translate-y-1">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-screen bg-background">
        <div className="section-shell">
          <div className="mb-10 text-center md:mb-14">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Current Favorites
            </span>
            <h2 className="mb-6 text-3xl font-serif text-foreground md:text-5xl">
              Trending right now
            </h2>
            <div className="mx-auto inline-flex rounded-full border border-border bg-white/70 p-1 text-sm font-medium">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2 transition-colors ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-7 lg:gap-x-8">
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center md:mt-12">
            <button
              onClick={() => nav("plants")}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-white/40 px-9 text-sm font-medium transition-colors hover:bg-white"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      <section className="section-screen bg-primary text-primary-foreground">
        <div className="section-shell grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="image-frame h-[36vh] min-h-72 bg-white/10 soft-shadow md:h-[68vh]">
            <img
              src="https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=1080&q=80"
              alt="Home collection plants"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="max-w-xl">
            <span className="mb-5 block text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
              The Home Collection
            </span>
            <h2 className="mb-6 text-4xl font-serif leading-[1.1] md:text-5xl lg:text-6xl">
              Plants selected for calm, beautiful everyday spaces.
            </h2>
            <p className="mb-9 max-w-md text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Curated greens that thrive indoors, bringing life and tranquility
              to your living environment.
            </p>
            <button
              onClick={() => nav("collections")}
              className="inline-flex items-center gap-2 border-b border-primary-foreground pb-1 text-sm font-medium transition-opacity hover:opacity-75"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section-screen border-y border-border bg-white">
        <div className="section-shell">
          <div className="mb-10 max-w-2xl md:mb-14">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why Verde
            </span>
            <h2 className="text-3xl font-serif text-foreground md:text-5xl">
              Thoughtful details from root to doorstep.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-[6px] border border-border bg-background/70 p-6 transition-colors hover:bg-background md:p-7"
              >
                <Icon
                  size={26}
                  strokeWidth={1.5}
                  className="mb-6 text-primary"
                />
                <h3 className="mb-3 text-xl font-serif text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-screen bg-muted">
        <div className="section-shell">
          <div className="mb-8 text-center md:mb-12">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Fresh Stems
            </span>
            <h2 className="text-4xl font-serif text-foreground md:text-5xl">
              Flowers for every moment.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {flowerMoments.map((item) => (
              <button
                key={item.title}
                onClick={() => nav("flowers")}
                className="group image-frame relative block aspect-[5/3] bg-secondary text-left soft-shadow sm:aspect-[4/5]"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
                  <h3 className="w-2/3 font-serif text-2xl leading-tight text-white">
                    {item.title}
                  </h3>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white opacity-100 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 md:opacity-0 md:group-hover:opacity-100">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-screen border-t border-border/50 bg-background">
        <div className="section-shell">
          <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Care Journal
              </span>
              <h2 className="max-w-lg text-3xl font-serif text-foreground md:text-5xl">
                A little help for your green life.
              </h2>
            </div>
            <button className="inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
              Read all articles <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {articles.map((article) => (
              <article key={article.title} className="group cursor-pointer">
                <div className="image-frame mb-5 aspect-[16/10] bg-secondary soft-shadow">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-3 text-xl font-serif transition-colors group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {article.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
