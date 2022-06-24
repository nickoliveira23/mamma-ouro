import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../Index/styles';

//Importando o type referente a essa tela
import { StackParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'Index'>
type indexScreenRouteType = RouteProp<StackParamList, 'Index'>

export default function Index() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<indexScreenRouteType>();
    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                <Image source={require('../../assets/Logo.png')} style={styles.logo} />
                <Text style={styles.termsText}>
                    Ao tocar em Criar conta ou Entrar, você concorda com
                    nossos termos. Saiba como tratamos os seus dados em
                    nossa Política de Privacidade e Política de Cookies.
                </Text>
            </View>
            <View style={styles.buttonsView}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Email')}>
                    <Text style={styles.buttonText}>CRIAR CONTA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText2}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}