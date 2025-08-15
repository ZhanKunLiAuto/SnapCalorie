# SnapCalorie
You can just take a photo to estimate the food calories.

## Mini Program

The `mini_program` folder contains a simple WeChat mini program that lets users take a photo and sends it to a backend to estimate calories using a large model.

## Server

The `server` directory provides an Express server that accepts an uploaded image and calls the Qwen model (via DashScope's OpenAI-compatible API) to estimate calories.

### Setup

```bash
cd server
npm install
export DASHSCOPE_API_KEY=your_dashscope_key
node server.js
```

### Testing

```bash
cd server
npm test
```

Continuous integration runs the same test suite on every push and pull request via GitHub Actions (see `.github/workflows/node.js.yml`).

### Deployment

The server is a standard Node.js application and can be deployed on cloud hosts or serverless platforms (e.g. Alibaba Cloud Function Compute, Vercel). Make sure the environment variable `DASHSCOPE_API_KEY` is configured and the mini program's network domain is whitelisted for the deployed endpoint.
