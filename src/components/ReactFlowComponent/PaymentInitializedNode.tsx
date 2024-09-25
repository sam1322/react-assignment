import React, { memo, useState } from "react";
import { Handle, NodeResizer, Position } from "@xyflow/react";

import { cn } from "@/lib/utils";

interface PaymentInitializedNodeProps {
  data: any;
  id: string;
  selected: boolean;
}

const PaymentInitializedNode = ({ data, id, selected, ...resProps }:PaymentInitializedNodeProps) => {
  const [value, setValue] = useState("");
  // console.log("data", data, resProps);
  const { nodeType, onDeleteNode } = data;

  const threshold = 1000;

  let label = "";
  let imageSrc = null;
  let width = 20,
    height = 20;

  return (
    <div
      className={cn(
        "bg-white w-full h-full border-4 border-violet-400  flex flex-col items-center",
        parseInt(value) > threshold ? "border-red-500" : ""
      )}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={200}
        minHeight={90}
      />
      <div
        className={cn(
          "bg-purple-700 text-white w-full flex items-center justify-center py-4 px-0",
          parseInt(value) > threshold ? "bg-red-500" : ""
        )}
      >
        Payment Initialized
      </div>
      <div className="flex items-center justify-center p-4 text-blue-400 w-full">
        $
        <input
          type="number"
          className="outline-none border cursor-pointer w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {/* <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        // isConnectable={isConnectable}
      /> */}

      {/* <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      /> */}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        // style={{ top: 10, background: "#555" }}
        // isConnectable={isConnectable}
      />
      {/* <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      /> */}
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

// export default PaymentInitializedNode;
export default memo(PaymentInitializedNode);
