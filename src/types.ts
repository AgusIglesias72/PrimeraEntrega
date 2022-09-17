export interface Store {
  name: string
  description: string
}

export interface Product {
  id: number
  title: string
  description: string
  store_id: number
  price: number
}

export interface ProductAdded extends Product {
  quantity: number
}

export interface ShippingCart {
  id: number
  products: ProductAdded[]
  store_id: number
}

export interface NewCartItem {
  cart_id: string
  product_id: number
}
// El product_id debería ser uno dentro de opciones de la tienda

export type OmitSomeInfo = Omit<Product, 'price'>

export type NewProduct = Omit<Product, 'id'>

export type NewShippingCart = Omit<ShippingCart, 'id'>
