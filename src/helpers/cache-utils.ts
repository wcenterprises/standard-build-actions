
import * as fs from 'fs'
import { IEnvironment } from 'src/interfaces/environment'



export function saveCacheSync(key: string, data:any) {
  fs.writeFileSync(`${key}.json`, JSON.stringify(data))
}

export function readCacheSync(key: string) : any {
  const data = fs.readFileSync(`${key}.json`, 'utf-8')
  return JSON.parse(data)
}

export function saveEnvironment(key: string, env: IEnvironment) {
  saveCacheSync(key, env)
}

export function loadEnvironment(key: string): IEnvironment {
  return readCacheSync(key) as IEnvironment
}