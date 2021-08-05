import time, sys, json
from math import trunc
from datetime import datetime, timedelta
from dateutil import tz
from iqoptionapi.stable_api import IQ_Option
from user import user

Iq = IQ_Option(user['username'], user['password'])
Iq.connect()

Iq.change_balance('PRACTICE') # PRACTICE / REAL

if Iq.check_connect():
	print('Conectado com sucesso!')
else:
	print('Erro ao conectar')
	input('\n\n Aperte enter para sair')
	sys.exit()

def stop(lucro, gain, loss):
	if lucro <= float('-' + str(abs(loss))):
		print('Stop Loss batido!')
		sys.exit()
		
	if lucro >= float(abs(gain)):
		print('Stop Gain Batido!')
		sys.exit()

pair = 'GBPUSD-OTC'

balance = float(Iq.get_balance())
# entryValue = float(100)
entryValue = 2
entryValueBase = float(entryValue)
loss = 0

stopGain = 0.1

martingale = 3
profit = 0
payout = 0
wasWin = True

print(balance)
print(entryValue)

def handleMartingale(value, payout):
	profit = 0
		
	while True:
		if round(profit * payout, 2) > round(value, 2):
			return round(profit, 2)
			break
		profit += 0.01

def handlePayout(pair):
	assets = Iq.get_all_profit()

	return assets[pair]['turbo']

while True:
  min = float(((datetime.now()).strftime('%M.%S'))[1:])

  if (min >= 4.58 and min <= 5) or min >= 9.58:
    candles = Iq.get_candles(pair, 60, 3, time.time())

    candles[0] = 'g' if candles[0]['open'] < candles[0]['close'] else 'r' if candles[0]['open'] > candles[0]['close'] else 'd'
    candles[1] = 'g' if candles[1]['open'] < candles[1]['close'] else 'r' if candles[1]['open'] > candles[1]['close'] else 'd'
    candles[2] = 'g' if candles[2]['open'] < candles[2]['close'] else 'r' if candles[2]['open'] > candles[2]['close'] else 'd'

    colors = candles[0] + ' ' + candles[1] + ' ' + candles[2]

    dir = False

    if colors.count('g') > colors.count('r') and colors.count('d') == 0 : dir = 'put'
    if colors.count('r') > colors.count('g') and colors.count('d') == 0 : dir = 'call'

    if dir:
      if wasWin:
        entryValue = entryValueBase

      for i in range(martingale):
        status, id = Iq.buy(entryValue, pair, dir, 1)
        payout = handlePayout(pair)

        if status:
          print('entrada comprada')
          check_win, value = Iq.check_win_v4(id)

          print(check_win, value)

          if check_win == 'loose' or (check_win == 'equal' and i > 0):
            loss += entryValue
            entryValue = handleMartingale(loss, payout)

            if i == 2:
              wasWin = False
					
          else:
            loss = 0
            wasWin = True
            break

        else:
          print('Não foi possivel comprar.')

  time.sleep(0.5)