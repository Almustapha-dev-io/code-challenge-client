import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import useCurrentUser from '../hooks/useCurrentUser';

const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { setData } = useContext(AuthContext);
  const user = useCurrentUser();

  const onLogout = () => {
    setData(null, '');
  };

  return (
    <Box as="section" w="full">
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        w="full"
      >
        <Container w="full" maxW="container.lg" py={{ base: '4', lg: '5' }}>
          <HStack w="full" spacing="10" justify="space-between" align="center">
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                  <Button as={Link} to="/app/diagnosis">
                    Diagnosis
                  </Button>
                  <Button as={Link} to="/app/appointments">
                    Appointments
                  </Button>
                </ButtonGroup>
                <HStack spacing="3">
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    as={Link}
                    to="/app/profile"
                  >
                    {user?.firstName}
                  </Button>
                  <Button colorScheme="blue" onClick={onLogout}>
                    Logout
                  </Button>
                </HStack>
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
