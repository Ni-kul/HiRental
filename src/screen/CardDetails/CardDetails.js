// CardDetails
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { CardField, PaymentSheetError, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { rentnow } from '../API';
import { getcanfig } from '../API';

export default function CardDetails({ route }) {

    const [loading, setLoading] = useState('');

    const [howmanypoint, sethowmanypoint] = useState('');

    const {
        // selectedId2,
        radiobtntwo,
        totalCharges,
        isid,
        category,
        formetdate2,
        location,
        location2,
        sendtime,
        sendtimetwo,
        trips,
        attachments,
        // selectedId,
        radiobtnone,
        formetdatefff,
        // formetdate1,
        enddate,
        promocode,
        polenum2,
        locationone,
        city,
        polenum,
        promoCodeDiscountr,
        calculatedAmount, } = route.params || 0;

    // const attachmentString = attachments.join(',');
    // console.log('attachmentString', attachmentString)

    const [modalVisible, setModalVisible] = useState(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [user_id, setuser_id] = useState('');

    let TotalChargesmul ='';
    if(calculatedAmount){
         TotalChargesmul = (totalCharges-calculatedAmount) * 100;
    }else{
         TotalChargesmul = totalCharges * 100;
    }
    
    //const TotalChargesmul = 100 * 100;
    console.log(TotalChargesmul, 'TotalChargesmul')

    useEffect(() => {

        const loadData = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('userdetail');
            setLoading(false);

            const userDataArray = JSON.parse(userData);
            if (userDataArray) {
                {
                    setuser_id(userDataArray.id)
                }
            } else {
                console.log('Data array is empty or not an array.');
            }
            onCheckout();
        };
        navigation.addListener('focus', () => {

            loadData();
            configfun();
        })
    }, []);

    const navigation = useNavigation();
    const ToHome = () => {
        navigation.navigate('Rentals');
    }

    const configfun = async () => {
        try {
            setLoading(true);
            const config = await getcanfig(global.URL + 'getcanfig.php');
            setLoading(false);
            
            if (config.ResponseCode == 1) {
                console.log('configfun id--', config.data[8]);
                sethowmanypoint(config.data[0]['value']);
            } else {
                console.log('Invalid configfun');
            }
        } catch (error) {
            console.error('Error configfun  code:', error);
        }
    }


    const ToTandCs = () => {
        navigation.navigate('TandCs', {
            // selectedId2,
            radiobtntwo,
            totalCharges,
            isid,
            category,
            formetdate2,
            location,
            location2,
            sendtime,
            sendtimetwo,
            trips,
            attachments,
            // selectedId,
            radiobtnone,
            formetdatefff,
            enddate,
            locationone,
            city,
            promocode,
            polenum,
            polenum2,

            promoCodeDiscountr,
            calculatedAmount
        });
    }
    const openmodal = () => {
        setModalVisible(true);
    }
    const closemodal = () => {
        setModalVisible(false);
        ToHome();
    }

    const fetchPaymentSheetParams = async () => {


        try {
            const response = await fetch('https://hirent.hitact.com.sg/api/stripe-php-master/stripe.php?amount=' + TotalChargesmul, {
            //const response = await fetch('https://appdevelopmentsingapore.com/hirental/api/stripe-php-master/stripe.php?amount=' + TotalChargesmul, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // ?amount= variable-name
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const { paymentIntent, ephemeralKey, customer, paymentIntentId } = await response.json();
            // console.log('Payment Intent :', paymentIntent);

            return {
                paymentIntent,
                ephemeralKey,
                customer,
                paymentIntentId
            };
        } catch (error) {
            console.error('Error fetching payment sheet params:', error);
            // Handle the error as needed, e.g., show an error message to the user.
            throw error; // Re-throw the error to propagate it further if necessary.
        }
    };
    const onCheckout = async () => {
        setLoading(true);
        const {
            paymentIntent,
            paymentIntentId

        } = await fetchPaymentSheetParams();
        setLoading(false);

        // Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'notJust.dev',
            paymentIntentClientSecret: paymentIntent,

        });
        console.log('--initPaymentSheet-(1)');
        if (initResponse.error) {
            console.log('initResponse.error', initResponse.error);
            Alert.alert('Something went wrong');
            return;
        }

        // Present the Payment Sheet from Stripe
        const paymentResponse = await presentPaymentSheet();
        console.log('--presentPaymentSheet-(2)', paymentResponse);

        if (paymentResponse.error) {
            // Alert.alert(
            //     // `Error code: ${paymentResponse.error}`,
            //     paymentResponse.error.message
            // );
            Alert.alert('Payment have been declined. Please kindly try again');

            console.log('--paymentResponse-error', paymentResponse.error);
            return;
        }
        // 4. If payment ok -> create the order
        onCreateOrder(paymentIntentId);
    };

    const onCreateOrder = async (paymentIntentId) => {

        const userData = await AsyncStorage.getItem('userdetail');
        const userDataArray = JSON.parse(userData);

        if (category == 3) {
            const combinedLocation = `${location} ${location2}`;
            const attachmentString = attachments.join(',');
            const data = {
                duration: radiobtntwo,
                user_id: userDataArray.id,
                list_id: isid,
                start_date: formetdate2,
                location: combinedLocation,
                start_time: radiobtntwo == '6' ? '08:00 AM' : sendtime,
                end_time: radiobtntwo == '6' ? '05:00 PM' : sendtimetwo,
                no_of_trips: trips,
                total: totalCharges,
                period: enddate,
                promocode: promoCodeDiscountr,
                redeemed_point: calculatedAmount,
                attechment: attachmentString,
                paymentIntentId: paymentIntentId,
                promocode:promocode,
                lamp_pol_number:polenum2

            }
            setLoading(true);
            const rent = await rentnow(global.URL + 'rentnow.php', data);
            setLoading(false);

            // console.log('rentnow API response:--', rent);
            if (rent.ResponseCode == 1) {
                openmodal();
            } else {
                Alert.alert('Not Added');
            }
        }
        if (category == 2) {
            //period == formetdate1 old -> new period == enddate
            const data = {
                user_id: userDataArray.id,
                list_id: isid,
                duration: radiobtnone,
                start_date: formetdatefff,
                period: enddate,
                location: locationone,
                total: totalCharges,
                promocode: promoCodeDiscountr,
                redeemed_point: calculatedAmount,
            }
            setLoading(true);
            const rent = await rentnow(global.URL + 'rentnow.php', data);
            setLoading(false);

            console.log('rentnow API response: 2--', rent);
            if (rent.ResponseCode == 1) {
                openmodal();
            } else {
                Alert.alert('Not Added');
            }
        }
    };

    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }}>

        <View style={styles.mainview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>
                <TouchableOpacity onPress={ToTandCs}>
                    <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                </TouchableOpacity>

                <View style={styles.viewtwo}>
                    {/* <Text style={styles.txt1}>Card Details</Text> */}
                    <TouchableOpacity style={{ marginTop: '40%', width: '100%' }} onPress={onCheckout}>
                        {/* onPress={openmodal} */}
                        <Text style={globalstyles.Getbtn}>Make Payment</Text>
                    </TouchableOpacity>

                    <View style={{}}>
                        <Modal isVisible={modalVisible} style={{ margin: 0, justifyContent: 'flex-end' }}>
                            <View style={{ backgroundColor: 'white', }}>
                                <View style={{ alignItems: 'center', marginTop: 50 }}>
                                    <Image source={require('../../../Image/checked1.png')} style={styles.checked1} />
                                </View>
                                <Text style={styles.mtxt1}>Successful</Text>
                                <Text style={styles.mtxt2}>Your booking is confirmed</Text>
                                <Text style={styles.mtxt3}>You have earned <Text style={styles.mtxt4}>{totalCharges * howmanypoint} points!</Text></Text>

                                <TouchableOpacity onPress={closemodal} style={{ marginTop: 30, marginBottom: 4 }}>
                                    <Text style={globalstyles.Getbtn}>Go to Bookings</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
    )
}

