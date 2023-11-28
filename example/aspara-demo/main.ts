function get_date_time () {
    date_time = asparaStylist.getDatetime()
    Year = date_time[1] * 100 + date_time[0]
    month = date_time[2]
    day = date_time[3]
    hour = date_time[4]
    minute = date_time[5]
    second = date_time[6]
}
function toggle_pump () {
    for (let index = 0; index < 20; index++) {
        if (using_BLE == 0) {
            using_BLE = 1
            if (asparaStylist.pumpState() == 0) {
                asparaStylist.setPump(ON_OFF.on)
            } else {
                asparaStylist.setPump(ON_OFF.off)
            }
            using_BLE = 0
            break;
        } else {
            basic.pause(50)
        }
    }
}
function initialization () {
    Year = 0
    month = 0
    day = 0
    hour = 0
    minute = 0
    second = 0
    using_BLE = 0
    toggle = 0
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    initialization()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
input.onButtonPressed(Button.A, function () {
    asparaStylist.beep(DURATION.short)
    set_LED_lights(100, 0, 50)
})
function get_data () {
    if (using_BLE == 0) {
        using_BLE = 1
        serial.writeValue("temperature", asparaStylist.temperature())
        serial.writeValue("light intensity", asparaStylist.lightsensor())
        using_BLE = 0
    }
}
function set_LED_lights (red: number, blue: number, white: number) {
    if (using_BLE == 0) {
        using_BLE = 1
        if (red != red_intensity) {
            asparaStylist.setLEDlight(LED_TYPE.red, red)
            red_intensity = asparaStylist.ledIntensity(LED_TYPE.red)
        }
        if (blue != blue_intensity) {
            asparaStylist.setLEDlight(LED_TYPE.blue, blue)
            blue_intensity = asparaStylist.ledIntensity(LED_TYPE.blue)
        }
        if (white != white_intensity) {
            asparaStylist.setLEDlight(LED_TYPE.white, white)
            white_intensity = asparaStylist.ledIntensity(LED_TYPE.white)
        }
        using_BLE = 0
    }
}
function toggle_indicators () {
    if (using_BLE == 0) {
        using_BLE = 1
        if (toggle == 0) {
            asparaStylist.setIndicator(INDICATOR_TYPE.indicator_5, ON_OFF.on)
            toggle = 1
        } else {
            asparaStylist.setIndicator(INDICATOR_TYPE.indicator_5, ON_OFF.off)
            toggle = 0
        }
        using_BLE = 0
    }
}
input.onButtonPressed(Button.AB, function () {
    asparaStylist.beep(DURATION.short)
    toggle_pump()
})
function print_date_time () {
    if (using_BLE == 0) {
        using_BLE = 1
        serial.writeLine("***************************************************************")
        serial.writeLine("")
        serial.writeString("" + convertToText(Year) + "-" + convertToText(month) + "-" + convertToText(day) + "            " + convertToText(hour) + ":" + convertToText(minute) + ":" + convertToText(second))
        serial.writeLine("")
        serial.writeLine("***************************************************************")
        using_BLE = 0
    }
}
input.onButtonPressed(Button.B, function () {
    asparaStylist.beep(DURATION.short)
    set_LED_lights(0, 100, 50)
})
input.onGesture(Gesture.Shake, function () {
    asparaStylist.beep(DURATION.long)
})
let white_intensity = 0
let blue_intensity = 0
let red_intensity = 0
let toggle = 0
let using_BLE = 0
let second = 0
let minute = 0
let hour = 0
let day = 0
let month = 0
let Year = 0
let date_time: Buffer = null
basic.showIcon(IconNames.Heart)
asparaStylist.startAsparaLiteBleControllerService(22582)
loops.everyInterval(1000, function () {
    get_date_time()
    get_data()
    if (asparaStylist.lightsensor() < 20) {
        set_LED_lights(0, 0, 100)
    }
    if (asparaStylist.lightsensor() > 1000) {
        set_LED_lights(0, 0, 0)
    }
})
loops.everyInterval(500, function () {
    toggle_indicators()
})
loops.everyInterval(5000, function () {
    print_date_time()
})
