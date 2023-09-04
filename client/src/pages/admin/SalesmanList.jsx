import {useState, useEffect} from "react";

import { useSalesman } from "hooks/useSalesman";

import List from "components/List";

import { UserIcon } from "@heroicons/react/24/outline";

export default function SalesmanList() {
  const { getAllSalesmen } = useSalesman();
  const [salesmanList, setSalesmanList] = useState([]);

  useEffect(() => {
    getAllSalesmen().then((data) => {
      const newSalesmanList = data.map((salesman) => {
        return { _id: salesman._id, name: salesman.name, email: salesman.email, total_sales: salesman.total_sales + " $" };
      });
      setSalesmanList(newSalesmanList);
    });
  }, []);

  return (
    <List
      thList={["Name", "Email", "Total Sales"]}
      tdList={salesmanList}
      itemsPerPage={5}
      title="Salesman"
      icon={<UserIcon className="h-6 w-6 text-gray-400 " aria-hidden="true" />}
    />
  );
}
