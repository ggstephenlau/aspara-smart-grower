#include "pxt.h"
#include "MicroBit.h"

#include "time.h"
#include "debug.h"
#include "aspara-smart-grower-service.h"

using namespace pxt; 

static asparaSmartGrowerService *controllerService = NULL;

static uint16_t deviceTemperature = 0;
static uint8_t deviceHumidity = 0;
static uint16_t deviceLightSensor = 0;
static uint16_t deviceNutrient = 0;
static uint16_t deviceBattery = 0;
static uint8_t deviceWaterLevel = 0;
static Buffer datetime = mkBuffer(NULL, 7);
static uint8_t deviceIntensity[3] = {0, 0, 0};
static uint8_t deviceIndicatorState[8] = {0, 0, 0, 0, 0, 0, 0, 0};
static uint8_t devicePumpState = 0;

static uint8_t smartGrowerCmdBuffer[10];
static uint8_t tempCmdBuffer[3];
static uint8_t humiCmdBuffer[2];
static uint8_t lightSensorCmdBuffer[3];
static uint8_t nutrientCmdBuffer[3];
static uint8_t batteryCmdBuffer[3];
static uint8_t waterLevelCmdBuffer[2];
static uint8_t rtcCmdBuffer[5];
static uint8_t indicatorCmdBuffer[3];
static uint8_t pumpCmdBuffer[2];
static uint8_t intensityCmdBuffer[4];

const int timeLimitCount = 15;  // uBit.wait(100), would be 1.5s

namespace asparaSmartGrower { 
  //% 
  void startAsparaSmartGrowerService(int id) { 
    if (controllerService == NULL) {
      controllerService = asparaSmartGrowerService::getInstance();
      if (controllerService) {
        char IdName[] = "GGmB-000000";

        sprintf(&IdName[6], "%05d", id);
        controllerService->setBroadcastName(IdName);
      }
    }
  }

  //% 
  void setLEDlights(int white, int red, int blue) {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        smartGrowerCmdBuffer[0] = 0xB0;
        smartGrowerCmdBuffer[1] = white;
        smartGrowerCmdBuffer[2] = red;
        smartGrowerCmdBuffer[3] = blue;
        controllerService->smartGrowerSendCmd(smartGrowerCmdBuffer, 4);
      }
    }
  }

  //% 
  void setLEDlight(int ledtype, int intensity) {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        smartGrowerCmdBuffer[0] = 0xB1;
        smartGrowerCmdBuffer[1] = ledtype;
        smartGrowerCmdBuffer[2] = intensity;
        controllerService->smartGrowerSendCmd(smartGrowerCmdBuffer, 3);
      }
    }
  }

  //% 
  void setIndicator(int indicatortype, int onoff) {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        smartGrowerCmdBuffer[0] = 0xB7;
        smartGrowerCmdBuffer[1] = indicatortype;
        smartGrowerCmdBuffer[2] = onoff;
        controllerService->smartGrowerSendCmd(smartGrowerCmdBuffer, 3);
      }
    }
  }

  //% 
  void setPump(int onoff) { 
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        smartGrowerCmdBuffer[0] = 0xB2;
        smartGrowerCmdBuffer[1] = onoff;
        controllerService->smartGrowerSendCmd(smartGrowerCmdBuffer, 2);
      }
    }
  }

  //% 
  uint8_t ledIntensity(int type) { 
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (intensityCmdBuffer[0] != 0xB3) {
          intensityCmdBuffer[0] = 0xB3;
          intensityCmdBuffer[1] = (uint8_t)type;
          controllerService->getLedIntensity(intensityCmdBuffer);
        }
        // while(intensityCmdBuffer[0] != 0xE3) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (intensityCmdBuffer[0] == 0xE3) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            intensityCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        deviceIntensity[type] = intensityCmdBuffer[2];
      }
    }
    return deviceIntensity[type];
  }

  //% 
  void beep(int longbeep) { 
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        smartGrowerCmdBuffer[0] = 0xB4;
        smartGrowerCmdBuffer[1] = (uint8_t)longbeep;
        controllerService->smartGrowerSendCmd(smartGrowerCmdBuffer, 2);
      }
    }
  }

  //% 
  uint8_t indicatorState(int type) {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (indicatorCmdBuffer[0] != 0xB8) {
          indicatorCmdBuffer[0] = 0xB8;
          indicatorCmdBuffer[1] = (uint8_t)type;
          controllerService->getIndicatorState(indicatorCmdBuffer);
        }
        // while(indicatorCmdBuffer[0] != 0xE8) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (indicatorCmdBuffer[0] == 0xE8) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            indicatorCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        deviceIndicatorState[type] = (uint8_t)indicatorCmdBuffer[2];
      }
    }
    return deviceIndicatorState[type];
  }

  //% 
  uint8_t pumpState() {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (pumpCmdBuffer[0] != 0xB5) {
          pumpCmdBuffer[0] = 0xB5;
          controllerService->getPumpState(pumpCmdBuffer);
        }
        // while(pumpCmdBuffer[0] != 0xE5) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (pumpCmdBuffer[0] == 0xE5) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            pumpCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        devicePumpState = (uint16_t)pumpCmdBuffer[1];
      }
    }
    return devicePumpState;
  }

  //% 
  float temperature() {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (tempCmdBuffer[0] != 0xBA) {
          tempCmdBuffer[0] = 0xBA;
          controllerService->getTemperature(tempCmdBuffer);
        }
        // while(tempCmdBuffer[0] != 0xEA) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (tempCmdBuffer[0] == 0xEA) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            tempCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        deviceTemperature = (uint16_t)tempCmdBuffer[1] + ((uint16_t)tempCmdBuffer[2] << 8);
      }
    }
    return ((float)deviceTemperature / 100.0);
  }

  //% 
  uint8_t humidity() {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (humiCmdBuffer[0] != 0xBB) {
          humiCmdBuffer[0] = 0xBB;
          controllerService->getHumidity(humiCmdBuffer);
        }
        // while(humiCmdBuffer[0] != 0xEB) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (humiCmdBuffer[0] == 0xEB) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            humiCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        deviceHumidity = humiCmdBuffer[1];
      }
    }
    return deviceHumidity;
  }

  //% 
  uint16_t lightsensor() {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (lightSensorCmdBuffer[0] != 0xBC) {
          lightSensorCmdBuffer[0] = 0xBC;
          controllerService->getLightSensor(lightSensorCmdBuffer);
        }
        // while(lightSensorCmdBuffer[0] != 0xEC) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (lightSensorCmdBuffer[0] == 0xEC) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            lightSensorCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        deviceLightSensor = (uint16_t)lightSensorCmdBuffer[1] + ((uint16_t)lightSensorCmdBuffer[2] << 8);
      }
    }
    return deviceLightSensor;
  }

  //% 
  uint16_t nutrient() {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (nutrientCmdBuffer[0] != 0xBD) {
          nutrientCmdBuffer[0] = 0xBD;
          controllerService->getNutrient(nutrientCmdBuffer);
        }
        // while(nutrientCmdBuffer[0] != 0xED) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (nutrientCmdBuffer[0] == 0xED) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            nutrientCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        deviceNutrient = (uint16_t)nutrientCmdBuffer[1] + ((uint16_t)nutrientCmdBuffer[2] << 8);
      }
    }
    return deviceNutrient;
  }

  //% 
  float battery() {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (batteryCmdBuffer[0] != 0xBE) {
          batteryCmdBuffer[0] = 0xBE;
          controllerService->getBattery(batteryCmdBuffer);
        }
        // while(batteryCmdBuffer[0] != 0xEE) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (batteryCmdBuffer[0] == 0xEE) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            batteryCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        deviceBattery = (uint16_t)batteryCmdBuffer[1] + ((uint16_t)batteryCmdBuffer[2] << 8);
      }
    }
    return ((float)deviceBattery / 100.0);
  }

  //% 
  uint8_t waterlevel() {
    if (controllerService != NULL) {
      if (controllerService->IsBleConnected()) {
        if (waterLevelCmdBuffer[0] != 0xBF) {
          waterLevelCmdBuffer[0] = 0xBF;
          controllerService->getWaterLevel(waterLevelCmdBuffer);
        }
        // while(waterLevelCmdBuffer[0] != 0xEF) {
        for(int i = 0; i < timeLimitCount; i++) {
          if (controllerService->IsBleConnected()) {
            if (waterLevelCmdBuffer[0] == 0xEF) {
              i = timeLimitCount;
            } else {
              uBit.sleep(100);
            }
          } else {
            waterLevelCmdBuffer[0] = 0;
            i = timeLimitCount;
          }
        }
        deviceWaterLevel = waterLevelCmdBuffer[1];
      }
    }
    return deviceWaterLevel;
  }

  //%
  Buffer getDatetime() {
    struct tm *tm;
    const time_t consttimet = 1698796800; // 2023 11 1 00:00:00
    time_t realtime;

    if (controllerService != NULL) {
      if (controllerService->deviceTimeMark == 0) {
        if (controllerService->IsBleConnected()) {
          if (rtcCmdBuffer[0] != 0xB6) {
            rtcCmdBuffer[0] = 0xB6;
            controllerService->getRtc(rtcCmdBuffer);
          }
          // while(rtcCmdBuffer[0] != 0xE6) {
          for(int i = 0; i < timeLimitCount; i++) {
            if (controllerService->IsBleConnected()) {
              if (rtcCmdBuffer[0] == 0xE6) {
                i = timeLimitCount;
              } else {
                uBit.sleep(100);
              }
            } else {
              rtcCmdBuffer[0] = 0;
              i = timeLimitCount;
            }
          }
        }
      } else {
        realtime = controllerService->deviceTime + ((system_timer_current_time() - controllerService->deviceTimeMark) / 1000);
      }
    } else {
      realtime = consttimet + (system_timer_current_time() / 1000);
    }
    tm = localtime(&realtime);

    // struct tm {
    // 	int	tm_sec;		/* seconds after the minute [0-60] */
    // 	int	tm_min;		/* minutes after the hour [0-59] */
    // 	int	tm_hour;	/* hours since midnight [0-23] */
    // 	int	tm_mday;	/* day of the month [1-31] */
    // 	int	tm_mon;		/* months since January [0-11] */
    // 	int	tm_year;	/* years since 1900 */
    // 	int	tm_wday;	/* days since Sunday [0-6] */
    // 	int	tm_yday;	/* days since January 1 [0-365] */
    // 	int	tm_isdst;	/* Daylight Savings Time flag */
    // 	long	tm_gmtoff;	/* offset from UTC in seconds */
    // 	char	*tm_zone;	/* timezone abbreviation */
    // };
    datetime->data[0] = (tm->tm_year + 1900) % 100;
    datetime->data[1] = (tm->tm_year + 1900) / 100;
    datetime->data[2] = tm->tm_mon + 1;
    datetime->data[3] = tm->tm_mday;
    datetime->data[4] = tm->tm_hour;
    datetime->data[5] = tm->tm_min;
    datetime->data[6] = tm->tm_sec;
    // timett = timett + 2;

    return datetime;
  }
}