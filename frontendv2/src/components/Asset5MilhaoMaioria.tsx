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

export function Asset5MilhaoMaioria({ asset }: AssetProps): JSX.Element {
  const [candles, setCandles] = useState<ICandleWithResult[]>([]);

  const data = useMemo(() => {
    const loss = candles.filter(candle => candle.status === 'loss').length;
    const win = candles.filter(
      candle => candle.status === 'win' && candle.position === 'init',
    ).length;
    const mg1 = candles.filter(
      candle => candle.status === 'win' && candle.position === 'mg1',
    ).length;
    const mg2 = candles.filter(
      candle => candle.status === 'win' && candle.position === 'mg2',
    ).length;
    const total = loss + win + mg1 + mg2;
    const winrate = (((win + mg1 + mg2) / total) * 100).toFixed(2);

    return {
      winrate,
      win,
      mg1,
      mg2,
      loss,
      total,
    };
  }, [candles]);

  useEffect(() => {
    const result = asset.candles
      .filter((candle, index) => {
        const min = candle.date.getMinutes();

        if (index > 5 && (min === 0 || min === 30)) {
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
          asset.candles[findCandleIndex - 1],
          asset.candles[findCandleIndex - 2],
          asset.candles[findCandleIndex - 3],
          asset.candles[findCandleIndex - 4],
          asset.candles[findCandleIndex - 5],
          asset.candles[findCandleIndex - 6],
        ];

        if (analysisCandles.filter(item => item.color === 'doji').length > 1) {
          entry = 'doji';
        }

        if (
          analysisCandles.filter(item => item.color === 'green').length ===
          analysisCandles.filter(item => item.color === 'red').length
        ) {
          entry = 'doji';
        }

        if (
          analysisCandles.filter(item => item.color === 'green').length >
          analysisCandles.filter(item => item.color === 'red').length
        ) {
          entry = 'green';
        }

        if (
          analysisCandles.filter(item => item.color === 'red').length >
          analysisCandles.filter(item => item.color === 'green').length
        ) {
          entry = 'red';
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

        if (entry === getCandleColor(asset.candles[findCandleIndex + 1])) {
          return {
            status: 'win',
            position: 'mg1',
            candle,
          };
        }

        if (entry === getCandleColor(asset.candles[findCandleIndex + 2])) {
          return {
            status: 'win',
            position: 'mg2',
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
