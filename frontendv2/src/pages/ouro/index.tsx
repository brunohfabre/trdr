import { useEffect, useState } from 'react';
import { Flex, Text, useMediaQuery } from '@chakra-ui/react';

import { Asset, AssetType } from './Asset';
import { api } from '../../services/api';

export default function Ouro(): JSX.Element {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<AssetType[]>([]);

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isLargerThan1280
            ? 'repeat(auto-fit, minmax(560px, 1fr))'
            : isLargerThan768
            ? 'repeat(auto-fit, minmax(400px, 1fr))'
            : 'repeat(auto-fit, minmax(320px, 1fr))',
          gridGap: 16,
        }}
      >
        {assets.map(asset => (
          <Asset key={asset.name} asset={asset} />
        ))}
      </div>
    </Flex>
  );
}
