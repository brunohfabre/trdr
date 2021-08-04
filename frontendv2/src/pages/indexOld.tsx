import { Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <Flex minH="100vh" bg="gray.100">
      <Button onClick={() => router.push('/m1')} colorScheme="blue">
        M1
      </Button>

      <Button onClick={() => router.push('/m5')} colorScheme="blue">
        M5
      </Button>
    </Flex>
  );
}
