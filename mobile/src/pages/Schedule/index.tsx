import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View, FlatList, } from "react-native";
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack';
import styles from "./styles";

import api from '../../services/api';

//Importando o type referente a essa tela
import { TabParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<TabParamList, 'Agenda'>
type scheduleScreenRouteType = RouteProp<TabParamList, 'Agenda'>

export default function Schedule() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<scheduleScreenRouteType>();

    const { params } = route;

    const [appointment, setAppointment] = useState([]);
    const [donor, setDonor] = useState([]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const response = await api.get(`/schedule/list/hospital/${params.id}`);
                if (mounted) {
                    setAppointment(response.data);
                }
            } catch (err) {
                Alert.alert('Algo deu errado!')
            }
        })();

        return () => { mounted = false };
    }, [appointment]);


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

    const goToScheduleDetails = (schedule: any) => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'ScheduleDetails',
                params: {
                    schedule
                }
            })
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Agendamentos</Text>
                </View>
                <TouchableOpacity onPress={createTwoButtonAlert}>
                    <MaterialIcons name={'logout'} size={25} color={'#414141'} />
                </TouchableOpacity>
            </View>
            <View style={styles.viewFlatList}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={appointment}
                    keyExtractor={(appointment: any) => String(appointment.id)}
                    renderItem={({ item: appointment }) => (
                        <View style={styles.schedule}>
                            <View>
                                <Text style={styles.hospitalProperty}>LOCAL</Text>
                                <Text style={styles.hospitalValue}>{appointment.company}</Text>
                            </View>
                            <View>
                                <Text style={styles.hospitalProperty}>ENDEREÇO</Text>
                                <Text style={styles.hospitalValue}>{appointment.street}, {appointment.number} - {appointment.district}, {appointment.city} - {appointment.uf}, {appointment.zipCode}</Text>
                            </View>
                            <View>
                                <Text style={styles.hospitalProperty}>DATA/HORÁRIO</Text>
                                <Text style={styles.hospitalValue}>{moment(appointment.date_time).format('DD/MM/YYYY')} - {appointment.hour}</Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => goToScheduleDetails(appointment)}>
                                    <Text style={styles.buttonText}>Detalhes...</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }}>
                                    <Feather name="arrow-right" color="#A1E1D8" size={20} onPress={() => goToScheduleDetails(appointment)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}