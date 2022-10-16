import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import useToken from '../../hooks/useToken';
import useWillUnmount from '../../hooks/useWillUnmount';
import { TDiagnosisIssue } from '../../types/diagnosis';
import CreateDiagnosisForm from './CreateDiagnosisForm';
import DiagnosisIssues from './DiagnosisIssues';

type Props = Omit<ModalProps, 'children'> & {};

function CreateDiagnosis({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [diagnosisIssues, setDiagnosisIssues] = useState<TDiagnosisIssue[]>([]);
  const abortController = useRef(new AbortController());
  const token = useToken();

  const abortRequest = useCallback(() => {
    abortController.current.abort();
  }, []);

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
        <ModalHeader>Create Diagnosis</ModalHeader>

        <ModalBody>
          <CreateDiagnosisForm
            diagnosisIssues={diagnosisIssues}
            setDiagnosisIssues={setDiagnosisIssues}
          />

          <DiagnosisIssues issues={diagnosisIssues} />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            ml={3}
            onClick={onClose}
            isDisabled={loading}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateDiagnosis;
