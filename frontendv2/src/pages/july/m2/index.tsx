import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text, Select, HStack } from '@chakra-ui/react';
import { api } from '../../../services/api';

import { Asset } from './Asset';

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

type DayType = {
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
    value: 'flip',
    label: 'Vira',
  },
];

export default function July(): JSX.Element {
  const [assetsData, setAssetsData] = useState<AssetDataType[]>([]);
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState('');
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    async function loadAssets(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get('/assetstest2');

        const data: AssetDataType[] = response.data.filter(
          (asset: AssetDataType) => !asset.name.includes('OTC'),
        );

        setAssetsData(data);

        setDays(data[0].days.map(item => item.day));
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  function getCandleColor(candle: CandleType): string {
    if (candle.close > candle.open) {
      return 'green';
    }
    if (candle.close < candle.open) {
      return 'red';
    }

    return 'doji';
  }

  function handleSelectDay(daySelected: number): void {
    const response = assetsData.map(asset => {
      const findDay = asset.days.find(day => day.day === daySelected);

      return {
        name: asset.name,
        candles:
          findDay?.candles.map(candle => ({
            ...candle,
            color: getCandleColor(candle),
            date: new Date(candle.from * 1000),
          })) || [],
      };
    });

    setAssets(response);
  }

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

        <Select
          w="192px"
          defaultValue="0"
          onChange={e => handleSelectDay(Number(e.target.value))}
        >
          <option value="0" disabled>
            Select a day
          </option>
          {days.map(day => (
            <option value={day}>{day}</option>
          ))}
        </Select>
      </HStack>

      {!!assets.length && !!strategy && (
        <SimpleGrid columns={5} spacing="4" m="8">
          {assets.map(asset => (
            <Asset key={asset.name} asset={asset} strategy={strategy} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
