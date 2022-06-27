import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    header: {
        marginTop: 40,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    leftIcon: {
        marginLeft: '5%'
    },

    screenTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },

    saveButton: {
        marginRight: 10,
        paddingTop: 5,
        color: "#76BFAC",
        fontWeight: 'bold'
    },

    content: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#C3C3C5',
        borderTopColor: '#C3C3C5',
        padding: 15,
        backgroundColor: '#FFFFFF'
    },

    errorMessage: {
        color: '#FF0000',
        marginBottom: 20,
        textAlign: 'center'
    },

    viewInput: {
        marginBottom: 15
    },

    titles: {
        color: '#414141',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 8,
        paddingLeft: 5
    },

    textInput: {
        height: 40,
        fontWeight: '200',
        borderBottomWidth: 1,
        borderColor: '#C3C3C5',
        borderRadius: 4,
        paddingStart: 13,
    },

    picker: {
        marginTop: -20,
        height: 50,
        width: 220,
    },

    location: {
        flexDirection: 'row',
        marginBottom: 15
    },

    viewColOne: {
        flex: 1,
        marginTop: 10,
    },

    viewColTwo: {
        width: '30%',
        marginLeft: 20,
        marginTop: 10,
    }

})

export default styles;