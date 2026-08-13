import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  CreditCard,
  MapPin,
  Package,
} from "lucide-react"
import { useApp } from "../context/AppContext"
import type { Address } from "../types"

type Step = "address" | "payment" | "confirmation"

const emptyAddress: Address = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
  phone: "",
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, setCurrentPage, showToast, user } =
    useApp()
  const [step, setStep] = useState<Step>("address")
  const [address, setAddress] = useState<Address>(emptyAddress)
  const [addressErrors, setAddressErrors] = useState<Partial<Address>>({})
  const [paymentForm, setPaymentForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({})
  const [processing, setProcessing] = useState(false)
  const [orderNumber] = useState(
    () => `VRD-${Math.floor(100000 + Math.random() * 900000)}`,
  )

  const shipping = cartTotal >= 75 ? 0 : 9.99
  const total = cartTotal + shipping

  const validateAddress = () => {
    const errs: Partial<Address> = {}
    if (!address.firstName.trim()) errs.firstName = "Required"
    if (!address.lastName.trim()) errs.lastName = "Required"
    if (!address.street.trim()) errs.street = "Required"
    if (!address.city.trim()) errs.city = "Required"
    if (!address.state.trim()) errs.state = "Required"
    if (!address.zipCode.trim()) errs.zipCode = "Required"
    if (!address.phone.trim()) errs.phone = "Required"
    return errs
  }

  const validatePayment = () => {
    const errs: Record<string, string> = {}
    if (!paymentForm.cardName.trim()) errs.cardName = "Required"
    if (
      !paymentForm.cardNumber.replace(/\s/g, "") ||
      paymentForm.cardNumber.replace(/\s/g, "").length < 16
    ) {
      errs.cardNumber = "Enter a valid card number"
    }
    if (!paymentForm.expiry || paymentForm.expiry.length < 5)
      errs.expiry = "Required"
    if (!paymentForm.cvv || paymentForm.cvv.length < 3) errs.cvv = "Required"
    return errs
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateAddress()
    if (Object.keys(errs).length > 0) {
      setAddressErrors(errs)
      return
    }
    setStep("payment")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validatePayment()
    if (Object.keys(errs).length > 0) {
      setPaymentErrors(errs)
      return
    }
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setStep("confirmation")
      clearCart()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 1500)
  }

  const formatCard = (val: string) => {
    const v = val.replace(/\D/g, "").slice(0, 16)
    return v.replace(/(.{4})/g, "$1 ").trim()
  }

  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, "").slice(0, 4)
    if (v.length >= 2) return `${v.slice(0, 2)}/${v.slice(2)}`
    return v
  }

  const inputClass = (error?: string) =>
    `w-full bg-white border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors ${
      error ? "border-accent" : "border-border"
    }`

  const steps: { key: Step label: string icon: typeof MapPin }[] = [
    { key: "address", label: "Shipping", icon: MapPin },
    { key: "payment", label: "Payment", icon: CreditCard },
    { key: "confirmation", label: "Confirmed", icon: Package },
  ]

  if (cart.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-32 px-6 text-center">
        <div className="font-serif text-3xl text-foreground mb-4">
          Your cart is empty
        </div>
        <p className="text-foreground/60 mb-8">
          Add some plants or flowers before checking out.
        </p>
        <button
          onClick={() => {
            setCurrentPage("plants")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Shop Plants
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage("home")}
            className="font-serif text-xl font-semibold text-primary"
          >
            VERDE
          </button>
          <div className="flex items-center gap-4 md:gap-8">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2 md:gap-4">
                <div
                  className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                    step === s.key
                      ? "text-primary"
                      : steps.findIndex((x) => x.key === step) > i
                        ? "text-foreground/60"
                        : "text-foreground/30"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                      step === s.key
                        ? "bg-primary text-primary-foreground"
                        : steps.findIndex((x) => x.key === step) > i
                          ? "bg-foreground/20 text-foreground/70"
                          : "bg-foreground/10 text-foreground/30"
                    }`}
                  >
                    {steps.findIndex((x) => x.key === step) > i ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-6 md:w-12 h-px bg-border" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground/50">
            <Lock size={12} />
            <span className="hidden sm:block">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Main Form */}
          <div className="flex-1">
            {step === "address" && (
              <>
                <div className="mb-8">
                  <h1 className="font-serif text-3xl text-foreground mb-2">
                    Shipping Address
                  </h1>
                  {user && (
                    <p className="text-sm text-foreground/60">
                      Shipping to{" "}
                      <span className="text-primary font-medium">
                        {user.email}
                      </span>
                    </p>
                  )}
                </div>

                <form onSubmit={handleAddressSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                        First Name
                      </label>
                      <input
                        value={address.firstName}
                        onChange={(e) => {
                          setAddress((a) => ({
                            ...a,
                            firstName: e.target.value,
                          }))
                          if (addressErrors.firstName)
                            setAddressErrors((x) => ({
                              ...x,
                              firstName: undefined,
                            }))
                        }}
                        placeholder="Jane"
                        className={inputClass(addressErrors.firstName)}
                      />
                      {addressErrors.firstName && (
                        <p className="text-accent text-xs mt-1">
                          {addressErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                        Last Name
                      </label>
                      <input
                        value={address.lastName}
                        onChange={(e) => {
                          setAddress((a) => ({
                            ...a,
                            lastName: e.target.value,
                          }))
                          if (addressErrors.lastName)
                            setAddressErrors((x) => ({
                              ...x,
                              lastName: undefined,
                            }))
                        }}
                        placeholder="Smith"
                        className={inputClass(addressErrors.lastName)}
                      />
                      {addressErrors.lastName && (
                        <p className="text-accent text-xs mt-1">
                          {addressErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                      Street Address
                    </label>
                    <input
                      value={address.street}
                      onChange={(e) => {
                        setAddress((a) => ({ ...a, street: e.target.value }))
                        if (addressErrors.street)
                          setAddressErrors((x) => ({ ...x, street: undefined }))
                      }}
                      placeholder="123 Garden Street, Apt 4B"
                      className={inputClass(addressErrors.street)}
                    />
                    {addressErrors.street && (
                      <p className="text-accent text-xs mt-1">
                        {addressErrors.street}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                        City
                      </label>
                      <input
                        value={address.city}
                        onChange={(e) => {
                          setAddress((a) => ({ ...a, city: e.target.value }))
                          if (addressErrors.city)
                            setAddressErrors((x) => ({ ...x, city: undefined }))
                        }}
                        placeholder="New York"
                        className={inputClass(addressErrors.city)}
                      />
                      {addressErrors.city && (
                        <p className="text-accent text-xs mt-1">
                          {addressErrors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                        State
                      </label>
                      <input
                        value={address.state}
                        onChange={(e) => {
                          setAddress((a) => ({ ...a, state: e.target.value }))
                          if (addressErrors.state)
                            setAddressErrors((x) => ({
                              ...x,
                              state: undefined,
                            }))
                        }}
                        placeholder="NY"
                        className={inputClass(addressErrors.state)}
                      />
                      {addressErrors.state && (
                        <p className="text-accent text-xs mt-1">
                          {addressErrors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                        ZIP Code
                      </label>
                      <input
                        value={address.zipCode}
                        onChange={(e) => {
                          setAddress((a) => ({ ...a, zipCode: e.target.value }))
                          if (addressErrors.zipCode)
                            setAddressErrors((x) => ({
                              ...x,
                              zipCode: undefined,
                            }))
                        }}
                        placeholder="10001"
                        className={inputClass(addressErrors.zipCode)}
                      />
                      {addressErrors.zipCode && (
                        <p className="text-accent text-xs mt-1">
                          {addressErrors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                      Country
                    </label>
                    <select
                      value={address.country}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, country: e.target.value }))
                      }
                      className="w-full bg-white border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => {
                        setAddress((a) => ({ ...a, phone: e.target.value }))
                        if (addressErrors.phone)
                          setAddressErrors((x) => ({ ...x, phone: undefined }))
                      }}
                      placeholder="+1 (555) 000-0000"
                      className={inputClass(addressErrors.phone)}
                    />
                    {addressErrors.phone && (
                      <p className="text-accent text-xs mt-1">
                        {addressErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage("home")
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Back to shop
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-primary-foreground px-10 py-3.5 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      Continue to Payment <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === "payment" && (
              <>
                <div className="mb-8">
                  <button
                    onClick={() => setStep("address")}
                    className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors mb-6"
                  >
                    <ArrowLeft size={16} />
                    Edit shipping address
                  </button>
                  <h1 className="font-serif text-3xl text-foreground mb-2">
                    Payment Details
                  </h1>
                  <p className="text-sm text-foreground/60 flex items-center gap-1.5">
                    <Lock size={12} />
                    Your payment information is encrypted and secure
                  </p>
                </div>

                <div className="mb-6 p-4 bg-secondary flex items-center gap-3">
                  <MapPin size={16} className="text-primary flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {address.firstName} {address.lastName}
                    </p>
                    <p className="text-foreground/60">
                      {address.street}, {address.city}, {address.state}{" "}
                      {address.zipCode}
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                      Name on Card
                    </label>
                    <input
                      value={paymentForm.cardName}
                      onChange={(e) => {
                        setPaymentForm((f) => ({
                          ...f,
                          cardName: e.target.value,
                        }))
                        if (paymentErrors.cardName)
                          setPaymentErrors((x) => ({ ...x, cardName: "" }))
                      }}
                      placeholder="Jane Smith"
                      className={inputClass(paymentErrors.cardName)}
                    />
                    {paymentErrors.cardName && (
                      <p className="text-accent text-xs mt-1">
                        {paymentErrors.cardName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        value={paymentForm.cardNumber}
                        onChange={(e) => {
                          setPaymentForm((f) => ({
                            ...f,
                            cardNumber: formatCard(e.target.value),
                          }))
                          if (paymentErrors.cardNumber)
                            setPaymentErrors((x) => ({ ...x, cardNumber: "" }))
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={inputClass(paymentErrors.cardNumber)}
                      />
                      <CreditCard
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30"
                      />
                    </div>
                    {paymentErrors.cardNumber && (
                      <p className="text-accent text-xs mt-1">
                        {paymentErrors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                        Expiry Date
                      </label>
                      <input
                        value={paymentForm.expiry}
                        onChange={(e) => {
                          setPaymentForm((f) => ({
                            ...f,
                            expiry: formatExpiry(e.target.value),
                          }))
                          if (paymentErrors.expiry)
                            setPaymentErrors((x) => ({ ...x, expiry: "" }))
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={inputClass(paymentErrors.expiry)}
                      />
                      {paymentErrors.expiry && (
                        <p className="text-accent text-xs mt-1">
                          {paymentErrors.expiry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">
                        CVV
                      </label>
                      <input
                        value={paymentForm.cvv}
                        onChange={(e) => {
                          setPaymentForm((f) => ({
                            ...f,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          }))
                          if (paymentErrors.cvv)
                            setPaymentErrors((x) => ({ ...x, cvv: "" }))
                        }}
                        placeholder="123"
                        maxLength={4}
                        className={inputClass(paymentErrors.cvv)}
                      />
                      {paymentErrors.cvv && (
                        <p className="text-accent text-xs mt-1">
                          {paymentErrors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-4"
                  >
                    {processing ? (
                      "Processing..."
                    ) : (
                      <>
                        <Lock size={14} />
                        Place Order — ${total.toFixed(2)}
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-foreground/50">
                    By placing your order, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </form>
              </>
            )}

            {step === "confirmation" && (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-8">
                  <CheckCircle2
                    size={40}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-4 block">
                  Order Confirmed
                </span>
                <h1 className="font-serif text-4xl text-foreground mb-4">
                  Thank you, {user?.name?.split(" ")[0]}!
                </h1>
                <p className="text-foreground/70 max-w-md mb-3">
                  Your order{" "}
                  <span className="font-medium text-foreground">
                    {orderNumber}
                  </span>{" "}
                  has been placed successfully.
                </p>
                <p className="text-foreground/60 text-sm max-w-sm mb-12">
                  A confirmation email has been sent to{" "}
                  <span className="text-primary">{user?.email}</span>. Your
                  plants will be carefully packed and shipped within 1–2
                  business days.
                </p>

                <div className="w-full max-w-md bg-secondary p-6 text-left mb-10">
                  <h3 className="font-medium text-foreground mb-4 text-sm uppercase tracking-wider">
                    Delivery to
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {address.firstName} {address.lastName}
                    <br />
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setCurrentPage("plants")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="bg-primary text-primary-foreground px-10 py-3.5 text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("home")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="border border-border px-10 py-3.5 text-sm font-medium hover:bg-black/5 transition-colors"
                  >
                    Return Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {step !== "confirmation" && (
            <aside className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-secondary p-6 sticky top-28">
                <h2 className="font-serif text-xl text-foreground mb-6">
                  Order Summary
                </h2>
                <ul className="space-y-4 mb-6 max-h-72 overflow-y-auto">
                  {cart.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-white flex-shrink-0 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground/50 mb-0.5">
                          {product.subCategory}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-foreground/60 mt-0.5">
                          Qty: {quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-primary flex-shrink-0">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>Shipping</span>
                    <span
                      className={shipping === 0 ? "text-olive font-medium" : ""}
                    >
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium text-foreground text-base pt-3 border-t border-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {cartTotal < 75 && (
                  <p className="text-xs text-foreground/50 mt-3 bg-white/60 px-3 py-2">
                    Add ${(75 - cartTotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
