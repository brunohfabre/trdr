from iqoptionapi.stable_api import IQ_Option
from datetime import datetime, timedelta
import sys, json

Iq = IQ_Option('bruno.hfabre@gmail.com', 'Jsati27l81')
Iq.connect()

Iq.change_balance('PRACTICE')

if Iq.check_connect():
  print('Conectado com sucesso.')
else:
  print('Erro ao conectar.')

  input('\n\nAperte enter para sair.')
  sys.exit()

file = open('sinais.json', 'r').read()
days = json.loads(file)

def getCandleColor(candle):
  if candle['close'] > candle['open']:
    return 'green'
  
  if candle['close'] < candle['open']:
    return 'red'

  return 'doji'

for day in days:
  print(day['date'])

  for operation in day['operations']:
    data = operation.split(';')

    date = datetime.strptime(day['date'] + ' ' + data[0] + ':00', '%Y-%m-%d %H:%M:%S') + timedelta(minutes = 10)
    candles = Iq.get_candles(data[1], 60 * int(data[3]), 3, date.timestamp())

    # date = datetime.strptime(day['date'] + ' ' + data[0] + ':00', '%Y-%m-%d %H:%M:%S')
    # candles = Iq.get_candles(data[1], 60 * int(data[3]), 1, date.timestamp())
    # candleColor = getCandleColor(candles[0])

    entry = 'green' if data[2] == 'CALL' else 'red'
    result = 'doji'

    if(getCandleColor(candles[0]) == entry):
      result = 'win'

    elif(getCandleColor(candles[1]) == entry):
      result = 'mg1'

    elif(getCandleColor(candles[2]) == entry):
      result = 'mg2'
    
    else:
      result = 'loss'
    
    print(operation, result)
