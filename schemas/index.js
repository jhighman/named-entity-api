
export const namedEntitySchema = {
    description: 'Describe this',
    type: 'object',
    properties: {
        id: { type: 'integer' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        middleName: { type: 'string' },
        email: { type: 'string', format: 'email' }
    },
    required: ['id', 'firstName', 'lastName', 'middleName', 'email'],

};

export const searchQuerySchema = {
    description: 'Describe this',
    type: 'object',
    properties: {
        lastName: { type: 'string' },
        firstName: { type: 'string', minLength: 1 }, // Optional, assuming minLength for a non-empty string
        email: { type: 'string', format: 'email' }   // Optional, format set to 'email' for email validation
    }
};

export const claimSchema = {
    $id: 'claim',
    type: 'object',
    properties: {
        workflowId: {
            type: 'string',
            description: 'A reference to the associated workflow.'
        },
        credentialSubject: {
            type: 'object',
            properties: {
                firstName: { type: 'string', description: 'The first name of the individual associated with the claim.' },
                middleName: { type: 'string', description: 'The middle name of the individual associated with the claim.' },
                lastName: { type: 'string', description: 'The last name of the individual associated with the claim.' },
                // Include other personal attributes as necessary, with descriptions
            },
            required: ['firstName', 'lastName'],
            description: 'The subject of the credential, typically the individual to whom the claim pertains.'
        },
        claimType: {
            type: 'string',
            enum: ['license', 'certification', 'degree'],
            description: 'The type of claim being made, such as a license, certification, or degree.'
        },
        identifier: {
            type: 'string',
            description: 'A unique identifier for the claim.'
        },
        identifierDescriptor: {
            type: 'string',
            description: 'A descriptive or explanatory statement about the claim’s identifier.'
        },
        subtype: {
            type: 'string',
            description: 'An optional subtype of the claim, providing additional categorization or details.'
        },
        reference: {
            type: 'string',
            description: 'A reference to an external system identifier that supports or validates the claim.'
        },
        referenceSystem: {
            type: 'string',
            description: 'The name or type of the external system where the reference identifier is held, providing context for the reference.'
        },
        referenceType: {
            type: 'string',
            description: 'The type of the reference provided, clarifying the nature or source of the reference.'
        }
    },
    required: ['credentialSubject', 'claimType', 'identifier', 'identifierDescriptor', 'reference', 'referenceSystem', 'referenceType'],
    additionalProperties: false,
    description: 'A schema defining a claim, which includes details about the individual and the specific claim being made. The schema encompasses supporting references, identifiers, and the system associated with these references.'
};


// ErrorSchema definition
export const errorSchema = {
    description: 'Represents an error',
    type: 'object',
    properties: {
        code: {
            type: 'string',
            description: 'Error status code'
        },
        message: {
            type: 'string',
            description: 'Error message'
        }
    }
};

export const verifiedClaimSchema = {
    $id: 'verifiedClaim',
    type: 'object',
    properties: {
        claim: {
            $ref: 'claim#' // Reference to the claim schema
        },
        verification: {
            type: 'object',
            properties: {
                verificationStatus: {
                    type: 'string',
                    enum: ['verified', 'pending', 'unverifiable', 'denied']
                },
                issueDate: { type: 'string', format: 'date' },
                verificationDate: { type: 'string', format: 'date' },
                claimStatus: { type: 'string' }
            },
            required: ['verificationStatus', 'issueDate', 'verificationDate', 'claimStatus']
        }
    },
    required: ['claim', 'verification'],
    additionalProperties: false
};

export const verifiableCredentialSchema = {
    $id: 'verifiableCredential',
    type: 'object',
    properties: {
        '@context': {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            description: 'Contexts provide meaning to the properties of the credential. Each item is a URI pointing to a context definition.'
        },
        'type': {
            type: 'array',
            items: { type: 'string' },
            contains: { const: 'VerifiableCredential' },
            description: 'An array of types for the credential. Must contain "VerifiableCredential" and can include additional types.'
        },
        'issuer': {
            type: 'string',
            description: 'Identifier of the entity that issued the credential, which can be a URI or a decentralized identifier (DID).'
        },
        'issuanceDate': {
            type: 'string',
            format: 'date-time',
            description: 'The date and time when the credential was issued.'
        },
        'credentialSubject': {
            $ref: 'verifiedClaim#',
            description: 'The subject of the credential, which includes the claim being made.'
        },
        'proof': {
            type: 'object',
            properties: {
                type: { type: 'string' },
                created: { type: 'string', format: 'date-time' },
                proofPurpose: { type: 'string' },
                verificationMethod: { type: 'string' },
                jws: { type: 'string' }
            },
            required: ['type', 'created', 'proofPurpose', 'verificationMethod', 'jws'],
            description: 'Cryptographic proof of the credential, which can vary based on the proof method used. It typically includes the proof type, creation date, purpose, verification method, and the actual cryptographic signature (jws).'
        }
    },
    required: ['@context', 'type', 'issuer', 'issuanceDate', 'credentialSubject'],
    additionalProperties: false,
    description: 'A schema for a verifiable credential as per the W3C VC Data Model. It includes context, types, issuer information, issuance date, the subject claim, and an optional cryptographic proof.'
};

const verifiedClaims = [
    {
        claim: {
            workflowId: 'workflow123',
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
            workflowId: 'workflow456',
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
            workflowId: 'workflow789',
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



export const workItemSchema = {
    $id: 'workItem',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'A unique identifier for the work item.'
        },
        status: {
            type: 'string',
            enum: ['notStarted', 'started', 'complete', 'published', 'archived'],
            description: 'The current status of the work item.'
        },
        dates: {
            type: 'object',
            properties: {
                startedDate: { type: 'string', format: 'date-time', description: 'The date and time when the work item was marked as started.' },
                completedDate: { type: 'string', format: 'date-time', description: 'The date and time when the work item was marked as completed.' },
                publishedDate: { type: 'string', format: 'date-time', description: 'The date and time when the work item was marked as published.' },
                archivedDate: { type: 'string', format: 'date-time', description: 'The date and time when the work item was marked as archived.' }
            },
            description: 'Dates associated with each status transition of the work item.'
        },
        workItemReferenceId: {
            type: 'string',
            description: 'A reference identifier linking the work item to a subject, claim, or credential.'
        },
        referenceType: {
            type: 'string',
            enum: ['subject', 'claim', 'credential'],
            description: 'The type of reference the work item is associated with, indicating whether it relates to a subject, claim, or credential.'
        }
    },
    required: ['id', 'status', 'dates', 'workItemReferenceId', 'referenceType'],
    additionalProperties: false,
    description: 'A schema for a work item, representing a simple unit of work with an identifier, status, associated dates, and references to other entities like subjects, claims, or credentials.'
};

export const workItemListSchema = {
    type: 'array',
    items: { $ref: 'workItem#' }, // Reference the schema by its unique identifier
    description: 'A schema for a list of work items.'
};