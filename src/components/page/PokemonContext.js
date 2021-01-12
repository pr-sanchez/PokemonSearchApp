import React, {useState, useEffect} from 'react'
import CardContainer from '../content/CardContainer'
import PokemonHeader from '../header/PokemonHeader'
import PokemonContent from '../content/PokemonContent'
import { getAllPokemon, getPokemon } from '../content/PokemonFunc'

import '../../styles/pokeStyles.scss'

const PokemonContext = () => {
// Este setState sirve para almacenar la información de la API consumida. //
    const [pokemonData, setPokemonData] = useState([])
// Este setState sirve para filtrar en la lista. //
    const [value, setValue] = useState('')
// Este setState sirve para cambiar el orden de la lista. //
    const [change, setChange] = useState('')
// Este setState sirve para la siguiente paginación. //
    const [nextUrl, setNextUrl] = useState('')
// Este setState sirve para la anterior paginación. //
    const [prevUrl, setPrevUrl] = useState('')
// Este setState sirve para abrir y cerrar el modal con la info del pókemon. //
    const [isOpen, setIsOpen] = useState(false)
// Este setState sirve para avisar que se esta cargando la información. //
    const [loading, setLoading] = useState([])
    const AllPokemons = 'https://pokeapi.co/api/v2/pokemon/'

// Con esta función podemos filtrar en el array de pókemons. //
    const searchingValue = (value) => {
        return function(x){
            return x.name.toLowerCase().includes(value) || !value
        } 
    }

// Con este useEffect podemos conectar con la PokeAPI. //
    useEffect(() => {
        const apiFetchData = async() => {
            let response = await getAllPokemon(AllPokemons)
            setNextUrl(response.next)
            setPrevUrl(response.previous)
            await loadingPokemon(response.results)
            setLoading(false)    
        }
        apiFetchData()
    }, [])

// Con esta función podemos obtener los siguientes pókemons. //
    const next = async() => {
        setLoading(true)
        let data = await getAllPokemon(nextUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false) 
    }

// Con esta función podemos obtener los pókemons anteriores. //
    const prev = async() => {
        if (!prevUrl) return
        setLoading(true)
        let data = await getAllPokemon(prevUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false) 
    }
    
// Con esta función podemos traer la información completa de cada pókemon. //
    const loadingPokemon = async(data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon.url)
            return pokemonRecord
        }))
        setPokemonData(_pokemonData)
    }
    
// Con esta función podemos Reflejar cada pókemon en un CardComponent. //
    let pokemonsMappeds = pokemonData.filter(searchingValue(value)).map((el, i) => {
        return  <CardContainer 
                    change={change} 
                    pokemon={el}
                    key={i}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
    })

    return (
        <div>
            <PokemonHeader />
            <PokemonContent 
                setValue={setValue}
                setChange={setChange}
                change={change}
                value={value}
                pokemonsMappeds={pokemonsMappeds}
                loading={loading}
                next={next}
                prev={prev}
            />
        </div>
    )
}

export default PokemonContext
