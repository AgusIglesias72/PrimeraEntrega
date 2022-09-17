/* eslint-disable comma-dangle */
import { NewCartItem } from '../types'
import { isNumber, isString } from './Product'

const parseCartId = (cartId: any): string => {
  if (!isString(cartId)) {
    throw new Error('Id de carrito no válido')
  }
  return cartId
}
const parseProductId = (productId: any): number => {
  if (!isNumber(productId)) {
    throw new Error('Id de producto no válido')
  }
  return productId
}

export const toNewItemEntry = (id: string, object: any): NewCartItem => {
  const newCartItem: NewCartItem = {
    cart_id: parseCartId(id),
    product_id: parseProductId(object.product_id),
  }
  return newCartItem
}
