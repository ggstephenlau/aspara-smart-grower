bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
input.onButtonPressed(Button.A, function () {
    asparaStylist.beep(DURATION.short)
    asparaStylist.setLEDlight(LED_TYPE.red, 100)
    asparaStylist.setLEDlight(LED_TYPE.blue, 0)
    asparaStylist.setLEDlight(LED_TYPE.white, 0)
})
input.onButtonPressed(Button.AB, function () {
    asparaStylist.beep(DURATION.short)
    asparaStylist.setLEDlight(LED_TYPE.white, 100)
    asparaStylist.setLEDlight(LED_TYPE.red, 0)
    asparaStylist.setLEDlight(LED_TYPE.blue, 0)
})
input.onButtonPressed(Button.B, function () {
    asparaStylist.beep(DURATION.short)
    asparaStylist.setLEDlight(LED_TYPE.blue, 100)
    asparaStylist.setLEDlight(LED_TYPE.red, 0)
    asparaStylist.setLEDlight(LED_TYPE.white, 0)
})
input.onGesture(Gesture.Shake, function () {
    asparaStylist.beep(DURATION.short)
    if (asparaStylist.pumpState() == 0) {
        asparaStylist.setPump(ON_OFF.on)
    } else {
        asparaStylist.setPump(ON_OFF.off)
    }
})
basic.showIcon(IconNames.Heart)
asparaStylist.startAsparaLiteBleControllerService(22582)
basic.forever(function () {
	
})
