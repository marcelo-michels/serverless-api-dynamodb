import { JsonController, Get } from 'routing-controllers'
import * as pkg from '../../../package.json'
import { UserDAO } from '../user/user-dao'

@JsonController()
export class APIController {

  @Get('/version')
  version () {
    return { version: pkg.version }
  }

  @Get('/sync-tables')
  async syncTables () {
    try {
      await new UserDAO().syncTable()
      return { sync: 'OK' }
    } catch (error) {
      console.log(error)
      return { sync: 'ERROR' }
    }
  }

}
