import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  chakra,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../api';
import { AuthContext } from '../context/auth';
import useIsAuth from '../hooks/useIsAuth';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const isAuth = useIsAuth();
  const { setData } = useContext(AuthContext);

  const navigate = useNavigate();

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onClickReveal = () => {
    onToggle();
    if (passwordRef.current) {
      passwordRef.current.focus({ preventScroll: true });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || !usernameRef.current || !passwordRef.current) return;

    setLoading(true);
    try {
      const response = await loginRequest(
        usernameRef.current.value,
        passwordRef.current.value
      );
      setData(response.user, response.token);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/app', { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <chakra.form
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          onSubmit={onSubmit}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  ref={usernameRef}
                  name="username"
                  id="username"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant="link"
                      aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                    />
                  </InputRightElement>
                  <Input
                    id="password"
                    ref={passwordRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                  />
                </InputGroup>
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button
                colorScheme="blue"
                type="submit"
                isDisabled={loading}
                isLoading={loading}
              >
                Log in
              </Button>
            </Stack>
          </Stack>
        </chakra.form>
      </Stack>
    </Container>
  );
};

export default Login;
