import React, { useEffect, useState } from 'react'
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemon = (id: string) => {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);


    const LoadPokemon = async () => {
        const res = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(res.data);
        setIsLoading(false);
    }
    useEffect(() => {
        LoadPokemon();
    }, [])

    return {
        isLoading,
        pokemon
    }
      
}
