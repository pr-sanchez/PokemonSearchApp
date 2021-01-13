import React from 'react'
import ModalContainer from '../modal/ModalContainer'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardContainer = ({ pokemon, isOpen, setIsOpen }) => {
    return (
        <div className='information-wrapper'>
            <div className='information-content'>
                <FontAwesomeIcon 
                    className='information-content__info-modal' 
                    icon={faInfoCircle} 
                    onClick={() => setIsOpen(pokemon.id)} 
                />
                <div className='information-content__image'>
                    <img className='information-content__image-source' src={pokemon.sprites.front_default}></img>
                </div>
                <div className='information-content__information'>
                    <div className='information-title'>{pokemon.name}</div>
                    <div className='information-description-wrapper'>
                        <div>
                            <div>Tipo:</div>
                            <div><b>{pokemon.types[0].type.name}</b></div>
                        </div>
                        <div>
                            <div>Habilidad Principal:</div>
                            <div><b>{pokemon.abilities[0].ability.name}</b></div>
                        </div>
                        {pokemon.abilities[1] && pokemon.abilities[1].ability ? 
                            <div>
                                <div>Habilidad Secundaria:</div>
                                <div><b>{pokemon.abilities[1].ability.name}</b></div>
                            </div>
                            :
                            ''                        
                        }
                        <div>
                            <div>Peso:</div>
                            <div><b>{pokemon.weight} libras</b></div>
                        </div>
                        {isOpen === pokemon.id ? 
                            <ModalContainer pokemon={pokemon} setIsOpen={setIsOpen} />
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardContainer;