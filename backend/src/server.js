const express = require('express');
const cors = require('cors');
const { PythonShell } = require('python-shell');

const candles1Data = require('./candles.json');
const candles5Data = require('./candles5.json');
const candles2Data = require('./candles2.json');
const candles15Data = require('./candles15.json');
const mOneJuly = require('./5_13_m1_july.json');

const app = express();

app.use(cors());

function getCandleColor(candle) {
  if(candle.close > candle.open) {
    return 'green';
  }

  if(candle.close < candle.open) {
    return 'red';
  }

  return 'doji'
}

app.get('/assets', async (request, response) => {
  const { timeframe, timeback = 3 } = request.query;

  if(!timeframe) {
    return response.status(401).json({ message: 'Please inform the candles timeframe.' })
  }

  let script = '';

  if(timeframe === '1') {
    script = 'assets1.py';
  }

  if(timeframe === '5') {
    script = 'assets5.py';
  }

  const [, result] = await new Promise((resolve, reject) => {
    PythonShell.run(`./src/${script}`, null, (err, results) => {
      if (err) return reject(err);
      
      return resolve(results);
    });
  });

  const data = JSON.parse(result.replace(/\'/g, '"')).map(asset => ({
    ...asset,
    candles: asset.candles.map(candle => ({
      ...candle,
      color: getCandleColor(candle),
    })),
  }));

  return response.json(data);
});

app.get('/assetstest', async (request, response) => {
  // const [, result] = await new Promise((resolve, reject) => {
  //   PythonShell.run('../robot/assets1.py', null, (err, results) => {
  //     if (err) return reject(err);
      
  //     return resolve(results);
  //   });
  // });

  // const data = JSON.parse(result.replace(/\'/g, '"'))

  // return response.json(data);

  return response.json(candles1Data);
});

app.get('/assetstest2', async (request, response) => {
  // const [, result] = await new Promise((resolve, reject) => {
  //   PythonShell.run('../robot/assets2test.py', null, (err, results) => {
  //     if (err) return reject(err);
      
  //     return resolve(results);
  //   });
  // });

  // const data = JSON.parse(result.replace(/\'/g, '"'))

  // return response.json(data);

  return response.json(candles2Data);
});

app.get('/assetstest5', async (request, response) => {
  // const [, result] = await new Promise((resolve, reject) => {
  //   PythonShell.run('../robot/assets1test.py', null, (err, results) => {
  //     if (err) return reject(err);
      
  //     return resolve(results);
  //   });
  // });

  // const data = JSON.parse(result.replace(/\'/g, '"'))

  // return response.json(data);

  return response.json(candles5Data);
});

app.get('/assetstest15', async (request, response) => {
  // const [, result] = await new Promise((resolve, reject) => {
  //   PythonShell.run('../robot/assets15test.py', null, (err, results) => {
  //     if (err) return reject(err);
      
  //     return resolve(results);
  //   });
  // });

  // const data = JSON.parse(result.replace(/\'/g, '"'))

  // return response.json(data);

  return response.json(candles15Data);
});

app.listen(4444, () => console.log('🚀 Server running on port 3333!'));