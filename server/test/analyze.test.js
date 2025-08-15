const test = require('node:test');
const assert = require('assert');
const request = require('supertest');
process.env.DASHSCOPE_API_KEY = 'test';
const app = require('../server');

test('POST /analyze without image returns 500', async () => {
  const res = await request(app).post('/analyze');
  assert.strictEqual(res.statusCode, 500);
  assert.deepStrictEqual(res.body, { error: 'Failed to analyze image' });
});
