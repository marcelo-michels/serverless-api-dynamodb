import * as dotenv from 'dotenv'
import app from './app'
import { APIController } from './resources/api/api-controller'
dotenv.config()

app.listen(3000, async () => {
  console.log('Server is running on port 3000')
  new APIController().syncTables()
})
