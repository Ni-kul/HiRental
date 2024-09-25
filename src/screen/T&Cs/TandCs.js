import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { getcanfig } from '../API';

export default function TandCs({ route }) {

    const [data, setdata] = useState();

    const {
        selectedId2,
        totalCharges,
        isid,
        category,
        formetdate2,
        location,
        sendtime,
        sendtimetwo,
        trips,
        enddate,
        attachments,
        selectedId,
        formetdatefff,
        formetdate1,
        locationone,
        city,
        polenum,
        promocode,
        polenum2,
        promoCodeDiscountr,
        calculatedAmount } = route.params || 0;

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const ToExcavatorpayment = () => {
        navigation.navigate('Excavatorpayment', {
            isid,
            selectedId2,
            totalCharges,
            category,
            formetdate2,
            location,
            sendtime,
            sendtimetwo,
            trips,
            attachments,
            selectedId,
            formetdatefff,
            formetdate1,
            locationone,
            city,
            promocode,
            enddate,
            polenum,
            polenum2,
            promoCodeDiscountr,
            calculatedAmount,
        });
    }
    const ToCardDetails = () => {
        
        navigation.navigate('CardDetails', {
            isid,
            selectedId2,
            totalCharges,
            category,
            formetdate2,
            location,
            sendtime,
            sendtimetwo,
            trips,
            attachments,
            selectedId,
            formetdatefff,
            formetdate1,
            locationone,
            city,
            enddate,
            polenum,
            polenum2,
            promocode,
            promoCodeDiscountr,
            calculatedAmount,
        });
    }
    useEffect(() => {
        navigation.addListener('focus', () => {
            configfun();
        })
    }, []);
    const configfun = async () => {
        try {
            setLoading(true);
            const config = await getcanfig(global.URL + 'getcanfig.php');
            setLoading(false);
            // console.log('configfun API response:--(2)', config);
            if (config.ResponseCode == 1) {
                setdata(config.data[1]['value'])
                // console.log('configfun id--', config.data[1].id);
            } else {
                // Alert.alert('Invalid configfun');
            }
        } catch (error) {
            console.error('Error configfun  code:', error);
        }
    }
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }}>
        <View style={styles.mainview}>
            <ScrollView>
                <TouchableOpacity onPress={ToExcavatorpayment}>
                    <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                </TouchableOpacity>
                <View style={styles.viewtwo}>
                    <Text style={styles.txt1}>Terms & Conditions</Text>

                    <Text style={globalstyles.getconfigtxt}>{data ? data : null}</Text>

                </View>
            </ScrollView>
            <TouchableOpacity style={{ marginBottom: 6, }} onPress={ToCardDetails}>
                <Text style={globalstyles.Getbtn}>I Agree</Text>
            </TouchableOpacity>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
        </View>
    </SafeAreaView>
    )
}
