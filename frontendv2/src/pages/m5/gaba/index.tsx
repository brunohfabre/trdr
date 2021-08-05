import { useEffect, useState } from 'react';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';

import { Asset, AssetType } from './Asset';
import { api } from '../../services/api';

export default function Gaba(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<AssetType[]>([]);

  console.log(assets);

  useEffect(() => {
    async function loadAssets(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get('assets', {
          params: {
            timeframe: 5,
          },
        });

        setAssets(
          response.data.map((asset: any) => ({
            ...asset,
            candles: asset.candles.map((candle: any) => ({
              ...candle,
              date: new Date(candle.from * 1000),
            })),
          })),
        );
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
    <Flex minH="100vh" bg="gray.100" flexDir="column" p="4">
      <SimpleGrid columns={3} spacing={4}>
        {assets.map(asset => (
          <Asset asset={asset} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
