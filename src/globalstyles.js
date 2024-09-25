import { StyleSheet } from "react-native";

export const globalstyles = StyleSheet.create({

    Getbtn: {
        fontSize: 17,
        color: '#FFFFFF',
        fontWeight: '700',
        backgroundColor: '#000000',
        width: '92%',
        alignSelf: 'center',
        borderRadius: 8,
        height: 44,
        textAlign: 'center',
        paddingTop: 9, marginBottom: 20
    },
    imagearrow: {
        marginTop: '5%',
        marginLeft: '3%',
        height: 24,
        width: 24,
    },
    line1: {
        height: 8,
        width: '100%',
        backgroundColor: '#F5F5F5',
        // backgroundColor: 'red',
    },
    hadtxt: {
        marginTop: 14,
        color: '#393939',
        fontSize: 38,
        fontWeight: '700',
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 24, 24, 0.075)',
        position: 'absolute',
        top: 60,
        zIndex: 9999,
        height: '100%',
        width: '100%'
    },
    modaltxt: {
        color: '#393939',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 10,
    },
    nothadtxt: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#393939'
    },
    configmainview: {
        flex: 1,
        backgroundColor: 'white',
    },
    configview: {
        width: '92%',
        alignSelf: 'center',
        marginTop: 6,
        marginBottom: 6
    },
    getconfigtxt: {
        marginVertical: 10,
        fontSize: 15,
        fontWeight: '400',
        color: '#393939',
    },
    locationbtn: {
        marginBottom: 6, marginTop: 18,
        width: (Platform.OS === 'ios') ? 0 : '100%',
        // borderWidth:1 
    },
})