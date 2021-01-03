import RoleModel from '@modules/roles/role.schema'
import { Shop } from '@modules/shops/shop'
import ShopModel from '@modules/shops/shop.schema'
import UserModel from '@modules/users/user.schema'
import { snakeCase } from 'change-case'
import faker from 'faker'

export const seeder = async () => {
  try {
    // roles
    console.log('Seeding roles users ...')
    await RoleModel.deleteMany()
    await UserModel.deleteMany()
    const roles = ['Super Administrator', 'Administrator', 'Guest']

    for (let i = 0; i < roles.length; i++) {
      const createdRole = new RoleModel({ name: roles[i] })
      await createdRole.save()
      const user = new UserModel({
        name: roles[i],
        email: `${snakeCase(roles[i])}@system.com`,
        password: 'password',
        isActive: true,
        role: createdRole._id,
        avatar: faker.image.people(),
      })
      await user.save()
    }

    console.log('Seeding roles users completed')

    // shops
    console.log('Seeding shops ...')

    await ShopModel.deleteMany()
    const shopData: Partial<Shop>[] = []
    for (let i = 0; i < 50; i++) {
      shopData.push({
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        category: faker.vehicle.model(),
        image: faker.image.business(),
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(faker.address.longitude()),
            parseFloat(faker.address.latitude()),
          ],
        },
      })
    }
    //   @ts-ignore
    await ShopModel.insertMany(shopData)
    console.log('Seeding shops completed')

    console.log('Seeding completed')
  } catch (error) {
    console.error(error)
  }
}
