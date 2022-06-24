import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';

import api from '../../services/api';

import AppointmentModal from '../../components/AppointmentModal'

//Importando o type referente a essa tela
import { StackParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'HospitalDetails'>
type hospitalDetailsScreenRouteType = RouteProp<StackParamList, 'HospitalDetails'>

export default function HospitalDetails() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<hospitalDetailsScreenRouteType>();

    const { params } = route;

    const [id, setId] = useState('');
    const [company, setCompany] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');

    const [hospitalInfo, setHospitalInfo] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const [idDonor, setIdDonor] = useState('')

    useEffect(() => {
        let mounted = true;

        const loadData = async (mounted: any, hospital: any) => {
            const response = await api.get(`/hospital/availability/${hospital.id}`);
            if (mounted) {
                setId(hospital.id);
                setCompany(hospital.company);
                setCnpj(hospital.cnpj);
                setStreet(hospital.street);
                setNumber(hospital.number);
                setCity(hospital.city);
                setDistrict(hospital.district);
                setUf(hospital.uf);
                setZipCode(hospital.zipCode);
                setPhone(hospital.phone);

                setHospitalInfo({
                    id: hospital.id,
                    company: hospital.company,
                    available: response.data.available
                })

                const res = await api.get(`/donor/list/${params.id_user}`)
                setIdDonor(res.data.id)
            }
        }

        loadData(mounted, params.hospital)

        return () => { mounted = false };
    }, []);


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
                            <View>
                                <Text style={[styles.profileProperty]}>NOME</Text>
                                <Text style={styles.profileValue}>{company}</Text>
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

                </View>

                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                        <View style={styles.iconButton}>
                            <Fontisto name="date" size={20} color="#76BFAC" />
                        </View>
                        <View>
                            <Text style={styles.textButton}>Agendar avaliação de leite</Text>
                        </View>
                        <View style={styles.ArrowRightIcon}>
                            <Feather name="arrow-right" size={20} color="#76BFAC" />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <View style={[styles.viewButton, { borderBottomWidth: 1 }]}>
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.iconButton}>
                            <Ionicons name="location-outline" size={20} color="#76BFAC" />
                        </View>
                        <View>
                            <Text style={styles.textButton}>Ver localização no mapa</Text>
                        </View>
                        <View style={styles.ArrowRightIcon}>
                            <Feather name="arrow-right" size={20} color="#76BFAC" />
                        </View>
                    </TouchableOpacity>
                </View> */}
                <AppointmentModal
                    show={modalVisible}
                    setShow={setModalVisible}
                    hospital={hospitalInfo}
                    id_donor={idDonor}
                    id_user={params.id_user}
                />
            </View>
        </View >
    )
}