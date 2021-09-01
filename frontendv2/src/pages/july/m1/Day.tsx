import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { DayType, CandleType } from '.';

interface DayProps {
  data: DayType;
}

interface CandleProps {
  candle: CandleType;
}

function Candle({ candle }: CandleProps): JSX.Element {
  return (
    <Flex
      bg={
        candle.status === 'win'
          ? 'green.500'
          : candle.status === 'loss'
          ? 'red.500'
          : 'gray.200'
      }
    >
      {String(candle.date.getHours()).padStart(2, '0')}:
      {String(candle.date.getMinutes()).padStart(2, '0')}
    </Flex>
  );
}

export function Day({ data }: DayProps): JSX.Element {
  return (
    <Flex flexDir="column" bg="white" borderRadius={8} margin="4" padding="4">
      <Text>day: {data.day}</Text>

      <SimpleGrid columns={24}>
        {data.candles.map(candle => (
          <Candle candle={candle} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
