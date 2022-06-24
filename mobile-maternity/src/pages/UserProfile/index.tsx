import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { RouteProp, useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';

import api from '../../services/api';

//Importando o type referente a essa tela
import { TabParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<TabParamList, 'Perfil'>
type profileScreenRouteType = RouteProp<TabParamList, 'Perfil'>

export default function UserProfile() {
    const navigation = useNavigation<screenNavigationType>()
    const route = useRoute<profileScreenRouteType>();

    const { params } = route;

    const controller = new AbortController
    const signal = controller.signal;

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const [hospitalId, setHospitalId] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false)

    function createTwoButtonAlert() {
        Alert.alert(
            "Logout",
            "Deseja sair de sua conta?",
            [
                {
                    text: "Cancelar",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: handleLogout
                }
            ],
        );
    }

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Index' }
                ]
            })
        );
    }

    async function loadCollaborator(signal: AbortSignal) {
        try {
            const response = await api.get(`/collaborator/list/${params.id}`, {
                signal,
            });

            setId(response.data.id);
            setName(response.data.name);
            setRole(response.data.role);
            
        } catch (err: any) {
            console.log(err.response.data)
            Alert.alert(err.response.data)
        }
    }

    useEffect(() => {
        loadCollaborator(signal);
        return () => controller.abort();
    }, [params.id])

    async function loadHospital(signal: AbortSignal) {
        try {
            const response = await api.get(`/hospital/list/${id}`, {
                signal,
            });

            setHospitalId(response.data.id);
            setHospitalName(response.data.name);
            setCNPJ(response.data.cnpj);
            setStreet(response.data.street);
            setNumber(JSON.stringify(response.data.number));
            setCity(response.data.city);
            setDistrict(response.data.district);
            setUf(response.data.uf);
            setZipCode(response.data.zipCode);
            setPhone(response.data.phone);
        } catch (err: any) {
            console.log(err.response.data)
            Alert.alert(err.response.data)
        }
    }

    useEffect(() => {
        loadHospital(signal);
        return () => controller.abort();
    }, [id])

    async function loadCollaborators(signal: AbortSignal) {
        try {
            if (flag === true) {
                const response = await api.get(`/collaborator/list/hospital/${hospitalId}`, {
                    signal
                });

                setCollaborators(response.data);
                setIsRefreshing(false)
            }
        } catch (err: any) {
            console.log(err.response.data)
            Alert.alert(err.response.data)
        }
    };

    useEffect(() => {
        loadCollaborators(signal);
        return () => controller.abort();
    }, [hospitalId]);

    let flag = false;

    let text = 'Carregando...';

    if (id) {
        flag = true;
    }


    const onRefresh = () => {
        //set isRefreshing to true
        setIsRefreshing(true);
        loadCollaborators(signal);
        // and set isRefreshing to false at the end of your callApiMethod()
    }

    const goToDonorEdit = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'EditDonor',
                params: {
                    id: params.id,
                }
            })
        )
    }

    const goToDependent = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Dependent',
                params: {
                    id: params.id,
                    id_donor: id
                }
            })
        );
    }

    const goToEditDependent = (dependent: any) => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'EditDependent',
                params: {
                    id: params.id,
                    id_donor: id,
                    dependent
                }
            })
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewFlatList}>
                {!flag && <Text style={styles.textWaiting}>{text}</Text>}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    data={collaborators}
                    keyExtractor={(collaborator: any) => String(collaborator.id)}
                    ListHeaderComponent={
                        <View>
                            <View style={styles.header}>
                                <View style={styles.viewtitle}>
                                    <Text style={styles.textTitle}>Maternidade</Text>
                                </View>
                                <TouchableOpacity onPress={createTwoButtonAlert}>
                                    <MaterialIcons name={'logout'} size={25} color={'#414141'} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.profile}>
                                <TouchableOpacity style={styles.icon} onPress={goToDonorEdit}>
                                    <FontAwesome name={'pencil-square-o'} size={25} color={'#A1E1D8'}></FontAwesome>
                                </TouchableOpacity>
                                <View>
                                    <View>
                                        <Text style={[styles.profileProperty]}>NOME</Text>
                                        <Text style={styles.profileValue}>{hospitalName}</Text>
                                    </View>

                                    <View>
                                        <Text style={[styles.profileProperty]}>CNPJ</Text>
                                        <Text style={styles.profileValue}>{cnpj}</Text>
                                    </View>
                                </View>

                                <View>
                                    <View>
                                        <Text style={styles.profileProperty}>ENDEREÇO</Text>
                                        <Text style={styles.profileValue}>{street}, {number} - {district}, {city} - {uf}, {zipCode}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={[styles.profileProperty]}>CONTATO</Text>
                                    <Text style={styles.profileValue}>{phone}</Text>
                                </View>
                            </View>

                            <View style={[styles.header, { marginTop: 30 }]}>
                                <View style={styles.viewtitle}>
                                    <Text style={styles.textTitle}>Colaboradores</Text>
                                </View>
                                <TouchableOpacity onPress={goToDependent}>
                                    <Text style={styles.newButton}>Novo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    renderItem={({ item: collaborator }: any) => (
                        <View>
                            {!flag && <Text style={styles.textWaiting}>{text}</Text>}
                            <View style={[styles.profile, { marginBottom: 20 }]}>
                                <TouchableOpacity style={styles.icon} onPress={() => goToEditDependent(collaborator)}>
                                    <FontAwesome name={'pencil-square-o'} size={25} color={'#A1E1D8'}></FontAwesome>
                                </TouchableOpacity>
                                <View>
                                    <View>
                                        <Text style={[styles.profileProperty]}>NOME</Text>
                                        <Text style={styles.profileValue}>{collaborator.name}</Text>
                                    </View>

                                    <View>
                                        <Text style={[styles.profileProperty]}>CARGO</Text>
                                        <Text style={styles.profileValue}>{collaborator.role}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}