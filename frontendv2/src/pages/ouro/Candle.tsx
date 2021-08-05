import { Flex, Box, Text } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { CandleWithResultType } from './Asset';

interface CandleProps {
  candle: CandleWithResultType;
}

export function Candle({ candle }: CandleProps): JSX.Element {
  return (
    <Flex
      w="100%"
      bg={
        candle.result === 'doji'
          ? 'gray.200'
          : candle.result === 'win'
          ? 'green.400'
          : 'red.400'
      }
      flexDir="column"
      align="center"
      justify="flex-end"
      py="1"
      borderRadius="8"
    >
      <Box h="24px">
        {candle.position === 'mg1' && <SmallAddIcon />}
        {candle.position === 'mg2' && (
          <>
            <SmallAddIcon />
            <SmallAddIcon />
          </>
        )}
      </Box>

      <Text mt="2" fontSize="14">{`${candle.date.getHours()}:${String(
        candle.date.getMinutes(),
      ).padStart(2, '0')}`}</Text>
    </Flex>
  );
}
