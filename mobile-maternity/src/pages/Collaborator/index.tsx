import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles'

import api from '../../services/api';

//Importando o type referente a essa tela
import { StackParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'Collaborator'>
type CollaboratorScreenRouteType = RouteProp<StackParamList, 'Collaborator'>

export default function Collaborator() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<CollaboratorScreenRouteType>();

    const { params } = route;

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    async function handleRegister() {
        try {
            await api.post('/collaborator/validate', {
                name: name,
                role: 'Administrator',
            });

            const response = await api.post('/collaborator/register', {
                name: name,
                role: 'Administrator',
                id_user: params.id
            });

            Alert.alert('Cadastro realizado com sucesso')

            navigation.reset({
                index: 0,
                routes: [{ name: 'Index' }],
            });
        } catch (err: any) {
            setErrorMessage(err.response.data.error);
            Alert.alert(err.response.data.error);
            Keyboard.dismiss()
            goToTheTop(_scrollView)
        }
    }

    const goToTheTop = (_scrollViewTop: any) => {
        _scrollViewTop.current.scrollTo({ y: 0, animated: true })
    };

    const _scrollView = useRef<ScrollView>(null);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign
                    style={styles.leftIcon}
                    name='left'
                    size={25}
                    color='#414141'
                    onPress={() => { }}
                />
                <Text style={styles.screenTitle}>Editar Informações</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.saveButton}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} ref={_scrollView}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "position"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
                >
                    <View style={styles.content}>
                        {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage} </Text>}

                        <View style={styles.viewInput}>
                            <Text style={styles.titles}>NOME*</Text>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='default'
                                multiline={false}
                                clearButtonMode='always'
                                maxLength={25}
                                placeholder='Adicione o nome'
                                placeholderTextColor="#C3C3C5"
                                value={name}
                                onChangeText={name => setName(name)}
                                onPressIn={() => { setErrorMessage(null) }}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView >
        </View >
    );
}