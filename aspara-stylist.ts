enum ON_OFF
{
  off = 0,
  on
} ON_OFF;

enum DURATION
{
  short = 0,
  long
} DURATION;

enum LED_TYPE
{
  white = 0,
  red,
  blue,
} LED_TYPE;

enum INDICATOR_TYPE
{
  indicator_1 = 0,
  indicator_2 = 1,
  indicator_3 = 2,
  indicator_4 = 3,
  indicator_5 = 4,
  indicator_6 = 5,
  indicator_7 = 6,
  indicator_8 = 7,
} INDICATOR_TYPE;

/**
 * Aspara Stylist
 */
//% block="aspara Stylist"
//% icon="\uf06c"
//% color="#00AAA0"
namespace asparaStylist {

  /**
   * Start the Aspara Stylist service
   */
  //% block="start aspara Stylist service with microbit ID: %id"
  //% id.min=0 id.max=99999
  //% weight=99
  //% shim=asparaStylist::startAsparaStylistService
  export function startAsparaStylistService(id: number): void {
    return;
  }

  /**
   * Set single LED light
   */
  //% block="set |%ledtype| LED intensity to |%intensity|"
  //% intensity.min=0 intensity.max=100
  //% weight=95
  //% shim=asparaStylist::setLEDlight
  export function setLEDlight(ledtype: LED_TYPE, intensity: number): void {
    return;
  }

  /**
   * Set single indicator
   */
  //% block="set |%indicatortype| to |%onoff|"
  //% weight=90
  //% shim=asparaStylist::setIndicator
  export function setIndicator(indicatortype: INDICATOR_TYPE, onoff: ON_OFF): void {
    return;
  }

  /**
   * Set pump on/off
   */
  //% block="set pump |%onoff|"
  //% weight=85
  //% shim=asparaStylist::setPump
  export function setPump(onoff: ON_OFF): void {
    return;
  }

  /**
   * Beep once
   */
  //% block="play a |%duration| beep"
  //% weight=80
  //% shim=asparaStylist::beep
  export function beep(duration: DURATION): void {
    return;
  }

  /**
   * Set LED lights
   */
  //% block="set LEDs to |White %white|Red %red|Blue %blue|"
  //% white.min=0 white.max=100 red.min=0 red.max=100 blue.min=0 blue.max=100
  //% weight=75
  //% shim=asparaStylist::setLEDlights
  // export function setLEDlights(white: number, red: number, blue: number): void {
  //   return;
  // }

  /**
   * Get LED intensity
   */
  //% block="intensity of |%ledtype| LED"
  //% weight=70
  //% shim=asparaStylist::ledIntensity
  export function ledIntensity(ledtype: LED_TYPE): number {
    return 0;
  }

  /**
   * Get indicator state
   */
  //% block="state of |%indicatortype|"
  //% weight=65
  //% shim=asparaStylist::indicatorState
  export function indicatorState(indicatortype: INDICATOR_TYPE): number {
    return 0;
  }

  /**
   * Get pump state
   */
  //% block="pump state (on/off)"
  //% weight=60
  //% shim=asparaStylist::pumpState
  export function pumpState(): number {
    return 0;
  }

  /**
   * Get temperature
   */
  //% block="temperature (°C)"
  //% weight=55
  //% shim=asparaStylist::temperature
  export function temperature(): number {
    return 21.5;
  }

  /**
   * Get humidity
   */
  //% block="humidity (percentage)"
  //% weight=50
  //% shim=asparaStylist::humidity
  export function humidity(): number {
    return 75;
  }

  /**
   * Get light sensor
   */
  //% block="light intensity (Lux)"
  //% weight=45
  //% shim=asparaStylist::lightsensor
  export function lightsensor(): number {
    return 200;
  }

  /**
   * Get nutrient
   */
  //% block="nutrient level (µS/cm)"
  //% weight=40
  //% shim=asparaStylist::nutrient
  export function nutrient(): number {
    return 1400;
  }

  /**
   * Get battery level
   */
  //% block="battery level (V)"
  //% weight=35
  //% shim=asparaStylist::battery
  export function battery(): number {
    return 2.5;
  }

  /**
   * Get water level
   */
  //% block="water level (Nil/Full/Low)"
  //% weight=30
  //% shim=asparaStylist::waterlevel
  export function waterlevel(): number {
    return 1;
  }

  /**
   * Get datetime
   */
  //% block="date and time (year,month,day,hour,minute,second)"
  //% weight=25
  //% shim=asparaStylist::getDatetime
  export function getDatetime(): Buffer {
    return (Buffer.fromArray([22, 20, 1, 2, 3, 4, 5]));
  }
}