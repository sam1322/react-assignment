This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

install by npm or pnpm i

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.



Here's a brief description of how the core features like node resizing, undo/redo, and validation were implemented in React Flow:

1) ### Node Resizing:
Implementation: Node resizing is achieved by using NodeResizer pluggin in React Flow. Each node is wrapped in a resizable container  called NodeResizer . The resize event updates the node's dimensions in the nodes state, which triggers a re-render with the new size.
Key Steps:
Use a resizable wrapper on nodes.
Update the node’s width and height in the state.
Ensure the new dimensions persist in the flow state and reflect changes visually in the UI.


2) ### Undo/Redo:
Implementation: A custom history hook (useHistory) is created to manage the undo and redo functionality. The current state of nodes and edges is stored in a history array, and actions like adding, deleting, or modifying nodes/edges push new states to this array. Undo and redo adjust the index pointer to move through the saved states.
Key Steps:
Store each change (node/edge addition, deletion, or modification) in a history array.
Provide undo and redo functions to adjust the index in the history array.
Restore the flow state based on the index value, effectively reverting or reapplying changes.

3) ### Validation:
Implementation: Validation is used to ensure the nodes and edges follow specific rules (e.g., nodes can't overlap, only certain connections are allowed). This is implemented by adding a validation function that runs whenever nodes are moved or edges are created. The validation logic checks conditions like node overlap or invalid connections and either prevents or corrects the action.
Key Steps:
Check for invalid positions or connections on every node move or edge creation.
If validation fails, provide feedback to the user (e.g., disabling the connection or showing a warning).
Only allow changes that pass the validation criteria.

4) ### Save and load worflow : 
Implementation : 
We are saving the node array in the local storage and getting it when we load the array 


### For Autolayout our approach is : 
To use a Graph Layout Algorithm:

There are many  graph layout algorithms such as dagre, elkjs, or d3-force to automatically arrange the nodes in a layout that prevents overlapping.

Here we are going to use dagre for autolayout

These libraries provide ways to position nodes in a clean, hierarchical, or grid layout.
Integrate the Auto-Layout Algorithm:

We are also adding two buttons that allows the user to trigger the auto-layout feature on demand.

### Node connection validation 
involves checking whether the edges being created between nodes meet specific criteria before they are established. This prevents invalid or unwanted connections that could lead to logical errors in the application's behavior or data representation.

Why is it Important?
Data Integrity: Ensures that the graph represents valid relationships between nodes, which is crucial for applications relying on accurate data representation (e.g., flowcharts, workflows).
User Experience: Helps guide users to make valid connections, reducing confusion and enhancing usability.
Error Prevention: Prevents runtime errors that may occur due to invalid connections, improving application stability.
Common Validation Rules
Here are some typical validation rules you might implement:

#### Type Compatibility:

Ensure that only specific types of nodes can connect to each other. For example, a "Start" node may only connect to "Process" nodes.
Connection Directionality:

In directed graphs, ensure that edges can only be created in one direction. For instance, a "task" node might only connect to "completed" nodes and not vice versa.
Max Connections:

Limit the number of edges that can be connected to a single node. For example, a "merge" node might only allow a maximum of two incoming edges.
Preventing Loops:

Avoid connections that would create circular references, which can lead to infinite loops in processing.
Proximity Validation:

Validate connections based on the proximity of nodes. For instance, ensure that nodes must be within a certain distance to connect.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
