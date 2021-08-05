import { useState, useEffect, useMemo } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { Candle } from './Candle';

export type CandleType = {
  from: number;
  color: 'doji' | 'green' | 'red';
  date: Date;
};

export interface CandleWithResultType extends CandleType {
  result: string;
  position: string;
}

export type AssetType = {
  name: string;
  candles: CandleType[];
};

interface AssetProps {
  asset: AssetType;
}

export function Asset({ asset }: AssetProps): JSX.Element {
  const [candles, setCandles] = useState<CandleWithResultType[]>([]);

  useEffect(() => {
    setCandles(
      asset.candles
        .filter((candle, index) => {
          const min = candle.date.getMinutes();
          if (index > 9 && (min === 20 || min === 50)) {
            return true;
          }
          return false;
        })
        .map(candle => {
          const candleIndex = asset.candles.findIndex(item => item === candle);
          const analysisCandles = [
            asset.candles[candleIndex - 10],
            asset.candles[candleIndex - 9],
            asset.candles[candleIndex - 8],
            asset.candles[candleIndex - 7],
            asset.candles[candleIndex - 6],
            asset.candles[candleIndex - 5],
          ];

          let candleColor = '';

          if (
            analysisCandles.filter(item => item.color === 'doji').length > 1
          ) {
            candleColor = 'doji';
          }

          if (
            analysisCandles.filter(item => item.color === 'green').length ===
            analysisCandles.filter(item => item.color === 'red').length
          ) {
            candleColor = 'doji';
          }

          if (
            analysisCandles.filter(item => item.color === 'green').length >
            analysisCandles.filter(item => item.color === 'red').length
          ) {
            candleColor = 'red';
          }

          if (
            analysisCandles.filter(item => item.color === 'red').length >
            analysisCandles.filter(item => item.color === 'green').length
          ) {
            candleColor = 'green';
          }

          if (candleColor === 'doji') {
            return {
              ...candle,
              result: 'doji',
              position: 'init',
            };
          }

          if (candleColor === candle.color) {
            return {
              ...candle,
              result: 'win',
              position: 'init',
            };
          }

          if (candleColor === asset.candles[candleIndex + 1].color) {
            return {
              ...candle,
              result: 'win',
              position: 'mg1',
            };
          }

          if (candleColor === asset.candles[candleIndex + 2].color) {
            return {
              ...candle,
              result: 'win',
              position: 'mg2',
            };
          }

          return {
            ...candle,
            result: 'loss',
            position: 'init',
          };
        }),
    );
  }, []);

  const results = useMemo(() => {
    const doji = candles.filter(candle => candle.result === 'doji').length;

    const win = candles.filter(
      candle => candle.result === 'win' && candle.position === 'init',
    ).length;
    const mg1 = candles.filter(
      candle => candle.result === 'win' && candle.position === 'mg1',
    ).length;
    const mg2 = candles.filter(
      candle => candle.result === 'win' && candle.position === 'mg2',
    ).length;

    const loss = candles.filter(candle => candle.result === 'loss').length;

    const total = win + mg1 + mg2 + loss;

    const winrate = (((win + mg1 + mg2) / total) * 100).toFixed(2);

    return {
      doji,
      win,
      mg1,
      mg2,
      loss,
      total,
      winrate,
    };
  }, [candles]);

  return (
    <Flex bg="white" p="4" flexDir="column" boxShadow="sm" borderRadius="8">
      <Flex justify="space-between" mb="4">
        <Text>{asset.name}</Text>

        <Text>{results.winrate}%</Text>
      </Flex>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(48px, 1fr))',
          gridGap: 8,
        }}
      >
        {candles.map(candle => (
          <Candle key={candle.from} candle={candle} />
        ))}
      </div>

      <Flex mt="2" justify="space-between">
        <Text>1º: {results.win}</Text>
        <Text>MG1: {results.mg1}</Text>
        <Text>MG1: {results.mg2}</Text>
      </Flex>
      <Flex mt="2" justify="space-between">
        <Text>Loss: {results.loss}</Text>
        <Text>Doji: {results.doji}</Text>
        <Text>Total: {results.total}</Text>
      </Flex>
    </Flex>
  );
}
