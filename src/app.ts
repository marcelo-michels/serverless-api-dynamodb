import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import * as compression from 'compression'
import * as cors from 'cors'
import * as path from 'path'

import * as express from 'express'

const app = express()
app.use(cors())
app.use(compression())

useExpressServer(app, {
  controllers: [path.join(__dirname, '/resources/**/*-controller.*')]
})

export default app
