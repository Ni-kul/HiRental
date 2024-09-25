import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        backgroundColor: 'white',
        
    },

    mainScroll: {
        alignSelf: 'center',
        width: '92%',
        marginTop: 20,
        marginBottom: 16
    },
    txt1: {
        fontSize: 18,
        // marginTop: 10,
        fontWeight: '600',
        color: '#393939'
    },
    txt2: {
        marginTop: 12,
        color: '#393939',
        fontSize: 15,
        fontWeight: '400',
    },
    txt3: {
        marginTop: 8,
        color: '#393939',
        fontSize: 15,
        fontWeight: '400',
    },
    txt4: {
        marginTop: 30,
        color: '#393939',
        fontSize: 15,
        fontWeight: '400',
    },
    inputtxtview1: {
        // width: '92%',
        flexDirection: 'row',
        alignItems: 'center',
        // height: 40,
        backgroundColor: '#F5F5F5',
        marginTop: 8,
        borderRadius: 8,
        // borderWidth: 1,
        // justifyContent: 'space-between'
    },
    intxt: {
        fontSize: 14,
        width: '75%',
        fontWeight: '500',
        color: '#999CA5',
        paddingLeft: 16,padding:10
    },
    txt5:{
        fontSize: 12,
        fontWeight: '500',
        color: '#FF3B30',
        textAlign: 'center',
        // borderWidth:1,
        width:'25%'
        // paddingTop: 6, 
    },
    msg: {
        // alignSelf: 'flex-start',
        // marginLeft: '4%',
        marginTop: 4,
        color: '#EB1F28',
        fontWeight: '500',
        fontSize: 12
    },
})