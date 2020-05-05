
import { JsonController, Param, Body, Get, Post } from 'routing-controllers'
import { UserDAO } from './user-dao'

@JsonController()
export class UserController {
  userDao = new UserDAO();

  @Get('/users')
  async getAll (): Promise<any> {
    try {
      const users = await this.userDao.findAll()
      return users
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }

  @Get('/users/count')
  async count (): Promise<any> {
    try {
      const users = await this.userDao.findAll()
      return users.length
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }

  @Get('/users/describe')
  async describe (): Promise<any> {
    try {
      return await this.userDao.describeTable()
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }

  @Get('/users/id/:id')
  async getOne (@Param('id') id: string) {
    try {
      const result = await this.userDao.findById(id)
      if (result) {
        return result
      } else {
        return { status: 'Item Not Found' }
      }
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }

  @Post('/users')
  async post (@Body() user: any) {
    try {
      user.id = this.userDao.getNewID()
      console.log(user.id)
      await this.userDao.insert(user)
      return user
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }

  @Get('/users/popule')
  async popule () {
    try {
      const promises = []
      for (let i = 0; i < 100; i++) {
        promises.push(this.userDao.insert({
          id: this.userDao.getNewID(),
          name: `Name ${i}`,
          lastname: `LastName ${i}`,
          age: i,
          phone: `(${i}${i}) ${i}${i}${i}${i}-${i}${i}${i}${i}`
        }))
      }
      await Promise.all(promises)
      return { status: 'ok' }
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }
}
