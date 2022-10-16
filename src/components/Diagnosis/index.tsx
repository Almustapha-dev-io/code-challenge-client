import {
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getSymptoms } from '../../api';
import { SymptomsContext } from '../../context/symptoms';
import useToken from '../../hooks/useToken';
import useWillUnmount from '../../hooks/useWillUnmount';
import CreateDiagnosis from './CreateDiagnosis';
import DiagnosisList from './DiagnosisList';

function Diagnosis() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [symptomsLoading, setSymptomsLoading] = useState(false);
  const abortController = useRef(new AbortController());
  const token = useToken();
  const { symptoms, setSymptoms } = useContext(SymptomsContext);

  const fetchSymptoms = useCallback(async () => {
    if (symptoms.length || symptomsLoading) return;
    setSymptomsLoading(() => true);
    try {
      const response = await getSymptoms(token, abortController.current);
      setSymptoms(response);
    } catch (error) {
      console.log(error);
    } finally {
      setSymptomsLoading(() => false);
    }
  }, [symptoms, symptomsLoading, token, setSymptoms]);

  const abortRequest = useCallback(() => {
    abortController.current.abort();
  }, []);

  let content = (
    <>
      {isOpen && <CreateDiagnosis isOpen={isOpen} onClose={onClose} />}
      <VStack w="full" spacing="10">
        <HStack w="full" justify="flex-end">
          <Button
            colorScheme="green"
            onClick={onOpen}
            size="lg"
            w={{ base: 'full', md: 'auto' }}
          >
            Create Diagnosis
          </Button>
        </HStack>

        <Box
          w="full"
          bg="white"
          p="6"
          borderWidth="2px"
          rounded="lg"
          shadow="sm"
        >
          <Tabs isLazy w="full" variant="soft-rounded">
            <TabList>
              <Tab>All</Tab>
              <Tab>Valid</Tab>
              <Tab>Invalid</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <DiagnosisList />
              </TabPanel>
              <TabPanel>
                <DiagnosisList category="VALID" />
              </TabPanel>
              <TabPanel>
                <DiagnosisList category="INVALID" />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </>
  );

  if (symptomsLoading) {
    content = (
      <Center w="full" h="full">
        <Spinner />
      </Center>
    );
  }

  useWillUnmount(abortRequest);
  useEffect(() => {
    fetchSymptoms();
  }, [fetchSymptoms]);

  return content;
}

export default Diagnosis;
