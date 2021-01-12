import React from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PokemonContent = ({ setChange, setValue, change, value, pokemonsMappeds, loading, next, prev }) => {
    return (
        <div className='content-wrapper'>
            <div className='content-container'>
                <div className='content-title'>Encuentra a tu Pokemon!</div>
                <div className='content-btn'>
                    <div className='content-btn__btn' onClick={prev}>Prev</div>
                    <div className='content-btn__btn' onClick={next}>Next</div>
                </div>
                {loading ? <h1>Loading...</h1> 
                    :
                    <div className={change === 'lista' ? 'content-search widthList' : 'content-search'}>
                        <div className='content-search__wrapper-select'>
                            Ver como:
                            <select
                                className='content-search__select'
                                value={change}
                                onChange={e => setChange(e.target.value)}
                            >
                                <option className='content-search__select-option' value="grilla">Grilla</option>
                                <option className='content-search__select-option' value="lista">Lista</option>
                            </select>
                        </div>
                        <div className='content-search__wrapper-input'>
                            <FontAwesomeIcon className='content-search__img' icon={faSearch} />
                            <input
                                className='content-search__input'
                                type='text'
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                        </div>
                    </div>
                }
                <div className={change === 'lista' ? 'content-information listaStyle' : 'content-information'}>
                    {pokemonsMappeds ? 
                            pokemonsMappeds
                        :
                        <h1>No existen datos que mostrar</h1>
                    }
                </div>
                <div className='content-btn'>
                    <div className='content-btn__btn' onClick={prev}>Prev</div>
                    <div className='content-btn__btn' onClick={next}>Next</div>
                </div>
            </div>
        </div>
    )
}

export default PokemonContent
