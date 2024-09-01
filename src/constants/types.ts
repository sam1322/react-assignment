export type SideBarIcon =
  | "Home"
  | "Inventory"
  | "Cart"
  | "Control Tower"
  | "Billing"
  | "Customers"
  | "App Store"
  | "Settings"
  | "Signout";

export const SideBarIconArr = [
  "Home",
  "Inventory",
  "Cart",
  "Control Tower",
  "Billing",
  "Customers",
  "App Store",
  "Settings",
  "Signout",
  //   "Control Tower",
] as const;


export interface TriangleProps {
  width?: number;
  height?: number;
  color?: string;
}