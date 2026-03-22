// DemoNotesModule.ts
// Detailed demo notes for multiple modules, now using Markdown formatting

export const demoNotes = [
    // Module 1
    `# Module 1: Introduction to Solidity and Smart Contracts

Welcome to Module 1! In this lesson, we dive deep into **Solidity** — the programming language used to build smart contracts on Ethereum. By the end of this module, you will understand the fundamentals of smart contracts and Solidity syntax.

## Key Topics
1. **What is Solidity?**
   - A high-level, statically-typed language for Ethereum smart contracts.
   - Difference between traditional programming and blockchain programming.
2. **Smart Contracts Basics**
   - Self-executing contracts stored on the blockchain.
   - Interact with Ethereum Virtual Machine (EVM) and maintain state.
3. **Solidity Essentials**
   - Data Types: \`uint\`, \`int\`, \`bool\`, \`address\`, \`string\`, arrays.
   - State Variables: Persistent storage on-chain.
   - Functions: Creating functions, visibility modifiers, control flow.
4. **Deploying Your First Contract**
   - Create a simple contract using Remix IDE.
   - Deploy on a testnet, interact with functions, and read blockchain data.
5. **Best Practices**
   - Modular and readable code.
   - Always test in a safe environment before mainnet deployment.

## Practice
- Write a "HelloWorld" contract.
- Modify variables and functions to observe state changes.
- Document observations and questions in your notes.

## Tips
- Take your time, experiment often, and ask questions in forums or GitHub Discussions.
- Debug contracts using Remix IDE to visualize behavior.

By completing this module, you'll have a strong foundation for the next modules that cover data types, functions, and practical contract implementation.
`,

    // Module 2
    `# Module 2: Solidity Data Types and Functions

Welcome to Module 2! In this module, we explore Solidity's data types, how to store data in contracts, and how to build reusable functions. These are the building blocks for writing functional smart contracts.

## Key Topics
1. **Solidity Data Types**
   - \`uint\`, \`int\`, \`bool\`, \`string\`, \`address\`.
   - Arrays, mappings, structs for organizing data.
2. **State Variables vs Local Variables**
   - State variables persist on-chain, local variables exist only during function execution.
3. **Functions**
   - Writing reusable functions.
   - Visibility modifiers: \`public\`, \`private\`, \`internal\`, \`external\`.
   - Return types and multiple returns.
4. **Function Modifiers**
   - Custom modifiers for access control.
   - Using \`require()\` for input validation and contract safety.
5. **Practical Examples**
   - Build a simple token contract with balance tracking.
   - Create functions to deposit, withdraw, and transfer tokens.

## Practice Exercises
- Create a small contract using arrays and mappings.
- Write functions with different visibility and test their behavior.
- Use \`require()\` to prevent invalid operations.

## Tips
- Modular functions make contracts easier to debug and upgrade.
- Test each function thoroughly on a testnet.
- Document lessons learned and code snippets for reference.

By completing this module, you'll understand how to structure data and functions in Solidity, preparing you for more complex smart contracts in upcoming modules.
`
];
