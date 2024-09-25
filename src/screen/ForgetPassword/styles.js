import { StyleSheet,Platform } from "react-native";

export const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        backgroundColor: 'white',
        
    },
    txt1: {
        marginTop: 22,
        marginLeft: 14,
        fontSize: 38,
        fontWeight: '700',
        color: '#393939'
    },
    txt2: {
        marginTop: 8,
        width: '90%',
        marginLeft: '4%',
        fontSize: 15,
        fontWeight: '600',
        color: '#393939'
    },
    inputtxtview: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '92%',
        backgroundColor: '#F5F5F5',
        marginTop: 30,
        borderRadius: 8
    },
    image3: {
        height: 20,
        width: 20,
        marginLeft: 16,
    },
    intxt: {
        width: '100%',
        paddingLeft: 16,
        borderRadius: 8,
        height:40
    },
    msg: {
        alignSelf: 'flex-start',
        marginLeft: '4%',
        color: '#EB1F28',
        fontWeight: '500',
        fontSize: 12
    },
    Getbtntouch: {
        marginTop: 26
    }
})