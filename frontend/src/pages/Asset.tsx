import { useMemo } from 'react';
import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { IAsset } from './Home';
import { Candle } from './Candle';

interface IAssetProps {
  asset: IAsset;
}

export function Asset({ asset }: IAssetProps): JSX.Element {
  const data = useMemo(() => {
    const win = asset.candles.filter(
      candle => candle.status === 'win' && candle.position === 'init',
    ).length;
    const mg1 = asset.candles.filter(
      candle => candle.status === 'win' && candle.position === 'mg1',
    ).length;
    const mg2 = asset.candles.filter(
      candle => candle.status === 'win' && candle.position === 'mg2',
    ).length;
    const loss = asset.candles.filter(
      candle => candle.status === 'loss',
    ).length;
    const doji = asset.candles.filter(
      candle => candle.status === 'doji',
    ).length;

    const total = win + mg1 + mg2 + loss;

    const winrate = (((win + mg1 + mg2) / total) * 100).toFixed(2);

    return {
      winrate,
      win,
      mg1,
      mg2,
      loss,
      doji,
      total,
    };
  }, [asset.candles]);

  return (
    <Flex bg="white" p="4" borderRadius="8" flexDir="column">
      <Flex mb="4" justifyContent="space-between">
        <Heading size="sm">{asset.name}</Heading>

        <Text fontSize="14">
          WINRATE: <strong>{data.winrate}%</strong>
        </Text>
      </Flex>

      <SimpleGrid columns={10} spacing="2">
        {asset.candles.map(candle => (
          <Candle key={candle.from} candle={candle} />
        ))}
      </SimpleGrid>

      <Flex fontSize="14" mt="4" justifyContent="space-between">
        <Flex>
          <Text>
            WIN: <strong>{data.win}</strong>
          </Text>
          <Text ml="4">
            MG1: <strong>{data.mg1}</strong>
          </Text>
          <Text ml="4">
            MG2: <strong>{data.mg2}</strong>
          </Text>
          <Text ml="4">
            LOSS: <strong>{data.loss}</strong>
          </Text>
          <Text ml="4">
            DOJI: <strong>{data.doji}</strong>
          </Text>
        </Flex>

        <Text>
          TOTAL: <strong>{data.total}</strong>
        </Text>
      </Flex>
    </Flex>
  );
}
