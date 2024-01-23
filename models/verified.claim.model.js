import { ClaimTypeEnum,  ReferenceSystemEnum, ReferenceTypeEnum, VerificationStatusEnum, ClaimStatusEnum } from './enums.js';

let workflowIdCounter = 0;
let verifiedClaims = [];

const generateWorkflowId = () => {
  workflowIdCounter += 1;
  return workflowIdCounter.toString();
};

// Modified createClaim function with logging and adding the claim to the array
const createClaim = ({
  credentialSubject, 
  claimType,
  identifier, 
  identifierDescriptor, 
  subtype, 
  reference, 
  referenceSystem, 
  referenceType, 
  verificationStatus, 
  verificationDate, 
  claimStatus
}) => {
  const newClaim = {
    claim: {
      workflowId: generateWorkflowId(),
      credentialSubject,
      claimType: claimType,
      identifier, // Ensure this line is correct
      identifierDescriptor,
      subtype,
      reference,
      referenceSystem: referenceSystem,
      referenceType: ReferenceTypeEnum[referenceType]
    },
    verification: {
      verificationStatus: verificationStatus,
      verificationDate,
      claimStatus: claimStatus,
    }
  };

  console.log("Creating New Claim:", JSON.stringify(newClaim, null, 2));
  return newClaim;
};


const sample_LICENSE_claim = {
  credentialSubject: { firstName: "Jack", middleName: "M.", lastName: "Johnson" },
  claimType: ClaimTypeEnum.LICENSE,
  identifier: "XX",
  identifierDescriptor: "Driver's License ID",
  subtype: "Driver",
  reference: "DL-12345-AB",
  referenceSystem: ReferenceSystemEnum.TRUA,
  referenceType: ReferenceTypeEnum.BIO_ID,
  verificationStatus: VerificationStatusEnum.VERIFIED,
  verificationDate: "2024-01-01",
  claimStatus: ClaimStatusEnum.PENDING
};

const sample_CERTIFICATION_claim = {
  credentialSubject: { firstName: "Bob", middleName: "D.", lastName: "Smith" },
  claimType: ClaimTypeEnum.CERTIFICATION,
  identifier: "XX",
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
  identifier: "XX",
  identifierDescriptor: "University Degree ID",
  subtype: "Bachelor of Science",
  reference: "P987987987978",
  referenceSystem: ReferenceSystemEnum.CE,
  referenceType: ReferenceTypeEnum.PUID,
  verificationStatus: VerificationStatusEnum.DENIED,
  verificationDate: "2024-01-03",
  claimStatus: ClaimStatusEnum.INACTIVE
};

verifiedClaims.push(createClaim(sample_LICENSE_claim));
verifiedClaims.push(createClaim(sample_CERTIFICATION_claim));
verifiedClaims.push(createClaim(sample_DEGREE_claim));


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
  console.log("-------- > Fetching all claims");
  return verifiedClaims;
}

// Function to get a claim by workflowId
export const getVerifedClaimByWorkflowId = (workflowId) => {
  console.log(`Fetching claim with workflowId: ${workflowId}`);
  const verifiedClaim = verifiedClaims.find(verifiedClaim => verifiedClaim.workflowId === workflowId);

  if (!verifiedClaim) {
    throw new Error(`Claim with workflowId ${workflowId} not found`);
  }

  return verifiedClaim;
}

// Function to log all current verified claims
export const logAllVerifiedClaims = () => {
  console.log("Current state of verifiedClaims:", JSON.stringify(verifiedClaims, null, 2));
};

// Function to get a claim by workflowID
export const getVerifiedClaimByWorkflowId = (workflowId) => {
  console.log(`Fetching verified claim with workflowId: ${workflowId}`);
  logAllVerifiedClaims();
  if (!workflowId) {
    throw { errorCode: 1, message: "Workflow ID must be provided" };
  }

  // Corrected filter condition
  const matchedClaims = verifiedClaims.filter(verifiedClaim => verifiedClaim.claim.workflowId === workflowId);

  if (matchedClaims.length === 0) {
    throw { errorCode: 100, message: "No claim found with the provided workflow ID" };
  } else if (matchedClaims.length > 1) {
    throw { errorCode: 101, message: "Multiple claims found with the provided workflow ID" };
  } 
  return { errorCode: 0, claim: matchedClaims[0] };
}

