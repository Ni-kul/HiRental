import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        backgroundColor: 'white',
        
    },
    viewone: {
        width: '92%',
        alignSelf: 'center',
        marginTop: 6
    },
    txt1: {
        marginTop: 6,
        fontSize: 18,
        fontWeight: '600',
        color: '#393939'
    },
    dropdownview: {
        marginTop: 24,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
    },
    dropdown: {
        width: '100%',
        // borderWidth: 1,
        paddingRight: 13,
        paddingLeft: 44,
        color: 'black',
        fontSize: 15
    },
    itemTextStyle: {
        color: 'black'
    },
    selectedTextStyle: {
        color: 'black',
    },
    placeholderStyle: {
        color: '#999CA5'
    },
    danger1: {
        position: 'absolute',
        marginLeft: 15,
        height: 18,
        width: 18
    },
    txt2: {
        marginTop: 14,
        fontSize: 15,
        fontWeight: '500',
        color: '#393939'
    },
    radioview: {
        marginTop: 10,
        marginBottom: 6
    },
    checkview: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        marginTop: 1
    },
    check: {
        // color:'#999CA5',
        color: 'red',
        width: 10,
        height: 10
    },

    inputtxtview: {
        backgroundColor: '#F5F5F5',
        // borderWidth: 1,
        // alignItems: 'center',
        flexDirection: 'row',
        marginTop: 12,
        borderRadius: 8,
    },
    image3: {
        height: 22,
        width: 22,
        marginTop: 12,
        marginLeft: 18
    },
    intxt: {
        // borderWidth: 1,
        textAlignVertical: 'top',
        marginLeft: 6,
        width: '84%',
        height: 170,
        paddingLeft: 20,
        fontSize: 15,
        fontWeight: '500',
        color: '#999CA5',paddingTop:15
    },
    msg: {
        // alignSelf: 'flex-start',
        // marginLeft: '4%',
        marginTop: 4,
        color: '#EB1F28',
        fontWeight: '500',
        fontSize: 12
    },
    txt4: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 25,
        textDecorationLine: 'underline',
        fontWeight: '600',
        color: '#0AA06E',
        marginBottom: 10
    },
})
