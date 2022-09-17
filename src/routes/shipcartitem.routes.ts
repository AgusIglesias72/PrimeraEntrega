/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { ProductsOperations } from '../utils/container/ContenedorSQL'

const shipItemRouter = express.Router()
const shipItemContainer = new ProductsOperations('ship_cart_items')

shipItemRouter.post('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const productId: number = req.body.product_id
  const operation: number = req.body.operation
  try {
    const data = await shipItemContainer.UpdateOrCreate(
      id,
      productId,
      operation
    )
    res.status(201).json(data)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

shipItemRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const data = await shipItemContainer.getById(id)
    res.status(200).json(data)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

shipItemRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const data = await shipItemContainer.deleteAllProducts(id)
    res.status(200).json(data)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

shipItemRouter.put('/:id', (_req, _res) => {})

export default shipItemRouter
