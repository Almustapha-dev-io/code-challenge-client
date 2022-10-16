import { Box, BoxProps, Container, Text } from '@chakra-ui/react';
import * as React from 'react';

const Footer = (props: BoxProps) => {
  return (
    <Box as="footer" w="full" role="contentinfo" py={6} {...props}>
      <Container w="full" maxW="container.lg">
        <Text textAlign="center">Built by Almustapha</Text>
      </Container>
    </Box>
  );
};

export default Footer;
