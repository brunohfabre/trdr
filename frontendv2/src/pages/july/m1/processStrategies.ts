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
        const min = String(candle.date.getMinutes()).slice(-1);

        if (
          index > 4 &&
          index < candles.length - 4 &&
          (min === '0' || min === '5')
        ) {
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
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (analysisCandles.filter(item => item.color === 'red').length >= 2) {
          entry = 'green';
        }

        if (
          analysisCandles.filter(item => item.color === 'green').length >= 2
        ) {
          entry = 'red';
        }

        if (entry === candle.color) {
          // return {
          //   ...candle,
          //   status: 'win',
          //   position: 'init',
          // };
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (entry === candles[findCandleIndex + 1].color) {
          // return {
          //   ...candle,
          //   status: 'win',
          //   position: 'mg1',
          // };
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (entry === candles[findCandleIndex + 2].color) {
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

  if (strategy === 'mhi2') {
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

        const analysisCandles = [
          candles[findCandleIndex - 2],
          candles[findCandleIndex - 3],
          candles[findCandleIndex - 4],
        ];

        let entry = '';

        if (analysisCandles.filter(item => item.color === 'doji').length > 0) {
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (analysisCandles.filter(item => item.color === 'red').length >= 2) {
          entry = 'green';
        }

        if (
          analysisCandles.filter(item => item.color === 'green').length >= 2
        ) {
          entry = 'red';
        }

        if (entry === candle.color) {
          // return {
          //   ...candle,
          //   status: 'win',
          //   position: 'init',
          // };
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (entry === candles[findCandleIndex + 1].color) {
          // return {
          //   ...candle,
          //   status: 'win',
          //   position: 'mg1',
          // };
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (entry === candles[findCandleIndex + 2].color) {
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

  if (strategy === 'mhi3') {
    const result = candles
      .filter((candle, index) => {
        const min = String(candle.date.getMinutes()).slice(-1);

        if (
          index > 4 &&
          index < candles.length - 4 &&
          (min === '2' || min === '7')
        ) {
          return true;
        }

        return false;
      })
      .map(candle => {
        const findCandleIndex = candles.findIndex(
          item => item.id === candle.id,
        );

        const analysisCandles = [
          candles[findCandleIndex - 3],
          candles[findCandleIndex - 4],
          candles[findCandleIndex - 5],
        ];

        let entry = '';

        if (analysisCandles.filter(item => item.color === 'doji').length > 0) {
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (analysisCandles.filter(item => item.color === 'red').length >= 2) {
          entry = 'green';
        }

        if (
          analysisCandles.filter(item => item.color === 'green').length >= 2
        ) {
          entry = 'red';
        }

        if (entry === candle.color) {
          // return {
          //   ...candle,
          //   status: 'win',
          //   position: 'init',
          // };
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (entry === candles[findCandleIndex + 1].color) {
          // return {
          //   ...candle,
          //   status: 'win',
          //   position: 'mg1',
          // };
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (entry === candles[findCandleIndex + 2].color) {
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

  if (strategy === 'mhihigh') {
    const result = candles
      .filter((candle, index) => {
        const min = String(candle.date.getMinutes()).slice(-1);

        if (
          index > 4 &&
          index < candles.length - 4 &&
          (min === '0' || min === '5')
        ) {
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
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (analysisCandles.filter(item => item.color === 'red').length >= 2) {
          entry = 'red';
        }

        if (
          analysisCandles.filter(item => item.color === 'green').length >= 2
        ) {
          entry = 'green';
        }

        if (entry === candle.color) {
          return {
            ...candle,
            status: 'win',
            position: 'init',
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

  if (strategy === 'mhi2high') {
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

        const analysisCandles = [
          candles[findCandleIndex - 2],
          candles[findCandleIndex - 3],
          candles[findCandleIndex - 4],
        ];

        let entry = '';

        if (analysisCandles.filter(item => item.color === 'doji').length > 0) {
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (analysisCandles.filter(item => item.color === 'red').length >= 2) {
          entry = 'red';
        }

        if (
          analysisCandles.filter(item => item.color === 'green').length >= 2
        ) {
          entry = 'green';
        }

        if (entry === candle.color) {
          return {
            ...candle,
            status: 'win',
            position: 'init',
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

  if (strategy === 'mhi3high') {
    const result = candles
      .filter((candle, index) => {
        const min = String(candle.date.getMinutes()).slice(-1);

        if (
          index > 4 &&
          index < candles.length - 4 &&
          (min === '2' || min === '7')
        ) {
          return true;
        }

        return false;
      })
      .map(candle => {
        const findCandleIndex = candles.findIndex(
          item => item.id === candle.id,
        );

        const analysisCandles = [
          candles[findCandleIndex - 3],
          candles[findCandleIndex - 4],
          candles[findCandleIndex - 5],
        ];

        let entry = '';

        if (analysisCandles.filter(item => item.color === 'doji').length > 0) {
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (analysisCandles.filter(item => item.color === 'red').length >= 2) {
          entry = 'red';
        }

        if (
          analysisCandles.filter(item => item.color === 'green').length >= 2
        ) {
          entry = 'green';
        }

        if (entry === candle.color) {
          return {
            ...candle,
            status: 'win',
            position: 'init',
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

  if (strategy === 'nick') {
    const result = candles
      .filter((candle, index) => {
        const min = String(candle.date.getMinutes()).slice(-1);

        if (
          index > 4 &&
          index < candles.length - 4 &&
          (min === '0' || min === '5')
        ) {
          return true;
        }

        return false;
      })
      .map(candle => {
        const findCandleIndex = candles.findIndex(
          item => item.id === candle.id,
        );

        const analysisCandles = [
          candles[findCandleIndex - 4],
          candles[findCandleIndex - 3],
          candles[findCandleIndex - 2],
          candles[findCandleIndex - 1],
        ];

        let entry = '';

        if (analysisCandles.filter(item => item.color === 'doji').length > 0) {
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (
          analysisCandles[0].color === 'green' &&
          analysisCandles[1].color === 'green' &&
          analysisCandles[2].color === 'red' &&
          analysisCandles[3].color === 'red'
        ) {
          entry = 'green';
        } else if (
          analysisCandles[0].color === 'red' &&
          analysisCandles[1].color === 'red' &&
          analysisCandles[2].color === 'green' &&
          analysisCandles[3].color === 'green'
        ) {
          entry = 'red';
        } else {
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

        // if (entry === candles[findCandleIndex + 1].color) {
        //   return {
        //     ...candle,
        //     status: 'win',
        //     position: 'mg1',
        //   };
        // }

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

  if (strategy === 'mhiimpar') {
    const result = candles
      .filter((candle, index) => {
        const min = String(candle.date.getMinutes()).slice(-1);

        if (
          index > 4 &&
          index < candles.length - 4 &&
          (min === '0' || min === '5')
        ) {
          return true;
        }

        return false;
      })
      .map(candle => {
        const findCandleIndex = candles.findIndex(
          item => item.id === candle.id,
        );

        const analysisCandles = [
          candles[findCandleIndex - 3],
          candles[findCandleIndex - 2],
          candles[findCandleIndex - 1],
        ];

        let entry = '';

        if (analysisCandles.filter(item => item.color === 'doji').length > 0) {
          return {
            ...candle,
            status: 'doji',
            position: 'doji',
          };
        }

        if (
          analysisCandles.filter(item => item.color === 'red').length >= 2 &&
          analysisCandles[0].color === 'red'
        ) {
          entry = 'green';
        } else if (
          analysisCandles.filter(item => item.color === 'green').length >= 2 &&
          analysisCandles[0].color === 'green'
        ) {
          entry = 'red';
        } else {
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

        if (entry === candles[findCandleIndex + 2].color) {
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
