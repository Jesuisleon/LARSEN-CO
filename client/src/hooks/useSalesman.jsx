import { useState } from "react";
import axios from "axios";

export const useSalesman = () => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getAllSalesmen = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get("/api/salesman/all");
            const json = response.data;
            setIsLoading(false);
            return json;
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    const getSalesman = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/salesman/${id}`);
            const json = response.data;
            setIsLoading(false);
            return json;
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    return { getAllSalesmen, getSalesman, error, isLoading };
};

export default useSalesman;

