import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF3F1',
        paddingTop: Constants.statusBarHeight + 60,
    },

    infoView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 25,
    },

    logo: {
        width: 500,
        height: 200,
    },

    termsText: {
        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        fontSize: 12,
        color: '#474A51',
    },

    buttonsView: {
        alignItems: 'center',
    },

    button: {
        width: '85%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#506175',
        backgroundColor: '#506175',
    },

    buttonLogin: {
        backgroundColor: 'transparent',
        borderColor: '#000',
        marginTop: 20
    },

    buttonText: {
        color: '#FFF'
    },

    buttonText2: {
        color: '#000'
    },
})

export default styles;