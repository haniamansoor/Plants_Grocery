import { CheckCircle2, XCircle } from "lucide-react"
import { useApp } from "../context/AppContext"

export default function Toast() {
  const { toasts } = useApp()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-3.5 shadow-lg text-sm font-medium animate-slide-up ${
            toast.type === "error"
              ? "bg-accent text-accent-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {toast.type === "error" ? (
            <XCircle size={16} strokeWidth={2} />
          ) : (
            <CheckCircle2 size={16} strokeWidth={2} />
          )}
          {toast.message}
        </div>
      ))}
    </div>
  )
}
