"use client";
import { FC, useEffect, useState } from "react";

import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Button } from "../ui/button";
import CustomSelectorNode from "./CustomSelectorNode";
import PaymentDropdown from "./PaymentDropdown";
import PaymentInitializedNode from "./PaymentInitializedNode";

const initialNodes = [
  // { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  // { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  // { id: "3", position: { x: 0, y: 200 }, data: { label: "23" } },
];

const initialEdges = [
  // { id: "e1-2", source: "1", target: "2" },
  // { id: "e1-3", source: "2", target: "3" },
];

interface NodeContainerProps {}
type NodeType = "google" | "apple" | "paypal";

const STORAGE_KEY = "react-flow-workflow";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
}

const useHistory = (initialState: FlowState) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (
    action: FlowState | ((prevState: FlowState) => FlowState),
    overwrite: boolean = false
  ) => {
    setHistory((prevHistory) => {
      const newState =
        typeof action === "function" ? action(prevHistory[index]) : action;
      const updatedHistory = prevHistory.slice(0, index + 1);

      // If overwrite, replace the current index with the new state
      if (overwrite) {
        updatedHistory[index] = newState;
        return [...updatedHistory];
      }

      // Otherwise, append the new state and update index
      setIndex((prevIndex) => prevIndex + 1);
      return [...updatedHistory, newState];
    });
    // const newState =
    //   typeof action === "function" ? action(history[index]) : action;
    // if (overwrite) {
    //   const historyCopy = [...history];
    //   historyCopy[index] = newState;
    //   setHistory(historyCopy);
    // } else {
    //   const updatedState = [...history].slice(0, index + 1);
    //   setHistory([...updatedState, newState]);
    //   setIndex((prevState) => prevState + 1);
    // }
  };

  console.log("history nodes length", history.length, index);

  // const undo = useCallback(() => {
  const undo = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };
  // }, []);

  const redo = useCallback(() => {
    console.log("lol");
    setIndex((prevIndex) =>
      prevIndex < history.length - 1 ? prevIndex + 1 : prevIndex
    );
  }, [history.length]);
  useEffect(() => {
    if (index >= history.length) {
      setIndex(history.length - 1);
    }
  }, [index, history.length]);

  return [
    history[index],
    setState,
    undo,
    redo,
    index > 0,
    index < history.length - 1,
    index,
  ] as const;
};

// const useHistory = (initialState) => {
//   const [index, setIndex] = useState(0);
//   const [history, setHistory] = useState([initialState]);

//   const setState = (action, overwrite = false) => {
//     const newState =
//       typeof action === "function" ? action(history[index]) : action;
//     if (overwrite) {
//       const historyCopy = [...history];
//       historyCopy[index] = newState;
//       setHistory(historyCopy);
//     } else {
//       const updatedState = [...history].slice(0, index + 1);
//       setHistory([...updatedState, newState]);
//       setIndex((prevState) => prevState + 1);
//     }
//   };
//   console.log("history nodes length", history.length, index);

//   const undo = useCallback(() => {
//     setIndex((prevState) => (prevState > 0 ? prevState - 1 : prevState));
//   }, []);

//   const redo = useCallback(() => {
//     setIndex((prevState) =>
//       prevState < history.length - 1 ? prevState + 1 : prevState
//     );
//   }, [history.length]);

//   return [history[index], setState, undo, redo];
// };

const NodeContainer: FC<NodeContainerProps> = ({}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // const [history, setHistory, undo, redo] = useHistory({ nodes, edges });

  const saveWorkflow = (nodes: Node[], edges: Edge[]) => {
    // const workflow = { nodes, edges };
    const serializedNodes = nodes.map(
      ({ id, data, position, type, measured }) => ({
        id,
        data: {
          label: data?.label,
          nodeType: data?.nodeType,
          // onDeleteNode: onDeleteNode,
        },

        position,
        type,
        measured,
      })
    );

    const serializedEdges = edges.map(
      ({ id, source, target, type }) => ({
        id,
        source,
        target,
        type,
      })
    );

    const workflow = { nodes: serializedNodes, edges: serializedEdges };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflow));
  };

  const loadWorkflow = (): FlowState | null => {
    const savedWorkflow = localStorage.getItem(STORAGE_KEY);
    return savedWorkflow ? JSON.parse(savedWorkflow) : null;
  };

  const [historyObj, setHistory, undo, redo, canUndo, canRedo, index] =
    useHistory({ nodes: initialNodes, edges: initialEdges });

  const historyNodes = historyObj?.nodes;
  const historyEdges = historyObj?.edges;

  const nodeTypes = {
    selectorNode: CustomSelectorNode,
    paymentNode: PaymentInitializedNode,
  };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      setHistory({ nodes, edges });
    },
    [nodes, edges, onNodesChange, setHistory]
  );

  const handleEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes);
      setHistory({ nodes, edges });
    },
    [nodes, edges, onEdgesChange, setHistory]
  );

  const handleConnect = useCallback(
    (connection) => {
      onConnect(connection);
      setHistory({ nodes, edges: [...edges, connection] });
    },
    [nodes, edges, onConnect, setHistory]
  );

  const onSave = useCallback(() => {
    saveWorkflow(nodes, edges);
    alert("Workflow saved successfully!");
  }, [nodes, edges]);

  const onLoad = useCallback(() => {
    const savedWorkflow = loadWorkflow();
    if (savedWorkflow) {
      setNodes(savedWorkflow.nodes);
      setEdges(savedWorkflow.edges);
      setHistory(
        { nodes: savedWorkflow.nodes, edges: savedWorkflow.edges },
        true
      );
      setTimeout(() => {
        alert("Workflow loaded successfully!");
      }, 500);
    } else {
      alert("No saved workflow found.");
    }
  }, [setNodes, setEdges]);

  const onClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setHistory({ nodes: [], edges: [] }, true);
    localStorage.removeItem(STORAGE_KEY);
    setTimeout(() => {
      alert("Workflow cleared and local storage reset.");
    }, 500);
  }, [setNodes, setEdges]);

  // const addNode = (type: NodeType) => {
  //   const newId = Math.random().toString(36).substr(2, 9);

  //   const newNode: Node = {
  //     id: newId,
  //     position: { x: 300, y: 300 },
  //     data: {
  //       label: newId,
  //       nodeType: type,
  //       onDeleteNode: onDeleteNode,
  //     },
  //     type: "selectorNode",
  //   };
  //   setNodes((nodes) => [...nodes, newNode]);

  //   setHistory({ nodes: [...nodes, newNode], edges });
  // };

  // const onDeleteNode = (nodeId: string) => {
  //   console.log("nodeId", nodeId);
  //   setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
  // };

  const addNode = useCallback(
    (type: NodeType) => {
      const newId = Math.random().toString(36).substr(2, 9);
      const newNode: Node = {
        id: newId,
        position: { x: 300, y: 300 },
        data: {
          label: newId,
          nodeType: type,
          onDeleteNode: onDeleteNode,
        },
        type: "selectorNode",
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
      setHistory({ nodes: [...nodes, newNode], edges });
    },
    [nodes, edges, setNodes, setHistory]
  );

  const addPaymentNode = useCallback(
    (type: NodeType) => {
      const newId = Math.random().toString(36).substr(2, 9);
      const newNode: Node = {
        id: newId,
        position: { x: 300, y: 300 },
        data: {
          label: newId,
          // nodeType: type,
          onDeleteNode: onDeleteNode,
        },
        type: "paymentNode",
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
      setHistory({ nodes: [...nodes, newNode], edges });
    },
    [nodes, edges, setNodes, setHistory]
  );

  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
      setHistory({
        nodes: nodes.filter((node) => node.id !== nodeId),
        edges: edges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        ),
      });
    },
    [nodes, edges, setNodes, setHistory]
  );

  console.log("nodes", nodes, historyNodes);

  useEffect(() => {
    function keyPressHandler(e) {
      var evtobj = window.event ? window.event : e;

      // console.log("evtobj", evtobj);
      if (evtobj.ctrlKey && evtobj.keyCode == 90) {
        console.log("Ctrl+z");
        undo();
      } else if (evtobj.ctrlKey && evtobj.keyCode == 89) {
        console.log("Ctrl+y");
        redo();
      }
    }

    window.addEventListener("keydown", keyPressHandler);
    () => window.removeEventListener("keydown", keyPressHandler);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      hello again
      <div className="flex gap-2">
        <PaymentDropdown addNode={addNode} nodes={nodes} />
        {/* <ComboboxDemo /> */}
        {/* <CustomSelectorNode/> */}
        {/* <Button variant={"outline"} onClick={() => addNode("google")}>
          Google
        </Button>
        <Button variant={"outline"} onClick={() => addNode("apple")}>
          Apple
        </Button>
        <Button variant={"outline"} onClick={() => addNode("paypal")}>
          Paypal
        </Button> */}
        <Button variant={"outline"} disabled={!canUndo} onClick={undo}>
          Undo (Ctrl + z)
        </Button>
        <Button variant={"outline"} disabled={!canRedo} onClick={redo}>
          Redo (Ctrl + y)
        </Button>
        <Button variant={"outline"} onClick={addPaymentNode}>
          Add Payment Node
        </Button>
        <Button variant={"outline"} onClick={onSave}>
          Save
        </Button>
        <Button variant={"outline"} onClick={onLoad}>
          Load
        </Button>
        <Button variant={"outline"} onClick={onClear}>
          Clear
        </Button>
      </div>
      <div className="bg-black h-[900px] w-[80%] ">
        <ReactFlow
          // nodes={nodes}
          // edges={edges}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          nodes={historyNodes ?? nodes}
          edges={historyEdges ?? edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          nodeTypes={nodeTypes}
        >
          {/* <MiniMap /> */}
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default NodeContainer;
