import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../theme/AppTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { FlatList } from 'react-native-gesture-handler';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

    const {top} = useSafeAreaInsets();
    const {simplePokemonList, loadPokemons} = usePokemonPaginated();

    return (
        <>
            <Image 
                source={ require('../assets/pokebola.png') }
                style={styles.pokebolaBG}
            />
            <View style={{alignItems: 'center'}} >
                <FlatList
                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }}>Pokedex </Text>)}
                    renderItem={({item}) => (
                        <PokemonCard pokemon={item}/>
                    )}
                    // infinit scroll
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4} //cuanto espacio antes de llegar al final se ejecuta onEndReached
                
                    ListFooterComponent={
                        <ActivityIndicator
                            style={{height:100}}
                            size={20}
                            color="grey"
                        />
                    }
                />
            </View>
            
            
        </>
    )
}
