#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import {printError, printSuccess, printHelp, printWeather} from './services/log.service.js'
import {getPath, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const saveToken = async (token, type) => {
     if (!token.length) {
         printError('Не передан token')
         return
     }
    try {
        if (type === 'token') {
            await saveKeyValue(TOKEN_DICTIONARY.token, token)
            printSuccess('Токен сохранен')
        }else if (type === 'city') {
            await saveKeyValue(TOKEN_DICTIONARY.city, token )
            printSuccess('Город сохранен')
        }

    }catch (e) {
        printError(e.message)
    }
}

const getForcast = async (city) => {
    try {
        const weather = await getWeather(city)
         //console.log(weather)
        printWeather(weather)
    }catch (e) {
        if (e?.response?.status === 404){
            printError('Не правельно указн город')
        }else if (e?.response?.status === 401){
            printError('Не правельно указн токен')
        } else {
            printError(e.message)
        }
    }

}

const initCLI = async () => {
    const args = getArgs(process.argv)
   // console.log(process.env)

    if (args.h) {
        printHelp()
    }
    if (args.s) {
        return saveToken(args.s, 'city')
    }
    if (args.t) {
       return saveToken(args.t, 'token')
    }

    const file = await getPath()
    const data = JSON.parse(file)
    data.info.map((value, index) => {
        if (Object.keys(value) == 'city'){
            console.log(value['city'])
            getForcast(value['city'])

        }
    })

}

initCLI()