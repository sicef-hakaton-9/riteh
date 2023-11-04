import { DataTable } from "..";
import type { Payment } from "./columns";
import { columns } from "./columns";

const data: Payment[] = [
  {
    amount: 316,
    email: "ken99@yahoo.com",
    id: "m5gr84i9",
    status: "success"
  },
  {
    amount: 242,
    email: "Abe45@gmail.com",
    id: "3u1reuv4",
    status: "success"
  },
  {
    amount: 837,
    email: "Monserrat44@gmail.com",
    id: "derv1ws0",
    status: "processing"
  },
  {
    amount: 874,
    email: "Silas22@gmail.com",
    id: "5kma53ae",
    status: "success"
  },
  {
    amount: 721,
    email: "carmella@hotmail.com",
    id: "bhqecj4p",
    status: "failed"
  },
  {
    amount: 726,
    email: "sdiufhsdi@hotmail.com",
    id: "bhqecj4p",
    status: "failed"
  }
];

const DataTableDemo = () => {
  return <DataTable data={data} columns={columns} pageSize={5} />;
};

export default DataTableDemo;
