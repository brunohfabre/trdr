const express = require('express');
const cors = require('cors');
const { PythonShell } = require('python-shell');

const app = express();

app.use(cors());

// app.get('/assets', async (request, response) => {
//   const [, result] = await new Promise((resolve, reject) => {
//     PythonShell.run('../robot/assets1.py', null, (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });

//   return response.json(result);
// });

// app.get('/assets/m5/clone', async (request, response) => {
//   const [, result] = await new Promise((resolve, reject) => {
//     PythonShell.run('../robot/assetsm5clone.py', null, (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });

//   return response.json(result);
// });

// app.get('/assets/m5/milhao', async (request, response) => {
//   const [, result] = await new Promise((resolve, reject) => {
//     PythonShell.run('../robot/assetsm512h.py', null, (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });

//   return response.json(result);
// });

app.get('/assets', async (request, response) => {
  const { timeframe } = request.query;

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
    PythonShell.run(`../robot/${script}`, null, (err, results) => {
      if (err) return reject(err);
      
      return resolve(results);
    });
  });

  return response.json(result);
});

app.get('/backtest/insanetrader', async (request, response) => {
  const [, result] = await new Promise((resolve, reject) => {
    PythonShell.run('../robot/insaneTraderBackTest.py', null, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });

  return response.json(result);
})

app.listen(4444, () => console.log('🚀 Server running on port 3333!'));