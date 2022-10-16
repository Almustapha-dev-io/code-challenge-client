import {
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Button,
  Select as ChakraSelect,
  HStack,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Select, OptionBase, GroupBase } from 'chakra-react-select';
import { useCallback, useRef, useState } from 'react';
import { getInitialDiagnosis, saveDiagnosis } from '../../api';
import useSymptoms from '../../hooks/useSymptoms';
import useToken from '../../hooks/useToken';
import { TSymptom } from '../../types/symptom';
import useWillUnmount from '../../hooks/useWillUnmount';
import { TDiagnosisDTO, TDiagnosisIssue } from '../../types/diagnosis';

type SymptomOption = TSymptom & OptionBase;

type FormProps = {
  diagnosisIssues: TDiagnosisIssue[];
  setDiagnosisIssues(issues: TDiagnosisIssue[]): void;
};

function CreateDiagnosisForm({
  setDiagnosisIssues,
  diagnosisIssues,
}: FormProps) {
  const symptoms = useSymptoms();
  const [selectedSymptoms, setSelectedSymptoms] = useState<
    readonly SymptomOption[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [category, setCategory] = useState('');
  const toast = useToast();
  const abortController = useRef(new AbortController());
  const token = useToken();
  const abortRequest = useCallback(() => {
    abortController.current.abort();
  }, []);

  const reset = () => {
    setName('');
    setGender('');
    setDateOfBirth('');
    setCategory('');
    setSelectedSymptoms([]);
    setDiagnosisIssues([]);
  };

  const fetchInitialDiagnosis = async () => {
    if (loading) return;
    setLoading(() => true);
    try {
      const response = await getInitialDiagnosis(
        {
          gender,
          yearOfBirth: dayjs(dateOfBirth).format('YYYY'),
          symptoms: selectedSymptoms.map((symptom) => symptom.id),
        },
        token,
        abortController.current
      );
      setDiagnosisIssues(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => false);
    }
  };

  const saveDiagnosisRequest = async () => {
    if (loading) return;
    setLoading(() => true);

    const data: TDiagnosisDTO = {
      category,
      patientGender: gender,
      patientDateOfBirth: dayjs(dateOfBirth).format('YYYY-MM-DD'),
      patientFullName: name,
      issues: diagnosisIssues.map(({ Issue, Specialisation }) => ({
        accuracy: Issue.Accuracy,
        icd: Issue.Icd,
        icdName: Issue.IcdName,
        name: Issue.Name,
        profName: Issue.ProfName,
        ranking: Issue.Ranking,
        specializations: Specialisation.map((sp) => sp.Name),
      })),
    };
    try {
      await saveDiagnosis(data, token, abortController.current);
      toast({
        title: 'Diagnosis saved.',
        status: 'success',
        isClosable: true,
      });
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => false);
    }
  };

  const formValid = () =>
    !!name && !!gender && !!dateOfBirth && selectedSymptoms.length > 0;

  useWillUnmount(abortRequest);

  return (
    <SimpleGrid
      w="full"
      maxW="container.sm"
      spacing="6"
      columns={{ base: 1, md: 2 }}
    >
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Patient Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
      </GridItem>

      <FormControl>
        <FormLabel>Patient Gender</FormLabel>
        <ChakraSelect
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>
            Select one
          </option>

          <option value="male">Male</option>
          <option value="female">Female</option>
        </ChakraSelect>
      </FormControl>

      <FormControl>
        <FormLabel>Patient Date of Birth</FormLabel>
        <Input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </FormControl>

      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Symptoms</FormLabel>
          <Select<SymptomOption, true, GroupBase<SymptomOption>>
            isMulti
            name="symptoms"
            options={symptoms}
            closeMenuOnSelect={false}
            getOptionLabel={(o) => o.name}
            getOptionValue={(o) => o.id}
            placeholder="Select symptoms"
            value={selectedSymptoms}
            onChange={(newValue) => {
              setSelectedSymptoms(newValue);
            }}
          />
        </FormControl>
      </GridItem>

      {diagnosisIssues.length > 0 && (
        <FormControl>
          <FormLabel>Diagnosis Category</FormLabel>
          <ChakraSelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="VALID">Valid</option>
            <option value="INVALID">Invalid</option>
          </ChakraSelect>
        </FormControl>
      )}

      <GridItem colSpan={2}>
        <HStack justify="flex-end">
          {diagnosisIssues.length > 0 ? (
            <Button
              colorScheme="green"
              isDisabled={!formValid() || loading || !category}
              isLoading={loading}
              onClick={saveDiagnosisRequest}
            >
              Save Diagnosis
            </Button>
          ) : (
            <Button
              colorScheme="green"
              isDisabled={!formValid() || loading || diagnosisIssues.length > 0}
              isLoading={loading}
              onClick={fetchInitialDiagnosis}
            >
              Get Initial Diagnosis
            </Button>
          )}

          {diagnosisIssues.length > 0 && (
            <Button
              colorScheme="orange"
              isDisabled={loading}
              onClick={() => setDiagnosisIssues([])}
            >
              Reset
            </Button>
          )}
        </HStack>
      </GridItem>
    </SimpleGrid>
  );
}

export default CreateDiagnosisForm;
