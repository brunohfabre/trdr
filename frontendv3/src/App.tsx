import { useState } from "react";
import { useEffect } from "react"

import "./app.css";

import { api } from "./services/api";

import { Day } from './Day';

export type CandleType = {
  id: number;
  at: number;
  close: number;
  from: number;
  max: number;
  min: number;
  open: number;
  to: number;
  date: Date;
  color: string;
  status: string;
  position: string;
}

export type DayType = {
  day: number;
  candles: CandleType[];
}

function getCandleColor(candle: CandleType): string {
  if(candle.close > candle.open) {
    return 'green';
  }

  if(candle.close < candle.open) {
    return 'red';
  }

  return 'doji';
}

export function App(): JSX.Element {
  const [days, setDays] = useState<DayType[]>([]);

  useEffect(() => {
    async function loadAssets(): Promise<void> {
      const response = await api.get('/assetstest');

      setDays(response.data.days.map((day: DayType) => ({
        ...day,
        candles: day.candles.map(candle => ({
          ...candle,
          date: new Date(candle.from * 1000),
          color: getCandleColor(candle),
        }))
      })));
    }

    loadAssets();
  }, []);

  return (
    <div className='container'>
      {days.map(day => <Day day={day} />)}
    </div>
  )
}