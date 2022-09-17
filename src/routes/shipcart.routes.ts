/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { ContenedorSQL } from '../utils/container/ContenedorSQL'

const shipCartRouter = express.Router()
const shipCartContainer = new ContenedorSQL('ship_cart')

shipCartRouter.get('/', async (_req, res) => {
  try {
    const data = await shipCartContainer.playground()
    res.status(200).json(data)
  } catch (error: any) {
    res.status(500).json({ error: 'No se pudo procesar la solicitud' })
  }
})

shipCartRouter.post('/', async (req, res) => {
  const storeId: Number = req.body.store_id
  try {
    const data = await shipCartContainer.postData({
      store_id: storeId,
    })
    res.status(201).json(data)
  } catch (error: any) {
    res.status(400).json({ error: 'No se pudo procesar la solicitud' })
  }
})

shipCartRouter.get('/:id', async (req, res) => {
  const id: number = Number(req.params.id)
  try {
    const data = await shipCartContainer.getById(id)
    res.status(200).json(data)
  } catch (error: any) {
    res.status(404).json({ error: 'No se pudo procesar la solicitud' })
  }
})

shipCartRouter.put('/:id', (_req, _res) => {})

shipCartRouter.delete('/:id', (_req, _res) => {})

export default shipCartRouter
