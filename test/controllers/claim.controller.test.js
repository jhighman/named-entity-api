import { test } from 'node:test';
import * as assert from 'node:assert';
import { getClaimByWFId, listAllClaims, getClaimByRefId } from '../../controllers/claim.controller.js';

const mockClaims = [
    {
      workflowId: "1",
      credentialSubject: {
        firstName: "Jack",
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

// Mocking request and reply objects
const mockRequest = (body = {}, params = {}) => ({
    body,
    params
});

const mockReply = () => {
    const reply = {};
    reply.send = function (data) {
        reply.sentData = data;
        return reply;
    };
    reply.status = function (statusCode) {
        reply.statusCode = statusCode;
        return reply;
    };
    return reply;
};

test('listAllClaims should return the correct number of claims', async () => {
  const claims = await listAllClaims();
  assert.strictEqual(claims.length, mockClaims.length, `listAllClaims should return ${mockClaims.length} claims`);
});


