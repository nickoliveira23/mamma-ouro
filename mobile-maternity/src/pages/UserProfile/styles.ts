import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';



export default StyleSheet.create({
    container: {
        backgroundColor: "#F8F8F8",
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 50,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    viewtitle: {
        marginLeft: 10,
        marginBottom: 10
    },

    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    icon: {
        position: 'absolute',
        right: 0,
        padding: 15,        
    },

    profile: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
    },

    profileProperty: {
        fontSize: 14,
        color: '#414141',
        fontWeight: 'bold',
    },

    profileValue: {
        fontSize: 15,
        color: '#737373',
        marginTop: 8,
        marginBottom: 24
    },

    textWaiting: {
        fontWeight: 'bold',
        color: '#737380',
        textAlign: 'center',
        marginTop: "50%"
      },

    viewFlatList: {

    },

    newButton: {
        marginRight: 10,
        paddingTop: 5,
        color: "#A1E1D8",
        fontWeight: 'bold'
    },
})