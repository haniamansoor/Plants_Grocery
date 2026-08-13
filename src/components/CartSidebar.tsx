import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react"
import { useApp } from "../context/AppContext"

export default function CartSidebar() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    setCurrentPage,
    user,
    setIsAuthOpen,
    setAuthMode,
    setPendingCheckout,
    showToast,
  } = useApp()

  const handleCheckout = () => {
    if (!user) {
      setPendingCheckout(true)
      setAuthMode("signup")
      setIsAuthOpen(true)
      setIsCartOpen(false)
      showToast("Please create an account to continue checkout", "error")
      return
    }
    if (cart.length === 0) {
      showToast("Your cart is empty", "error")
      return
    }
    setCurrentPage("checkout")
    setIsCartOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 bg-background shadow-2xl transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">
            Your Cart{" "}
            {cartCount > 0 && (
              <span className="text-sm font-sans text-foreground/50 ml-1">
                ({cartCount})
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-foreground/60 hover:text-foreground transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
              <ShoppingBag
                size={48}
                strokeWidth={1}
                className="text-foreground/20"
              />
              <div>
                <p className="font-serif text-xl text-foreground mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-foreground/60">
                  Add some plants or flowers to get started.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage("plants")
                  setIsCartOpen(false)
                }}
                className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Shop Plants
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 p-5">
                  <div className="w-20 h-20 bg-secondary flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-foreground/50 mb-0.5">
                          {product.subCategory}
                        </p>
                        <h3 className="text-sm font-medium text-foreground leading-snug">
                          {product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-foreground/40 hover:text-foreground transition-colors flex-shrink-0 mt-0.5"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="p-1.5 text-foreground/60 hover:text-foreground transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="p-1.5 text-foreground/60 hover:text-foreground transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-foreground/70">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-foreground/70">
                <span>Shipping</span>
                <span className="text-olive font-medium">
                  {cartTotal >= 75 ? "Free" : "$9.99"}
                </span>
              </div>
              {cartTotal < 75 && (
                <p className="text-xs text-foreground/50">
                  Add ${(75 - cartTotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="flex justify-between font-medium text-foreground pt-2 border-t border-border">
                <span>Total</span>
                <span>
                  ${(cartTotal + (cartTotal >= 75 ? 0 : 9.99)).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-foreground/60 text-sm hover:text-foreground transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
