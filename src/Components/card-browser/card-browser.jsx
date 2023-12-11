import React, { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import Loading from "../util/loading";
import PageBasis from "../util/page-basis";
import "./card-browser.scss";

const HeroCard = React.lazy(() => import('../card/card'));
const NoCards = React.lazy(() => import('../util/no-cards'));


export default function CardBrowser() {
    const characters = useSelector(state => state.global.characters);
    return (<div className={'character-browser'}>
        <PageBasis/>
        <Suspense fallback={<Loading />}>
            {characters ? characters.map(element =>
                <HeroCard element={element} />)
                : (<NoCards />)}
        </Suspense>
    </div>
    )
}