import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (err) => {
    console.log(chalk.bgRed(' ERROR ') + err)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + message)
}

const printHelp = () => {
  console.log(
      dedent`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
  `
  )
}
const printWeather = (data) => {
    console.log(`      ${chalk.bgCyan('Город')}: ${data.name}
    На улице ${chalk.blue(data.weather[0]['description'])}
    Температура: ${chalk.blue(data.main.temp)}
    Ощущается как: ${chalk.blue(data.main.feels_like)}
    max тепло: ${chalk.blue(data.main.temp_max)}
    max холодно: ${chalk.blue(data.main.temp_min)}
    Давление: ${chalk.blue(data.main.pressure)}
    Скорость ветра: ${chalk.blue(data.wind.speed)}
    
    `)
}

export {printError, printSuccess, printHelp, printWeather}