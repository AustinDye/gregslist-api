import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

export class HousesService {
  async getAll() {
    return await dbContext.Houses.find({}).populate('creator', 'picture name')
  }

  async getById(id) {
    const house = dbContext.Houses.findById(id)
    if (!house) {
      throw new BadRequest('invalid id')
    }
    return house
  }

  async create(body) {
    const house = await dbContext.Houses.create(body)
    await house.populate('creator', 'picture name')
    return house
  }

  async edit(update) {
    const origional = await this.getById(update.id)

    origional.bathrooms = update.bathrooms || origional.bathrooms
    origional.bedrooms = update.bedrooms || origional.bedrooms
    origional.levels = update.levels || origional.levels
    origional.imgUrl = update.imgUrl || origional.imgUrl
    origional.year = update.year || origional.year
    origional.price = update.price || origional.price

    await origional.save()
    return origional
  }

  async remove(id, userId) {
    const house = await this.getById(id)

    if (house.creatorId.toString() !== userId) {
      throw new Forbidden('no permissions')
    }
    await dbContext.Houses.findByIdAndDelete(id)
  }
}

export const housesService = new HousesService()
