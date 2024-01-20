import { test } from 'node:test';
import * as assert from 'node:assert';
import { getWorkById, listAllWorkItems } from '../../controllers/work.controller.js';

const mockWorkItems = [
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

const mockRequest = (body = {}, params = {}) => ({
    body,
    params
});

const mockReply = () => {
    const reply = {};
    reply.send = function (data) {
        reply.sentData = data;
        return reply;
    };
    reply.status = function (statusCode) {
        reply.statusCode = statusCode;
        return reply;
    };
    return reply;
};

test('getWorkItemById retrieves a work item successfully', async () => {
    const id = '1'; // Example ID
    const expectedWorkItem = mockWorkItems.find(item => item.id === id);

    const actualWorkItem = await getWorkById(id);

    assert.strictEqual(actualWorkItem.id, expectedWorkItem.id, 'IDs should match');
    assert.strictEqual(actualWorkItem.status, expectedWorkItem.status, 'Statuses should match');
    assert.deepStrictEqual(actualWorkItem.dates, expectedWorkItem.dates, 'Dates should match');
    assert.strictEqual(actualWorkItem.workItemReferenceId, expectedWorkItem.workItemReferenceId, 'Reference IDs should match');
    assert.strictEqual(actualWorkItem.referenceType, expectedWorkItem.referenceType, 'Reference types should match');
});

test('listAllWorkItems retrieves all work items successfully', async () => {
    const actualWorkItems = await listAllWorkItems();

    assert.strictEqual(actualWorkItems.length, mockWorkItems.length, 'Number of work items should match');
    
    actualWorkItems.forEach((item, index) => {
        const expectedItem = mockWorkItems[index];
        assert.strictEqual(item.id, expectedItem.id, `ID of work item ${index} should match`);
        assert.strictEqual(item.status, expectedItem.status, `Status of work item ${index} should match`);
        assert.deepStrictEqual(item.dates, expectedItem.dates, `Dates of work item ${index} should match`);
        assert.strictEqual(item.workItemReferenceId, expectedItem.workItemReferenceId, `Reference ID of work item ${index} should match`);
        assert.strictEqual(item.referenceType, expectedItem.referenceType, `Reference type of work item ${index} should match`);
    });
});
