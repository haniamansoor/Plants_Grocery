import { useState, useEffect } from "react";
import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import type { Page } from "../types";
import verdeLogo from "../assets/verde-logo.png";

const navLinks: { label: string; page: Page }[] = [
  { label: "Plants", page: "plants" },
  { label: "Flowers", page: "flowers" },
  { label: "Collections", page: "collections" },
];

export default function Navbar() {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    favorites,
    isCartOpen,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    setAuthMode,
    user,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUserClick = () => {
    if (user) {
      setCurrentPage("home");
    } else {
      setAuthMode("login");
      setIsAuthOpen(true);
    }
  };

  const isHome = currentPage === "home";
  const transparent = isHome && !isScrolled && !isMobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? "bg-transparent py-6"
            : "bg-background/95 backdrop-blur-md py-4 border-b border-border shadow-sm"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button
              onClick={() => handleNav("home")}
              className="flex items-center justify-center self-center"
              aria-label="Go to home"
            >
              <img src={verdeLogo} alt="Verde logo" />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNav("home")}
              className={`transition-colors ${
                currentPage === "home"
                  ? "text-primary border-b border-primary pb-0.5"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Shop
            </button>
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`transition-colors ${
                  currentPage === page
                    ? "text-primary border-b border-primary pb-0.5"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:block text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleUserClick}
              className="hidden sm:flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} />
              {user && (
                <span className="text-xs font-medium hidden lg:inline">
                  {user.name.split(" ")[0]}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNav("favorites")}
              className="hidden sm:block text-foreground hover:text-primary transition-colors relative"
              aria-label="Favorites"
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                className={
                  currentPage === "favorites" ? "fill-primary text-primary" : ""
                }
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-foreground hover:text-primary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="pt-24 px-8 flex flex-col gap-8">
          <button
            onClick={() => handleNav("home")}
            className="text-left text-3xl font-serif text-foreground hover:text-primary transition-colors"
          >
            Shop All
          </button>
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className="text-left text-3xl font-serif text-foreground hover:text-primary transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="border-t border-border pt-8 flex flex-col gap-6">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileOpen(false);
              }}
              className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
              <span className="text-sm font-medium">Search</span>
            </button>
            <button
              onClick={() => {
                handleUserClick();
                setIsMobileOpen(false);
              }}
              className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
            >
              <User size={20} strokeWidth={1.5} />
              <span className="text-sm font-medium">
                {user ? user.name : "Sign In"}
              </span>
            </button>
            <button
              onClick={() => handleNav("favorites")}
              className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
            >
              <Heart size={20} strokeWidth={1.5} />
              <span className="text-sm font-medium">
                Favorites {favorites.length > 0 ? `(${favorites.length})` : ""}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
