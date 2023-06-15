import AsyncStorage from "@react-native-async-storage/async-storage";
import {includes, pull} from "lodash"
const CART_STORAGE = "cart"

export async function getGamesCartApi(){
    try {
        const response = await AsyncStorage.getItem(CART_STORAGE)
        return JSON.parse(response || "[]")
        // return response ? JSON.parse(response) : []
    } catch (error) {
        console.log(error);
    }
}

export async function addGameCartApi(title) {
    try {
        const cart = await getGamesCartApi()
        cart.push(title)
        await AsyncStorage.setItem(CART_STORAGE, JSON.stringify(cart))
    } catch (error) {
        console.log(error)
    }
}

export async function isGameInCartApi(title) {
    try {
        const response = await getGamesCartApi()
        return includes(response, title)
    } catch (error) {
        console.log(error);
    }
}

export async function removeGameCartApi(title){
    try {
        const cart = await getGamesCartApi()
        const newCart = pull(cart, title)
        await AsyncStorage.setItem(CART_STORAGE, JSON.stringify(newCart))
    } catch (error) {
        console.log(error);
    }
}
