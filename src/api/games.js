import axios from "axios"
import {API_URL} from "../utils/constants"

export async function getGamesApi(headers, setFunction){
    try {
        const url = `${API_URL}/games/all`
        await axios.get(url, headers)
                .then((res) => {
                setFunction(res.data.Game)
        })
        .catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
}

export async function getGameDetailsByIDApi(id){
    try {
        const response = await axios(`${API_URL}/games/${id}`)
        const result = await response.data
        return result
    } catch (error) {
        console.log(error)
    }
}