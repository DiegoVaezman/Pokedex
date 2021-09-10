import React, { useEffect, useState } from 'react'
import { FlatList, Platform, Text, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import {styles } from '../theme/AppTheme'
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidht = Dimensions.get('window').width

export const SearchScreen = () => {

    const {top} = useSafeAreaInsets();

    const {isFetching, simplePokemonList} = usePokemonSearch();

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

    const [term, setTerm] = useState('');

    useEffect(() => {
        if (term.length === 0) {
            return setPokemonFiltered([]);
        }
        if ( isNaN( Number(term) ) ) {
            setPokemonFiltered(
            simplePokemonList.filter(poke => poke.name.toLowerCase().includes(term.toLowerCase()))
            )
        } else {
            const pokemonById = simplePokemonList.find(pokemon => pokemon.id === term)
            setPokemonFiltered(
                (pokemonById) ? [pokemonById] : []
            )
        }
    }, [term])

    if (isFetching) {
        return (
            <Loading />
        )
    }

    

    return (
        <View style={{
            flex:1, 
            marginHorizontal: 20
        }}>
            
            <SearchInput 
                onDebounce={(value) => {setTerm(value)}} 
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidht - 40,
                    top: (Platform.OS === 'ios') ? top : top + 20
                }}
            />

            <FlatList
                data={pokemonFiltered}
                keyExtractor={(pokemon) => pokemon.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        paddingBottom: 10,
                        marginTop: (Platform.OS === 'ios') ? top + 60 : top + 70
                    }}>{term}</Text>)}
                renderItem={({item}) => (
                    <PokemonCard pokemon={item}/>
                )}
                initialNumToRender={20}
            />
        </View>
    )
}


