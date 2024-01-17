import path from 'path'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import AutoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'
import fastify from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pass --options via CLI arguments in command to enable these options.
export const options = {}

export default async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(Swagger, {
    swagger: {
      info: {
        title: 'Named Entity API',
        description: 'A directory of people',
        version: '0.1.0'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true
  })
  fastify.register(SwaggerUI, {
    routePrefix: '/api-docs'
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

}