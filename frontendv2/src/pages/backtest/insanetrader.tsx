import { useEffect, useState } from 'react';
import { Flex, Text, Textarea, Button } from '@chakra-ui/react';

import { api } from '../../services/api';

type Signal = {
  hour: string;
  pair: string;
  dir: 'CALL' | 'PUT';
  timeframe: 5;
  result: 'win' | 'loss';
  position: 'init' | 'mg1' | 'mg2';
};

export default function InsaneTrader(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [signals, setSignals] = useState('');
  const [values, setValues] = useState<Signal[]>([]);

  useEffect(() => {
    async function loadAssets(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get('/backtest/insanetrader');

        const data = JSON.parse(response.data.replaceAll("'", '"'));

        setAssets(
          data.map((asset: any) => ({
            ...asset,
            candles: asset.candles.map((candle: any) => {
              const date = new Date(candle.from * 1000);

              const hour = `${String(date.getHours()).padStart(
                2,
                '0',
              )}:${String(date.getMinutes()).padStart(2, '0')}`;

              return {
                ...candle,
                hour,
              };
            }),
          })),
        );
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  console.log(assets);

  function handleBackTest(): void {
    const data = signals.split('\n').map((signal: string) => {
      const [hour, asset, dir, timeframe] = signal.split(';');

      const pair = asset.replace('/', '');

      const item = {
        hour,
        pair,
        dir,
        timeframe: Number(timeframe),
        result,
        position,
      };

      return item;
    });

    console.log(data);
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex minH="100vh" bg="gray.100" flexDir="column" align="center">
      <Flex mt="8" p="8" bg="white" borderRadius="8" minW="636">
        <Textarea value={signals} onChange={e => setSignals(e.target.value)} />

        <Button colorScheme="pink" ml="2" onClick={handleBackTest}>
          Analisar
        </Button>
      </Flex>
      <Text>Back test Insane trader</Text>
    </Flex>
  );
}
