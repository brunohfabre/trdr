import { CandleType } from '.';

export function processStrategies(
  candles: CandleType[],
  strategy: string,
): CandleType[] {
  if (strategy === 'flip') {
    const result = candles
      .filter((candle, index) => {
        const min = candle.date.getMinutes();

        if (
          index > 0 &&
          index < candles.length - 1 &&
          (min === 0 || min === 30)
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
        let entry = '';

        if (analysisCandle.color === 'doji') {
          entry = 'doji';
        }

        if (analysisCandle.color === 'red') {
          entry = 'green';
        }

        if (analysisCandle.color === 'green') {
          entry = 'red';
        }

        if (entry === 'doji') {
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (entry === candle.color) {
          return {
            ...candle,
            status: 'win',
            position: 'init',
          };
        }

        if (entry === candles[findCandleIndex + 1].color) {
          return {
            ...candle,
            status: 'win',
            position: 'mg1',
          };
        }

        // if (entry === candles[findCandleIndex + 2].color) {
        //   return {
        //     ...candle,
        //     status: 'win',
        //     position: 'mg2',
        //   };
        // }

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
