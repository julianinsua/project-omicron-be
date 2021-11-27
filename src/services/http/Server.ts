import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { Navigation } from './Router'
import { mainRoutes } from './Routes/mainRoutes'

export class Server {
  app: Express
  port: Number

  public constructor() {
    this.port = 8080 // default port
    this.app = express()
    this.addBodyParser()
    this.addRouter()
  }

  private addBodyParser(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
  }

  private addRouter(): void {
    const navigation: Navigation = new Navigation(this.app)
    this.app = navigation.createRouter(mainRoutes, '/')
  }

  public startListening(port: Number): void {
    if (port) {
      this.port = port
    }
    this.app.listen(this.port)
  }
}
