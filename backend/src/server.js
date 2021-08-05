const express = require('express');
const cors = require('cors');
const { PythonShell } = require('python-shell');

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

app.listen(4444, () => console.log('🚀 Server running on port 3333!'));