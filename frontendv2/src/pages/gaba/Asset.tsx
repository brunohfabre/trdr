import { useEffect, useState } from 'react';
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
          if (
            index > 2 &&
            (min === 0 || min === 15 || min === 30 || min === 45)
          ) {
            return true;
          }
          return false;
        })
        .map(candle => {
          const candleIndex = asset.candles.findIndex(item => item === candle);
          const analysisCandles = [
            asset.candles[candleIndex - 3],
            asset.candles[candleIndex - 2],
            asset.candles[candleIndex - 1],
          ];

          let candleColor = '';

          if (
            analysisCandles.filter(item => item.color === 'doji').length > 0
          ) {
            candleColor = 'doji';
          }

          if (
            analysisCandles.filter(item => item.color === 'green').length >= 2
          ) {
            candleColor = 'red';
          }

          if (
            analysisCandles.filter(item => item.color === 'red').length >= 2
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

  return (
    <Flex bg="white" p="4" flexDir="column">
      <Text>{asset.name}</Text>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(48px, 1fr))',
          gridGap: 8,
        }}
      >
        {candles.map(candle => (
          <Candle candle={candle} />
        ))}
      </div>
    </Flex>
  );
}
