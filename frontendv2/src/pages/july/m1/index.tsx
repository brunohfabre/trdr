import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text, Select, HStack } from '@chakra-ui/react';
import { api } from '../../../services/api';

import { Day } from './Day';

import { processStrategies } from './processStrategies';

export type CandleType = {
  close: 1.18493;
  from: 1625126100;
  id: 1367876;
  open: 1.18512;
  color: string;
  date: Date;
  status: string;
  position: string;
};

export type DayType = {
  day: number;
  candles: CandleType[];
};

type AssetDataType = {
  name: string;
  days: DayType[];
};

export type AssetType = {
  name: string;
  candles: CandleType[];
};

type OptionType = {
  label: string;
  value: string;
};

const strategies = [
  {
    value: 'padrao23',
    label: 'Padrão 23',
  },
  {
    value: 'mhi',
    label: 'MHI',
  },
  {
    value: 'mhi2',
    label: 'MHI 2',
  },
  {
    value: 'mhi3',
    label: 'MHI 3',
  },
  {
    value: 'mhihigh',
    label: 'MHI maioria',
  },
  {
    value: 'mhi2high',
    label: 'MHI 2 maioria',
  },
  {
    value: 'mhi3high',
    label: 'MHI 3 maioria',
  },
  {
    value: 'mhiimpar',
    label: 'MHI + padrão impar',
  },
  {
    value: 'nick',
    label: 'Nick',
  },
];

export default function July(): JSX.Element {
  const [assetData, setAssetData] = useState<DayType[]>([]);
  const [asset, setAsset] = useState<DayType[]>([]);
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState('');
  const [days, setDays] = useState<DayType[]>([]);

  function getCandleColor(candle: CandleType): string {
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

        const response = await api.get('/assetstest');

        setAssetData(
          response.data.days.map((day: DayType) => ({
            ...day,
            candles: day.candles.map(candle => ({
              ...candle,
              date: new Date(candle.from * 1000),
              color: getCandleColor(candle),
            })),
          })),
        );
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  useEffect(() => {
    if (strategy && assetData.length) {
      const values = assetData.map(day => ({
        day: day.day,
        candles: processStrategies(day.candles, strategy),
      }));

      setAsset(values);
    }
  }, [strategy, assetData]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box minH="100vh" bg="gray.100">
      <HStack bg="white" p="4">
        <Select
          w="192px"
          defaultValue="0"
          onChange={e => setStrategy(e.target.value)}
        >
          <option value="0" disabled>
            Select a strategy
          </option>
          {strategies.map((item: OptionType) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </Select>
      </HStack>

      {asset.map(day => (
        <Day data={day} />
      ))}

      {/* {!!assets.length && !!strategy && (
        <SimpleGrid columns={4} spacing="4" m="4">
          {assets.map(asset => (
            <Asset key={asset.name} asset={asset} strategy={strategy} />
          ))}
        </SimpleGrid>
      )} */}
    </Box>
  );
}
