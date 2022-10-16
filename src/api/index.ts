import axios, { AxiosRequestConfig } from 'axios';
import { TDiagnosisDTO } from '../types/diagnosis';
import { TPagination } from '../types/pagination';

const BASE_URL = 'http://localhost:8000';

export const loginRequest = async (userName: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/signin`, {
    userName,
    password,
  });
  return response.data;
};

export const getSymptoms = async (
  token: string,
  controller: AbortController
) => {
  const response = await axios.get(`${BASE_URL}/symptoms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  });
  return response.data;
};

export const getInitialDiagnosis = async (
  data: {
    symptoms: string[];
    yearOfBirth: string;
    gender: string;
  },
  token: string,
  controller: AbortController
) => {
  const config: AxiosRequestConfig = {
    params: {
      symptoms: data.symptoms.reduce((acc, cur) => `${acc}${cur},`, ''),
      yearOfBirth: data.yearOfBirth,
      gender: data.gender,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  };
  const response = await axios.get(`${BASE_URL}/diagnosis/initial`, config);
  return response.data;
};

export const saveDiagnosis = async (
  data: TDiagnosisDTO,
  token: string,
  controller: AbortController
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  };

  const response = await axios.post(`${BASE_URL}/diagnosis`, data, config);
  return response.data;
};

export const getDiagnosis = async (
  data: TPagination,
  token: string,
  controller: AbortController
) => {
  const config: AxiosRequestConfig = {
    params: { ...data },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  };

  const response = await axios.get(`${BASE_URL}/diagnosis`, config);
  return response.data;
};

export const getIssues = async (
  diagnosisId: number,
  token: string,
  controller: AbortController
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  };

  const response = await axios.get(`${BASE_URL}/issues/${diagnosisId}`, config);
  return response.data;
};
