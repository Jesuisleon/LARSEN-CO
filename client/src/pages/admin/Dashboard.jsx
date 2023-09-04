import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSalesman } from "hooks/useSalesman";

import Tab from "components/Tab";
import LineChart from "pages/admin/LineChart";
import ArticleSalesList from "pages/admin/ArticleSalesList";
import ClientList from "pages/admin/ClientList";
import SalesmanList from "pages/admin/SalesmanList";

import {
  ChartBarIcon,
  UserGroupIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import LoadingSpinner from "components/LoadingSpinner.jsx";


export default function Dashboard({ user }) {

  const navigate = useNavigate();

  const { getSalesman, error, isLoading } = useSalesman();
  const [tabs, setTabs] = useState([
    { name: "Sales", href: "#", icon: ChartBarIcon, current: true, },
    { name: "Clients", href: "#", icon: IdentificationIcon, current: false },
    { name: "Salesmen", href: "#", icon: UserGroupIcon, current: false },
  ]);
  let currentTab = tabs.find((tab) => tab.current);


  const verifyAdmin = async () => {
    const salesman = await getSalesman(user.id);
    if (!salesman.isAdmin) {
      navigate("/error404");
    }
  };

  useEffect(() => {
    verifyAdmin();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="w-screen h-screen px-10 py-2">
      <Tab tabs={tabs} handleTabs={(e) => setTabs(e)} />
      {currentTab.name === "Sales" ? (
        <div>
          <LineChart />
          <div className="py-4 grid grid-cols-1 gap-x-12">
            <ArticleSalesList />
          </div>
        </div>
      ) : currentTab.name === "Clients" ? (
        <div className="pt-4">
          <ClientList />
        </div>
      ) : currentTab.name === "Salesmen" ? (
        <div className="pt-4">
          <SalesmanList />
        </div>
      ) : null}
    </div>
  );
}
