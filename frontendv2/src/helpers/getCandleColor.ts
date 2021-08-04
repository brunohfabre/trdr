import { ICandle, IColor } from "../components/Asset";

export function getCandleColor(candle: ICandle): IColor {
  if(candle.close > candle.open) {
    return 'green';
  }

  if(candle.close < candle.open) {
    return 'red';
  }

  return 'doji';
}