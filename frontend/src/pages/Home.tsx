import { useEffect, useState } from 'react';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { api } from '../services/api';

// import data from './data.json';

import { Asset } from './Asset';

export type ICandle = {
  at: number;
  close: number;
  color: string;
  date: Date;
  from: number;
  id: number;
  max: number;
  min: number;
  open: number;
  position: string;
  status: string;
  to: number;
  volume: number;
};

export type IAsset = {
  name: string;
  doji: number;
  loss: number;
  mg1: number;
  mg2: number;
  total: number;
  win: number;
  winrate: string;
  candles: ICandle[];
};

export function Home(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<IAsset[]>([]);

  function getCandleColor(candle: any) {
    if (candle.close > candle.open) {
      return 'green';
    }

    if (candle.close < candle.open) {
      return 'red';
    }

    return 'doji';
  }

  useEffect(() => {
    async function loadAssets(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get('/assets');

        const resultWithColorAndDate = JSON.parse(
          response.data.replaceAll("'", '"'),
        ).map((asset: any) => ({
          ...asset,
          candles: asset.candles.map((candle: any) => ({
            ...candle,
            color: getCandleColor(candle),
            date: new Date(candle.from * 1000),
          })),
        }));

        const resultMultipleOfFive = resultWithColorAndDate.map(
          (asset: any) => ({
            ...asset,
            candles: asset.candles.filter((candle: any) => {
              const min = String(
                new Date(candle.from * 1000).getMinutes(),
              ).slice(-1);

              if (min === '5' || min === '0') {
                return true;
              }

              return false;
            }),
          }),
        );

        const resultWithoutAnalisysAndResult = resultMultipleOfFive.map(
          (asset: any) => ({
            ...asset,
            candles: asset.candles.filter((candle: any, index: any) => {
              if (index > 0) {
                return true;
              }

              return false;
            }),
          }),
        );

        const resultFinal = resultWithoutAnalisysAndResult.map(
          (asset: any) => ({
            ...asset,
            candles: asset.candles.map((candle: any, index: any) => {
              const candleColor = getCandleColor(candle);
              let entry = '';

              const findCandles = resultWithColorAndDate.find(
                (item: any) => item.name === asset.name,
              ).candles;
              const findCandleIndex = findCandles.findIndex(
                (item: any) => item.id === candle.id,
              );

              const analysisCandles = [
                findCandles[findCandleIndex - 1],
                findCandles[findCandleIndex - 2],
                findCandles[findCandleIndex - 3],
              ];

              if (
                analysisCandles.filter(item => item.color === 'doji').length > 0
              ) {
                entry = 'doji';
              }

              if (
                analysisCandles.filter(item => item.color === 'green').length >=
                2
              ) {
                entry = 'red';
              }

              if (
                analysisCandles.filter(item => item.color === 'red').length >= 2
              ) {
                entry = 'green';
              }

              if (entry === 'doji') {
                return {
                  ...candle,
                  status: 'doji',
                  position: 'doji',
                };
              }

              if (entry === candleColor) {
                return {
                  ...candle,
                  status: 'win',
                  position: 'init',
                };
              }

              // if (entry === getCandleColor(findCandles[findCandleIndex + 1])) {
              //   return {
              //     ...candle,
              //     status: 'win',
              //     position: 'mg1',
              //   };
              // }

              // if (entry === getCandleColor(findCandles[findCandleIndex + 2])) {
              //   return {
              //     ...candle,
              //     status: 'win',
              //     position: 'mg2',
              //   };
              // }

              return {
                ...candle,
                status: 'loss',
                position: 'loss',
              };
            }),
          }),
        );

        setAssets(resultFinal);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex bg="gray.100" minH="100vh" alignItems="center" p="4" flexDir="column">
      <SimpleGrid columns={2} spacing={4}>
        {assets.map((asset: IAsset) => (
          <Asset key={asset.name} asset={asset} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
