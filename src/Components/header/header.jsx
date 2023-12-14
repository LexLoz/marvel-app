import React, { Suspense } from 'react'
import Loading from '../util/loading';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import "./header.scss";

const CardBrowser = React.lazy(() => import("../card-browser/card-browser"));
const Characters = React.lazy(() => import("../characters/characters"));
const Rules = React.lazy(() => import("../rules/rules"));
const Game = React.lazy(() => import("../game/game"));
const Favorites = React.lazy(() => import("../favorites/favorites"));

export default function Header() {
  const currentUrl = useSelector(state => state.global.url);
  const characters = useSelector(state => state.global.characters)
  return (
    <header>
      <Suspense fallback={<Loading />}>
        <Router>
          <ul className='header__list'>
            <li><Link exact to="/cards" className={currentUrl == "/cards" ? "header__list--choosen" : ''}>Cards</Link></li>
            <li><Link to="/characters" className={currentUrl == "/characters" ? "header__list--choosen" : ''}>Characters</Link></li>
            <li><Link to="/favorites" className={currentUrl == "/favorites" ? "header__list--choosen" : ''}>Favorites</Link></li>
            <li><Link to="/rules" className={currentUrl == "/rules" ? "header__list--choosen" : ''}>Rules</Link></li>
            <li><Link to="/game" className={currentUrl == "/game" ? "header__list--choosen" : ''}>Game</Link></li>
          </ul>
          <Switch>
            <Route path="/cards">
              <CardBrowser characters={characters}/>
            </Route>
            <Route path="/characters" component={Characters} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/rules" component={Rules} />
            <Route path="/game" component={Game} />
          </Switch>
        </Router>
      </Suspense>
    </header>
  )
}
