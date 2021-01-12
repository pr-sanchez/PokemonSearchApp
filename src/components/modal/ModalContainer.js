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
                <div>
                    <img className='information-modal-content__image-source' src={pokemon.sprites.front_default}></img>
                    <div>
                        <div></div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalContainer