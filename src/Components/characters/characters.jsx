import React from 'react'
import PageBasis from '../util/page-basis';
import FindCharacter from './search';
import "./characters.scss";
import { useSelector } from 'react-redux';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import ComicsPage from './comics-page';
import Search from './search';

function HeroPage({ heroData }) {
    const comics = heroData.comics.items;
    const { path, url } = useRouteMatch();
    const imageData = heroData.thumbnail;
    console.log('comics', comics);
    return (
        <div className='hero-page'>
            <h2>{heroData.name}</h2>
            <img src={imageData.path + '.' + imageData.extension} alt={heroData.name} />
            <h3>Comics:</h3>
            <ul className='hero-page__comics-list'>
                {comics.map((element, index) => {
                    return <li><Link to={`${url}/${index}`}>{element.name}</Link></li>
                })}
            </ul>
            <Switch>
                {comics.map((element, index) =>
                    <Route path={`${path}/${index}`}>
                        <ComicsPage url={element.resourceURI} heroID={heroData.id} />
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
            <Search placeholder='Find character...' />
            <CharactersList characters={characters} />
        </div>
    )
}