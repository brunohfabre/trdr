import { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';

import { CandleType, DayType } from "./App";

interface DayProps {
  day: DayType;
}

export function Day({ day }: DayProps): JSX.Element {
  const [candles, setCandles] = useState<CandleType[]>([]);

  useEffect(() => {
    setCandles(day.candles.filter((candle, index) => {
      const hour = candle.date.getHours()
      const min = String(candle.date.getMinutes()).slice(-1);

      if (
        hour >= 8 &&
        index > 4 &&
        index < day.candles.length - 4 &&
        (min === '0' || min === '5')
      ) {
        return true;
      }

      return false;
    }).map(candle => {
      const findCandleIndex = day.candles.findIndex(
        item => item.id === candle.id,
      );

      const analysisCandles = [
        day.candles[findCandleIndex - 1], 
        day.candles[findCandleIndex - 2], 
        day.candles[findCandleIndex - 3]
      ];

      let entry = '';

      if (analysisCandles.filter(item => item.color === 'doji').length > 0) {
        entry = 'doji';
      }

      if (analysisCandles.filter(item => item.color === 'red').length >= 2) {
        entry = 'green';
      }

      if (
        analysisCandles.filter(item => item.color === 'green').length >= 2
      ) {
        entry = 'red';
      }

      if (entry === 'doji') {
        return {
          ...candle,
          status: 'doji',
          position: 'init',
        };
      }

      if (entry === candle.color) {
        return {
          ...candle,
          status: 'win',
          position: 'init',
        };
      }

      if (entry === day.candles[findCandleIndex + 1].color) {
        return {
          ...candle,
          status: 'win',
          position: 'mg1',
        };
      }

      if (entry === day.candles[findCandleIndex + 2].color) {
        return {
          ...candle,
          status: 'win',
          position: 'mg2',
        };
      }

      return {
        ...candle,
        status: 'loss',
        position: 'init',
      };
    }));
  }, [day]);

  return (
    <>
      <ReactTooltip effect='solid' />

      <section>
        <p>{day.day}</p>

        <div style={{ display: 'flex' }}>
          {candles.map(candle => <div data-tip={`${candle.date.getHours()}:${candle.date.getMinutes()}`} style={{ height: 24, minWidth: 16, marginLeft: candle.date.getHours() === 12 && candle.date.getMinutes() === 0 ? 8 : 2, padding: 4, background: candle.status === 'win' ? 'green' : candle.status === 'loss' ? 'red' : 'gray' }}>
            {candle.position === 'mg1' && 'a'}
            {candle.position === 'mg2' && 'aa'}

          </div>)}
        </div>
      </section>
    </>
  )
}