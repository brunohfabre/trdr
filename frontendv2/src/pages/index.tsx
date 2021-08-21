import { useState, useEffect } from 'react';
import { Flex, Text, Input, HStack, SimpleGrid } from '@chakra-ui/react';

export default function Home(): JSX.Element {
  const [value, setValue] = useState(0);
  const [payout, setPayout] = useState(0);
  const [e1Percentage, setE1Percentage] = useState(0);
  const [e1, setE1] = useState(0);
  const [e2Percentage, setE2Percentage] = useState(0);
  const [e2, setE2] = useState(0);
  const [e3Percentage, setE3Percentage] = useState(0);
  const [e3, setE3] = useState(0);
  const [e4Percentage, setE4Percentage] = useState(0);
  const [e4, setE4] = useState(0);
  const [e5Percentage, setE5Percentage] = useState(0);
  const [e5, setE5] = useState(0);
  const [e6Percentage, setE6Percentage] = useState(0);
  const [e6, setE6] = useState(0);
  const [e7Percentage, setE7Percentage] = useState(0);
  const [e7, setE7] = useState(0);
  const [e8Percentage, setE8Percentage] = useState(0);
  const [e8, setE8] = useState(0);

  useEffect(() => {
    setE1(value / (payout / 100));
  }, [value, e1Percentage, payout]);

  return (
    <Flex
      flexDir="column"
      minH="100vh"
      bg="gray.100"
      align="center"
      justify="center"
    >
      <Flex bg="white" borderRadius="8" p="4" flexDir="column">
        <HStack mb="4">
          <Input
            type="number"
            w="96px"
            onChange={e => setValue(Number(e.target.value))}
          />
          <Input
            type="number"
            w="96px"
            onChange={e => setPayout(Number(e.target.value))}
          />
        </HStack>

        <HStack>
          <Input
            type="number"
            w="96px"
            onChange={e => setE1Percentage(Number(e.target.value))}
          />
          <Input
            type="number"
            w="96px"
            onChange={e => setE2Percentage(Number(e.target.value))}
          />
          <Input
            type="number"
            w="96px"
            onChange={e => setE3Percentage(Number(e.target.value))}
          />
          <Input
            type="number"
            w="96px"
            onChange={e => setE4Percentage(Number(e.target.value))}
          />
          <Input
            type="number"
            w="96px"
            onChange={e => setE5Percentage(Number(e.target.value))}
          />
          <Input
            type="number"
            w="96px"
            onChange={e => setE6Percentage(Number(e.target.value))}
          />
          <Input
            type="number"
            w="96px"
            onChange={e => setE7Percentage(Number(e.target.value))}
          />
          <Input
            type="number"
            w="96px"
            onChange={e => setE8Percentage(Number(e.target.value))}
          />
        </HStack>
      </Flex>

      <Flex mt="4" p="4" bg="white" borderRadius="8">
        <SimpleGrid columns={8} spacing={2}>
          <Text>{e1}</Text>
          <Text>{e2}</Text>
          <Text>{e3}</Text>
          <Text>{e4}</Text>
          <Text>{e5}</Text>
          <Text>{e6}</Text>
          <Text>{e7}</Text>
          <Text>{e8}</Text>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
