import { AppProvider, useApp } from "./context/AppContext"
import Navbar from "./components/Navbar"
import CartSidebar from "./components/CartSidebar"
import SearchOverlay from "./components/SearchOverlay"
import AuthModal from "./components/AuthModal"
import Toast from "./components/Toast"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import PlantsPage from "./pages/PlantsPage"
import FlowersPage from "./pages/FlowersPage"
import CollectionsPage from "./pages/CollectionsPage"
import FavoritesPage from "./pages/FavoritesPage"
import CheckoutPage from "./pages/CheckoutPage"

function AppContent() {
  const { currentPage } = useApp()

  const renderPage = () => {
    switch (currentPage) {
      case "plants":
        return <PlantsPage />
      case "flowers":
        return <FlowersPage />
      case "collections":
        return <CollectionsPage />
      case "favorites":
        return <FavoritesPage />
      case "checkout":
        return <CheckoutPage />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{renderPage()}</main>
      {currentPage !== "checkout" && <Footer />}
      <CartSidebar />
      <SearchOverlay />
      <AuthModal />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
