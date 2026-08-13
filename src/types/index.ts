export interface Product {
  id: string
  name: string
  category: "plant" | "flower"
  subCategory: string
  price: number
  originalPrice?: number
  image: string
  description: string
  careLevel?: "Easy" | "Medium" | "Expert"
  light?: string
  water?: string
  tags: string[]
  inStock: boolean
  featured?: boolean
  badge?: string
  rating: number
  reviews: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  name: string
  email: string
}

export interface Address {
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export type Page = "home" | "plants" | "flowers" | "collections" | "favorites" | "checkout"
