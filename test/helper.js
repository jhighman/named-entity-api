// This file contains code that we reuse
// between our tests.

import helper from 'fastify-cli/helper.js'
import path from 'path'
import { fileURLToPath } from 'url'
import Fastify from 'fastify';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import AutoLoad from '@fastify/autoload';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const AppPath = path.join(__dirname, '..', 'app.js')

// Fill in this config with all the configurations
// needed for testing the application
function config () {
  return {}
}

// automatically build and tear down our instance
async function build(t) {
  const app = Fastify();

  // Register Swagger and SwaggerUI
  app.register(Swagger, {
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
  });
  app.register(SwaggerUI, {
    routePrefix: '/api-docs'
  });

  // Register autoload plugins
  app.register(AutoLoad, {
    dir: path.join(__dirname, '..', 'plugins'), // Adjust path if needed
    options: {}
  });
  app.register(AutoLoad, {
    dir: path.join(__dirname, '..', 'routes'), // Adjust path if needed
    options: {}
  });

  // Tear down our app after we are done
  t.after(() => app.close());

  return app;
}

export {
  config,
  build
}
