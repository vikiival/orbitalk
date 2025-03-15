# Orbitalk - Onchain Space Friend

API is ready to interact with OMI and Base Sepolia blochchain.
Uses AgentKit to interact with blockchain and OpenAI to interact with users.

It integrates [AgentKit](https://github.com/coinbase/agentkit) to provide AI-driven interactions with on-chain capabilities.

## Getting Started

First, install dependencies:

```sh
pnpm install
```

Then, configure your environment variables:

```sh
mv .env.local .env
```

Run the development server:

```sh
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the project.


## Configuring Your Agent

You can [modify your configuration](https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#usage) of the agent. By default, your agentkit configuration occurs in the `/api/agent/prepare-agentkit.ts` file, and agent instantiation occurs in the `/api/agent/create-agent.ts` file.

### 1. Select Your LLM  
Modify the OpenAI model instantiation to use the model of your choice.

### 2. Select Your Wallet Provider  
AgentKit requires a **Wallet Provider** to interact with blockchain networks.

### 3. Select Your Action Providers  
Action Providers define what your agent can do. You can use built-in providers or create your own.

---