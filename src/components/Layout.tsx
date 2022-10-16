import { Container, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useIsAuth from '../hooks/useIsAuth';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = () => {
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth', { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <Flex direction="column" flex="1" w="full" h="full">
      <Navbar />
      <Flex
        w="full"
        as="main"
        role="main"
        direction="column"
        flex="1"
        py="6"
        bg="gray.50"
      >
        <Container w="full" maxW="container.lg" flex="1">
          <Outlet />
        </Container>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
