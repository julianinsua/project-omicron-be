import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Navigation } from './Navigation'
import { mainRoutes } from './Routes/mainRoutes'

export class Server {
  private app: Express
  private port: Number

  public constructor() {
    this.port = 8080 // default port
    this.app = express()
    this.addBodyParser()
    this.addCorsHeaders()
    this.addAuthentication()
    this.app.use('/api', Navigation.createRouter('/', mainRoutes)) // Second argument will eventually be an array of routers
    this.addErrorHandling()
  }

  private addBodyParser(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
  }

  public startListening(port: Number): void {
    if (port) {
      this.port = port
    }
    this.app.listen(this.port)
  }

  private addCorsHeaders(): void {
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      next()
    })
  }

  private addAuthentication() {
    this.app.use((req, res, next) => {
      next()
    })
  }

  private addErrorHandling(): void {
    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      console.log('Express error handler')
      console.log(error)
      return res.status(error.statusCode ?? 500).json({
        data: error?.data || { name: error.name, msg: error?.message },
        status: error?.statusCode,
      })
    })
  }
}
