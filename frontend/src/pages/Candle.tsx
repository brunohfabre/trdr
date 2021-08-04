import { useMemo } from 'react';
import { Flex } from '@chakra-ui/react';
import { format } from 'date-fns';

import { ICandle } from './Home';

interface ICandleProps {
  candle: ICandle;
}

export function Candle({ candle }: ICandleProps): JSX.Element {
  const candleColor = useMemo(() => {
    if (candle.status === 'win') {
      return 'green.400';
    }

    if (candle.status === 'loss') {
      return 'red.400';
    }

    return 'gray.200';
  }, [candle]);

  return (
    <Flex
      bg={candleColor}
      borderRadius={8}
      p="2"
      alignItems="center"
      fontSize="14"
    >
      {format(new Date(candle.from * 1000), 'HH:mm')}
    </Flex>
  );
}
