import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { getIssues } from '../../api';
import useToken from '../../hooks/useToken';
import useWillUnmount from '../../hooks/useWillUnmount';
import { TDiagnosis } from '../../types/diagnosis';
import { TIssue } from '../../types/issue';

type Props = Omit<ModalProps, 'children'> & {
  diagnosis?: TDiagnosis;
};

function ViewDiagnosis({ isOpen, onClose, diagnosis }: Props) {
  const abortController = useRef(new AbortController());
  const [issues, setIssue] = useState<TIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useToken();

  const abortRequest = useCallback(() => {
    abortController.current.abort();
  }, []);

  useEffect(() => {
    if (!diagnosis) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getIssues(
          diagnosis.id,
          token,
          abortController.current
        );
        console.log(response);
        setIssue(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [diagnosis, token]);

  useWillUnmount(abortRequest);

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Diagnosis Details</ModalHeader>

        <ModalBody>
          <SimpleGrid w="full" maxW="container.md" columns={2} spacing={6}>
            <Stat>
              <StatHelpText>Patient</StatHelpText>
              <StatLabel>{diagnosis?.patientFullName}</StatLabel>
            </Stat>

            <Stat>
              <StatHelpText>Patient Gender</StatHelpText>
              <StatLabel>{diagnosis?.patientGender}</StatLabel>
            </Stat>

            <Stat>
              <StatHelpText>Patient Date of Birth</StatHelpText>
              <StatLabel>
                {diagnosis
                  ? dayjs(diagnosis.patientDateOfBirth).format('DD-MM-YYYY')
                  : ''}
              </StatLabel>
            </Stat>

            <Stat>
              <StatHelpText>Diagnosis Category</StatHelpText>
              <StatLabel>{diagnosis?.category}</StatLabel>
            </Stat>
          </SimpleGrid>
          <Heading mt={12} fontSize="lg" mb={10}>
            Possible Issues
          </Heading>
          <TableContainer w="full">
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Professional Name</Th>
                  <Th>ICD Code</Th>
                  <Th>ICD Name</Th>
                  <Th>Ranking</Th>
                  <Th>Accuracy</Th>
                  <Th>Specializations</Th>
                </Tr>
              </Thead>
              <Tbody>
                {issues.map((issue) => (
                  <Tr key={issue.id}>
                    <Td>{issue.name}</Td>
                    <Td>{issue.profName}</Td>
                    <Td>{issue.icd}</Td>
                    <Td w="200px" overflowWrap="break-word">
                      {issue.icdName}
                    </Td>
                    <Td>{issue.ranking}</Td>
                    <Td>{issue.accuracy}</Td>
                    <Td>{issue.specializationName}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" ml={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ViewDiagnosis;
