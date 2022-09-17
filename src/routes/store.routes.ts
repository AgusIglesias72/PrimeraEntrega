/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { ContenedorSQL } from '../utils/container/ContenedorSQL'
import { Store } from '../types'

const storeRouter = express.Router()
const storeContainer = new ContenedorSQL('stores')

storeRouter.get('/', async (_req, res) => {
  try {
    const stores: Store[] = await storeContainer.getAll()
    res.status(200).json(stores)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

storeRouter.post('/', async (_req, _res) => {})

storeRouter.get('/:id', async (_req, _res) => {})

storeRouter.put('/:id', (_req, _res) => {})

storeRouter.delete('/:id', (_req, _res) => {})

export default storeRouter
