import { Cache } from "react-native-cache";
import {AsyncStorage} from "react-native";
export class CacheManager {

    cache:Cache;

    constructor(){
        this.cache = new Cache({
            namespace: "MoneyManager",
            policy: {
                maxEntries: 50000
            },
            backend: AsyncStorage
        });
    }

    getItem(key: string, callback: any) {
        this.cache.getItem(key, callback);
    }

    putItem(key: string, value: any,  callback: any) {
        this.cache.setItem(key, value, callback);
    }


}