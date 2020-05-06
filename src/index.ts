/* eslint-disable import/first */
import * as dotenv from 'dotenv'
dotenv.config()
import app from './app'
import { APIController } from './resources/api/api-controller'

app.listen(3000, async () => {
  console.log('Server is running on port 3000')
  new APIController().syncTables()
})
