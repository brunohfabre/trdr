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
  min = int(datetime.now().strftime('%M'))

  # currentTime = datetime.now().replace(hour = hour - 1 if min <= 15 else hour, minute = 55 if min <= 15 else 10 if min <= 30 else 25 if min <= 45 else 40, second = 0, microsecond = 0) // Best for GABA
  currentTime = datetime.now().replace(minute = 5 if min <= 40 else 30, second = 0, microsecond = 0)

  candles = Iq.get_candles(asset, 60 * 5, (12 * 24) + 10, currentTime.timestamp())

  return {
    "name": asset,
    "candles": candles
  }

while True:
  assets = Iq.get_all_open_time()

  result = []

  for asset in assets['digital']:
    # if assets['digital'][asset]['open']:
    result.append(catalogAsset(asset))

  print(result)

  break