import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';

import api from '../../services/api';

//Importando o type referente a essa tela
import { StackParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'ScheduleDetails'>
type ScheduleDetailsScreenRouteType = RouteProp<StackParamList, 'ScheduleDetails'>

export default function ScheduleDetails() {
    const navigation = useNavigation<screenNavigationType>()
    const route = useRoute<ScheduleDetailsScreenRouteType>();

    const { params } = route;

    const [id, setId] = useState('');
    const [company, setCompany] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [date_time, setDate_Time] = useState('');
    const [hour, setHour] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        async function LoadData(schedule: any) {
            setId(schedule.id);
            setCompany(schedule.company);
            setStreet(schedule.street);
            setNumber(schedule.number);
            setCity(schedule.city);
            setDistrict(schedule.district);
            setUf(schedule.uf);
            setZipCode(schedule.zipCode);
            setDate_Time(schedule.date_time);
            setHour(schedule.hour);
            setStatus(schedule.status);
        }
        LoadData(params.schedule);
    }, []);

    function createTwoButtonAlert() {
        Alert.alert(
            "Atenção!",
            "Deseja deletar o seguinte agendamento?",
            [
                {
                    text: "Cancelar",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: handleDeleteSchedule
                }
            ],
        );
    }

    async function handleDeleteSchedule() {
        try {
            const response = await api.delete(`/schedule/delete/${id}`)

            Alert.alert(response.data.message)
            navigation.goBack()
        } catch (err: any) {
            Alert.alert(err.response.data.error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={styles.leftIcon} name='left' size={25} color='#414141' />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Detalhes</Text>
                <View style={styles.spaceView}></View>
            </View>
            <View style={styles.content}>
                <View style={styles.hospital}>
                    <View>
                        <View>
                            <Text style={[styles.profileProperty]}>LOCAL</Text>
                            <Text style={styles.profileValue}>{company}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.profileProperty}>ENDEREÇO</Text>
                            <Text style={styles.profileValue}>{street}, {number} - {district}, {city} - {uf}, {zipCode}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.profileProperty]}>DATA</Text>
                        <Text style={styles.profileValue}>{moment(date_time).format('DD/MM/YYYY')} - {hour}</Text>
                    </View>
                    <View>
                        <Text style={[styles.profileProperty]}>STATUS</Text>
                        <Text style={styles.profileValue}>{status}</Text>
                    </View>
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.button} onPress={createTwoButtonAlert}>
                        <View style={styles.iconButton}>
                            <MaterialIcons name="cancel" size={20} color="tomato" />
                        </View>
                        <View>
                            <Text style={styles.textButton}>Cancelar agendamento</Text>
                        </View>
                        <View style={styles.ArrowRightIcon}>
                            <Feather name="arrow-right" size={20} color="tomato" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}