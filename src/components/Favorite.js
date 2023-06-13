import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { addGameFavorite, isGameFavoriteApi, removeGameFavoriteApi } from '../api/favorite';



export default function Favorite(props) {

    const {_id} = props
    const [isFavorite, setIsFavorite] = useState(undefined)
    const [reloadCheck, setReloadCheck] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const response = await isGameFavoriteApi(_id)
                setIsFavorite(response)
            } catch (error) {
                setIsFavorite(false)
            }
        })()
    }, [_id, reloadCheck])

    const onReloadCheckFavorite = () =>{
        setReloadCheck((prev) => !prev)
    }

    const addFavorite = async () => {
        try {
            await addGameFavorite(_id)
            onReloadCheckFavorite()  
        } catch (error) {
            console.log(error);
        }
    }

    const removeFavorite = async() =>{
        try {
            await removeGameFavoriteApi(_id)
            onReloadCheckFavorite()  
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Ionicons
            name={isFavorite ? "heart": "heart-outline" }
            color={"white"}
            size={30}
            onPress={isFavorite ? removeFavorite : addFavorite}
            style={{
                marginHorizontal:0,
            }}/>
    )
}