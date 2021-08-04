import time, sys, json
from math import trunc
from datetime import datetime, timedelta
from dateutil import tz
from iqoptionapi.stable_api import IQ_Option
from user import user

Iq = IQ_Option(user['username'], user['password'])
check, reason = Iq.connect()

if check:
  print('Successfully connected')

else:
  print('Connection error :/')

  sys.exit()

def catalogAsset(asset):
  hour = int(datetime.now().strftime('%H'))

  currentTime = datetime.now().replace(minute = 0, second = 0, microsecond = 0)

  candles = Iq.get_candles(asset, 60 * 5, hour * 12, currentTime.timestamp())

  return {
    "name": asset,
    "candles": candles
  }

while True:
  assets = Iq.get_all_open_time()

  result = []

  for asset in assets['binary']:
    result.append(catalogAsset(asset))

  print(result)

  break