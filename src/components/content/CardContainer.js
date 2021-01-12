import React from 'react'
import ModalContainer from '../modal/ModalContainer'

const CardContainer = ({ pokemon, isOpen, setIsOpen }) => {
    console.log(pokemon)
    return (
        <div className='information-wrapper'>
            <div className='information-content'>
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
                        <div className='information-description' onClick={() => setIsOpen(!isOpen)}>Visualizar Modal...</div>
                        {isOpen ? 
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