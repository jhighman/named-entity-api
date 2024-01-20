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


// Function to get all claims
export const getAllVerifiedClaims = () => {
  console.log("Fetching all claims");
  return verifiedClaim;
}

// Function to get a claim by workflowId
export const getVerifedClaimByWorkflowId = (workflowId) => {
  console.log(`Fetching claim with workflowId: ${workflowId}`);
  const verifiedClaim = claims.find(verifiedClaim => verifiedClaim.workflowId === workflowId);

  if (!claim) {
    throw new Error(`Claim with workflowId ${workflowId} not found`);
  }

  return verifiedClaim;
}

// Function to get a claim by referenceId
export const getVerifiedClaimByReferenceId = (referenceId) => {
  console.log(`Fetching claim with referenceId: ${referenceId}`);
  const verifiedClaim = claims.find(verifiedClaim => verifiedClaim.reference === referenceId);

  if (!verifiedClaim) {
    throw new Error(`Claim with referenceId ${referenceId} not found`);
  }

  return claim;
}
