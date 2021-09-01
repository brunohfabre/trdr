import time, sys, json
from math import trunc
from datetime import datetime, timedelta
from dateutil import tz
from iqoptionapi.stable_api import IQ_Option

Iq = IQ_Option("bruno.hfabre@gmail.com", "Jsati27l81")
check, reason = Iq.connect()

if check:
  print('Successfully connected')

else:
  print('Connection error :/')

  sys.exit()

def catalogAsset(asset):
  days = [1, 2, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30]

  response = []

  for day in days:
    currentTime = datetime.now().replace(year = 2021, month = 7, day = day, hour = 17, minute = 45, second = 0, microsecond = 0)

    candles = Iq.get_candles(asset, 60 * 15, 68, currentTime.timestamp())

    response.append({
      "day": day,
      "candles": candles
    })

  return {
    "name": asset,
    "days": response
  }

while True:
  assets = Iq.get_all_open_time()

  result = []

  for asset in assets['digital']:
    # if assets['digital'][asset]['open']:
    result.append(catalogAsset(asset))

  print(result)

  break