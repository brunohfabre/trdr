import { useEffect, useMemo, useState } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

import { getCandleColor } from '../helpers/getCandleColor';

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
  asset: IAsset;
}

export type ICandleWithResult = {
  status: string;
  position: string;
  candle: ICandle;
};

export function Asset5FiveFlipTorresGemeas({ asset }: AssetProps): JSX.Element {
  const [candles, setCandles] = useState<ICandleWithResult[]>([]);

  const data = useMemo(() => {
    const loss = candles.filter(candle => candle.status === 'loss').length;
    const win = candles.filter(
      candle => candle.status === 'win' && candle.position === 'init',
    ).length;
    const total = loss + win;
    const winrate = ((win / total) * 100).toFixed(2);

    return {
      winrate,
      win,
      loss,
      total,
    };
  }, [candles]);

  useEffect(() => {
    const result = asset.candles
      .filter((candle, index) => {
        const min = candle.date.getMinutes();

        if (min === 25 || min === 55) {
          return true;
        }

        return false;
      })
      .map(candle => {
        const candleColor = getCandleColor(candle);
        let entry = '';

        const findCandleIndex = asset.candles.findIndex(
          (item: any) => item.id === candle.id,
        );

        const analysisCandles = [
          asset.candles[findCandleIndex - 5],
          asset.candles[findCandleIndex - 4],
          asset.candles[findCandleIndex - 3],
          asset.candles[findCandleIndex - 2],
          asset.candles[findCandleIndex - 1],
        ];

        if (
          analysisCandles[0].color === 'doji' ||
          analysisCandles[4].color === 'doji'
        ) {
          entry = 'doji';
        } else if (analysisCandles[0].color === analysisCandles[4].color) {
          entry = 'doji';
        } else if (analysisCandles[0].color === 'red') {
          entry = 'red';
        } else if (analysisCandles[0].color === 'green') {
          entry = 'green';
        }

        if (entry === 'doji') {
          return {
            status: 'doji',
            position: 'doji',
            candle,
          };
        }

        if (entry === candleColor) {
          return {
            status: 'win',
            position: 'init',
            candle,
          };
        }

        return {
          status: 'loss',
          position: 'loss',
          candle,
        };
      });

    setCandles(result);
  }, [asset]);

  return (
    <Flex
      bg="white"
      flexDir="column"
      borderRadius={8}
      boxShadow="sm"
      p="3"
      maxW="1216px"
      marginTop="2"
    >
      <Flex p="1" alignItems="center" justifyContent="space-between">
        <Heading size="sm">{asset.name}</Heading>

        <Text fontSize="14">{data.winrate}%</Text>
      </Flex>

      <Flex marginTop="2">
        {candles.map(candle => (
          <Candle key={candle.candle.id} candle={candle} />
        ))}
      </Flex>
    </Flex>
  );
}
