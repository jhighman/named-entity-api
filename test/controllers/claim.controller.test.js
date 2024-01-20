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


test('listAllClaims retrieves all claims successfully', async () => {
    const actualClaims = await listAllClaims();

    assert.strictEqual(actualClaims.length, mockClaims.length, 'Number of claims should match');
    
    actualClaims.forEach((claim, index) => {
        const expectedClaim = mockClaims[index];
        assert.strictEqual(claim.workflowId, expectedClaim.workflowId, `Workflow ID of claim ${index} should match`);
        assert.strictEqual(claim.claimType, expectedClaim.claimType, `Claim type of claim ${index} should match`);
        assert.deepStrictEqual(claim.credentialSubject, expectedClaim.credentialSubject, `Credential subject of claim ${index} should match`);
        assert.strictEqual(claim.identifier, expectedClaim.identifier, `Identifier of claim ${index} should match`);
        assert.strictEqual(claim.identifierDescriptor, expectedClaim.identifierDescriptor, `Identifier descriptor of claim ${index} should match`);
        assert.strictEqual(claim.subtype, expectedClaim.subtype, `Subtype of claim ${index} should match`);
        assert.strictEqual(claim.reference, expectedClaim.reference, `Reference of claim ${index} should match`);
        assert.strictEqual(claim.referenceSystem, expectedClaim.referenceSystem, `Reference system of claim ${index} should match`);
        assert.strictEqual(claim.referenceType, expectedClaim.referenceType, `Reference type of claim ${index} should match`);
        assert.deepStrictEqual(claim.dates, expectedClaim.dates, `Dates of claim ${index} should match`);
    });
});

test('getClaimByWFId retrieves a claim successfully', async () => {
  const expectedClaim = mockClaims.find(claim => claim.workflowId === '1');
  const actualClaim = await getClaimByWFId("1");

  assert.strictEqual(actualClaim.workflowId, expectedClaim.workflowId, 'Workflow IDs should match');
  assert.strictEqual(actualClaim.claimType, expectedClaim.claimType, 'Claim types should match');
  assert.deepStrictEqual(actualClaim.credentialSubject, expectedClaim.credentialSubject, 'Credential subjects should match');
  
  // Additional assertions
  assert.strictEqual(actualClaim.identifier, expectedClaim.identifier, 'Identifiers should match');
  assert.strictEqual(actualClaim.identifierDescriptor, expectedClaim.identifierDescriptor, 'Identifier descriptors should match');
  assert.strictEqual(actualClaim.subtype, expectedClaim.subtype, 'Subtypes should match');
  assert.strictEqual(actualClaim.reference, expectedClaim.reference, 'References should match');
  assert.strictEqual(actualClaim.referenceSystem, expectedClaim.referenceSystem, 'Reference systems should match');
  assert.strictEqual(actualClaim.referenceType, expectedClaim.referenceType, 'Reference types should match');

  // Asserting the dates object
  assert.deepStrictEqual(actualClaim.dates, expectedClaim.dates, 'Dates should match');
});
