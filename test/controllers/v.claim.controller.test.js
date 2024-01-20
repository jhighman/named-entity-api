import { test } from 'node:test';
import * as assert from 'node:assert';
import { getVClaimByWFId, listAllVClaims, getVClaimByRefId } from '../../controllers/verified.claim.controller.js';

const mockVerifiedClaims = [
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

  test('getVClaimByWFId retrieves a verified claim successfully', async () => {
    const expectedVClaim = mockVerifiedClaims.find(vclaim => vclaim.claim.workflowId === '1');
    const actualVClaim = await getVClaimByWFId("1");

    assert.strictEqual(actualVClaim.claim.workflowId, expectedVClaim.claim.workflowId, 'Workflow IDs should match');
    assert.strictEqual(actualVClaim.claim.claimType, expectedVClaim.claim.claimType, 'Claim types should match');
    // Continue with other assertions for claim properties
    
    assert.strictEqual(actualVClaim.verification.verificationStatus, expectedVClaim.verification.verificationStatus, 'Verification statuses should match');
    assert.strictEqual(actualVClaim.verification.verificationDate, expectedVClaim.verification.verificationDate, 'Verification dates should match');
    assert.strictEqual(actualVClaim.verification.claimStatus, expectedVClaim.verification.claimStatus, 'Claim statuses should match');
});

