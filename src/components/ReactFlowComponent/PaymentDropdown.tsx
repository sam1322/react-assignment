import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

type NodeType = "google" | "apple" | "paypal";

interface PaymentDropdownProps {
  addNode: (type: NodeType) => void;
  nodes: any;
}

const PaymentDropdown: FC<PaymentDropdownProps> = ({ addNode, nodes }) => {
  const paymentArr = [
    { label: "Google Pay", value: "google" },
    { label: "Apple Pay", value: "apple" },
    { label: "Paypal", value: "paypal" },
    // {label: "Stripe", value: "stripe"}
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} className="w-[180px] ">
            Add Payment Provider
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          {paymentArr.map((payment) => (
            <DropdownMenuItem
              key={payment.value}
              className="cursor-pointer"
              disabled={
                nodes.find(
                  (node: any) => node.data.nodeType === payment.value
                ) != undefined
              }
              onClick={() => addNode(payment.value)}
            >
              {payment.label}
            </DropdownMenuItem>
          ))}
          {/* <DropdownMenuItem>Apple Pay</DropdownMenuItem>
          <DropdownMenuItem></DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PaymentDropdown;
