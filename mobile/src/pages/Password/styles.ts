import { StyleSheet, Dimensions } from 'react-native';

import Constants from 'expo-constants';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Constants.statusBarHeight + 50,

  },

  header: {
    flexDirection: 'row',
  },

  leftIcon: {
    marginLeft: '5%'
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%'
  },

  viewTitle: {
    marginBottom: '10%'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 45,
    color: "#414141"
  },

  passwordInputView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#C3C3C5",
    padding: 5,
    marginBottom: 20,
  },

  passwordInput: {
    width: Dimensions.get('window').width - 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#414141'
  },

  rememberText: {
    color: '#C3C3C5',
    fontSize: 11,
    marginTop: 50,
    textAlign: 'center'
  },

  errorMessage: {
    color: '#FF0000',
    textAlign: 'center'
  },

  viewButton: {
    marginTop: 50,
  },

  button: {
    width: Dimensions.get('window').width - 60,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#707070',
    borderWidth: 1,
  },

})

export default styles;