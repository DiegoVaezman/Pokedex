import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { getImageColors } from '../helpers/getColors';
import { useNavigation } from '@react-navigation/core';
import { FirstUpercase } from '../helpers/firstUpercase';

const windowWidth = Dimensions.get('window').width

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {

    const navigation = useNavigation<any>();  //type any para evitar el error de typscript al usar navigation que pide tipo never

    const [bgColor , setBgColor] = useState('grey');
    const isMounted = useRef(true); //para evitar aplicar la funcion de color y demás si el componente (tarjeta) está desmontado porque se ha hecho scroll y ha sido destruido.... si no da errores...


    const getColors = async () => {
        const color = await getImageColors(pokemon.picture);
        if (isMounted.current) setBgColor(color || 'grey');  //la condicion es para evitar cambiar un state después de haber sido desmontado, eso da un warning de memory leak
    }

    useEffect(() => {
        
        getColors();
        
        return () => {  //el return en un useEffect se ejecuta cuando es desmontado el componente. (por ejemplo destruido con un srollview de carga perezosa.)
            isMounted.current = false;
        }
    }, [])

    return (
        <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColor})}
            >
                <View
                    style={{
                        ...styles.cardContainer,
                        width: windowWidth * 0.4,
                        backgroundColor: bgColor
                    }}
                >
                    {/* nombre del pokemon e id */}
                    <View>
                        <Text style={styles.name}>
                            {FirstUpercase(pokemon.name)}
                            {'\n#' + pokemon.id}
                        </Text>
                    </View>

                    <View style={styles.pokeballContainer}>
                        <Image
                            source={require('../assets/pokebola-blanca.png')}
                            style={styles.pokeball}
                        />
                    </View>

                    <FadeInImage 
                        uri={pokemon.picture}
                        style={styles.pokemonImage}
                    />

                </View>
            
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        opacity: 0.5,
        bottom: 0,
        right: 0,
        overflow: 'hidden'
    },
    pokeball: {
        width: 100,
        height: 100,
        position:'absolute',
        right: -25,
        bottom: -25
        
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    }
});