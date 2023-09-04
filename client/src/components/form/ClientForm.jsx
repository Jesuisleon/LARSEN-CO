import { useState, useEffect } from "react";
import { useClient } from "hooks/useClient";

export default function ClientForm({ client, handleClient }) {
  const { getClient } = useClient();

  const [clientList, setClientList] = useState([]);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    const matchClient = clientList.find(
      (clientOnList) => clientOnList[inputName] === inputValue
    );
    if (matchClient) {
      handleClient({
        _id: matchClient._id,
        name: matchClient.name,
        address: matchClient.address,
        contact: matchClient.contact,
      });
    } else {
      const clientUpdate = {...client, [inputName]: inputValue };
      handleClient(clientUpdate);
    }
  };

  useEffect(() => {
    getClient().then((data) => setClientList(data));
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 pb-4 border-b-2 border-gray-500">
      <div>
        <label htmlFor="name" className="label">
          name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="input"
          value={client.name || ""}
          onChange={(e) => handleChange(e)}
          list="clients-name"
        />
        <datalist id="clients-name">
          {clientList?.map((client) => (
            <option key={client._id} value={client.name} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="address" className="label">
          Adress
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="input"
          value={client.address || ""}
          onChange={(e) => handleChange(e)}
          list="clients-address"
        />
        <datalist id="clients-address">
          {clientList.map((client) => (
            <option key={client._id} value={client.address} />
          ))}
        </datalist>
      </div>
      <div className="col-span-2">
        <label htmlFor="contact" className="label">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          className="input"
          value={client.contact || ""}
          onChange={(e) => handleChange(e)}
          list="clients-contact"
        />
        <datalist id="clients-contact">
          {clientList.map((client) => (
            <option key={client._id} value={client.contact} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
