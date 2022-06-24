import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useNavigation, RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import MaskInput from 'react-native-mask-input';
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
type screenNavigationType = StackNavigationProp<StackParamList, 'EditDonor'>
type editDonorScreenRouteType = RouteProp<StackParamList, 'EditDonor'>

export default function EditDonor() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<editDonorScreenRouteType>();

    const { params } = route;

    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isPickerShow, setIsPickerShow] = useState(false);

    useEffect(() => {
        async function LoadData() {

            const response = await api.get(`/donor/list/${params.id}`);

            const donor = response.data;

            setName(donor.name);
            setBirth(donor.birth);
            setStreet(donor.street);
            setNumber(JSON.stringify(donor.number));
            setCity(donor.city);
            setDistrict(donor.district);
            setUf(donor.uf);
            setZipCode(donor.zipCode);
            setPhone(donor.phone);
        }
        LoadData();
    }, [params.id]);

    async function handleUpdate() {
        try {
            const validation = await api.post('/donor/validate', {
                name: name,
                birth: birth,
                street: street,
                number: number,
                city: city,
                district: district,
                uf: uf,
                zipCode: zipCode,
                phone: phone,
            });

            await api.put(`/donor/update/${params.id}`, {
                name: name,
                birth: birth,
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

    const showDatePicker = () => {
        setIsPickerShow(true);
    };

    const hideDatePicker = () => {
        setIsPickerShow(false);
    };

    const handleConfirm = (date: any) => {
        setBirth(date)
        hideDatePicker();
    };

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
                                maxLength={25}
                                placeholder='Adicione o nome'
                                placeholderTextColor="#C3C3C5"
                                value={name}
                                onChangeText={name => setName(name)}
                                onPressIn={() => { setErrorMessage(null) }}
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