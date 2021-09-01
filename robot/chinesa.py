from iqoptionapi.stable_api import IQ_Option
from finta import TA
from time import time, sleep
from datetime import datetime
import pandas as pd
from user import user

API = IQ_Option(user['username'], user['password'])
API.connect()

API.change_balance('PRACTICE') # PRACTICE / REAL

if API.check_connect():
  print('Conectado com sucesso')
else:
  print('Erro ao conectar')
  input('\n\nAperte enter para sair')
  exit()

def get_data(par, timeframe, periods = 200):
  global API

  velas = API.get_candles(par, timeframe * 60, periods, time())

  df = pd.DataFrame(velas)
  df.rename(columns = { "max": "high", "min": "low" }, inplace = True)

  return df

def MovAvarDev(df, periods = 20):
  src = TA.SSMA(df, periods)

  calc = df.iloc[-1]['close'] - src.iloc[-1]

  return calc, 'green' if calc >= (df.iloc[-2]['close'] - src.iloc[-2]) else 'red'

def entrada(par, dir, timeframe):
  global API

  print('\nAbrindo operacao')

  status, id = API.buy_digital_spot_v2(par, 10, dir, timeframe)

  if status:
    status = False

    while status == False:
      status, lucro = API.check_win_digital_v2(id)

      if float(lucro) > 0:
        print('WIN, Lucro de: ', lucro)

      else:
        print('LOSS, Perca de: ', lucro)

  else:
    print('Erro ao abrir operacao', id)
  
  print('\n')

par = 'AUDCAD'
timeframe = 1

while True:
  df = get_data(par, timeframe, 200)
  taxa, color = MovAvarDev(df, 20)

  ssma_3 = TA.SSMA(df, 3)
  ssma_50 = TA.SSMA(df, 50)

  if ssma_3.iloc[-1] <= ssma_50.iloc[-1] and ssma_3.iloc[-2] > ssma_50.iloc[-2] and color == 'red':
    entrada(par, 'put', timeframe)
  
  elif ssma_3.iloc[-1] >= ssma_50.iloc[-1] and ssma_3.iloc[-2] < ssma_50.iloc[-2] and color == 'green':
    entrada(par, 'call', timeframe)
  
  print(f"[{ datetime.now().strftime('%H:%M:%S') }]:: Aguardando oportunidade de entrada..", end = '\r')