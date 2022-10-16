import { useContext } from 'react';
import { SymptomsContext } from '../context/symptoms';

const useSymptoms = () => {
  const { symptoms } = useContext(SymptomsContext);
  return symptoms;
};

export default useSymptoms;
