import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const useReport = () => {
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const createReport = async (salesmanId, report) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("/api/report/create", report);
      setIsLoading(false);
      navigate(`/salesman/${salesmanId}`);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  }

  const getAllReport = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/report/all`);
      const json = response.data;
      setIsLoading(false);
      return json;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const getAllReportBySalesman = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/report/all/${id}`);
      const json = response.data;
      setIsLoading(false);
      return json;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const getSingleReport = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/report/${id}`);
      const json = response.data;
      setIsLoading(false);
      return json;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const updateReport = async (salesmanId, id, report) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.put(`/api/report/update/${id}`, report);
      setIsLoading(false);
      navigate(`/salesman/${salesmanId}`);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const deleteReport = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`/api/report/delete/${id}`);
      const json = response.data;
      setIsLoading(false);
      return json;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  return { createReport, getAllReport, getAllReportBySalesman, getSingleReport, updateReport, deleteReport, error, setError, isLoading };
}


