import { test } from 'node:test';
import * as assert from 'node:assert';
import { getAllClaims} from '../../models/claim.model.js';

const expectedClaims = [
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

  test('getAllClaims should return the correct number of claims', async () => {
    const actualClaims = await getAllClaims();
    assert.strictEqual(actualClaims.length, expectedClaims.length, `Expected ${expectedClaims.length} claims, but got ${actualClaims.length}`);
});