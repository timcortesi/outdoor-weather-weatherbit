function round_to_hundredth (value: number) {
    return Math.round(value * 100) / 100
}
input.onButtonPressed(Button.A, function () {
    if (upload_weather == 0) {
        upload_weather = 1
        basic.clearScreen()
        basic.showIcon(IconNames.Yes)
    } else {
        upload_weather = 0
        basic.clearScreen()
        basic.showIcon(IconNames.No)
    }
})
let gust_direction = ""
let gust_speed = 0
let upload_weather = 0
upload_weather = 1
let total_rain = 0
weatherbit.startWeatherMonitoring()
weatherbit.startRainMonitoring()
weatherbit.startWindMonitoring()
radio.setGroup(86)
radio.setTransmitPower(7)
serial.redirect(
SerialPin.P15,
SerialPin.P14,
BaudRate.BaudRate9600
)
loops.everyInterval(600000, function () {
    gust_speed = weatherbit.windSpeed()
    gust_direction = weatherbit.windDirection()
})
basic.forever(function () {
    radio.sendValue("tmp", round_to_hundredth(weatherbit.temperature() / 100 * (9 / 5) + 32))
    radio.sendValue("prs", round_to_hundredth(weatherbit.pressure() / 25600))
    radio.sendValue("hum", round_to_hundredth(weatherbit.humidity() / 1024))
    radio.sendValue("ran", round_to_hundredth(total_rain - weatherbit.rain()))
    radio.sendValue("spd", round_to_hundredth(weatherbit.windSpeed()))
    radio.sendString("dir" + weatherbit.windDirection())
    basic.pause(5000)
})
basic.forever(function () {
    serial.writeLine("" + upload_weather + "," + round_to_hundredth(weatherbit.temperature() / 100 * (9 / 5) + 32) + "," + round_to_hundredth(weatherbit.pressure() / 25600) + "," + round_to_hundredth(weatherbit.humidity() / 1024) + "," + round_to_hundredth(total_rain - weatherbit.rain()) + "," + round_to_hundredth(weatherbit.windSpeed()) + "," + weatherbit.windDirection() + "," + round_to_hundredth(gust_speed) + "," + gust_direction + ",")
    basic.pause(30000)
})
basic.forever(function () {
    if (weatherbit.windSpeed() > gust_speed) {
        gust_speed = weatherbit.windSpeed()
        gust_direction = weatherbit.windDirection()
    }
    basic.pause(500)
})
basic.forever(function () {
    basic.showString("Temp:")
    basic.showNumber(Math.round(weatherbit.temperature() / 100 * (9 / 5) + 32))
    basic.showString("Wind:")
    basic.showString("" + Math.round(weatherbit.windSpeed()) + weatherbit.windDirection())
    basic.clearScreen()
})
loops.everyInterval(3600000, function () {
    total_rain = weatherbit.rain()
})
