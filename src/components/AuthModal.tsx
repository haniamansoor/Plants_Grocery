import { useState, useEffect } from "react"
import { X, Eye, EyeOff, Leaf } from "lucide-react"
import { useApp } from "../context/AppContext"

export default function AuthModal() {
  const {
    isAuthOpen,
    setIsAuthOpen,
    authMode,
    setAuthMode,
    setUser,
    showToast,
    pendingCheckout,
    setPendingCheckout,
    setCurrentPage,
  } = useApp()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthOpen) {
      setForm({ name: "", email: "", password: "", confirm: "" })
      setErrors({})
      setShowPass(false)
    }
  }, [isAuthOpen, authMode])

  useEffect(() => {
    if (!isAuthOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isAuthOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsAuthOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [setIsAuthOpen])

  const validate = () => {
    const e: Record<string, string> = {}
    if (authMode === "signup" && !form.name.trim()) e.name = "Name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email"
    if (!form.password) e.password = "Password is required"
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters"
    if (authMode === "signup" && form.password !== form.confirm)
      e.confirm = "Passwords do not match"
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const name = authMode === "signup" ? form.name : form.email.split("@")[0]
      setUser({ name, email: form.email })
      setIsAuthOpen(false)
      showToast(
        authMode === "signup"
          ? `Welcome to VERDE, ${name}!`
          : `Welcome back, ${name}!`,
      )
      if (pendingCheckout) {
        setPendingCheckout(false)
        setCurrentPage("checkout")
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }, 800)
  }

  const field = (
    id: keyof typeof form,
    label: string,
    type: string = "text",
    placeholder: string = "",
  ) => (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-foreground/70 mb-2 uppercase tracking-wider"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={
            id === "password" || id === "confirm"
              ? showPass
                ? "text"
                : "password"
              : type
          }
          value={form[id]}
          onChange={(e) => {
            setForm((f) => ({ ...f, [id]: e.target.value }))
            if (errors[id]) setErrors((errs) => ({ ...errs, [id]: "" }))
          }}
          placeholder={placeholder}
          className={`w-full bg-secondary border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors ${
            errors[id] ? "border-accent" : "border-border"
          }`}
        />
        {(id === "password" || id === "confirm") && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {errors[id] && <p className="text-accent text-xs mt-1">{errors[id]}</p>}
    </div>
  )

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain p-4 py-6 transition-all duration-300 sm:items-center sm:py-8 ${
        isAuthOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsAuthOpen(false)}
      />

      <div
        className={`relative max-h-[calc(100svh-2rem)] w-full max-w-md overflow-y-auto bg-background shadow-2xl transition-all duration-300 sm:max-h-[calc(100svh-4rem)] ${
          isAuthOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="p-8">
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-5 right-5 text-foreground/40 hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-8">
            <Leaf size={20} className="text-primary" strokeWidth={1.5} />
            <span className="font-serif text-xl text-primary font-semibold">
              VERDE
            </span>
          </div>

          <div className="flex border-b border-border mb-8">
            <button
              onClick={() => setAuthMode("login")}
              className={`pb-3 mr-8 text-sm font-medium transition-colors ${
                authMode === "login"
                  ? "text-primary border-b-2 border-primary -mb-px"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode("signup")}
              className={`pb-3 text-sm font-medium transition-colors ${
                authMode === "signup"
                  ? "text-primary border-b-2 border-primary -mb-px"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {authMode === "signup" &&
              field("name", "Full Name", "text", "Jane Smith")}
            {field("email", "Email Address", "email", "hello@example.com")}
            {field("password", "Password", "password")}
            {authMode === "signup" &&
              field("confirm", "Confirm Password", "password")}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 mt-2"
            >
              {loading
                ? "Please wait..."
                : authMode === "signup"
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-foreground/50 mt-6">
            {authMode === "signup"
              ? "Already have an account? "
              : "New to VERDE? "}
            <button
              onClick={() =>
                setAuthMode(authMode === "signup" ? "login" : "signup")
              }
              className="text-primary hover:underline font-medium"
            >
              {authMode === "signup" ? "Sign In" : "Create Account"}
            </button>
          </p>

          {pendingCheckout && (
            <p className="text-center text-xs text-foreground/60 mt-4 p-3 bg-secondary">
              Create an account to complete your purchase
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
