import React, { memo } from "react";
import { Handle, NodeResizer, Position } from "@xyflow/react";
import Image from "next/image";
import googlePayIcon from "@public/images/googleicon.png";
import applePayIcon from "@public/images/appleicon.png";
import paypalIcon from "@public/images/paypalicon.png";

const CustomSelectorNode = ({ data, id,selected, ...resProps }) => {
  // console.log("data", data, resProps);
  const { nodeType, onDeleteNode } = data;

  let label = "";
  let imageSrc = null;
  let width = 20,
    height = 20;
  switch (nodeType) {
    case "google":
      label = "Google Pay";
      imageSrc = googlePayIcon;

      break;
    case "paypal":
      label = "Paypal";
      imageSrc = paypalIcon;
      break;

    case "stripe":
      label = "Stripe";
      // imageSrc = stripeIcon;
      imageSrc = googlePayIcon;
      break;

    case "apple":
      label = "Apple Pay";
      imageSrc = applePayIcon;
      width = 30;
      height = 30;
      break;
    default:
      label = "Default";
  }

  return (
    <div className="bg-white w-full h-full border-4 border-blue-400 p-4 py-2 rounded-3xl flex gap-6 items-center">
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        // isConnectable={isConnectable}
      />
      <div className="flex gap-2 items-center justify-center w-full truncate">
        <Image
          src={imageSrc?.src}
          alt={label}
          width={width}
          height={height}
          className={nodeType == "apple" ? "pb-[1px]" : ""}
        />{" "}
        {label}
      </div>
      <div className="text-xl text-red-500" onClick={() => onDeleteNode(id)}>
        &#10005;{" "}
      </div>
      {/* <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      /> */}
      {/* <Handle
        type="source"
        position={Position.Right}
        id="a"
        // style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      /> */}
      {/* <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      /> */}
    </div>
  );
};

// export default CustomSelectorNode;
export default memo(CustomSelectorNode);
