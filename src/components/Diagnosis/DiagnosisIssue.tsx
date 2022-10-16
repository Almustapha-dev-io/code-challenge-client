import {
  Divider,
  GridItem,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  VStack,
} from '@chakra-ui/react';
import { TDiagnosisIssue } from '../../types/diagnosis';

type Props = {
  issue: TDiagnosisIssue;
};

function DiagnosisIssue({ issue }: Props) {
  return (
    <VStack
      w="full"
      p={6}
      rounded="lg"
      borderWidth="2px"
      shadow="sm"
      align="flex-start"
      spacing={6}
    >
      <SimpleGrid w="full" spacing={4} columns={2}>
        <Stat>
          <StatHelpText>Issue Name</StatHelpText>
          <StatLabel>{issue.Issue.Name}</StatLabel>
        </Stat>

        <Stat>
          <StatHelpText>Professional Name</StatHelpText>
          <StatLabel>{issue.Issue.ProfName}</StatLabel>
        </Stat>

        <GridItem colSpan={2}>
          <Stat>
            <StatHelpText>ICD Name</StatHelpText>
            <StatLabel>{issue.Issue.IcdName}</StatLabel>
          </Stat>
        </GridItem>

        <Stat>
          <StatHelpText>ICD Code</StatHelpText>
          <StatLabel>{issue.Issue.Icd}</StatLabel>
        </Stat>

        <Stat>
          <StatHelpText>Accuracy</StatHelpText>
          <StatLabel>{issue.Issue.Accuracy}</StatLabel>
        </Stat>

        <Stat>
          <StatHelpText>Ranking</StatHelpText>
          <StatLabel>{issue.Issue.Ranking}</StatLabel>
        </Stat>
      </SimpleGrid>
      <Divider />
      <Heading fontSize="md">Suggested Specialists</Heading>
      <List w="full" spacing={3}>
        {issue.Specialisation.map((sp) => (
          <ListItem key={sp.ID}>{sp.Name}</ListItem>
        ))}
      </List>
    </VStack>
  );
}

export default DiagnosisIssue;
