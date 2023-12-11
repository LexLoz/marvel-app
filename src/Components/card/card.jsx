import React, { useRef } from 'react'
import NoCards from '../util/no-cards';
import "./card.scss";

import {
  getColorForChoosenRarity,
  getTotalDamage,
  getTotalHealth,
  getAttributesSum,
  getTotalMana,
  getTotalDefence,
  getNameOfChoosenRarity,
} from '../../Util/attributes';

import { getPathToChoosenAttributeImage, setBackgroundColor } from '../../Util/other';
import { ATTRIBUTE_AGILITY, ATTRIBUTE_INTELLIGENCE, ATTRIBUTE_STRENGTH, ATTRIBUTE_VOLITION } from '../../Constants/attributes';
import { saveInFavorites } from '../../Util/saver';

const heroCardPathFront = `hero-card-front`;
const heroCardPathBack = `hero-card-back`;

function rotateCard(refs) {
  const front = refs.front.current;
  const back = refs.back.current;

  if (!front.classList.contains('rotate-front')) {
    front.classList.add('rotate-front');
    back.classList.add('rotate-back');
  } else {
    front.classList.remove('rotate-front');
    back.classList.remove('rotate-back');
  }
}

function isPrimaryAttribute(main, choosen, count) {
  if (main == choosen) {
    if (choosen == ATTRIBUTE_AGILITY) return `+ ${count}`
    return `and ${count} damage`;
  }
}

function HeroCost(props) {
  return (<div className={`${heroCardPathFront}__cost`}>
    {props.cost}
  </div>)
}

function RotateButtom(props) {
  return (
    <img src="./Images/rotate-button.svg" alt="rotate button" className={`${props.className}__rotate-button`} onClick={() => rotateCard(props.refs)} />
  )
}

function HeroImage(props) {
  return (<img src={props.imageData.path + '.' + props.imageData.extension} alt={props.name} className={`${heroCardPathFront}__image`} />)
}

function HeroName(props) {
  return (<p className={`${heroCardPathFront}__name`}>{props.name}</p>)
}

function HeroAttributes(props) {
  const attributesPath = `${heroCardPathFront}__attributes`

  return (<div className={attributesPath}>
    <div className={`${attributesPath}__main-attribute`}>
      <p>Main Attribute:</p>
      <AttributeLabel attribute={{ list: props.attributesList, index: props.mainAttribute }} alt="main attribute" />
    </div>
    <div className={`${attributesPath}__rarity-orb`} style={setBackgroundColor(getColorForChoosenRarity(props.rarity))}></div>
    <div className={`${attributesPath}__attributes-sum`}>
      <p>Attributes sum:</p>
      <label className={`${attributesPath}__values`}>{getAttributesSum(props.attributesList)}</label>
    </div>
  </div>)
}

function HeroAttackAndHealth(props) {
  return (<div className={`${heroCardPathFront}__attack-health-label`}>
    <label>ATK: {getTotalDamage(props.attributes)}</label>
    <label>HP: {getTotalHealth(props.attributes)}</label>
    <label>MP: {getTotalMana(props.attributes)}</label>
    <label>DEF: {getTotalDefence(props.attributes)}</label>
  </div>)
}

function AttributeLabel(props) {
  const list = props.attribute.list;
  const index = props.attribute.index;
  const pathToImage = getPathToChoosenAttributeImage(index);
  return (
    <div className='hero-card__attribute-values'><label>{list[index]}</label><img src={pathToImage} alt={props.alt || "attribute"} />{props.main == index ? <p className='hero-card__main-attribute'>{'(main attribute)'}</p> : null}</div>
  )
}

export default function HeroCard(props) {
  const refs = {
    card: useRef(null),
    front: useRef(null),
    back: useRef(null),
  }
  const element = props.element;
  const exeption = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
  const imageData = element.thumbnail;
  const attributes = element.attributes;

  if (attributes)
    return imageData.path != exeption ?
      (<div className='hero-card' ref={refs.card}>
        <div className={`${heroCardPathFront}`} ref={refs.front}>
          <HeroCost cost={attributes.cost} />
          <RotateButtom className={heroCardPathFront} refs={refs} />
          <HeroImage name={element.name} imageData={imageData} />
          <HeroName rarity={attributes.rarity} name={element.name} />
          <HeroAttributes mainAttribute={attributes.main} attributesList={attributes.list} rarity={attributes.rarity} />
          <HeroAttackAndHealth attributes={attributes} />
        </div>
        <div className={`${heroCardPathBack}`} ref={refs.back}>
          <div className={`${heroCardPathBack}__column1`}>
            <div className={`${heroCardPathBack}__base-params`}>
              <div>
                <p>Cost</p>
                <p className={`${heroCardPathBack}__description-window__cost`}>{attributes.cost}</p>
              </div>
              <div>
                <p>Base health</p>
                <p className={`${heroCardPathBack}__description-window__health`}>{attributes.baseHealth}</p>
              </div>
              <div>
                <p>Base mana</p>
                <p className={`${heroCardPathBack}__description-window__mana`}>{attributes.baseMana}</p>
              </div>
              <div>
                <p>Rarity</p>
                <p className={`${heroCardPathBack}__description-window__rarity`} style={setBackgroundColor(getColorForChoosenRarity(attributes.rarity))}>{getNameOfChoosenRarity(attributes.rarity)}</p>
              </div>
            </div>
            <div className={`${heroCardPathBack}__attributes`}>
              <AttributeLabel attribute={{ list: attributes.list, index: ATTRIBUTE_STRENGTH }} alt="attribute strength" main={attributes.main} />
              <p className={`${heroCardPathBack}__description-window`}>
                Gives {getTotalHealth(attributes) - attributes.baseHealth} health {isPrimaryAttribute(attributes.main, ATTRIBUTE_STRENGTH, attributes.list[ATTRIBUTE_STRENGTH])}
              </p>
              <AttributeLabel attribute={{ list: attributes.list, index: ATTRIBUTE_AGILITY }} alt="attribute agility" main={attributes.main} />
              <p className={`${heroCardPathBack}__description-window`}>
                Gives {getTotalDamage(attributes) - attributes.list[attributes.main]} {isPrimaryAttribute(attributes.main, ATTRIBUTE_AGILITY, attributes.list[ATTRIBUTE_AGILITY])} damage
              </p>
              <AttributeLabel attribute={{ list: attributes.list, index: ATTRIBUTE_INTELLIGENCE }} alt="attribute intellect" main={attributes.main} />
              <p className={`${heroCardPathBack}__description-window`}>
                Gives {getTotalMana(attributes) - attributes.baseMana} mana {isPrimaryAttribute(attributes.main, ATTRIBUTE_INTELLIGENCE, attributes.list[ATTRIBUTE_INTELLIGENCE])}
              </p>
              <AttributeLabel attribute={{ list: attributes.list, index: ATTRIBUTE_VOLITION }} alt="attribute volition" main={attributes.main} />
              <p className={`${heroCardPathBack}__description-window`}>
                Gives {getTotalDefence(attributes)} defence {isPrimaryAttribute(attributes.main, ATTRIBUTE_VOLITION, attributes.list[ATTRIBUTE_VOLITION])}
              </p>
            </div>
          </div>
          <div className={`${heroCardPathBack}__column2`}>
            <RotateButtom className={heroCardPathBack} refs={refs}/>
            <p className={`${heroCardPathBack}__abilities`}>Abilities descriotion</p>
            <button onClick={() => saveInFavorites(props, props.element.id, 'CARD')}>Save</button>
          </div>
        </div>
      </div>)
      : (<></>)
  else return (<NoCards />);
}