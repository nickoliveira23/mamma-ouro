import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles'

import api from '../../services/api';

//Importando o type referente a essa tela
import { StackParamList } from '../../types'

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'Email'>
type emailScreenRouteType = RouteProp<StackParamList, 'Email'>

export default function Email() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<emailScreenRouteType>();

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    async function handleEmail() {
        try {
            const response = await api.post('/user/email', {
                email: email
            });

            const user = response.data.email;

            navigation.navigate('Password', { user });
        } catch (err: any) {
            setErrorMessage(err.response.data.validation.body.message);
            Alert.alert(err.response.data.validation.body.message);
            Keyboard.dismiss();
        }
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 150}
            >
                <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                    <AntDesign style={styles.leftIcon} name='left' size={30} color='#414141' />
                </TouchableOpacity>
                <View style={styles.content}>
                    <View style={styles.viewTitle}>
                        <Text style={styles.title}>E-mail</Text>
                    </View>
                    <View style={styles.emailInputView}>
                        <TextInput
                            onPressIn={() => { setErrorMessage(null) }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                            onChangeText={email => setEmail(email)}
                            placeholder='Informe seu endereço de e-mail'
                            placeholderTextColor='#C3C3C5'
                            style={styles.emailInput}
                        >
                        </TextInput>
                    </View>
                    {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage} </Text>}
                    <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.button} onPress={handleEmail}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View >
    );
}