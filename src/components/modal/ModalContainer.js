import React from 'react'
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContainer = ({ pokemon, setIsOpen }) => {
    return (
        <div className='information-modal-wrapper'>
            <div className='information-modal-content'>
                <FontAwesomeIcon 
                    className='information-modal-content__icon' 
                    icon={faTimes} 
                    onClick={() => setIsOpen(false)} 
                />
                <div className='information-modal'>
                    <div className='information-modal__image-wrapper'>
                        <img className='information-modal__image-source' src={pokemon.sprites.front_default}></img>
                    </div>
                    <div className='information-modal__description-wrapper'>
                        <div className='information-modal__title'>{pokemon.name}</div>
                        <div className='information-modal__description'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalContainer