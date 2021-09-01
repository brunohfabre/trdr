import { CandleType } from '.';

export function processStrategies(
  candles: CandleType[],
  strategy: string,
): CandleType[] {
  if (strategy === 'turnover') {
    const result = candles
      .filter((candle, index) => {
        const min = candle.date.getMinutes();

        if (index > 3 && index && min === 0) {
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

  if (strategy === 'mhi') {
    const result = candles
      .filter((candle, index) => {
        const min = candle.date.getMinutes();

        if (index > 3 && index && min === 0) {
          return true;
        }

        return false;
      })
      .map(candle => {
        const findCandleIndex = candles.findIndex(
          item => item.id === candle.id,
        );

        const analysisCandles = [
          candles[findCandleIndex - 1],
          candles[findCandleIndex - 2],
          candles[findCandleIndex - 3],
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
