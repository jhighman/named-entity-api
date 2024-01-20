const claims = [
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

// Function to get all claims
export const getAllClaims = () => {
  console.log("Fetching all claims");
  return claims;
}

// Function to get a claim by workflowId
export const getClaimByWorkflowId = (workflowId) => {
  console.log(`Fetching claim with workflowId: ${workflowId}`);
  const claim = claims.find(claim => claim.workflowId === workflowId);

  if (!claim) {
    throw new Error(`Claim with workflowId ${workflowId} not found`);
  }

  return claim;
}

// Function to get a claim by referenceId
export const getClaimByReferenceId = (referenceId) => {
  console.log(`Fetching claim with referenceId: ${referenceId}`);
  const claim = claims.find(claim => claim.reference === referenceId);

  if (!claim) {
    throw new Error(`Claim with referenceId ${referenceId} not found`);
  }

  return claim;
}