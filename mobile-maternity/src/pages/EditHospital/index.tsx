import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useNavigation, RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles'

import api from '../../services/api';

//Importando o type referente a essa tela
import { StackParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<StackParamList, 'EditHospital'>
type editHospitalScreenRouteType = RouteProp<StackParamList, 'EditHospital'>

export default function EditHospital() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<editHospitalScreenRouteType>();

    const { params } = route;

    const [name, setName] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        async function LoadData() {

            const response = await api.get(`/hospital/list/${params.id}`);

            const hospital = response.data;

            setName(hospital.company);
            setCNPJ(hospital.cnpj);
            setStreet(hospital.street);
            setNumber(JSON.stringify(hospital.number));
            setCity(hospital.city);
            setDistrict(hospital.district);
            setUf(hospital.uf);
            setZipCode(hospital.zipCode);
            setPhone(hospital.phone);
        }
        LoadData();
    }, [params.id]);

    async function handleUpdate() {
        try {
            const validation = await api.post('/hospital/validate', {
                name: name,
                cnpj: cnpj,
                street: street,
                number: number,
                city: city,
                district: district,
                uf: uf,
                zipCode: zipCode,
                phone: phone,
            });

            await api.put(`/hospital/update/${params.id}`, {
                name: name,
                cnpj: cnpj,
                street: street,
                number: number,
                city: city,
                district: district,
                uf: uf,
                zipCode: zipCode,
                phone: phone,
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
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.screenTitle}>Editar Informações</Text>
                <TouchableOpacity onPress={handleUpdate}>
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
                                maxLength={50}
                                placeholder='Adicione o nome'
                                placeholderTextColor="#C3C3C5"
                                value={name}
                                onChangeText={name => setName(name)}
                                onPressIn={() => { setErrorMessage(null) }}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <Text style={styles.titles}>CNPJ*</Text>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='default'
                                multiline={false}
                                clearButtonMode='always'
                                maxLength={25}
                                placeholder='Adicione o CNPJ'
                                placeholderTextColor="#C3C3C5"
                                value={cnpj}
                                onChangeText={cnpj => setCNPJ(cnpj)}
                                onPressIn={() => { setErrorMessage(null) }}
                            />
                        </View>
                        <View style={styles.location}>
                            <View style={styles.viewColOne}>
                                <Text style={styles.titles}>RUA</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholderTextColor='#C3C3C5'
                                    placeholder='Adicionar rua'
                                    clearButtonMode='always'
                                    multiline={false}
                                    maxLength={100}
                                    value={street}
                                    onChangeText={street => setStreet(street)}
                                    onPressIn={() => { setErrorMessage(null) }}
                                />
                            </View>
                            <View style={styles.viewColTwo}>
                                <Text style={styles.titles}>NÚMERO</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholderTextColor='#C3C3C5'
                                    placeholder='227'
                                    keyboardType='numeric'
                                    clearButtonMode='always'
                                    maxLength={4}
                                    value={number}
                                    onChangeText={number => setNumber(number)}
                                    onPressIn={() => { setErrorMessage(null) }}
                                />
                            </View>
                        </View>
                        <View style={styles.viewInput}>
                            <Text style={styles.titles}>BAIRRO*</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor='#C3C3C5'
                                placeholder='Adicione o bairro'
                                keyboardType='default'
                                multiline={false}
                                clearButtonMode='always'
                                maxLength={25}
                                value={district}
                                onChangeText={district => setDistrict(district)}
                                onPressIn={() => { setErrorMessage(null) }}
                            />
                        </View>
                        <View style={styles.location}>
                            <View style={styles.viewColOne}>
                                <Text style={styles.titles}>CIDADE</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholderTextColor='#C3C3C5'
                                    placeholder='Adicionar Cidade'
                                    clearButtonMode='always'
                                    multiline={false}
                                    maxLength={100}
                                    value={city}
                                    onChangeText={city => setCity(city)}
                                    onPressIn={() => { setErrorMessage(null) }}
                                />
                            </View>
                            <View style={styles.viewColTwo}>
                                <Text style={styles.titles}>UF</Text>
                                <TextInput
                                    autoCapitalize='characters'
                                    style={styles.textInput}
                                    placeholderTextColor='#C3C3C5'
                                    placeholder='UF'
                                    clearButtonMode='always'
                                    multiline={false}
                                    maxLength={2}
                                    value={uf}
                                    onChangeText={uf => setUf(uf)}
                                    onPressIn={() => { setErrorMessage(null) }}
                                />
                            </View>
                        </View>
                        <View style={styles.viewInput}>
                            <Text style={styles.titles}>CEP*</Text>
                            <MaskInput
                                style={styles.textInput}
                                placeholderTextColor='#C3C3C5'
                                placeholder='Adicione seu CEP'
                                keyboardType='numeric'
                                clearButtonMode='always'
                                value={zipCode}
                                onChangeText={(masked, unmasked) => {
                                    setZipCode(unmasked); // you can use the unmasked value as well 
                                }}
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                onPressIn={() => { setErrorMessage(null) }}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <Text style={styles.titles}>CELULAR*</Text>
                            <MaskInput
                                style={styles.textInput}
                                placeholderTextColor='#C3C3C5'
                                placeholder='Adicione seu número de celular'
                                keyboardType='numeric'
                                clearButtonMode='always'
                                value={phone}
                                onChangeText={(masked, unmasked) => {
                                    setPhone(unmasked); // you can use the unmasked value as well 
                                }}
                                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                onPressIn={() => { setErrorMessage(null) }}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}