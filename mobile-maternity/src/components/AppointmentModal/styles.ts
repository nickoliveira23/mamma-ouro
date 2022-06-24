import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    modalArea: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },


    modalBody: {
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 300,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 40
    },


    closeButton: {
        alignItems: 'center'
    },

    modalItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
    },

    hospitalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    hospitalIcon: {
        borderRadius: 20,
        marginRight: 15,
    },

    hospitalName: {
        color: '#414141',
        fontSize: 15,
        fontWeight: 'bold',
    },

    serviceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    servicePrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },


    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    finishButton: {
        backgroundColor: '#76BFAC',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    finishButtonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold',
    },

    dateInfo: {
        flexDirection: 'row',
    },

    dataNextArea: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    dateTitleArea: {
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dataPrevArea: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    dateTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000000',
    },

    dateList: {
        maxHeight: 100
    },

    dateItem: {
        width: 45,
        justifyContent: 'center',
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
    },

    dateItemWeekDay: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    dateItemNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    timeList: {
        maxHeight: 100
    },

    timeItem: {
        width: 75,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    timeItemText: {
        fontSize: 16,
    },
})