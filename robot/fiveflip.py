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

pair = 'EURUSD'

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
	min = int(((datetime.now()).strftime('%M')))

	if min == 25 or min == 55:
		candles = Iq.get_candles(pair, 60 * 5, 1, time.time())
		candles[0] = 'g' if candles[0]['open'] < candles[0]['close'] else 'r' if candles[0]['open'] > candles[0]['close'] else 'd'

		dir = False

		if candles[0] == 'g' : dir = 'put'
		if candles[0] == 'r' : dir = 'call'

		if dir:
			if wasWin:
				entryValue = entryValueBase

			for i in range(martingale):
				status, id = Iq.buy(entryValue, pair, dir, 5)
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