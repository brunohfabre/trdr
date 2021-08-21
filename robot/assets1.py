import time, sys, json
from math import trunc
from datetime import datetime, timedelta
from dateutil import tz
from iqoptionapi.stable_api import IQ_Option

Iq = IQ_Option("bruno.hfabre@gmail.com","Jsati27l81")
check, reason = Iq.connect()

if check:
  print('Successfully connected')

else:
  print('Connection error :/')

  sys.exit()

def catalogAsset(asset):
  hour = int(datetime.now().strftime('%H'))
  minleft = int(datetime.now().strftime('%M')[0])
  minright = int(datetime.now().strftime('%M')[1])

  # currentTime = datetime.now().replace(minute = int(str(minleft) + str(0 if minright <= 4 else 5)), second = 0, microsecond = 0)
  currentTime = datetime.now().replace(hour = 7, minute = 55, second = 0, microsecond = 0)

  candles = Iq.get_candles(asset, 60, 119, currentTime.timestamp())

  return {
    "name": asset,
    "candles": candles
  }

while True:
  assets = Iq.get_all_open_time()

  result = []

  for asset in assets['turbo']:
    if assets['turbo'][asset]['open']:
      result.append(asset)

  print(result)

  break