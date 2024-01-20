import { test } from 'node:test';
import * as assert from 'node:assert';
import { getAllClaims, getClaimByWorkflowId, getClaimByReferenceId } from '../../models/claim.model.js';

test('getAllClaims returns all claims', () => {
    const claims = getAllClaims();
    assert.strictEqual(claims.length, 3, 'getAllClaims should return 3 claims');
    assert.ok(Array.isArray(claims), 'getAllClaims should return an array');
});

test('getClaimByWorkflowId returns the correct claim', () => {
    const workflowId = '1';
    const claim = getClaimByWorkflowId(workflowId);
    assert.strictEqual(claim.workflowId, workflowId, `getClaimByWorkflowId should return the claim with workflowId ${workflowId}`);
});

test('getClaimByWorkflowId throws an error for an invalid id', () => {
    const workflowId = 'nonexistent';
    try {
        getClaimByWorkflowId(workflowId);
        assert.fail('getClaimByWorkflowId should throw an error for an invalid id');
    } catch (error) {
        assert.strictEqual(error.message, `Claim with workflowId ${workflowId} not found`, 'getClaimByWorkflowId should throw an error with the correct message');
    }
});

// Assuming the reference field in your claims is 'reference'
test('getClaimByReferenceId returns the correct claim', () => {
    const referenceId = 'DL-12345-AB';
    const claim = getClaimByReferenceId(referenceId);
    assert.strictEqual(claim.reference, referenceId, `getClaimByReferenceId should return the claim with referenceId ${referenceId}`);
});

test('getClaimByReferenceId throws an error for an invalid id', () => {
    const referenceId = 'nonexistent';
    try {
        getClaimByReferenceId(referenceId);
        assert.fail('getClaimByReferenceId should throw an error for an invalid id');
    } catch (error) {
        assert.strictEqual(error.message, `Claim with referenceId ${referenceId} not found`, 'getClaimByReferenceId should throw an error with the correct message');
    }
});
