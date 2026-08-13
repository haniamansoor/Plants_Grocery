import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { CartItem, User, Page, Product } from "../types"

interface ToastMsg {
  id: string
  message: string
  type: "success" | "error"
}

interface AppContextType {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  favorites: string[]
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  user: User | null
  setUser: (user: User | null) => void
  isCartOpen: boolean
  setIsCartOpen: (v: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (v: boolean) => void
  isAuthOpen: boolean
  setIsAuthOpen: (v: boolean) => void
  authMode: "login" | "signup"
  setAuthMode: (mode: "login" | "signup") => void
  pendingCheckout: boolean
  setPendingCheckout: (v: boolean) => void
  toasts: ToastMsg[]
  showToast: (message: string, type?: "success" | "error") => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [pendingCheckout, setPendingCheckout] = useState(false)
  const [toasts, setToasts] = useState<ToastMsg[]>([])

  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      const id = `${Date.now()}-${Math.random()}`
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        3200,
      )
    },
    [],
  )

  const addToCart = useCallback(
    (product: Product) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.product.id === product.id)
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        }
        return [...prev, { product, quantity: 1 }]
      })
      showToast(`${product.name} added to cart`)
    },
    [showToast],
  )

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== productId))
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleFavorite = useCallback(
    (productId: string) => {
      setFavorites((prev) => {
        if (prev.includes(productId)) {
          showToast("Removed from favorites")
          return prev.filter((id) => id !== productId)
        }
        showToast("Added to favorites")
        return [...prev, productId]
      })
    },
    [showToast],
  )

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites],
  )

  const cartTotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  )
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        favorites,
        toggleFavorite,
        isFavorite,
        user,
        setUser,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        pendingCheckout,
        setPendingCheckout,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
