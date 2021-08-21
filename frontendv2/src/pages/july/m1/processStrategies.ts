import { CandleType } from '.';

export function processStrategies(
  candles: CandleType[],
  strategy: string,
): CandleType[] {
  if (strategy === 'padrao23') {
    const result = candles
      .filter((candle, index) => {
        const min = String(candle.date.getMinutes()).slice(-1);

        if (
          index > 4 &&
          index < candles.length - 4 &&
          (min === '1' || min === '6')
        ) {
          return true;
        }

        return false;
      })
      .map(candle => {
        const findCandleIndex = candles.findIndex(
          item => item.id === candle.id,
        );

        const analysisCandle = candles[findCandleIndex - 1];

        if (analysisCandle.color === 'doji') {
          return {
            ...candle,
            status: 'doji',
            position: 'init',
          };
        }

        if (analysisCandle.color === candle.color) {
          return {
            ...candle,
            status: 'win',
            position: 'init',
          };
        }

        if (analysisCandle.color === candles[findCandleIndex + 1].color) {
          return {
            ...candle,
            status: 'win',
            position: 'mg1',
          };
        }

        if (analysisCandle.color === candles[findCandleIndex + 2].color) {
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
      });

    return result;
  }

  if (strategy === 'r7') {
    const result = candles
      .filter((candle, index) => {
        const min = String(candle.date.getMinutes()).slice(-1);

        if (index > 4 && index < candles.length - 4 && min === '6') {
          return true;
        }

        return false;
      })
      .map(candle => {
        const findCandleIndex = candles.findIndex(
          item => item.id === candle.id,
        );

        const analysisCandle = candles[findCandleIndex - 8];

        if (analysisCandle.color === 'doji') {
          return {
            ...candle,
            status: 'doji',
            position: 'init',
          };
        }

        if (analysisCandle.color === candle.color) {
          return {
            ...candle,
            status: 'win',
            position: 'init',
          };
        }

        if (analysisCandle.color === candles[findCandleIndex + 1].color) {
          return {
            ...candle,
            status: 'win',
            position: 'mg1',
          };
        }

        if (analysisCandle.color === candles[findCandleIndex + 2].color) {
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
      });

    return result;
  }

  return [];
}
