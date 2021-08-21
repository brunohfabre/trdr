import { getCandleColor } from './getCandleColor';

import { IAsset, ICandle } from '../components/Asset';

export type ICandleProcessed = {
  status: string;
  candle: ICandle;
};

export type IAssetProcessed = {
  name: string;
  candles: ICandleProcessed[];
};

type IStrategy = {
  name: string;
  assets: IAssetProcessed[];
};

export type IStrategyProcessed = {
  mhimin: IStrategy;
  mhimax: IStrategy;
  million: IStrategy;
  millionmax: IStrategy;
};

export function processAssetsM1(assets: IAsset[]): IStrategyProcessed {
  const mhimin = {
    name: 'MHI',
    assets: assets.map(asset => ({
      ...asset,
      candles: asset.candles
        .filter(candle => {
          const min = String(candle.date.getMinutes()).slice(-1);

          if (min === '5' || min === '0') {
            return true;
          }

          return false;
        })
        .map(candle => {
          const candleColor = getCandleColor(candle);
          let entry = '';

          const findCandleIndex = asset.candles.findIndex(
            (item: ICandle) => item.id === candle.id,
          );

          const analysisCandles = [
            asset.candles[findCandleIndex - 1],
            asset.candles[findCandleIndex - 2],
            asset.candles[findCandleIndex - 3],
          ];

          if (
            analysisCandles.filter(item => item.color === 'doji').length > 0
          ) {
            entry = 'doji';
          }

          if (
            analysisCandles.filter(item => item.color === 'green').length >= 2
          ) {
            entry = 'red';
          }

          if (
            analysisCandles.filter(item => item.color === 'red').length >= 2
          ) {
            entry = 'green';
          }

          if (entry === 'doji') {
            return {
              status: 'doji',
              candle,
            };
          }

          if (entry === candleColor) {
            return {
              status: 'win',
              candle,
            };
          }

          return {
            status: 'loss',
            candle,
          };
        }),
    })),
  };

  const mhimax = {
    name: 'MHI Maioria',
    assets: assets.map(asset => ({
      ...asset,
      candles: asset.candles
        .filter(candle => {
          const min = String(candle.date.getMinutes()).slice(-1);

          if (min === '5' || min === '0') {
            return true;
          }

          return false;
        })
        .map(candle => {
          const candleColor = getCandleColor(candle);
          let entry = '';

          const findCandleIndex = asset.candles.findIndex(
            (item: ICandle) => item.id === candle.id,
          );

          const analysisCandles = [
            asset.candles[findCandleIndex - 1],
            asset.candles[findCandleIndex - 2],
            asset.candles[findCandleIndex - 3],
          ];

          if (
            analysisCandles.filter(item => item.color === 'doji').length > 0
          ) {
            entry = 'doji';
          }

          if (
            analysisCandles.filter(item => item.color === 'green').length >= 2
          ) {
            entry = 'green';
          }

          if (
            analysisCandles.filter(item => item.color === 'red').length >= 2
          ) {
            entry = 'red';
          }

          if (entry === 'doji') {
            return {
              status: 'doji',
              candle,
            };
          }

          if (entry === candleColor) {
            return {
              status: 'win',
              candle,
            };
          }

          return {
            status: 'loss',
            candle,
          };
        }),
    })),
  };

  const million = {
    name: 'MHI',
    assets: assets.map(asset => ({
      ...asset,
      candles: asset.candles
        .filter((candle, index) => {
          const min = String(candle.date.getMinutes()).slice(-1);

          if (index > 4 && (min === '5' || min === '0')) {
            return true;
          }

          return false;
        })
        .map(candle => {
          const candleColor = getCandleColor(candle);
          let entry = '';

          const findCandleIndex = asset.candles.findIndex(
            (item: ICandle) => item.id === candle.id,
          );

          const analysisCandles = [
            asset.candles[findCandleIndex - 1],
            asset.candles[findCandleIndex - 2],
            asset.candles[findCandleIndex - 3],
            asset.candles[findCandleIndex - 4],
            asset.candles[findCandleIndex - 5],
          ];

          if (
            analysisCandles.filter(item => item.color === 'doji').length > 0
          ) {
            entry = 'doji';
          }

          if (
            analysisCandles.filter(item => item.color === 'green').length >= 3
          ) {
            entry = 'red';
          }

          if (
            analysisCandles.filter(item => item.color === 'red').length >= 3
          ) {
            entry = 'green';
          }

          if (entry === 'doji') {
            return {
              status: 'doji',
              candle,
            };
          }

          if (entry === candleColor) {
            return {
              status: 'win',
              candle,
            };
          }

          return {
            status: 'loss',
            candle,
          };
        }),
    })),
  };

  const millionmax = {
    name: 'MHI Maioria',
    assets: assets.map(asset => ({
      ...asset,
      candles: asset.candles
        .filter((candle, index) => {
          const min = String(candle.date.getMinutes()).slice(-1);

          if (index > 4 && (min === '5' || min === '0')) {
            return true;
          }

          return false;
        })
        .map(candle => {
          const candleColor = getCandleColor(candle);
          let entry = '';

          const findCandleIndex = asset.candles.findIndex(
            (item: ICandle) => item.id === candle.id,
          );

          const analysisCandles = [
            asset.candles[findCandleIndex - 1],
            asset.candles[findCandleIndex - 2],
            asset.candles[findCandleIndex - 3],
            asset.candles[findCandleIndex - 4],
            asset.candles[findCandleIndex - 5],
          ];

          if (
            analysisCandles.filter(item => item.color === 'doji').length > 0
          ) {
            entry = 'doji';
          }

          if (
            analysisCandles.filter(item => item.color === 'green').length >= 3
          ) {
            entry = 'green';
          }

          if (
            analysisCandles.filter(item => item.color === 'red').length >= 3
          ) {
            entry = 'red';
          }

          if (entry === 'doji') {
            return {
              status: 'doji',
              candle,
            };
          }

          if (entry === candleColor) {
            return {
              status: 'win',
              candle,
            };
          }

          return {
            status: 'loss',
            candle,
          };
        }),
    })),
  };

  return { mhimin, mhimax, million, millionmax };
}
