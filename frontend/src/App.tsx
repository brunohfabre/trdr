import { ChakraProvider } from '@chakra-ui/react';

import { Home } from './pages/Home';

export default function App(): JSX.Element {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}
