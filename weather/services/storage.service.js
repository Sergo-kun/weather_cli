import {homedir} from 'os'
import {join } from 'path'
import {  promises } from 'fs'
import {printSuccess} from "./log.service.js";

const filePath = join(homedir(), 'weather-data.json')

 const TOKEN_DICTIONARY = {
 token: 'token',
     city: 'city'
}
const saveKeyValue = async (key, value) => {
    let data = {
        info: []
    }

       if (await isExist(filePath)) {
            const file = await promises.readFile(filePath)
            //data[key] = JSON.parse(file)
            data = JSON.parse(file)

           if (data.info.length == 2) {
            //   console.log('Два елемента')
               data.info.map(async (oldValue, index) => {
                   if (Object.keys(oldValue) == key) {
                      // console.log(data.info[index][key])
                       data.info[index] = ({[key] : value})
                     //  console.log(data.info)
                       await promises.writeFile(filePath, JSON.stringify(data))
                       printSuccess('Успешное изменение информации')
                   }
               })
               return
           }
           if (Object.keys(data.info[0]) == 'city') {
               const city = data.info[0]['city']
               console.log(city)
               // то нужно достать значение
               data.info.push({[key] : value})
               await promises.writeFile(filePath, JSON.stringify(data))
           }else  if (Object.keys(data.info[0]) == 'token') {
               const city = data.info[0]['token']
               console.log(city)
               // то нужно достать значение
               data.info.push({[key] : value})
               await promises.writeFile(filePath, JSON.stringify(data))
           }

           return
        }
         data.info.push({[key] : value})
         await promises.writeFile(filePath, JSON.stringify(data))

    }

const getPath = async () => {
    const filePath = join(homedir(), 'weather-data.json')
    const data = await promises.readFile(filePath)
    return data
}
const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        const data = JSON.parse(file)
        let token = undefined
        data.info.map((value, index) => {
            if (Object.keys(value) == key){
                token = value

            }
        })
        return {token, key}

    }
    return undefined
}
const isExist = async (path) => {
    try {
        await promises.stat(path)
        return true
    }catch (e) {
        return false
    }

}
export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY, getPath}