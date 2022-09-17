/* eslint-disable @typescript-eslint/space-before-function-paren */
import knexClient from '../../DB/config'
// import { Knex } from 'knex'

export class ContenedorSQL {
  tableName: string
  knexCli: any

  constructor(tableName: string) {
    this.knexCli = knexClient
    this.tableName = tableName
  }

  async getAll(): Promise<any> {
    return this.knexCli.from(this.tableName).select('*')
  }

  async getById(id: number): Promise<any> {
    const data: [] = await this.knexCli
      .from(this.tableName)
      .where({ id })
      .select('*')
    if (data.length === 0) {
      throw new Error('No se encontró el elemento')
    }
    return data
  }

  async updateById(id: number, data: any): Promise<any> {
    return this.knexCli
      .from(this.tableName)
      .where({ id })
      .update(data)
      .returning('*')
  }

  async postData(data: any): Promise<any> {
    return this.knexCli.from(this.tableName).insert(data).returning('*')
  }

  async deleteById(id: number): Promise<any> {
    const deletedProduct = await this.knexCli
      .from(this.tableName)
      .where({ id })
      .del()
    if (deletedProduct === 0) {
      throw new Error('No se encontró el elemento')
    }
    return deletedProduct
  }

  async playground(): Promise<any> {
    const query = this.knexCli
      .select(
        'sc.id as id_carrito',
        'sc.date_created as date_created',
        'p.id as id_prod',
        { precio: this.knexCli.max('p.price') },
        { precio_total: this.knexCli.sum('p.price') },
        { cantidad: this.knexCli.sum('p.quantity') }
      )
      .from('ship_cart as sc')
      .join(
        function (this: any) {
          this.select('sci.ship_cart_id', 'pr.id', 'pr.price', 'sci.quantity')
            .from('ship_cart_items as sci')
            .join('products as pr', 'sci.product_id', '=', 'pr.id')
            .as('p')
        },
        'sc.id',
        '=',
        'p.ship_cart_id'
      )
      .groupBy('id_prod', 'id_carrito')
      .as('main')

    const response = this.knexCli
      .select(
        'main.id_carrito',
        'main.date_created',
        this.knexCli.raw(
          "JSON_AGG(JSON_BUILD_OBJECT('id', main.id_prod, 'precio', main.precio, 'precio_total', main.precio_total, 'cantidad', main.cantidad)) as productos"
        )
      )
      .from(query)
      .groupBy('main.id_carrito', 'main.date_created')

    return response
  }
}

export class ProductsOperations {
  tableName: string
  knexCli: any

  constructor(tableName: string) {
    this.knexCli = knexClient
    this.tableName = tableName
  }

  async getById(shipCartId: number): Promise<any> {
    return this.knexCli
      .from(this.tableName)
      .where({ ship_cart_id: shipCartId })
      .select('*')
  }

  // Para eliminar de una un producto entero, la operation debe ser -1000
  async UpdateOrCreate(
    shipCartId: number,
    productId: number,
    operation: number
  ): Promise<any> {
    const updateRow = await this.knexCli
      .update('quantity', this.knexCli.raw(`quantity + ${operation}`))
      .from(this.tableName)
      .where({ ship_cart_id: shipCartId, product_id: productId })
      .returning('*')

    if (updateRow.length === 0) {
      const newRow = await this.knexCli
        .from(this.tableName)
        .insert({ ship_cart_id: shipCartId, product_id: productId })
        .returning('*')
      return newRow
    }

    if (updateRow[0].quantity <= 0) {
      await this.knexCli
        .from(this.tableName)
        .where('quantity', '<=', 0)
        .delete()
      return { message: 'Producto eliminado' }
    }
    return updateRow
  }

  async deleteAllProducts(shipCartId: number): Promise<any> {
    const deleteProducts = await this.knexCli
      .from(this.tableName)
      .where({ ship_cart_id: shipCartId })
      .delete()
    return deleteProducts
  }
}
