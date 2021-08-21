import { Box, Flex, Grid, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AssetType, CandleType } from '.';
import { processStrategies } from './processStrategies';

interface AssetProps {
  asset: AssetType;
  strategy: string;
}

export function Asset({ asset, strategy }: AssetProps): JSX.Element {
  const [candles, setCandles] = useState<CandleType[]>([]);

  useEffect(() => {
    const response = processStrategies(asset.candles, strategy);

    setCandles(response);
  }, [asset.candles, strategy]);

  return (
    <Flex bg="white" p="4" borderRadius="8" flexDir="column">
      <Text>{asset.name}</Text>

      <Grid
        templateColumns="repeat(auto-fit, minmax(32px, 1fr))"
        gap="1"
        mt="2"
      >
        {candles.map(candle => (
          <Tooltip
            label={`${candle.date.getHours()}:${candle.date.getMinutes()}`}
          >
            <Flex
              p="1"
              bg={
                candle.status === 'win'
                  ? 'green.400'
                  : candle.status === 'loss'
                  ? 'red.400'
                  : 'gray.200'
              }
              borderRadius="4"
              h="4"
            >
              {candle.position === 'mg1' && (
                <Box bg="black" w="2" h="2" borderRadius="4" opacity="0.3" />
              )}
              {candle.position === 'mg2' && (
                <>
                  <Box bg="black" w="2" h="2" borderRadius="4" opacity="0.3" />
                  <Box
                    bg="black"
                    w="2"
                    h="2"
                    borderRadius="4"
                    ml="2px"
                    opacity="0.3"
                  />
                </>
              )}
            </Flex>
          </Tooltip>
        ))}
      </Grid>
    </Flex>
  );
}
