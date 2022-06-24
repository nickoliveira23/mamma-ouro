import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';

import api from '../../services/api';

//Importando o type referente a essa tela
import { StackParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'Password'>
type passwordScreenRouteType = RouteProp<StackParamList, 'Password'>

export default function Password() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<passwordScreenRouteType>();

    const { params } = route;

    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    async function handlePassword() {
        try {
            const response = await api.post('/user/password', {
                password: password,
            });

            const register = await api.post('/user/register', {
                email: params.user,
                password: password,
                type: 'donor'
            });

            const { id } = register.data

            navigation.reset({
                index: 0,
                routes: [{ name: 'Register', params: { id: id } }],
            });
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
                keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 250}
            >
                <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                    <AntDesign style={styles.leftIcon} name='left' size={30} color='#414141' />
                </TouchableOpacity>
                <View style={styles.content}>
                    <View style={styles.viewTitle}>
                        <Text style={styles.title}>Senha</Text>
                    </View>
                    <View style={styles.passwordInputView}>
                        <TextInput
                            onPressIn={() => { setErrorMessage(null) }}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            autoCorrect={false}
                            value={password}
                            onChangeText={password => setPassword(password)}
                            placeholder='Defina uma senha'
                            placeholderTextColor='#C3C3C5'
                            style={styles.passwordInput}
                        >
                        </TextInput>
                    </View>
                    {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage} </Text>}
                    <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.button} onPress={handlePassword}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.rememberText}>Lembre-se, não informe sua senha para ninguém!</Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}




