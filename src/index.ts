import express from 'express'
import productsRouter from './routes/products.routes'
import shipCartRouter from './routes/shipcart.routes'
import storeRouter from './routes/store.routes'
import shipItemRouter from './routes/shipcartitem.routes'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/build')))

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'))
})

app.use('/api/products/', productsRouter)
app.use('/api/shipcart/', shipCartRouter)
app.use('/api/addtocart/', shipItemRouter)
app.use('/api/store/', storeRouter)

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`)
  console.log(path.join(__dirname, '/build'))
})
