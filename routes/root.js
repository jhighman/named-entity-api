import { workItemSchema, errorSchema, claimSchema, verifiedClaimSchema, workItemListSchema } from '../schemas/index.js'
import { getWorkById, listAllWorkItems, /* other exported methods */ } from '../controllers/work.controller.js';
import { getClaimByWFId } from '../controllers/claim.controller.js';


export default async function (fastify, opts) {

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



  // Hardcoded list of named entities

  const workItems = [
    {
      id: "1",
      status: "notStarted",
      dates: {
        startedDate: null,
        completedDate: null,
        publishedDate: null,
        archivedDate: null
      },
      workItemReferenceId: "1",
      referenceType: "claim"
    },
    {
      id: "2",
      status: "started",
      dates: {
        startedDate: "2024-01-03T10:00:00",
        completedDate: null,
        publishedDate: null,
        archivedDate: null
      },
      workItemReferenceId: "2",
      referenceType: "subject"
    },
    {
      id: "3",
      status: "complete",
      dates: {
        startedDate: "2024-01-05T10:00:00",
        completedDate: "2024-01-06T15:00:00",
        publishedDate: null,
        archivedDate: null
      },
      workItemReferenceId: "3",
      referenceType: "credential"
    }
  ];


  const claims = [
    {
      workflowId: "1",
      credentialSubject: {
        firstName: "Alice",
        middleName: "M.",
        lastName: "Johnson"
      },
      claimType: "license",
      identifier: "ID-12345",
      identifierDescriptor: "Driver's License ID",
      subtype: "Driver",
      reference: "DL-12345-AB",
      referenceSystem: "DMV",
      referenceType: "System ID"
    },
    {
      workflowId: "2",
      credentialSubject: {
        firstName: "Bob",
        middleName: "D.",
        lastName: "Smith"
      },
      claimType: "certification",
      identifier: "ID-67890",
      identifierDescriptor: "Professional Certification ID",
      subtype: "Project Management",
      reference: "PM-67890-XY",
      referenceSystem: "Certification Board",
      referenceType: "Certification ID"
    },
    {
      workflowId: "3",
      credentialSubject: {
        firstName: "Carol",
        middleName: "L.",
        lastName: "Taylor"
      },
      claimType: "degree",
      identifier: "ID-112233",
      identifierDescriptor: "University Degree ID",
      subtype: "Bachelor of Science",
      reference: "UD-112233-ZZ",
      referenceSystem: "University",
      referenceType: "Degree ID"
    }
  ];

  const verifiedClaims = [
    {
      claim: {
        workflowId: '1',
        claimType: 'license',
        identifier: 'ID-12345',
        identifierDescriptor: 'Driver License ID',
        subtype: 'Driver',
        reference: 'DL-12345-AB',
        referenceSystem: 'DMV',
        referenceType: 'System ID'
      },
      verification: {

        verificationStatus: 'verified',
        verificationDate: '2024-01-01',
        claimStatus: 'active'
      }
    },
    {
      claim: {
        workflowId: '1',
        claimType: 'certification',
        identifier: 'ID-67890',
        identifierDescriptor: 'Professional Certification ID',
        subtype: 'Project Management',
        reference: 'PM-67890-XY',
        referenceSystem: 'Certification Board',
        referenceType: 'Certification ID'
      },
      verification: {
        verificationStatus: 'pending',
        verificationDate: '2024-01-02',
        claimStatus: 'pending'
      }
    },
    {
      claim: {
        workflowId: '1',
        claimType: 'degree',
        identifier: 'ID-112233',
        identifierDescriptor: 'University Degree ID',
        subtype: 'Bachelor of Science',
        reference: 'UD-112233-ZZ',
        referenceSystem: 'University',
        referenceType: 'Degree ID'
      },
      verification: {
        verificationStatus: 'denied',
        verificationDate: '2024-01-03',
        claimStatus: 'inactive'
      }
    }
  ];


  // GET /work route
  fastify.get('/work', {
    schema: {
      response: {
        200: workItemSchema
      }
    }
  }, async (request, reply) => {
    // Return the first element of the workItems array
    if (workItems.length > 0) {
      return workItems[0];
    } else {
      reply.code(404).send({ error: 'No work items found' });
    }
  });

  fastify.get('/alt/work', {
    schema: {
      response: {
        200: workItemListSchema
      }
    }
  }, async function (request, reply) {
    try {
      const workItems = await listAllWorkItems();
      if (workItems && workItems.length > 0) {
        reply.send(workItems);
      } else {
        reply.code(404).send({ error: 'No work items found' });
      }
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });

  fastify.get('/alt/work/:id', {
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
      const workItem = await getWorkById(id);
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
  fastify.get('/claim/:id', {
    schema: {
      response: {
        200: claimSchema,
        404: errorSchema
      }
    }
  }, async function (request, reply) {
    const id = request.params.id;
    const claim = await getClaimByWFId(id);

    if (!claim) {
      reply.code(404).send({
        code: 404,
        message: 'Claim not found for this workflow'
      }); s
    } else {
      return claim;
    }
  });

  fastify.get('/claim/verified/:id', {
    schema: {
      response: {
        200: verifiedClaimSchema,
        404: errorSchema
      }
    }
  }, async function (request, reply) {
    const id = request.params.id;
    const claim = await getClaimByWFId(id);
    //const claim = verifiedClaims.find(c => c.workflowId === id);

    if (!claim) {
      reply.code(404).send({
        code: 404,
        message: 'Claim not found for this workflow'
      }); s
    } else {
      return claim;
    }
  });


  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
}