import { useState } from "react";
import axios from "axios";

export const useClient = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getClient = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/client/all");
      const json = response.data;
      setIsLoading(false);
      return json;
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const createClient = async (client) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/client/create", client);
      const json = response.data;
      setIsLoading(false);
      return 'New client created';
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };
  
  const deleteClient = async (clientId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`/api/client/delete/${clientId}`);
      const json = response.data;
      setIsLoading(false);
      return 'Client deleted';
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { getClient, createClient, deleteClient, error, isLoading };
};

export default useClient;