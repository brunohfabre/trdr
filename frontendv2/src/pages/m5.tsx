import { useEffect, useState } from 'react';
import { Flex, Select, SimpleGrid, Text, useToast } from '@chakra-ui/react';

import { Asset, IAsset, ICandle } from '../components/Asset';

import { getCandleColor } from '../helpers/getCandleColor';
import { api } from '../services/api';
import {
  IStrategyProcessed,
  processAssetsM5,
} from '../helpers/processAssetsM5';

type IStrategy = 'fiveflip';

export default function M5(): JSX.Element {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [strategiesAssets, setStrategiesAssets] = useState<IStrategyProcessed>(
    {} as IStrategyProcessed,
  );
  const [selectedStrategy, setSelectedStrategy] =
    useState<IStrategy>('fiveflip');

  useEffect(() => {
    async function loadAssets(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get('/assets', {
          params: {
            timeframe: 5,
          },
        });

        const data = JSON.parse(response.data.replaceAll("'", '"'));

        setAssets(
          data.map((asset: IAsset) => {
            const candles = asset.candles.map((candle: ICandle) => ({
              ...candle,
              date: new Date(candle.from * 1000),
              color: getCandleColor(candle),
            }));

            return {
              name: asset.name,
              candles,
            };
          }),
        );
      } catch (err) {
        toast({
          title: 'Oh no 😕',
          description: err.response.data.message,
          status: 'error',
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  useEffect(() => {
    if (assets.length) {
      const response = processAssetsM5(assets);

      setStrategiesAssets(response);
    }
  }, [assets]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex
      bg="gray.100"
      minHeight="100vh"
      flexDir="column"
      p="4"
      paddingTop="2"
      alignItems="center"
    >
      <Flex>
        <Select
          value={selectedStrategy}
          onChange={e => setSelectedStrategy(e.target.value as IStrategy)}
        >
          {/* <option value="mhimin">MHI</option>
          <option value="mhimax">MHI Maioria</option>
          <option value="million">Milhão</option>
          <option value="millionmax">Milhão Maioria</option> */}
          <option value="fiveflip">Five Flip</option>
        </Select>
      </Flex>
      <Text>{strategiesAssets[selectedStrategy]?.name}</Text>

      <SimpleGrid columns={5} spacing={4}>
        {strategiesAssets[selectedStrategy]?.assets.map(asset => (
          <Asset key={asset.name} asset={asset} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
