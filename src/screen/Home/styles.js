import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        backgroundColor: 'white',
        
    },

    welcomeview: {
        marginTop: 14,
        // borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '92%',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    txt1: {
        color: '#393939',
        fontSize: 38,
        fontWeight: '700',width:'60%'
    },
    txt2: {
        marginTop: 2,
        fontSize: 15,
        color: '#EB1F28',
        fontWeight: '600',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#EB1F28',
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingTop: 6,
        paddingBottom: 4
    },
    OTtxt2: {
        marginTop: 10,
        backgroundColor: '#EB1F28',
        color: '#FFFFFF',
        width: '100%',
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: '4%',
        paddingVertical: 4,
    },
    secondview: {
        width: '92%',
        alignSelf: 'center',
        // marginTop: 20
    },
    imgmainview1: {
        width: '100%',
        marginBottom: 22,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgmainview2: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 22,
        justifyContent: 'space-between',
        // borderWidth: 1,
    },
    noti:{
        height:30,width:30
    },
    imgview: {
        backgroundColor: 'white',
        // borderWidth: 1,
        marginTop: 20,
        backgroundColor: 'white',
        width: '48%'
    },
    image: {
        height: 160,
        // width: 140,
        width: '100%',
        borderRadius: 10
    },
    txt3: {
        marginTop: 5,
        fontSize: 15,
        color: '#393939',
        fontWeight: '600',
    },
    txt4: {
        fontSize: 15,
        color: '#EB1F28',
        fontWeight: '600',
    },
    txt5: {
        fontSize: 15,
        color: '#999CA5',
        fontWeight: '600',
    },
})