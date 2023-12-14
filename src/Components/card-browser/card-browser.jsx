import React, { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import Loading from "../util/loading";
import PageBasis from "../util/page-basis";
import "./card-browser.scss";
import Search from "../characters/search";

const HeroCard = React.lazy(() => import('../card/card'));
const NoCards = React.lazy(() => import('../util/no-cards'));


export default function CardBrowser({ characters }) {
    const currentUrl = useSelector(state => state.global.url);
    const visibility = currentUrl == "/cards"
    return (
        <div>
            {visibility ?
                <Search placeholder="Find card..." />
            : <></>}
            <div className={'character-browser'}>
                <PageBasis />
                <Suspense fallback={<Loading />}>
                    {characters ? characters.map(element =>
                        <HeroCard characterData={element} />)
                        : (<NoCards />)}
                </Suspense>
            </div>
        </div>

    )
}