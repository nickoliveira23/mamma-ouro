import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';



export default StyleSheet.create({
    container: {
        backgroundColor: "#F8F8F8",
        flex: 1,
        paddingTop: Constants.statusBarHeight + 50,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    leftIcon: {
        marginLeft: '20%'
    },

    spaceView: {
        marginRight: '30%'
    },

    content: {
        paddingHorizontal: 24,
        marginTop: 20
    },

    textTitle: {
        paddingTop: 2,
        fontSize: 20,
        fontWeight: 'bold',
    },

    icon: {
        position: 'absolute',
        right: 0,
        padding: 15,
    },

    hospital: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 20,
    },

    textWaiting: {
        fontWeight: 'bold',
        color: '#737380',
        textAlign: 'center',
        marginTop: "50%"
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

    viewButton: {
        height: 40,
        borderTopWidth: 1,
        // borderBottomWidth: 1,
        borderColor: "#C3C3C5",
        // backgroundColor: '#FFF',
        justifyContent: 'center'
    },

    button: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    iconButton: {
        marginLeft: 10,
    },

    textButton: {
        textAlign: 'left',
        fontSize: 15,
        marginTop: 2,
        color: '#737380',

    },

    ArrowRightIcon: {
        marginRight: 10
    },




    

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'white'
      },

      button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },

      buttonOpen: {
        backgroundColor: "#F194FF",
      },

      buttonClose: {
        backgroundColor: "#2196F3",
      },

      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },

      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})