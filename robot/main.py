import time, sys, json
from math import trunc
from datetime import datetime, timedelta
from dateutil import tz
from iqoptionapi.stable_api import IQ_Option
from user import user

# def stop(lucro, gain, loss):
# 	if lucro <= float('-' + str(abs(loss))):
# 		print('Stop Loss batido!')
# 		sys.exit()
		
# 	if lucro >= float(abs(gain)):
# 		print('Stop Gain Batido!')
# 		sys.exit()

# def Payout(par):
# 	Iq.subscribe_strike_list(par, 1)

# 	while True:
# 		d = Iq.get_digital_current_profit(par, 1)

# 		if d != False:
# 			d = round(int(d) / 100, 2)
# 			break
# 		time.sleep(1)

# 	Iq.unsubscribe_strike_list(par, 1)
	
# 	return d

Iq = IQ_Option(user['username'], user['password'])
Iq.connect()

Iq.change_balance('PRACTICE') # PRACTICE / REAL

if Iq.check_connect():
	print('Conectado com sucesso!')
else:
	print('Erro ao conectar')
	input('\n\n Aperte enter para sair')
	sys.exit()

balance = float(Iq.get_balance())
entryValue = float(100)
entryValueBase = float(entryValue)

stopGain = 0.05

def loadSignals():
	file = open('sinais.txt', encoding = 'UTF-8')
	signals = file.read()
	file.close

	items = signals.split('\n')
	signals = []

	for index, signal in enumerate(items):
		if signal == '':
			del items[index]

	for signal in items:
		item = signal.split(';')
		time = item[0].split(':')
		date = datetime.now().replace(hour = int(time[0]), minute = int(time[1]), second = 0, microsecond = 0)

		result = {
			'pair': item[1],
			'date': date,
			'dir': item[3] 
		}

		if datetime.now() < result['date']:
			signals.append(result)
	
	return signals

signals = loadSignals()
nextSignal = 0
entry = 1

martingale = 3
profit = 0
payout = 0
wasWin = True

print(balance)
print(entryValue)

def handleMartingale(entryValue):
	return entryValue * 2

while True:
	if nextSignal + 1 <= len(signals):
		if (signals[nextSignal]['date'] - datetime.now()).total_seconds() <= 2:
			if wasWin:
				entryValue = entryValueBase

			for i in range(martingale):
				print(i)
				status, id = Iq.buy(entryValue, 'EURJPY', 'PUT', 5)

				if status:
					print('entrada comprada')
					check_win, value = Iq.check_win_v4(id)

					print(check_win, value)

					if check_win == 'loose' or (check_win == 'equal' and i > 0):
						entryValue = handleMartingale(entryValue)

						if i == 2:
							nextSignal += 1
							wasWin = False
					
					else:
						nextSignal += 1
						wasWin = True
						break

				else:
					print('Não foi possivel comprar.')

	else:
		print('nao tem mais sinal')
		input('\nAperte enter para sair')
		sys.exit()

	time.sleep(0.5)

# while True:
# 	if(nextSignal + 1 <= len(signals)):
# 		if (signals[nextSignal]['date'] - datetime.now()).total_seconds() <= 2:
# 			print('compra agr')

# 			check, id = Iq.buy(10, 'EURUSD', 'CALL', 1)

# 			if(check):
# 				print('primeira entrada comprada')

# 				check_win, value = Iq.check_win_v4(id)

# 				if check_win == 'loose' and entry == 1:
# 					entry = 2
					
# 					print('check win', check_win)

# 					mg1_check, mg1_id = Iq.buy(20, 'EURUSD', 'CALL', 1)

# 					if(mg1_check):
# 						print('mg1 comprada')

# 						mg1_check_win, mg1_value = Iq.check_win_v4(mg1_id)

# 						if mg1_check_win == 'loose' and entry == 2:
# 							entry = 3

# 							print('check win mg1', mg1_check_win)

# 							mg2_check, mg2_id = Iq.buy(30, 'EURUSD', 'CALL', 1)

# 							if(mg2_check):
# 								print('mg2 comprada')

# 								mg1_check_win, mg1_value = Iq.check_win_v4(mg1_id)

# 								print('check win mg2', mg1_check_win)

# 								nextSignal += 1
# 								entry = 1
							
# 							else:
# 								print('Não foi possivel comprar o mg2.')
						
# 						else:
# 							print('check win mg1', mg1_check_win)

# 							nextSignal += 1
# 							entry = 1
					
# 					else:
# 						print('Não foi possivel comprar o mg1.')

# 				else:
# 					print('check win primeira entrada', check_win)

# 					nextSignal += 1
# 					entry = 1

# 			else:
# 				print('Não foi possivel comprar a primeira entrada.')

# 	else:
# 		print('nao tem mais sinal')
# 		input('\nAperte enter para sair')
# 		sys.exit()

# 	time.sleep(0.5)