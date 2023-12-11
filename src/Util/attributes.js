import { findMaxNumberInArray, getRandomNumber } from "./other";
import {
    ATTRIBUTE_STRENGTH,
    ATTRIBUTE_AGILITY,
    ATTRIBUTE_INTELLIGENCE,
    ATTRIBUTE_VOLITION,

    HEALTH_PER_STRENGTH,
    MANA_PER_INTELLECT,

    RARITY_COMMON,
    RARITY_RARE,
    RARITY_EPIC,
    RARITY_LEGENDARY

} from "../Constants/attributes";

export function calculateCardCost(attributes) {
    return Math.max(0, Math.floor(((getTotalHealth(attributes) + getTotalDamage(attributes) + getTotalMana(attributes) + getTotalDefence(attributes)) / 4 + getAttributesSum(attributes.list) / 4) / (attributes.rarity + 1)));
}

export function generateAttributes(arr) {
    return arr.map(element => {
        const newElement = element;
        const attributes = {
            list: [getRandomNumber(1, 10), getRandomNumber(1, 10), getRandomNumber(1, 10), getRandomNumber(1, 10)],
            baseHealth: getRandomNumber(1, 10),
            baseMana: getRandomNumber(1, 10),
            rarity: getRandomNumber(0, 3),
        };
        attributes.main = findMaxNumberInArray(attributes.list).key;
        attributes.cost = calculateCardCost(attributes);
        newElement.attributes = attributes;

        return newElement;
    })
}

export function getImageForChoosenAttribute(index) {
    switch (index) {
        case ATTRIBUTE_STRENGTH: return "Strength_attribute_symbol.png";
        case ATTRIBUTE_AGILITY: return "Agility_attribute_symbol.png";
        case ATTRIBUTE_INTELLIGENCE: return "Intelligence_attribute_symbol.png";
        case ATTRIBUTE_VOLITION: return "Volition_attribute_symbol.png";
    }
}

export function getColorForChoosenRarity(index) {
    switch(index) {
        case RARITY_COMMON: return "#bebebe"
        case RARITY_RARE: return "blue"
        case RARITY_EPIC: return "purple"
        case RARITY_LEGENDARY: return "orange"
    }
}

export function getNameOfChoosenRarity(index)
{
    switch(index) {
        case RARITY_COMMON: return "Common"
        case RARITY_RARE: return "Rare"
        case RARITY_EPIC: return "Epic"
        case RARITY_LEGENDARY: return "Legendary"
    }
}

export function getTotalDamage(attributes) {
    return attributes.list[ATTRIBUTE_AGILITY] + attributes.list[attributes.main]
}

export function getTotalHealth(attributes) {
    return attributes.baseHealth + attributes.list[ATTRIBUTE_STRENGTH] * HEALTH_PER_STRENGTH
}

export function getTotalMana(attributes) {
    return attributes.baseMana + attributes.list[ATTRIBUTE_INTELLIGENCE] * MANA_PER_INTELLECT
}

export function getTotalDefence(attributes) {
    return attributes.list[ATTRIBUTE_VOLITION];
}

export function getAttributesSum(attributesList) {
    return attributesList.reduce((sum, elem) => sum + elem)
}