import React from 'react'
import { saveInFavorites } from '../../Util/saver'
import { useSelector } from 'react-redux'

export default function SaveButton({ data, keyForSaver, type }) {
    const currentUrl = useSelector(state => state.global.url);
    const visibility = currentUrl != "/favorites"

    return visibility ? (
        <button onClick={() => saveInFavorites(data, keyForSaver, type)}>Save in Favorites</button>
    ) : (<></>)
}
