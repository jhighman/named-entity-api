
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