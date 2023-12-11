import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { reduceSmth } from '../../Store/reducers/global-reducers';
import { generateLinkWithHash } from '../../Util/other';
import { generateAttributes } from '../../Util/attributes';

export default function PageBasis() {
    const dispatch = useDispatch();
    const characters = useSelector(state => state.global.characters);
    const { path, url } = useRouteMatch();
    const link = generateLinkWithHash(process.env.REACT_APP_API_ENDPOINT);
    useEffect(() => {
        dispatch(reduceSmth({ key: 'url', value: url }));
        if (characters.length === 0)
            fetch(link)
                .then(response => response.json())
                .then(data => {
                    const results = generateAttributes(data.data.results);
                    console.log('results', results);
                    dispatch(reduceSmth({ key: 'characters', value: results }));
                })
        return () => dispatch(reduceSmth({ key: 'url', value: '' }))
    }, []);
    // useEffect(() => {
    //     const comics = characters.map(element => {
    //         let comics = element.comics.items.map(element => {
    //             let results;
    //             fetch(generateLinkWithHash(element.resourceURI))
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     if (data.code === 200) {
    //                         results = data.data.results[0];
    //                     }
    //                 })
    //             return results;
    //         })
    //         return comics;
    //     })
    //     dispatch(reduceSmth({ key: 'comics', value: comics }));
    //     console.log('comics', comics);

    // }, [])
    return (<></>)
}