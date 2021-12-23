import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";
import axios from "axios";


const getWeather = async (city) => {
    const {token, key} = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
    console.log(city)
    if (!token[key]) {
        throw new Error('Не задан ключ API задайте его через команду -t [API_KEY]')
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
        params: {
            q: city,
            appid: token[key],
            lang: 'ru',
            units: 'metric'
        }
    })
return data
}

export {getWeather}