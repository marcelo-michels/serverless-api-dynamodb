import { Dynamo } from '../../services/dynamo'

export class UserDAO extends Dynamo {

  constructor () {
    super('user')
  }

  insert (user: any) {
    return this.put({
      TableName: this.tableName,
      Item: user
    })
  }

  findById (id: string) {
    return this.findByKey({ id: id })
  }

  async syncTable () {
    const table = await this.describeTable()
    if (!table) {
      this.createTable([
        { AttributeName: 'id', KeyType: 'HASH' }
      ],
      [
        { AttributeName: 'id', AttributeType: 'S' }
      ])
    }
  }

}
