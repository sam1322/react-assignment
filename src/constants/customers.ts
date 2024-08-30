export type Customer = {
  id: number;
  name: string;
  title: string;
  address: string;
};

export const customerList: Customer[] = [
  {
    id: 1,
    name: "Customer 01",
    title:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste  recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad esse modi.Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad essemodi.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad essemodi.",
    address: "1234 Elm Street, Springfield, IL",
  },
  {
    id: 2,
    name: "Customer 02",
    title:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste  recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad esse modi.Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad essemodi.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad essemodi.",
    address: "1234 Elm Street, Springfield, IL",
  },
  {
    id: 3,
    name: "Customer 03",
    title:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste  recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad esse modi.Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad essemodi.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad essemodi.",
    address: "1234 Elm Street, Springfield, IL",
  },
];

const customerData = {
  id: 1,
  name: "Customer 01",
  title:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste  recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad esse modi.Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad essemodi.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil eaque a pariatur voluptates laborum fuga optio iste recusandae sunt incidunt est, quo rerum? Voluptas enim vel ad essemodi.",
  address: "1234 Elm Street, Springfield, IL",
};

// const arr = new Array(100);
// const arr = [1,2,3,4,5]
const arr = Array.from({ length: 100 }, (_, i) => i + 1);

export const newCustomerList: Customer[] = arr.map((item, index) => ({
  id: index,
  name: "Customer " + index,
  title: customerData.title,
  address: customerData.address,
}));
