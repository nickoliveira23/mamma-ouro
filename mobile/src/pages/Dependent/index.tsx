import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { useNavigation, RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles'

import api from '../../services/api';

//Importando o type referente a essa tela
import { StackParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'Dependent'>
type dependentScreenRouteType = RouteProp<StackParamList, 'Dependent'>

export default function Dependent() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<dependentScreenRouteType>();

    const { params } = route;

    const [name, setName] = useState('');
    const [birth, setBirth] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState(null);
    const [isPickerShow, setIsPickerShow] = useState(false);

    async function handleRegister() {
        try {
            await api.post('/dependent/validate', {
                name: name,
                birth: birth
            });

            const reponse = await api.post('/dependent/register', {
                name: name,
                birth: birth,
                id_donor: params.id_donor
            });

            Alert.alert('Cadastro realizado com sucesso')

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: "Home",
                            state: {
                                routes: [
                                    {
                                        name: "Perfil",
                                        params: { id: params.id }
                                    }
                                ]
                            }
                        }
                    ]
                })
            );
        } catch (err: any) {
            setErrorMessage(err.response.data.error);
            Alert.alert(err.response.data.error);
            Keyboard.dismiss()
        }
    }

    const showDatePicker = () => {
        setIsPickerShow(true);
    };

    const hideDatePicker = () => {
        setIsPickerShow(false);
    };

    const handleConfirm = (date: any) => {
        setBirth(date);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign
                    style={styles.leftIcon}
                    name='left'
                    size={25}
                    color='#414141'
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.screenTitle}>Dependente</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.saveButton}>Salvar</Text>
                </TouchableOpacity>
            </View>
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
                        onPressIn={() => setErrorMessage(null)}
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.titles}>DATA DE NASCIMENTO*</Text>
                    <View style={styles.textInput}>
                        <Text style={{ marginTop: 10, fontWeight: '200' }} onPress={showDatePicker}>
                            {moment(birth).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                    {isPickerShow && (
                        <DateTimePickerModal
                            isVisible={isPickerShow}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}