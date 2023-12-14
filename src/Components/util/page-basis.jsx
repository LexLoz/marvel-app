import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { reduceCharacter, reduceSmth } from '../../Store/reducers/global-reducers';
import { generateLinkWithHash } from '../../Util/other';
import { generateAttributes } from '../../Util/attributes';

export default function PageBasis() {
    const dispatch = useDispatch();
    const characters = useSelector(state => state.global.characters);
    const { path, url } = useRouteMatch();
    const link = generateLinkWithHash(process.env.REACT_APP_API_ENDPOINT);
    useEffect(() => {
        if (characters.length === 0)
            fetch(link)
                .then(response => response.json())
                .then(data => {
                    const results = generateAttributes(data.data.results);
                    console.log('results', results);
                    results.forEach(element => {
                        dispatch(reduceCharacter({ characterData: element }));
                    });
                })
    }, []);
    useEffect(() => {
        dispatch(reduceSmth({ key: 'url', value: url }));
        return () => dispatch(reduceSmth({ key: 'url', value: '' }))
    });
    return (<></>)
}