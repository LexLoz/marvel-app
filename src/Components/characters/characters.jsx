import React, { useEffect, useState } from 'react'
import PageBasis from '../util/page-basis';
import FindCharacter from './find-character';
import "./characters.scss";
import { useSelector } from 'react-redux';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { generateLinkWithHash } from '../../Util/other';
import { saveInFavorites } from '../../Util/saver';

function ComicsPage({ comicsData, heroData, index }) {
    const [comics, setComics] = useState({ empty: true });
    console.log('comics1', comics)
    useEffect(() => {
        console.log('useEffect');
        if (comics.empty)
            fetch(generateLinkWithHash(comicsData.resourceURI))
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        const result = data.data.results[0];
                        setComics(result);
                    }
                })
    });
    console.log('comicsData', comicsData);
    console.log('comics2', comics)
    const imageData = comics.thumbnail;

    return (
        <div>
            {!comics.empty ?
                <div className='characters__comics-page'>
                    <h2>{comics.title}</h2>
                    <img src={`${imageData.path}.${imageData.extension}`} alt="title" />
                    <p>Authots: {comics.creators.items.map(element =>
                        <p>{element.name} {`(${element.role})`}</p>
                    )}</p>
                    <button onClick={() => saveInFavorites(comicsData, `${heroData.id}${index}`, "COMICS")}>Save in Favorites</button>
                </div>
                : null}
        </div>
    )
}

function HeroPage({ heroData }) {
    const comics = heroData.comics.items;
    const { path, url } = useRouteMatch();
    const imageData = heroData.thumbnail;
    return (
        <div className='characters__hero-page'>
            <img src={imageData.path + '.' + imageData.extension} alt={heroData.name} />
            <h2>{heroData.name}</h2>
            <ul className='characters__hero-page__comics-list'>
                {comics.map((element, index) => {
                    return <li><Link to={`${url}/${index}`}>{element.name}</Link></li>
                })}
            </ul>
            <Switch>
                {comics.map((element, index) =>
                    <Route path={`${path}/${index}`}>
                        <ComicsPage comicsData={element} heroData={heroData} index={index} />
                    </Route>
                )}
            </Switch>
        </div>
    )
}

function CharactersList(props) {
    const { path, url } = useRouteMatch();
    return (
        <div>
            <ul className="characters__list">
                {props.characters.map(element => <li><Link to={`${url}/${element.id}`}>{element.name}</Link></li>)}
            </ul>
            <Switch>
                {props.characters.map(element =>
                    <Route path={`${path}/${element.id}`}>
                        <HeroPage heroData={element} />
                    </Route>
                )}
            </Switch>
        </div>
    )
}

export default function Characters() {
    const characters = useSelector(state => state.global.characters)
    return (
        <div className='characters'>
            <PageBasis />
            <FindCharacter />
            <CharactersList characters={characters} />
        </div>
    )
}