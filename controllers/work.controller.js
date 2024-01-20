// Import the claim model from the models folder
import { getWorkItems, getWorkItemById } from '../models/work.model.js';

// Retrieve a work item by ID
export const getWorkById = async (id) => {
    try {
        console.log(`Fetching work item with id: ${id}`);
        const workItem = getWorkItemById(id);
        return workItem;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const listAllWorkItems = async () => {
    try {
        console.log("Fetching all work items");
        const workItems = getWorkItems(); // Assuming getWorkItems fetches the work items
        console.log(workItems); // Log the fetched work items
        return workItems; // Return the work items
    } catch (error) {
        console.error(error); // Log any errors
        throw error; // Re-throw the error to be handled by the caller
    }
};
