/* eslint-disable comma-dangle */
import { NewProduct } from '../types'

// const OmitInfo = (product: Product): OmitSomeInfo => {
//   const { price, ...rest } = product
//   return rest
// }

// export const OmitAll = (products: Product[]): OmitSomeInfo[] => {
//   const productsOmitPrice = products.map((product: Product) =>
//     OmitInfo(product)
//   )
//   return productsOmitPrice
// }

/* Validaciones de entrada de datos */

const parseTitle = (text: any): string => {
  if (!isString(text)) {
    throw new Error('Título no válido')
  }
  if (text.length > 50 || text.length < 5) {
    throw new Error('El título debe tener entre 5 y 50 caracteres')
  }
  return text
}

const parseDescription = (text: any): string => {
  if (!isString(text)) {
    throw new Error('Título no válido')
  }
  if (text.length > 350) {
    throw new Error('La descripción debe tener menos de 350 caracteres')
  }
  return text
}

const parsePrice = (price: any): number => {
  if (!isNumber(price)) {
    throw new Error('Precio no válido')
  }
  if (price < 0) {
    throw new Error('El precio debe ser mayor a 0')
  }
  return price
}

const parseStoreId = (storeId: any): number => {
  if (!isNumber(storeId)) {
    throw new Error('Id de tienda no válido')
  }
  //   Validación con enum para determinar si la tienda existe
  //    También se puede hacer en el contenedor SQL
  return storeId
}

export const isString = (string: any): boolean => {
  return typeof string === 'string' || string instanceof String
}

export const isNumber = (number: any): boolean => {
  return typeof number === 'number' && isFinite(number)
}
/* Fin de validaciones de entrada de datos */

export const toNewProductEntry = (object: any): NewProduct => {
  const newProduct: NewProduct = {
    title: parseTitle(object.title),
    description: parseDescription(object.description),
    store_id: parseStoreId(object.store_id),
    price: parsePrice(object.price),
  }
  return newProduct
}

export const updateProductEntry = (object: any): object => {
  const updateKeys = Object.keys(object)
  updateKeys.map((key: string) => {
    if (key === 'title') {
      object[key] = parseTitle(object[key])
    }
    if (key === 'description') {
      object[key] = parseDescription(object[key])
    }
    if (key === 'price') {
      object[key] = parsePrice(object[key])
    }
    if (key === 'store_id') {
      object[key] = parseStoreId(object[key])
    }
    return object
  })
  return object
}
