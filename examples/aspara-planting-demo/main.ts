function toggle_indicator () {
    if (using_BLE == 0) {
        using_BLE = 1
        if (second % 2 > 0) {
            asparaSmartGrower.setIndicator(INDICATOR_TYPE.indicator_2, ON_OFF.on)
            asparaSmartGrower.setIndicator(INDICATOR_TYPE.indicator_3, ON_OFF.on)
        } else {
            asparaSmartGrower.setIndicator(INDICATOR_TYPE.indicator_2, ON_OFF.off)
            asparaSmartGrower.setIndicator(INDICATOR_TYPE.indicator_3, ON_OFF.off)
        }
        using_BLE = 0
    }
}
function in_planting_period () {
    if (hour >= 7 && hour < 17) {
        return 1
    } else if (hour == 17) {
        if (minute >= 0 && minute < 30) {
            return 1
        } else {
            return 0
        }
    } else {
        return 0
    }
}
function initialization () {
    Year = 0
    month = 0
    day = 0
    hour = 0
    minute = 0
    second = 0
    red_intensity = 0
    blue_intensity = 0
    white_intensity = 0
    pump_state = 0
    using_BLE = 0
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    initialization()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
input.onButtonPressed(Button.A, function () {
    asparaSmartGrower.beep(DURATION.short)
    set_LED_lights(10, 10, 10)
})
function get_datetime () {
    date_time = asparaSmartGrower.getDatetime()
    Year = date_time[1] * 100 + date_time[0]
    month = date_time[2]
    day = date_time[3]
    hour = date_time[4]
    minute = date_time[5]
    second = date_time[6]
}
function water_program () {
    if (minute % 15 < 1) {
        set_pump(1)
    } else {
        set_pump(0)
    }
}
input.onButtonPressed(Button.B, function () {
    asparaSmartGrower.beep(DURATION.long)
    set_LED_lights(0, 0, 0)
})
function set_pump (onoff: number) {
    if (onoff != pump_state) {
        if (using_BLE == 0) {
            using_BLE = 1
            if (onoff == 0) {
                asparaSmartGrower.setPump(ON_OFF.off)
            } else {
                asparaSmartGrower.setPump(ON_OFF.on)
            }
            pump_state = asparaSmartGrower.pumpState()
            using_BLE = 0
        }
    }
}
function get_data () {
    if (using_BLE == 0) {
        using_BLE = 1
        serial.writeValue("temp", asparaSmartGrower.temperature())
        serial.writeValue("nutrient", asparaSmartGrower.nutrient())
        serial.writeValue("light intensity", asparaSmartGrower.lightsensor())
        using_BLE = 0
    }
}
function light_program () {
    if (in_planting_period() == 1) {
        set_LED_lights(50, 81, 81)
    } else {
        set_LED_lights(0, 0, 0)
    }
}
function set_LED_lights (red: number, blue: number, white: number) {
    if (red != red_intensity) {
        if (using_BLE == 0) {
            using_BLE = 1
            asparaSmartGrower.setLEDlight(LED_TYPE.red, red)
            red_intensity = asparaSmartGrower.ledIntensity(LED_TYPE.red)
            using_BLE = 0
        }
    }
    if (blue != blue_intensity) {
        if (using_BLE == 0) {
            using_BLE = 1
            asparaSmartGrower.setLEDlight(LED_TYPE.blue, blue)
            blue_intensity = asparaSmartGrower.ledIntensity(LED_TYPE.blue)
            using_BLE = 0
        }
    }
    if (white != white_intensity) {
        if (using_BLE == 0) {
            using_BLE = 1
            asparaSmartGrower.setLEDlight(LED_TYPE.white, white)
            white_intensity = asparaSmartGrower.ledIntensity(LED_TYPE.white)
            using_BLE = 0
        }
    }
}
let date_time: Buffer = null
let pump_state = 0
let white_intensity = 0
let blue_intensity = 0
let red_intensity = 0
let day = 0
let month = 0
let Year = 0
let minute = 0
let hour = 0
let second = 0
let using_BLE = 0
basic.showIcon(IconNames.Duck)
initialization()
asparaSmartGrower.startAsparaSmartGrowerService(22582)
loops.everyInterval(1000, function () {
    get_datetime()
    light_program()
})
loops.everyInterval(500, function () {
    toggle_indicator()
})
loops.everyInterval(2000, function () {
    water_program()
    get_data()
})
