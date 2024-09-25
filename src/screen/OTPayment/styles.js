// HistoryDetails2
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Platform.OS === 'ios' ? 30 : 0,
    },

    mainScroll: {
        width: '92%',
        alignSelf: 'center',
        // borderWidth:1,
        marginBottom:20
    },
    maindateview: {
        marginTop: 18,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateview: {
        marginRight: '14%'
    },
    txt1: {
        fontSize: 18,
        fontWeight: '600',
        color: '#393939'
    },
    txt2: {
        fontSize: 14,
        fontWeight: '400',
        color: '#393939'
    },
    txt3: {
        marginTop: 14,
        fontSize: 18,
        fontWeight: '600',
        color: '#393939'
    },
    mainScroll1: {
        width: '92%',
        alignSelf: 'center',
        paddingBottom: 26
    },
    inputtxtview1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#F5F5F5',
        marginTop: 8,
        borderRadius: 8,
        // borderWidth: 1,
        justifyContent: 'space-between'
    },
    intxt: {
        paddingLeft: 10,
        fontSize: 12,
        fontWeight: '500',
        color: '#999CA5',
        paddingLeft: 16,
        width: '80%',
    },
    txt4: {
        // borderWidth: 1,
        height: 40,
        paddingHorizontal: '5%',
        backgroundColor: '#007AFF',
        fontSize: 12,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
        paddingTop: 10,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    },
    mainScroll2: {
        width: '92%',
        alignSelf: 'center',
    },
    pointsview: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    previous2: {
        height: 15,
        width: 14
    },
    txt5: {
        fontSize: 18,
        fontWeight: '600',
        color: '#393939'
    },
    mainScroll3: {
        width: '92%',
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16
    },
    chargeview1: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    chargeview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txt6: {
        color: '#393939',
        fontSize: 14,
        fontWeight: '400',
    },
    
    txt8:{
        color: '#EB1F28',
        fontSize: 15,
        fontWeight: '700',
    },
    mainScroll4: {
        alignSelf: 'center',
        width: '92%',
        marginTop: 16,
        marginBottom: 16
    },
    payMethodview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image3: {
        height: 16,
        width: 26,
    },
    payMethodview1: {
        marginTop: 34,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txt7: {
        color: '#EB1F28',
        fontSize: 18,
        fontWeight: '600',
    },
})