import { useState, useEffect } from "react";
import { useClient } from "hooks/useClient";

import Modal from "components/Modal";
import List from "components/List";

import { UserIcon } from "@heroicons/react/24/outline";

export default function ClientList() {
  const { getClient, deleteClient, error, isLoading } = useClient();
  const [clientList, setClientList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null) // id of selected client
  
  const getClientList = async () => {
    const data = await getClient();
    const newClientList = data.map((client) => {
      return { _id: client._id, name: client.name, address: client.address, contact: client.contact };
    });
    setClientList(newClientList);
  };

  useEffect(() => {
    getClientList();
  }, []);

  const handleDeleteAction = async (id) => {
    await deleteClient(id);
    setOpenModal(false);
    getClientList();
  };
 
  const openDeleteModal = (id) => {
    setSelectedClient(id);
    setOpenModal(true);
  };

  return (
    <div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title="Delete Client"
        description="Are you sure you want to delete this client? All of your data will be permanently removed from our servers forever. This action cannot be undone."
        handleAction={() => handleDeleteAction(selectedClient)}
        cancelButtonRef={null}
      />
      <List
        thList={["Name", "Address", "Contact", "Options"]}
        tdList={clientList}
        itemsPerPage={10}
        title="Clients"
        icon={<UserIcon className="h-6 w-6 text-gray-400 " aria-hidden="true" />}
        options={[{name: "Delete", action:(id) => openDeleteModal(id)}]}
      />
    </div>
  );
}