import { StatusEnum, WorkflowReferenceTypeEnum } from './enums.js';

let idCounter = 0;

const generateId = () => {
    idCounter += 1;
    return idCounter.toString();
};

const ReferenceTypeEnum = WorkflowReferenceTypeEnum;

const createWorkItem = (workItemData) => ({
    id: generateId(),
    ...workItemData,
    dates: {
        startedDate: workItemData.startedDate || null,
        completedDate: workItemData.completedDate || null,
        publishedDate: workItemData.publishedDate || null,
        archivedDate: workItemData.archivedDate || null
    }
});

const sample_notStarted_workItem = {
    status: StatusEnum.NOT_STARTED,
    workItemReferenceId: "1",
    referenceType: WorkflowReferenceTypeEnum.CLAIM
};

const sample_started_workItem = {
    status: StatusEnum.STARTED,
    startedDate: "2024-01-03T10:00:00",
    workItemReferenceId: "2",
    referenceType: WorkflowReferenceTypeEnum.SUBJECT
};

const sample_complete_workItem = {
    status: StatusEnum.COMPLETE,
    startedDate: "2024-01-05T10:00:00",
    completedDate: "2024-01-06T15:00:00",
    workItemReferenceId: "3",
    referenceType: WorkflowReferenceTypeEnum.CREDENTIAL
};

const workItems = [
    createWorkItem(sample_notStarted_workItem),
    createWorkItem(sample_started_workItem),
    createWorkItem(sample_complete_workItem)
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



