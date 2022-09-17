/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable comma-dangle */
import express from 'express'
import { toNewProductEntry, updateProductEntry } from '../services/Product'
import { Product } from '../types'
import { ContenedorSQL } from '../utils/container/ContenedorSQL'

const productsRouter = express.Router()
const productsContainer = new ContenedorSQL('products')

// Check services for operations inside the calls

productsRouter.get('/', async (_req, res) => {
  try {
    const products: Product[] = await productsContainer.getAll()
    res.status(200).json(products)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

productsRouter.post('/', async (req, res) => {
  try {
    const newProductEntry = toNewProductEntry(req.body)
    const productAdded: [] = await productsContainer.postData(newProductEntry)
    res.status(201).json(productAdded)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

productsRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const product: Product = await productsContainer.getById(id)
    res.status(200).json(product)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

productsRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const updateProduct = updateProductEntry(req.body)
    const prodUpdate: [] = await productsContainer.updateById(id, updateProduct)
    res.status(200).json(prodUpdate)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

productsRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const deletedProduct = await productsContainer.deleteById(id)
    res.status(204).json(deletedProduct)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

export default productsRouter
