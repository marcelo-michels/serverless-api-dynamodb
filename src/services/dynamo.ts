
import { DynamoDB } from 'aws-sdk'
import { nanoid } from './nanoid'

/**
 * Documentarion
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
 */

export class Dynamo {

    tableName: string;

    constructor (table) {
      this.tableName = (process.env.PREFIX_TABLE || '') + table
    }

    getDC () {
      return new DynamoDB.DocumentClient({ service: this.getDynamo() })
    }

    getDynamo () {
      return new DynamoDB({ region: process.env.AWS_REGION })
    }

    getNewID () {
      return nanoid()
    }

    async update (params?: DynamoDB.DocumentClient.UpdateItemInput) {
      return await this.getDC().update(params).promise()
    }

    async put (params?: DynamoDB.DocumentClient.PutItemInput) {
      return await this.getDC().put(params).promise()
    }

    async get (params?: DynamoDB.DocumentClient.GetItemInput) {
      return await this.getDC().get(params).promise()
    }

    async query (params?: DynamoDB.DocumentClient.QueryInput) {
      return await this.getDC().query(params).promise()
    }

    async scan (params?: DynamoDB.DocumentClient.ScanInput) {
      return await this.getDC().scan(params).promise()
    }

    async createTable (KeySchema: any, AttributeDefinitions: any) {
      var params = {
        TableName: this.tableName,
        KeySchema,
        AttributeDefinitions,
        BillingMode: 'PAY_PER_REQUEST'
      }
      return await this.getDynamo().createTable(params).promise()
    }

    async describeTable () {
      try {
        var params = { TableName: this.tableName }
        return await this.getDynamo().describeTable(params).promise()
      } catch (error) {
      }
    }

    async listTables () {
      return await this.getDynamo().listTables({}).promise()
    }

    removeEmptyFields (obj: any) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
          delete obj[propName]
        } else if (typeof obj[propName] === 'object') {
          this.removeEmptyFields(obj[propName])
        }
      }
    }

    async findAll () {
      let all = []
      let result: DynamoDB.DocumentClient.ScanOutput
      do {
        result = await this.query({
          TableName: this.tableName,
          ExclusiveStartKey: result?.LastEvaluatedKey,
          ScanIndexForward: false
        })
        all = all.concat(result?.Items ?? [])
      } while (result?.LastEvaluatedKey)
      return all
    }

    async findByKey (key: any, fields?: string) {
      const result = await this.get({
        TableName: this.tableName,
        Key: key,
        ProjectionExpression: fields
      })
      return (result && result.Item ? result.Item : undefined)
    }

    /**
     *
     * @param key example: {id : 1}
     * @param field example: 'phone'
     * @param value example: '+1 456 7894568548' or an object|list
     */
    async updateField (key: any, field: string, value: any | Array<any>) {
      const params: any = {
        Key: key,
        UpdateExpression: `set #${field} = :${field}`,
        ExpressionAttributeValues: {},
        ExpressionAttributeNames: {}
      }
      params.ExpressionAttributeNames[`#${field}`] = field
      params.ExpressionAttributeValues[`:${field}`] = value
      await this.update(params)
    }

}
