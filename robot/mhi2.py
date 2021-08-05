from iqoptionapi.stable_api import IQ_Option
from datetime import datetime
import time
import sys

def stop(lucro, gain, loss):
	if lucro <= float('-' + str(abs(loss))):
		print('Stop Loss batido!')
		sys.exit()
		
	if lucro >= float(abs(gain)):
		print('Stop Win Batido!')
		sys.exit()

def Martingale(valor, payout):
	lucro_esperado = valor * payout
	perca = float(valor)	
		
	while True:
		if round(valor * payout, 2) > round(abs(perca) + lucro_esperado, 2):
			return round(valor, 2)
			break
		valor += 0.01

login = input('Login: ')
senha = input('Senha: ')

API = IQ_Option(login, senha)
API.connect()

API.change_balance('PRACTICE') # PRACTICE / REAL

if API.check_connect():
	print('Conectado com sucesso!')
else:
	print('Erro ao conectar')
	input('\n\n Aperte enter para sair')

	sys.exit()

par = input(' Indique uma paridade para operar: ').upper()
valor_entrada = float(input(' Indique um valor para entrar: '))
valor_entrada_b = float(valor_entrada)

martingale = int(input(' Indique a quantia de martingales: '))
martingale += 1

stop_loss = float(input(' Indique o valor de Stop Loss: '))
stop_gain = float(input(' Indique o valor de Stop Gain: '))

lucro = 0
payout = round(int(API.get_digital_payout(par)) / 100, 2)

while True:
	minutos = float(((datetime.now()).strftime('%M.%S'))[1:])
	segundos = int((datetime.now()).strftime('%S'))
	entrar = True if (minutos >= 4.58 and minutos <= 5) or minutos >= 9.58 else False

	print(segundos)
	print('Hora de entrar?',entrar,'/ Minutos:',minutos)
	
	if entrar:
		print('\nIniciando operação!')
		dir = False
		print('Verificando cores..', end='')
		velas = API.get_candles(par, 60, 3, time.time())
		
		velas[0] = 'g' if velas[0]['open'] < velas[0]['close'] else 'r' if velas[0]['open'] > velas[0]['close'] else 'd'
		velas[1] = 'g' if velas[1]['open'] < velas[1]['close'] else 'r' if velas[1]['open'] > velas[1]['close'] else 'd'
		velas[2] = 'g' if velas[2]['open'] < velas[2]['close'] else 'r' if velas[2]['open'] > velas[2]['close'] else 'd'
		
		cores = velas[0] + ' ' + velas[1] + ' ' + velas[2]		
		print(cores)
	
		if cores.count('g') > cores.count('r') and cores.count('d') == 0 : dir = 'put'
		if cores.count('r') > cores.count('g') and cores.count('d') == 0 : dir = 'call'		
		
		if dir:
			print('Direção:', dir)
			
			valor_entrada = valor_entrada_b

			for i in range(martingale):
			
				status, id = API.buy_digital_spot(par, valor_entrada, dir, 1)
				
				if status:
					while True:
						print(API.get_async_order(id))
							
						break
							
					if valor > 0 : break
					
				else:
					print('\nERRO AO REALIZAR OPERAÇÃO\n\n')
				
	time.sleep(0.5)