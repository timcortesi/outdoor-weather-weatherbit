weatherbit.startWeatherMonitoring()
weatherbit.startRainMonitoring()
weatherbit.startWindMonitoring()
radio.setGroup(86)
radio.setTransmitPower(7)
basic.forever(function () {
    radio.sendValue("tmp", weatherbit.temperature())
    radio.sendValue("prs", weatherbit.pressure())
    radio.sendValue("hum", weatherbit.humidity())
    radio.sendValue("alt", weatherbit.altitude())
    radio.sendValue("ran", weatherbit.rain())
    radio.sendValue("spd", weatherbit.windSpeed())
    radio.sendString("dir" + weatherbit.windDirection())
    basic.showString("Temp:")
    basic.showNumber(Math.round(weatherbit.temperature() / 100 * (9 / 5) + 32))
    basic.showString("Wind")
    basic.showNumber(Math.round(weatherbit.windSpeed()))
    basic.showString(weatherbit.windDirection())
})