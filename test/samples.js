// Hardcoded list of named entities

const workItems = [
    {
      id: "1",
      status: "notStarted",
      dates: {
        startedDate: null,
        completedDate: null,
        publishedDate: null,
        archivedDate: null
      },
      workItemReferenceId: "1",
      referenceType: "claim"
    },
    {
      id: "2",
      status: "started",
      dates: {
        startedDate: "2024-01-03T10:00:00",
        completedDate: null,
        publishedDate: null,
        archivedDate: null
      },
      workItemReferenceId: "2",
      referenceType: "subject"
    },
    {
      id: "3",
      status: "complete",
      dates: {
        startedDate: "2024-01-05T10:00:00",
        completedDate: "2024-01-06T15:00:00",
        publishedDate: null,
        archivedDate: null
      },
      workItemReferenceId: "3",
      referenceType: "credential"
    }
  ];


  const claims = [
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

