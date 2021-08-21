import { useEffect, useState } from 'react';
import {
  Flex,
  Stack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
} from '@chakra-ui/react';

export default function Entradas(): JSX.Element {
  const [values, setValues] = useState<number[]>([]);
  const [value, setValue] = useState<number>(0);
  const [payout, setPayout] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  function loadEntryValues() {
    let finalValue = 0;
    let expectedValue = 0;

    values.forEach(item => (expectedValue += item));

    for (;;) {
      if (
        Math.trunc(finalValue * (payout / 100) * 1e2) / 1e2 >
        Math.trunc((expectedValue + expectedValue * (percentage / 100)) * 1e2) /
          1e2
      ) {
        break;
      }

      finalValue += 0.01;
    }

    setValues([...values, Math.trunc(finalValue * 1e2) / 1e2]);
  }

  useEffect(() => {
    if (values.length >= 1 && values.length < 10) {
      loadEntryValues();
    }
  }, [values]);

  return (
    <Flex minH="100vh" bg="gray.100" flexDir="column" align="center">
      <Stack p="8" bg="white" borderRadius="8" mt="8">
        <HStack>
          <FormControl>
            <FormLabel>Valor inicial</FormLabel>
            <Input
              type="number"
              placeholder="Valor inicial"
              value={value}
              onChange={e => setValue(Number(e.target.value))}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Payout %</FormLabel>
            <Input
              type="number"
              placeholder="Payout %"
              value={payout}
              onChange={e => setPayout(Number(e.target.value))}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Recuperação %</FormLabel>
            <Input
              type="number"
              placeholder="Recuperação %"
              value={percentage}
              onChange={e => setPercentage(Number(e.target.value))}
            />
          </FormControl>
        </HStack>

        <Button
          type="button"
          colorScheme="pink"
          disabled={!value || !payout}
          onClick={() => setValues([value])}
        >
          Calcular valores
        </Button>
      </Stack>

      <HStack mt="8">
        {values.map(item => (
          <Box bg="white" borderRadius="8" p="4">
            R$ {item}
          </Box>
        ))}
      </HStack>
    </Flex>
  );
}
