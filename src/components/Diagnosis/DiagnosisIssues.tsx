import { Center, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { TDiagnosisIssue } from '../../types/diagnosis';
import DiagnosisIssue from './DiagnosisIssue';

type Props = {
  issues: TDiagnosisIssue[];
};

function DiagnosisIssues({ issues }: Props) {
  let content = (
    <SimpleGrid w="full" columns={{ base: 1, md: 2, xl: 3 }} spacing="8">
      {issues.map((issue, i) => (
        <DiagnosisIssue key={i} issue={issue} />
      ))}
    </SimpleGrid>
  );

  if (issues.length < 1) {
    content = <Text>No Diagnosis Issues Found</Text>;
  }

  return (
    <VStack w="full" my="16" align="flex-start" spacing="4">
      <Heading size="lg">Possible Issues</Heading>
      {content}
    </VStack>
  );
}

export default DiagnosisIssues;
