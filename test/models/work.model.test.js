import { test } from 'node:test';
import * as assert from 'node:assert';
import { build } from '../helper.js';
import { getWorkItems, getWorkItemById } from '../../models/work.model.js';

test('getWorkItems returns all work items', async () => {

    const items = getWorkItems();
    assert.strictEqual(items instanceof Array, true, 'getWorkItems should return an array');
    assert.strictEqual(items.length, 3, 'getWorkItems should return 3 items');
});


