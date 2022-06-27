import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { useNavigation, RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles'

import api from '../../services/api';

//Importando o type referente a essa tela
import { StackParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'EditCollaborator'>
type editCollaboratorScreenRouteType = RouteProp<StackParamList, 'EditCollaborator'>

export default function EditCollaborator() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<editCollaboratorScreenRouteType>();

    const { params } = route;

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        async function LoadData(collaborator: any) {
            if (collaborator) {
                setId(collaborator.id)
                setName(collaborator.name);
                setRole(collaborator.role)
            } else {
                const response = await api.get(`/collaborator/list/${params.id}`)

                setId(response.data.id)
                setName(response.data.name);
                setRole(response.data.role);
            }
        }
        LoadData(params.collaborator);
    }, [params.id]);

    async function handleUpdate() {
        try {
            const validation = await api.post('/collaborator/validate', {
                name: name,
                role: role,
            });

            await api.put(`/collaborator/update/${id}`, {
                name: name,
                role: role,
            });

            Alert.alert(validation.data.message)

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
                <Text style={styles.screenTitle}>Editar Informações</Text>
                <TouchableOpacity onPress={handleUpdate}>
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
                    <Text style={styles.titles}>CARGO*</Text>
                    <TextInput
                        style={styles.textInput}
                        editable={false} 
                        selectTextOnFocus={false}
                        keyboardType='default'
                        multiline={false}
                        clearButtonMode='always'
                        maxLength={25}
                        placeholder='Adicione o cargo'
                        placeholderTextColor="#C3C3C5"
                        value={role}
                        onChangeText={role => setRole(role)}
                        onPressIn={() => setErrorMessage(null)}
                    />
                </View>
            </View>
        </View>
    );
}