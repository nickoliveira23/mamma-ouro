import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//Criando API a partir do Axios
const api = axios.create({
  //URL da minha API
  baseURL: 'http://192.168.0.7:3333',
  //Cabeçalho das requisições sempre irá conter o content-type indicando que somente será aceito JSON como recurso
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

//Interceptador das requisições. Aqui é definido que todas as requisições devem conter no cabeçalho a chave de autenticação do JWT
api.interceptors.request.use(
  async config => {
    const userAuthToken = await AsyncStorage.getItem('@CodeApi:token');

    config.headers['Authorization'] = 'Bearer ' + userAuthToken

    return config
  },
  err => {
    Promise.reject(err)
  }
)

//Interceptador das respostas recebidas. Aqui é tratado a expiração da chave de autenticação.
api.interceptors.response.use(response => new Promise((resolve, reject) => {
  resolve(response);
}), error => {
  if (!error.response) {
    return new Promise((resolve, reject) => {
      reject(error)
    });
  }
  if (error.response.status === 403) {

    const requestConfig = error.config

    Alert.alert("Sua sessão expirou!")

    AsyncStorage.clear();

    return axios(requestConfig)
  } else {
    return new Promise((resolve, reject) => {
      reject(error)
    });
  }
})

export default api;