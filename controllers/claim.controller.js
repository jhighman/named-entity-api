// Import the claim model from the models folder
import { getAllClaims, getClaimByWorkflowId, getClaimByReferenceId } from '../models/claim.model.js';


export const listAllClaims = async () => {
    try {
        const claims = await getAllClaims();
        return claims; // Directly return the claims
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getClaimByRefId = async (refId) => {
    try {
        const claim = await getClaimByReferenceId(refId);
        return claim; // Directly return the claim
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getClaimByWFId = async (workflowId) => {
    try {
        const claim = await getClaimByWorkflowId(workflowId);
        return claim; // Directly return the claim
    } catch (error) {
        throw new Error(error.message);
    }
};



