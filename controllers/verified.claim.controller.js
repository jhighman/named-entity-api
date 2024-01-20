// Import the claim model from the models folder
import { getAllVerifiedClaims, getVeridiedClaimByWorkflowId, getVerifiedClaimByReferenceId } from '../models/verified.claim.model.js';


export const listAllVClaims = async () => {
    try {
        const claims = await getAllVerifiedClaims();
        return claims; // Directly return the claims
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getVClaimByRefId = async (refId) => {
    try {
        const claim = await getVerifiedClaimByReferenceId(refId);
        return claim; // Directly return the claim
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getVClaimByWFId = async (workflowId) => {
    try {
        const claim = await getVeridiedClaimByWorkflowId(workflowId);
        return claim; // Directly return the claim
    } catch (error) {
        throw new Error(error.message);
    }
};



