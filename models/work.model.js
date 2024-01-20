

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

export const getWorkItems = () => {
    console.log("3 ----- >Model: Fetching all work items");
    console.log(workItems);
    return workItems;
};

export const getWorkItemById = (id) => {
    console.log(`Fetching work item with id: ${id}`);
    const item = workItems.find(item => item.id === id);

    if (!item) {
        throw new Error(`Work item with id ${id} not found`);
    }

    return item;
};



