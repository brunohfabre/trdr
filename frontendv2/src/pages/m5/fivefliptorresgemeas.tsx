import { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { api } from '../../services/api';

import { getCandleColor } from '../../helpers/getCandleColor';

import {
  Asset5FiveFlipTorresGemeas,
  IAsset,
  ICandle,
} from '../../components/Asset5FiveFlipTorresGemeas';

export default function FiveFlipTorresGemeas(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<IAsset[]>([]);

  useEffect(() => {
    async function loadAssets(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get('/assets', {
          params: {
            timeframe: 1,
          },
        });

        // const data = JSON.parse(response.data.replaceAll("'", '"'));

        // setAssets(data.map((asset: IAsset) => {
        //   const candles = asset.candles.map((candle: ICandle) => ({
        //     ...candle,
        //     date: new Date(candle.from * 1000),
        //     color: getCandleColor(candle),
        //   }));

        //   return {
        //     name: asset.name,
        //     candles
        //   }
        // }));
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
    <Flex
      bg="gray.100"
      minHeight="100vh"
      flexDir="column"
      p="4"
      paddingTop="2"
      alignItems="center"
    >
      {assets.map(asset => (
        <Asset5FiveFlipTorresGemeas key={asset.name} asset={asset} />
      ))}
    </Flex>
  );
}
