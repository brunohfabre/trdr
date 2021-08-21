import { useState, useEffect } from 'react';
import { Flex, Text, Textarea, Button } from '@chakra-ui/react';

import operationsData from './operations.json';
import { api } from '../../../services/api';

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

type OperationType = string;

type OperarionDayType = {
  date: string;
  operations: OperationType[];
};

export default function GoldInsane(): JSX.Element {
  const [days, setDays] = useState();

  useEffect(() => {
    async function loadOperations(): Promise<void> {
      const response = await api.get('/assetstest5');

      const data = {} as any;

      response.data
        .filter((asset: AssetDataType) => !asset.name.includes('OTC'))
        .forEach((asset: AssetDataType) => {
          data[asset.name] = asset.days;
        });

      const value = operationsData.map((day: any) => ({
        ...day,
        operations: day.operations.map((operation: OperationType) => {
          const [hour, asset, direction] = operation.split(';');

          const pair = asset.replace('/', '');

          console.log(data[pair]);

          return {
            hour,
            pair,
            direction,
            date: new Date(`${day.date} ${hour}`),
          };
        }),
      }));

      // .filter(item => !!item)
      // .map(item => {
      //   const [hour, pair, direction] = item.split(';');

      //   console.log(hour, pair.replace('/', ''), direction);

      //   return item;
      // });

      console.log(value);
    }

    loadOperations();
  }, []);

  if (!days) {
    return <Text>no data</Text>;
  }

  return (
    <Flex>
      <Text>gold insane</Text>
    </Flex>
  );
}
