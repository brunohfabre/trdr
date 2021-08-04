import { useEffect, useMemo, useState } from 'react';
import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { getCandleColor } from '../helpers/getCandleColor';
import { IAssetProcessed } from '../helpers/processAssetsM1';

import { Candle } from './Candle';

export type IColor = 'green' | 'red' | 'doji';

export type ICandle = {
  at: number;
  close: number;
  from: number;
  id: number;
  max: number;
  min: number;
  open: number;
  to: number;
  volume: number;
  date: Date;
  color: IColor;
};

export type IAsset = {
  name: string;
  candles: ICandle[];
};

interface AssetProps {
  asset: any;
}

export function Asset({ asset }: AssetProps): JSX.Element {
  const { name, candles } = asset;

  const winrate = useMemo(() => {
    const loss = candles.filter(
      (candle: any) => candle.status === 'loss',
    ).length;
    const win = candles.filter((candle: any) => candle.status === 'win').length;
    const total = loss + win;

    return ((win / total) * 100).toFixed(2);
  }, [candles]);

  return (
    <Flex
      bg="white"
      flexDir="column"
      borderRadius={8}
      boxShadow="sm"
      p="3"
      marginTop="2"
    >
      <Flex p="1" alignItems="center" justifyContent="space-between">
        <Heading size="sm">{asset.name}</Heading>

        <Text fontSize="14">{winrate}%</Text>
      </Flex>

      <SimpleGrid marginTop="2" columns={6}>
        {candles.map((candle: any) => (
          <Candle key={candle.candle.id} candle={candle} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
