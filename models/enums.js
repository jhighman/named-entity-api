export const ClaimTypeEnum = {
    LICENSE: "license",
    CERTIFICATION: "certification",
    DEGREE: "degree"
    // Add more claim types as needed
};

export const IdentifierEnum = {
    LICENSE: "ID-12345",
    CERTIFICATION: "ID-67890",
    DEGREE: "ID-112233"
    // Map additional identifiers as needed
};

export const ReferenceSystemEnum = {
    TRUA: "TRUA",
    CE: "ENDERA_CE",
    // Add more reference systems as needed
};

export const ReferenceTypeEnum = {
    BIO_ID: "PERSON_BIO_ID",
    PUID: "PUID",
    E_MAIL: "EMAIL",
    DID: "DID"
    // Add more reference types as needed
};

export const StatusEnum = {
    NOT_STARTED: "notStarted",
    STARTED: "started",
    COMPLETE: "complete"
    // Add more statuses as needed
};

export const WorkflowReferenceTypeEnum = {
    CLAIM: "claim",
    SUBJECT: "subject",
    CREDENTIAL: "credential"
    // Add more reference types as needed
};

export const VerificationStatusEnum = {
    VERIFIED: "verified",
    PENDING: "pending",
    DENIED: "denied"
    // Add more verification statuses as needed
};

export const ClaimStatusEnum = {
    ACTIVE: "active",
    PENDING: "pending",
    INACTIVE: "inactive"
    // Add more claim statuses as needed
};
