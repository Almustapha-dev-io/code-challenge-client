export type TDiagnosisIssue = {
  Issue: {
    ID: number;
    Name: string;
    Accuracy: number;
    Icd: string;
    IcdName: string;
    ProfName: string;
    Ranking: number;
  };
  Specialisation: { ID: number; Name: string; SpecialistID: number }[];
};

export type TDiagnosisDTO = {
  category: string;
  patientFullName: string;
  patientGender: string;
  patientDateOfBirth: string;
  issues: {
    name: string;
    accuracy: number;
    icd: string;
    icdName: string;
    ranking: number;
    profName: string;
    specializations: string[];
  }[];
};

export type TDiagnosis = {
  id: number;
  patientFullName: string;
  patientGender: string;
  patientDateOfBirth: string;
  category: string;
  createdAt: string;
};
