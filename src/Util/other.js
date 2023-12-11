import { getImageForChoosenAttribute } from "./attributes";

export function setBackgroundColor(color) {
    return { 'background-color': color };
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateLinkWithHash(link) {
    return `${link}?apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&ts=${process.env.REACT_APP_TS}&hash=${process.env.REACT_APP_HASH}`;
}

export function findMaxNumberInArray(array) {
    if (array.length === 0) {
        return;
    }

    let maxNumber = array[0];
    let key = 0;

    for (let i = 1; i < array.length; i++) {
        if (array[i] > maxNumber) {
            maxNumber = array[i];
            key = i;
        }
    }

    return {key: key, value: maxNumber};
}

export function getPathToChoosenAttributeImage(index) {
    return `./Images/${getImageForChoosenAttribute(index)}`;
}