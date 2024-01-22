import { workItemSchema, errorSchema, claimSchema, verifiedClaimSchema, workItemListSchema } from '../schemas/index.js'
import { getWorkItems, getWorkItemById /* other exported methods */ } from '../models/work.model.js';
import { getAllClaims, getClaimByWorkflowId } from '../models/claim.model.js';
import { getAllVerifiedClaims, getVerifiedClaimByWorkflowId } from '../models/verified.claim.model.js';

export default async function (fastify, opts) {
  fastify.setReplySerializer(payload => JSON.stringify(payload, null, 2));

  fastify.addSchema({
    $id: 'workItem',
    ...workItemSchema
  });

  fastify.addSchema({
    $id: 'workItemList',
    ...workItemListSchema
  });

  fastify.addSchema({
    $id: 'claim',
    ...claimSchema
  });

  fastify.addSchema({
    $id: 'verifiedClaim',
    ...verifiedClaimSchema
  });


  fastify.addSchema({
    $id: 'error',
    ...errorSchema
  })
  
  // GET /claim/:id route
  fastify.get('/claim', {
    schema: {
      response: {
        200: claimSchema,
        404: errorSchema
      }
    }
  }, async function (request, reply) {
    const claims = getAllClaims();

    if (!claims) {
      reply.code(404).send({
        code: 404,
        message: 'Claim not found for this workflow'
      }); 
    } else {
      return claims;
    }
  });

  // GET /work route
  fastify.get('/work/next', {
    schema: {
      response: {
        200: workItemSchema
      }
    }
  }, async (request, reply) => {
    try {
      const workItems = await getWorkItems();
      if (workItems && workItems.length > 0) {
        // Return the first element of the workItems array
        if (workItems.length > 0) {
          return workItems[0];
        } else {
          reply.code(404).send({ error: 'No work items found at intex 1' });
        }
      } else {
        reply.code(404).send({ error: 'No work items found' });
      }
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });

  fastify.get('/work/all', {
    schema: {
      response: {
        200: workItemListSchema
      }
    }
  }, async function (request, reply) {
    try {
      const workItems = getWorkItems();
      if (workItems && workItems.length > 0) {
        reply.send(workItems);
      } else {
        reply.code(404).send({ error: 'No work items found' });
      }
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });

  fastify.get('/work/:id', {
    schema: {
      response: {
        200: workItemSchema,
        404: errorSchema,
        500: errorSchema
      }
    }
  }, async function (request, reply) {
    try {
      const id = request.params.id;
      const workItem = getWorkItemById(id);
      if (workItem) {
        reply.send(workItem);
      } else {
        reply.code(404).send({ code: '404', message: 'Work item not found' });
      }
    } catch (error) {
      reply.status(500).send({ code: '500', message: error.message });
    }
  });
 
  // GET /claim/:id route
  fastify.get('/claim/byWorkflowId/:id', {
    schema: {
      response: {
        200: claimSchema,
        404: errorSchema
      }
    }
  }, async function (request, reply) {
    const id = request.params.id;
    const claim = getClaimByWorkflowId(id);

    if (!claim) {
      reply.code(404).send({
        code: 404,
        message: 'Claim not found for this workflow'
      }); s
    } else {
      return claim;
    }
  });

  fastify.get('/verified/claims', {
    schema: {
      response: {
        200: verifiedClaimSchema,
        404: errorSchema
      }
    }
  }, async function (request, reply) {
    const id = request.params.id;
    const verifiedClaims = getAllVerifiedClaims();
    //const claim = verifiedClaims.find(c => c.workflowId === id);

    if (!verifiedClaims) {
      reply.code(404).send({
        code: 404,
        message: 'Claim not found for this workflow'
      }); 
    } else {
      return verifiedClaims;
    }
  });

  fastify.get('/verified/claim/byWorkflowId/:id', {
    schema: {
      response: {
        200: verifiedClaimSchema,
        404: errorSchema
      }
    }
  }, async function (request, reply) {
    const id = request.params.id;
    const verifiedClaim = getVerifiedClaimByWorkflowId(id);
    //const claim = verifiedClaims.find(c => c.workflowId === id);

    if (!verifiedClaim) {
      reply.code(404).send({
        code: 404,
        message: 'Claim not found for this workflow'
      }); 
    } else {
      return verifiedClaim;
    }
  });

  fastify.get('/', async function (request, reply) {
    return { root: true }
  });
}