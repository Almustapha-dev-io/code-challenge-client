import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { TSymptom } from '../types/symptom';

type TSymptomsContext = {
  symptoms: TSymptom[];
  setSymptoms(symptoms: TSymptom[]): void;
};

export const SymptomsContext = createContext<TSymptomsContext>({
  symptoms: [],
  setSymptoms() {},
});

const SymptomsContextProvider = ({ children }: PropsWithChildren) => {
  const [symptoms, setSymptoms] = useState<TSymptom[]>([]);

  const symptomsSetter = useCallback((symptoms: TSymptom[]) => {
    setSymptoms(() => symptoms);
  }, []);

  return (
    <SymptomsContext.Provider
      value={{
        symptoms,
        setSymptoms: symptomsSetter,
      }}
    >
      {children}
    </SymptomsContext.Provider>
  );
};

export default SymptomsContextProvider;
