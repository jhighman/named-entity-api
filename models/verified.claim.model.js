import { ClaimTypeEnum, IdentifierEnum, ReferenceSystemEnum, ReferenceTypeEnum, VerificationStatusEnum, ClaimStatusEnum } from './enums.js';

let workflowIdCounter = 0;

const generateWorkflowId = () => {
  workflowIdCounter += 1;
  return workflowIdCounter.toString();
};

const createClaim = (credentialSubject, claimType, identifierDescriptor, subtype, reference, referenceSystem, referenceType, verificationStatus, verificationDate, claimStatus) => ({
  claim: {
    workflowId: generateWorkflowId(),
    credentialSubject,
    claimType: ClaimTypeEnum[claimType],
    identifier: IdentifierEnum[claimType],
    identifierDescriptor,
    subtype,
    reference,
    referenceSystem: ReferenceSystemEnum[referenceSystem],
    referenceType: ReferenceTypeEnum[referenceType]
  },
  verification: {
    verificationStatus,
    verificationDate,
    claimStatus
  }
});

const sample_LICENSE_claim = {
  credentialSubject: { firstName: "Jack", middleName: "M.", lastName: "Johnson" },
  claimType: ClaimTypeEnum.LICENSE,
  identifierDescriptor: "Driver's License ID",
  subtype: "Driver",
  reference: "DL-12345-AB",
  referenceSystem: ReferenceSystemEnum.TRUA,
  referenceType: ReferenceTypeEnum.BIO_ID,
  verificationStatus: VerificationStatusEnum.VERIFIED,
  verificationDate: "2024-01-01",
  claimStatus: ClaimStatusEnum
};

const sample_CERTIFICATION_claim = {
  credentialSubject: { firstName: "Bob", middleName: "D.", lastName: "Smith" },
  claimType: ClaimTypeEnum.CERTIFICATION,
  identifierDescriptor: "Professional Certification ID",
  subtype: "Project Management",
  reference: "jonnyappleseed@rmail.com",
  referenceSystem: ReferenceSystemEnum.TRUA,
  referenceType: ReferenceTypeEnum.E_MAIL,
  verificationStatus: VerificationStatusEnum.PENDING,
  verificationDate: "2024-01-02",
  claimStatus: ClaimStatusEnum.PENDING
};

const sample_DEGREE_claim = {
  credentialSubject: { firstName: "Carol", middleName: "L.", lastName: "Taylor" },
  claimType: ClaimTypeEnum.DEGREE,
  identifierDescriptor: "University Degree ID",
  subtype: "Bachelor of Science",
  reference: "P987987987978",
  referenceSystem: ReferenceSystemEnum.CE,
  referenceType: ReferenceTypeEnum.PUID,
  verificationStatus: VerificationStatusEnum.DENIED,
  verificationDate: "2024-01-03",
  claimStatus: ClaimStatusEnum.INACTIVE
};

const verifiedClaims = [
  createClaim(sample_LICENSE_claim),
  createClaim(sample_CERTIFICATION_claim),
  createClaim(sample_DEGREE_claim)
];

console.log(JSON.stringify(verifiedClaims, null, 2));

export const findVerifiedClaimByReference = (reference, referenceSystem, referenceType) => {
  // Input validation
  if (!reference || !referenceSystem || !referenceType) {
    throw new Error("All arguments (reference, referenceSystem, referenceType) must be provided");
  }

  // Attempt to find the claim
  const foundClaim = verifiedClaims.find(verifiedClaim =>
    verifiedClaim.claim.reference === reference &&
    verifiedClaim.claim.referenceSystem === ReferenceSystemEnum[referenceSystem] &&
    verifiedClaim.claim.referenceType === ReferenceTypeEnum[referenceType]
  );

  // Throw an error if the claim is not found
  if (!foundClaim) {
    throw new Error(`No verified claim found with reference: ${reference}, reference system: ${referenceSystem}, and reference type: ${referenceType}`);
  }

  return foundClaim;
};

export const findAllVerifiedClaimsBySystem = (referenceSystem) => {
  // Input validation
  if (!referenceSystem) {
    throw new Error("referenceSystem must be provided");
  }

  // Find all claims for the system
  const foundClaims = verifiedClaims.filter(verifiedClaim => verifiedClaim.claim.referenceSystem === ReferenceSystemEnum[referenceSystem]);

  return foundClaims;
};

const findVerifiedClaimByWorkflowId = (workflowId) => {
  // Input validation
  if (!workflowId) {
    throw new Error("workflowId must be provided");
  }

  // Find the claim
  const foundClaim = verifiedClaims.find(verifiedClaim => verifiedClaim.claim.workflowId === workflowId);

  // Error if claim not found
  if (!foundClaim) {
    throw new Error(`No verified claim found with workflowId: ${workflowId}`);
  }

  return foundClaim;
};

export const createVerifiedClaim = (newVerifiedClaim) => {
  console.log("Creating New Verified Claim:", JSON.stringify(newVerifiedClaim, null, 2));
  return { success: true, message: "New verified claim created successfully" };
};

export const updateVerifiedClaim = (workflowId, updatedVerifiedClaim) => {
    console.log(`Updating Verified Claim with workflowId ${workflowId}:`, JSON.stringify(updatedVerifiedClaim, null, 2));
    return { success: true, message: `Verified Claim with workflowId ${workflowId} updated successfully` };
};

export const deleteVerifiedClaim = (workflowId) => {
  console.log(`Deleting Verified Claim with workflowId ${workflowId}`);
  return { success: true, message: `Verified Claim with workflowId ${workflowId} deleted successfully` };
};

// Function to get all claims
export const getAllVerifiedClaims = () => {
  console.log("Fetching all claims");
  return verifiedClaims;
}

// Function to get a claim by workflowId
export const getVerifedClaimByWorkflowId = (workflowId) => {
  console.log(`Fetching claim with workflowId: ${workflowId}`);
  const verifiedClaim = verifiedClaims.find(verifiedClaim => verifiedClaim.workflowId === workflowId);

  if (!claim) {
    throw new Error(`Claim with workflowId ${workflowId} not found`);
  }

  return verifiedClaim;
}

// Function to get a claim by referenceId
export const getVerifiedClaimByReferenceId = (referenceId) => {
  console.log(`Fetching claim with referenceId: ${referenceId}`);
  const verifiedClaim = verifiedClaims.find(verifiedClaim => verifiedClaim.reference === referenceId);

  if (!verifiedClaim) {
    throw new Error(`Claim with referenceId ${referenceId} not found`);
  }

  return verifiedClaim;
}
