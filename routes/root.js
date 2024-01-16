import { namedEntitySchema, errorSchema, searchQuerySchema } from '../schemas/index.js'

export default async function (fastify, opts) {

  fastify.addSchema({
    $id: 'namedEntity',
    ...namedEntitySchema
  })

  fastify.addSchema({
    $id: 'error',
    ...errorSchema
  })

  fastify.addSchema({
    $id: 'searchQuery',
    ...searchQuerySchema
  });

  // Hardcoded list of named entities
  const namedEntities = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', middleName: 'M.', email: 'alice.johnson@example.com' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', middleName: 'D.', email: 'bob.smith@example.com' },
    { id: 3, firstName: 'Carol', lastName: 'Taylor', middleName: 'L.', email: 'carol.taylor@example.com' },
    { id: 4, firstName: 'Dave', lastName: 'White', middleName: 'J.', email: 'dave.white@example.com' },
    { id: 5, firstName: 'Eve', lastName: 'Brown', middleName: 'K.', email: 'eve.brown@example.com' }
  ];

  // GET /named_entities route
  fastify.get('/named_entities', async function (request, reply) {
    console.log("named entities list")
    return namedEntities;
  });

  // GET /named_entities/:id route
  fastify.get('/named_entities/:id', {
    schema: {
      response: {
        200: {
          $ref: 'namedEntity#' // Reference to the named entity schema
        },
        404: {
          $ref: 'error#' // Reference to the error schema
        }
      }
    }
  }, async function (request, reply) {
    const id = parseInt(request.params.id);
    const entity = namedEntities.find(e => e.id === id);

    if (!entity) {
      reply.code(404).send({
        code: 404,
        message: 'Entity not found'
      });
    } else {
      return entity;
    }
  });

  // GET /named_entities/search route
  fastify.get('/named_entities/search', {
    schema: {
      querystring: {
        $ref: 'searchQuery#'
      },
      response: {
        200: {
          $ref: 'namedEntity#' // Reference to the named entity schema
        },
        404: {
          $ref: 'error#' // Reference to the error schema
        }
      }
    }
  }, async function (request, reply) {
    const { lastName, firstName, email } = request.query;

    console.log('Query Parameters:', request.query);

    // If email is provided, search by email only
    if (email) {
      const entityByEmail = namedEntities.find(entity => entity.email === email);
      if (entityByEmail) {
        return entityByEmail;
      } else {
        return reply.code(404).send({ code: 404, message: 'Entity not found' });
      }
    }

    // If email is not provided, proceed with name search
    if (!lastName) {
      return reply.code(400).send({ code: 400, message: 'Last name is required' });
    }

    let matchedEntities = [];
    namedEntities.forEach(entity => {
      console.log('Checking entity:', entity);

      if (entity.lastName === lastName) {
        console.log('Last name matched');

        if (firstName && entity.firstName === firstName) {
          console.log('Both first and last name matched');
          matchedEntities.push(entity);
        } else if (!firstName) {
          console.log('Only last name matched');
          matchedEntities.push(entity);
        }
      } 
    });

    console.log('Matched entities:', matchedEntities);

    if (matchedEntities.length < 1) {
      return reply.code(404).send({ code: 404, message: 'Entity not found' });
    } else if (matchedEntities.length > 1) {
      reply.code(200).send({ message: 'More than one entity exists, please refine your search' });
    } else {
      return matchedEntities[0];
    }
  });



  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
}
