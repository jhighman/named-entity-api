/**
 * Claims Management System
 *
 * This system is designed to manage and process various types of claims (e.g., licenses, certifications, degrees).
 * Each claim is associated with a unique individual and includes information that links to external IT systems. 
 * These external systems are used for further verification and identification of individuals.
 *
 * - `ClaimTypeEnum`: Defines the type of claim (e.g., license, certification, degree).
 * - `ReferenceSystemEnum`: Enumerates the external IT systems (e.g., TRUA, ENDERA_CE). These systems contain additional data and are used to cross-reference and validate the claims.
 * - `ReferenceTypeEnum`: Represents the type of reference used to identify individuals in the external systems (e.g., biometric ID, personal unique ID, email, decentralized ID).
 *
 * Each claim combines a `reference`, `referenceSystem`, and an `identifier` to create a unique link to these external systems. This link is crucial for ensuring the accuracy and authenticity of the claim, as it allows for cross-system verification of the individual's identity and claim details.
 *
 * The `createClaim` function assembles these elements into a structured claim object, tying together internal data with external verification points.
 */


// Sample claim objects and creation of the claims array

import { ClaimTypeEnum, ReferenceSystemEnum, ReferenceTypeEnum } from './enums.js';

let workflowIdCounter = 0;

const generateWorkflowId = () => {
  workflowIdCounter += 1;
  return workflowIdCounter.toString();
};

const createClaim = (credentialSubject, claimType, identifier, identifierDescriptor, subtype, reference, referenceSystem, referenceType) => ({
  workflowId: generateWorkflowId(),
  credentialSubject,
  claimType,
  identifier,
  identifierDescriptor,
  subtype,
  reference,
  referenceSystem,
  referenceType
});

const sample_LICENSE_claim = {
  credentialSubject: { firstName: "Jack", middleName: "M.", lastName: "Johnson" },
  claimType: ClaimTypeEnum.INSURANCE,
  identifier: "7138923", // Example identifier
  identifierDescriptor: "NPM",
  subtype: "Insurance Provider",
  reference: "DL-12345-AB",
  referenceSystem: ReferenceSystemEnum.TRUA,
  referenceType: ReferenceTypeEnum.BIO_ID
};

const sample_CERTIFICATION_claim = {
  credentialSubject: { firstName: "Bob", middleName: "D.", lastName: "Smith" },
  claimType: ClaimTypeEnum.INSURANCE,
  identifier: "85034", // Example identifier
  identifierDescriptor: "License Number",
  subtype: "Insurance Provider",
  reference: "jonnyappleseed@rmail.com",
  referenceSystem: ReferenceSystemEnum.TRUA,
  referenceType: ReferenceTypeEnum.E_MAIL
};

const sample_DEGREE_claim = {
  credentialSubject: { firstName: "Carol", middleName: "L.", lastName: "Taylor" },
  claimType: ClaimTypeEnum.INSURANCE,
  identifier: "ID-12345", // Example identifier
  identifierDescriptor: "NPM",
  subtype: "Insurance Provider",
  reference: "P987987987978",
  referenceSystem: ReferenceSystemEnum.CE,
  referenceType: ReferenceTypeEnum.PUID
};

const claims = [
  createClaim(sample_LICENSE_claim),
  createClaim(sample_CERTIFICATION_claim),
  createClaim(sample_DEGREE_claim)
];


export const findClaimByReference = (reference, referenceSystem, referenceType) => {
  if (!reference || !referenceSystem || !referenceType) {
      throw new Error("All arguments (reference, referenceSystem, referenceType) must be provided");
  }

  return claims.find(claim => 
      claim.reference === reference && 
      claim.referenceSystem === referenceSystem && 
      claim.referenceType === referenceType
  );
};

export const findAllClaimsBySystem = (referenceSystem) => {
  if (!referenceSystem) {
      throw new Error("Reference system must be provided");
  }

  return claims.filter(claim => claim.referenceSystem === referenceSystem);
};

export const findClaimByWorkflowId = (workflowId) => {
  if (!workflowId) {
      throw { errorCode: 1, message: "Workflow ID must be provided" };
  }

  const matchedClaims = claims.filter(claim => claim.workflowId === workflowId);

  if (matchedClaims.length === 0) {
      throw { errorCode: 100, message: "No claim found with the provided workflow ID" };
  } else if (matchedClaims.length > 1) {
      throw { errorCode: 101, message: "Multiple claims found with the provided workflow ID" };
  }

  return { errorCode: 0, claim: matchedClaims[0] };
};

export const createNewClaim = (newClaim) => {
  console.log("Creating New Claim:", JSON.stringify(newClaim, null, 2));
  return { success: true, message: "New claim created successfully" };
};

export const updateClaim = (workflowId, updatedClaim) => {
  console.log(`Updating Claim with workflowId ${workflowId}:`, JSON.stringify(updatedClaim, null, 2));
  return { success: true, message: `Claim with workflowId ${workflowId} updated successfully` };
};

export const deleteClaim = (workflowId) => {
  console.log(`Deleting Claim with workflowId ${workflowId}`);
  return { success: true, message: `Claim with workflowId ${workflowId} deleted successfully` };
};


// Function to get all claims
export const getAllClaims = () => {
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