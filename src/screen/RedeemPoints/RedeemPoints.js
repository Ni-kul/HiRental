import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { getuserdetail } from '../API';
import { globalstyles } from '../../globalstyles';
import { getcanfig } from '../API';

export default function RedeemPoints({ route }) {

    const [loading, setLoading] = useState(false);
    const [userpoints, setuserpoints] = useState('')
    const [points, setpoints] = useState('')
    const [howmanypoints, sethowmanypoints] = useState('')
    const [howmanyd, sethowmanyd] = useState('')
    const [calculatedAmount, setCalculatedAmount] = useState(0);

    const { selectedId2,
        totalCharges,
        isid,
        category,
        formetdate2,
        location,
        sendtime,
        sendtimetwo,
        trips,
        attachments,
        selectedId,
        rentCharges,
        formetdatefff,
        formetdate1,
        locationone,
        city,
        enddate,
        polenum2,
        promocode,
        polenum,
        promoCodeDiscountr } = route.params;
    console.log('promoCodeDiscountr', promoCodeDiscountr)
    console.log('totalChargesadd', totalCharges)

    // const userpoints = 100;
    useEffect(() => {
        navigation.addListener('focus', () => {

            userinfo();
            configfun();
        })
    }, []);
    let tot = totalCharges;

    const navigation = useNavigation();
    const ToExcavatorpayment = () => {
        navigation.navigate('Excavatorpayment', {
            selectedId2,
            tot,
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
            rentCharges,
            formetdatefff,
            formetdate1,
            locationone,
            city,
            polenum,
            polenum2,
            promocode,
            promoCodeDiscountr,
        });
    }

    const ToPoints = () => {

        global.calculatedAmount = calculatedAmount.toFixed(2);

        navigation.navigate('Excavatorpayment', {
            calculatedAmount,
            selectedId2,
            tot,
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
            rentCharges,
            formetdatefff,
            formetdate1,
            locationone,
            city,
            polenum,
        });

    }
    console.log('totalCharges-go', tot)
    // const conversionRate = 500 / 10;
    const handlePointsChange = (text) => {
        setpoints(text);
        const enteredPoints = parseFloat(text);
        const maxPoints = parseFloat(userpoints);

        if (!isNaN(enteredPoints) && enteredPoints <= maxPoints) {
            //const dollarAmount = (enteredPoints / 500) * 10;
            const dollarAmount = (enteredPoints * howmanyd) / 100;
            setCalculatedAmount(dollarAmount.toFixed(2));
            
           
        } else {
            setCalculatedAmount(0);
        }
    };

    // getuserdetail.php
    // user_id
    const userinfo = async () => {

        setLoading(true);
        const userData = await AsyncStorage.getItem('userdetail');
        setLoading(false);
        console.log('userData in AsyncStorage:--', userData);
        const userDataArray = JSON.parse(userData);
        console.log('userDataArray:--', userDataArray);

        const data = {
            user_id: userDataArray.id,
        }
        setLoading(true);
        const info = await getuserdetail(global.URL + 'getuserdetail.php', data);
        console.log('info', info)
        setLoading(false);
        if (info.ResponseCode == 1) {
            // console.log('Succesfully ')
            setuserpoints(info.user_data.points)
        } else {
            console.log('Invalid ');
        }
    }
    const configfun = async () => {
        try {
            setLoading(true);
            const config = await getcanfig(global.URL + 'getcanfig.php');
            setLoading(false);
            // console.log('configfun API response:--(2)', config);
            if (config.ResponseCode == 1) {
                console.log('configfun id--', config.data[8]);
                sethowmanypoints(config.data[8]['key_name']);
                sethowmanyd(config.data[8]['value']);
            } else {
                console.log('Invalid configfun');
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
                <View style={styles.mainScroll}>

                    <Text style={styles.txt1}>Redeem Points</Text>
                    {userpoints == '' ?
                        <Text style={styles.txt22}>Total Available Points 00 </Text>
                        :
                        <Text style={styles.txt2}>Total Available Points {userpoints}</Text>
                    }

                    <TouchableOpacity >
                        <Text style={styles.txt3}>{howmanypoints} = ${howmanyd}</Text>
                    </TouchableOpacity>

                    <Text style={styles.txt4}>How many points would you like to redeem?</Text>

                    <View style={styles.inputtxtview1}>
                        <TextInput
                            style={styles.intxt}
                            placeholder='Enter points'
                            placeholderTextColor='#999CA5'
                            color='black'
                            keyboardType='numeric'
                            value={points}
                            // onChangeText={(text) => setpoints(text)}
                            onChangeText={handlePointsChange}
                            editable={userpoints !== ''}
                        >
                        </TextInput>
                        {calculatedAmount ? (
                            <Text style={styles.txt5}>{`$${calculatedAmount} off`}</Text>
                        ) : null}
                    </View>


                </View>

            </ScrollView>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <TouchableOpacity style={{ marginBottom: 6, marginTop: 1 }} onPress={() => ToPoints()}>
                <Text style={globalstyles.Getbtn}>Confirm</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}
