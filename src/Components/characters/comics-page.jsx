import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { generateLinkWithHash } from '../../Util/other';
import { saveInFavorites } from '../../Util/saver';
import { reduceComics } from '../../Store/reducers/global-reducers';
import SaveButton from '../util/save-button';
import "./characters.scss";

export default function ComicsPage(props) {
    const { url, heroID } = props;
    let comicsData = useSelector((state) => state.global.comics[heroID]);
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if (!comicsData)
            fetch(generateLinkWithHash(url))
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        const result = data.data.results[0];
                        dispatch(reduceComics({ heroKey: heroID, comicsKey: url, value: result }));
                    }
                });
    })
    comicsData = comicsData ? comicsData[url] :
        {
            thumbnail: {},
            creators: { items: [] }
        };
    return comicsData ?
        (<div className='comics-page'>
            <div>
                <h2>{comicsData.title}</h2>
                <img src={`${comicsData.thumbnail.path}.${comicsData.thumbnail.extension}`} alt="title" />
                <SaveButton data={props} keyForSaver={`${heroID}${comicsData.id}`} type="COMICS" />
            </div>
            <div>
                <button onClick={() => setToggle(!toggle)}>Show authots</button>
                <ul className="comics-page__authors-list">
                    {comicsData.creators.items.map(element =>
                        <li className={`comics-page__authors-list${toggle ? '--visible' : '--hidden'}`}>{element.name} {`(${element.role})`}</li>
                    )}
                </ul>
            </div>
        </div>)
        : (<></>)
}