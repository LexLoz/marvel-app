import React, { Suspense } from 'react';
import PageBasis from '../util/page-basis';
import "./favorites.scss";
import { loadFavoriteContent } from '../../Util/saver';
import { transformObjectToArray } from '../../Util/other';
import Loading from "../util/loading";
import Search from '../characters/search';

const CardBrowser = React.lazy(() => import('../card-browser/card-browser'));
const ComicsPage = React.lazy(() => import('../characters/comics-page'));

export default function Favorites() {
  const favoritesCards = transformObjectToArray(loadFavoriteContent().CARD);
  const favoritesComics = transformObjectToArray(loadFavoriteContent().COMICS);
  console.log('favorite comics', favoritesComics);
  console.log('favorite cards', favoritesCards);
  return (
    <div className='favorites'>
      <PageBasis />
      <h2>Favorites</h2>
      <Search placeholder='Find in favorites...' />
      <div className='favorites_comics'>
        <h3>Comics</h3>
        <div className='favorites__comics__list'>
          <Suspense fallback={<Loading />}>
            {
              favoritesComics.map(element => {
                return <ComicsPage url={element.url} heroID={element.heroID} />
              })
            }
          </Suspense>
        </div>
      </div>
      <div className='favorites__cards'>
        <h3>Cards</h3>
        <Suspense fallback={<Loading />}>
          <CardBrowser characters={favoritesCards}></CardBrowser>
        </Suspense>
      </div>

    </div >
  )
}
