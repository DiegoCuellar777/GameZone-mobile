import AsyncStorage from "@react-native-async-storage/async-storage";
import {includes, pull} from "lodash"
const FAVORITE_STORAGE = "favorites"

export async function getGamesFavoriteApi(){
    try {
        const response = await AsyncStorage.getItem(FAVORITE_STORAGE)
        return JSON.parse(response || "[]")
        // return response ? JSON.parse(response) : []
    } catch (error) {
        console.log(error);
    }
}

export async function addGameFavorite(id) {
    try {
        const favorites = await getGamesFavoriteApi()
        favorites.push(id)
        await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites))
    } catch (error) {
        console.log(error)
    }
}

export async function isGameFavoriteApi(id) {
    try {
        const response = await getGamesFavoriteApi()
        return includes(response, id)
    } catch (error) {
        console.log(error);
    }
}

export async function removeGameFavoriteApi(id){
    try {
        const favorites = await getGamesFavoriteApi()
        const newFavorites = pull(favorites, id)
        await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites))
    } catch (error) {
        console.log(error);
    }
}
