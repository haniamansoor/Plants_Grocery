import { useState, useEffect, useRef } from "react"
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { useApp } from "../context/AppContext"
import type { Page } from "../types"
import verdeLogo from "../assests/logo.png"

const navLinks: { label: string; page: Page }[] = [
  { label: "Plants", page: "plants" },
  { label: "Flowers", page: "flowers" },
  { label: "Collections", page: "collections" },
]

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
    setUser,
    setPendingCheckout,
    showToast,
  } = useApp()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isProfileMenuOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProfileMenuOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKey)
    }
  }, [isProfileMenuOpen])

  useEffect(() => {
    if (!isLogoutConfirmOpen) return

    const originalOverflow = document.body.style.overflow
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLogoutConfirmOpen(false)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKey)
    }
  }, [isLogoutConfirmOpen])

  const handleNav = (page: Page) => {
    setCurrentPage(page)
    setIsMobileOpen(false)
    setIsProfileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleUserClick = () => {
    if (user) {
      setIsProfileMenuOpen((open) => !open)
    } else {
      setAuthMode("login")
      setIsAuthOpen(true)
    }
  }

  const openLogoutConfirm = () => {
    setIsProfileMenuOpen(false)
    setIsMobileOpen(false)
    setIsLogoutConfirmOpen(true)
  }

  const confirmLogout = () => {
    setUser(null)
    setPendingCheckout(false)
    setIsLogoutConfirmOpen(false)
    if (currentPage === "checkout") setCurrentPage("home")
    showToast("Logged out successfully")
  }

  const isHome = currentPage === "home"
  const transparent = isHome && !isScrolled && !isMobileOpen

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? "bg-transparent py-6"
            : "bg-background/95 backdrop-blur-md py-4 border-b border-border shadow-sm"
        }`}
      >
        <div className="container mx-auto flex items-center gap-3 px-4 sm:px-6 md:justify-between md:px-12">
          <div className="flex flex-shrink-0 items-center gap-3 sm:gap-4">
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
              <img
                src={verdeLogo}
                alt="Verde logo"
                className="h-9 w-auto max-w-[84px] object-contain sm:max-w-[140px] md:h-12 lg:h-14"
              />
            </button>
          </div>

          <button
            onClick={() => {
              setIsSearchOpen(true)
              setIsMobileOpen(false)
            }}
            className="flex min-w-0 flex-1 items-center gap-2 border border-border bg-background/80 px-3 py-2 text-left text-foreground/50 shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary md:hidden"
            aria-label="Search"
          >
            <Search size={16} strokeWidth={1.5} className="flex-shrink-0" />
            <span className="truncate text-xs font-medium">
              Search anything
            </span>
          </button>

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

          <div className="flex flex-shrink-0 items-center gap-4 sm:gap-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:block text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <div className="relative hidden md:block" ref={profileMenuRef}>
              <button
                onClick={handleUserClick}
                className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                aria-label={user ? "Open account menu" : "Sign in"}
                aria-haspopup={user ? "menu" : undefined}
                aria-expanded={user ? isProfileMenuOpen : undefined}
              >
                <User size={20} strokeWidth={1.5} />
                {user && (
                  <>
                    <span className="text-xs font-medium hidden lg:inline">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown
                      size={14}
                      strokeWidth={1.5}
                      className={`hidden transition-transform lg:block ${
                        isProfileMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </button>

              {user && isProfileMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-72 overflow-hidden border border-border bg-background shadow-2xl animate-slide-up"
                >
                  <div className="bg-secondary/70 p-4">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-foreground/50">
                      Signed in as
                    </p>
                    <p className="mt-1 truncate font-serif text-lg text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-foreground/60">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      role="menuitem"
                      onClick={openLogoutConfirm}
                      className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut size={16} strokeWidth={1.7} />
                        Logout
                      </span>
                     
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => handleNav("favorites")}
              className="hidden md:block text-foreground hover:text-primary transition-colors relative"
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
                setIsSearchOpen(true)
                setIsMobileOpen(false)
              }}
              className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
              <span className="text-sm font-medium">Search</span>
            </button>
            {user ? (
              <div className="flex items-center gap-3 text-foreground/80">
                <User size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode("login")
                  setIsAuthOpen(true)
                  setIsMobileOpen(false)
                }}
                className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
              >
                <User size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
            <button
              onClick={() => handleNav("favorites")}
              className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
            >
              <Heart size={20} strokeWidth={1.5} />
              <span className="text-sm font-medium">
                Favorites {favorites.length > 0 ? `(${favorites.length})` : ""}
              </span>
            </button>
            {user && (
              <button
                onClick={openLogoutConfirm}
                className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsLogoutConfirmOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="relative w-full max-w-sm border border-border bg-background p-6 shadow-2xl animate-slide-up"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-red-50 text-red-600">
                <LogOut size={20} strokeWidth={1.7} />
              </div>
              <div>
                <h2
                  id="logout-title"
                  className="font-serif text-xl text-foreground"
                >
                  Confirm logout
                </h2>
                <p className="text-sm text-foreground/60">
                  Are you sure you want to log out?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="flex-1 border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
