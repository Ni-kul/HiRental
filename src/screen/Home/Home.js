import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView,Alert } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { getproduct, getovertime, overtimepaymentupdate } from '../API';
import { CardField, PaymentSheetError, StripeProvider, useStripe } from '@stripe/stripe-react-native';


export default function Home() {
    const [user_id, setuser_id] = useState('');
    const [loading, setLoading] = useState(false);
    const [Getdata, setGetdata] = useState([]);
    const [isovertime, setisovertime] = useState(false);
    const [amount, setamount] = useState();
    const [id, setid] = useState();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', () => {
            BackTO();
        })

    }, []);

    const ToGetHelp = async() => {
        const userData = await AsyncStorage.getItem('userdetail');
        if(userData){
            navigation.navigate('GetHelp');
        }else{
            showAlert();
        }
    }

    

    const showAlert = () => {
        Alert.alert(
          'Error',
          'Please login.',
          [
            {
              text: 'Login',
              onPress: () => navigation.navigate('SignIn') // Replace with navigation logic
            },
            {
              text: 'Signup',
              onPress: () => navigation.navigate('SignUp') // Replace with navigation logic
            }
          ],
          { cancelable: false }
        );
      };

    const TOpass = async(selectedData) => {
        // const userData = await AsyncStorage.getItem('userdetail');
        // if(userData){
        //      navigation.navigate('ExcavatorRental', { selectedData });
        // }else{
        //     showAlert();
        // }
        navigation.navigate('ExcavatorRental', { selectedData });
    };


    const overtime = async (id) => {
        setLoading(true);
        const data = {
            user_id: id,
        };
        const response = await getovertime(global.URL + 'getovertime.php', data);
        setLoading(false);
        if (response.ResponseCode == 1) {
            console.log(response);
            setisovertime(true);
            setamount(response.data[0]['amount'])
            setid(response.data[0]['id']);
        }
    }

    const fetchPaymentSheetParams = async () => {
        try {
            const response = await fetch('https://appdevelopmentsingapore.com/hirental/api/stripe-php-master/stripe.php?amount=' + amount, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // ?amount= variable-name
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const { paymentIntent, ephemeralKey, customer } = await response.json();
            // console.log('Payment Intent :', paymentIntent);

            return {
                paymentIntent,
                ephemeralKey,
                customer,
            };
        } catch (error) {
            console.error('Error fetching payment sheet params:', error);
            // Handle the error as needed, e.g., show an error message to the user.
            throw error; // Re-throw the error to propagate it further if necessary.
        }
    };

    const opennoti = async () => {
        const userData = await AsyncStorage.getItem('userdetail');
        if(userData){
            navigation.navigate('Notification');
        }else{
            showAlert();
        }

        
    }


    const payovertime = async () => {

        setLoading(true);
        const {
            paymentIntent,

        } = await fetchPaymentSheetParams();


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
        setLoading(false);
        if (paymentResponse.error) {
            Alert.alert(
                // `Error code: ${paymentResponse.error}`,
                paymentResponse.error.message
            );
            alert(paymentResponse.error);
            console.log('--paymentResponse-error', paymentResponse.error);
            return;
        }

        // 4. If payment ok -> create the order
        onCreateOrder();
    }

    const onCreateOrder = async () => {

        const data = { id: id };
        setLoading(true);
        const response = await overtimepaymentupdate(global.URL + 'overtimepaymentupdate.php', data);
        setLoading(false);
        console.log(response);
        if (response.ResponseCode == 1) {
            setisovertime(false);
            alert('Overtime payment successfully paid');
        }

    }

    const BackTO = async () => {
        try {
            setLoading(true);
            const userData = await AsyncStorage.getItem('userdetail');
            let data = '';
            if(userData){
                const userDataArray = JSON.parse(userData);
                setuser_id(userDataArray.id);
                overtime(userDataArray.id);
                data = {user_id: userDataArray.id};
                
            }else{
                data = {user_id: '0'};
            }
            const response = await getproduct(global.URL + 'getproduct.php', data);
            setLoading(false);
       
            console.log('response',response);
            if (response.ResponseCode == 1) {
                
                setGetdata(response.data)

            } else if (response.ResponseCode == 0) {
                // Alert.alert(response.ResponseMsg)
            }
        } catch (error) {
            console.error('Error in login API call:', error.code);
        }
    }
    const TOHistoryDetails = () => {
        navigation.navigate('HistoryDetails');
    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
        <View style={styles.mainview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>
                <View style={styles.welcomeview}>
                    <Text style={styles.txt1}>Welcome</Text>
                    <TouchableOpacity onPress={() => opennoti()}>
                        <Image source={require('../../../Image/bell.png')} style={styles.noti} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ToGetHelp}>
                        <Text style={styles.txt2}>Need Help?</Text>
                    </TouchableOpacity>
                </View>
                {isovertime ?
                    <TouchableOpacity onPress={() => payovertime()}>
                        <Text style={styles.OTtxt2}>Please pay the overtime payment</Text>
                    </TouchableOpacity> : null
                }


                <View style={styles.secondview}>

                    <View style={styles.imgmainview1} >
                        {Getdata.length > 0 ? (
                            Getdata.map((result, index) => (
                                <View style={styles.imgview} key={index}>
                                    <TouchableOpacity onPress={() => TOpass(result)}>
                                        {/* <TouchableOpacity > */}
                                        <Image resizeMode="cover" source={{ uri: `${global.IMG + result.image}` }} style={styles.image} />
                                        {/* </TouchableOpacity> */}
                                        <Text style={styles.txt3}>{result.name}</Text>
                                        
                                            <Text style={styles.txt4}>{result.price ? <Text>${result.price}/hr</Text> : <Text>{result.price_day.includes('$') ? result.price_day : `$${result.price_day}`}/day</Text>}  <Text style={styles.txt5}>| {result.ton} ton</Text></Text>
                                            
                                    </TouchableOpacity >
                                </View>
                            ))
                        ) : (
                            null
                            // <Text style={styles.txt3}> -null-</Text>
                        )}
                    </View>
                    {/* onPress={() => BackTO(2)} */}
                    {/* <View style={styles.imgview}>
                        <TouchableOpacity >
                            <Image resizeMode="cover" source={require('../../../Image/Rectangle22(3).png')} style={styles.image} />
                        </TouchableOpacity>
                        <Text style={styles.txt3}>Lorry Crane</Text>
                        <Text style={styles.txt4}>$250/hr <Text style={styles.txt5}>|3 ton</Text></Text>
                    </View> */}
               </View>
           </ScrollView>
        </View>
    </SafeAreaView>
    )
}
