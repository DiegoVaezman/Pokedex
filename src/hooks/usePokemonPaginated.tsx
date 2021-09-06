import React, { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
    

    const loadPokemons = async() => {
        setIsLoading(true);
        const res = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = res.data.next;
        mapPokemonListToSimplePokemon(res.data.results);
    }

    const mapPokemonListToSimplePokemon = (pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2] //el id de cada pokemon viene en la penultima posicion de la url
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            
            return {id, picture, name };
        });

        setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        simplePokemonList,
        isLoading,
        loadPokemons
    }
}
