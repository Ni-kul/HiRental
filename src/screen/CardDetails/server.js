// // server.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const stripe = require('stripe')('sk_test_51OTeaHSBqXffrrZCo791EMHMo2rckGRhbNRAV1PDLWKIhpp2H8bSzLqE8IugsWesyoYp3HxrLp9AN1DIVklpfVXr00W20sVdEK');
// const cors = require('cors');

// const app = express();
// const port = 8081;

// app.use(bodyParser.json());
// app.use(cors());

// app.post('/create-payment-intent', async (req, res) => {
//     console.log('Received payment intent request:', req.body);
//     try {
//         const { items } = req.body;

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: calculateOrderAmount(items), // Define your own function for calculating the order amount
//             currency: 'usd',
//             automatic_payment_methods: {
//                 enabled: true,
//             },
//         });
//         res.status(200).json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//         console.error('Error creating PaymentIntent:', error.message);
//         res.status(500).json({ error: 'Error creating PaymentIntent' });
//     }
// });
// app.get('/create-payment-intent', (req, res) => {
//     res.status(404).send('Cannot GET /create-payment-intent--');
// });
// function calculateOrderAmount(items) {
//     // Replace this with your logic to calculate the order amount
//     return 1400; // Example amount in cents
// }

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
// // app.get('/create-payment-intent', (req, res) => {
// //     res.status(404).send('Cannot GET /create-payment-intent--');
// // });


// const initialisePaymentSheet = async () => {

//     const { paymentintent, empheralkey, customer } =
//         await fetchPaymentSheetparam();
//     const { error } = await initPaymentSheet({
//         customerId: customer,
//         customerempheralkeySecret: empheralkey,
//         paymentintentclientSecret: paymentintent,
//         merchantdisplayname: 'example enc',
//         alloweDelayedPaymentMethods: true,
//         returnURL: 'stripe-example://stripe-redirect'
//     });
//     if (error) {
//         console.log(`Errro code :- ${error.code}`, error.message);
//     } else {
//         setready(true)
//     }
// }
// const fetchPaymentSheetparam = async () => {
//     const response = await fetch('http://localhost:8081/create-payment-intent', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     const { empheralkey, customer, paymentintent } = await response.json();

//     return {
//         empheralkey,
//         customer,
//         paymentintent
//     }
// }

// 
// CardDetails
// import { useNavigation } from '@react-navigation/core';
// import React, { useEffect, useState } from 'react';
// import { CardField, StripeProvider, useStripe } from '@stripe/stripe-react-native';
// import Modal from "react-native-modal";
// import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, Button, Alert } from 'react-native';
// import { styles } from './styles';
// import { globalstyles } from '../../globalstyles';

// export default function CardDetails() {
//     const [cardno, setcardno] = useState('');
//     const [ExpirDate, setExpirDate] = useState('');
//     const [cvvno, setcvvno] = useState('');
//     const [modalVisible, setModalVisible] = useState(false);
//     const [carddetail, setcarddetail] = useState('');
//     const { initPaymentSheet, presentPaymentSheet } = useStripe();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         initializePaymentSheet();
//     }, []);

//     const navigation = useNavigation();
//     const ToHome = () => {
//         navigation.navigate('Home');
//     }
//     const ToTandCs = () => {
//         navigation.navigate('TandCs');
//     }
//     const openmodal = () => {
//         setModalVisible(true);
//     }
//     const closemodal = () => {
//         setModalVisible(false);
//     }

//     const fetchPaymentSheetParams = async () => {
//         const response = await fetch('https://appdevelopmentsingapore.com/hirental/api/stripe-php-master/stripe.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         const { paymentIntent, ephemeralKey, customer } = await response.json();
//         // console.log('Payment Intent :', paymentIntent);

//         return {
//             paymentIntent,
//             ephemeralKey,
//             customer,
//         };
//     };

//     const initializePaymentSheet = async () => {
//         const {
//             paymentIntent,
//             ephemeralKey,
//             customer,
//             // publishableKey,
//         } = await fetchPaymentSheetParams();

//         const { error } = await initPaymentSheet({
//             merchantDisplayName: "Example, Inc.",
//             customerId: customer,
//             customerEphemeralKeySecret: ephemeralKey,
//             paymentIntentClientSecret: paymentIntent,
//             allowsDelayedPaymentMethods: true,
//             defaultBillingDetails: {
//                 name: 'Jane Doe',
//             }
//         });
//         if (!error) {
//             setLoading(true);
//         } else {
//             console.log('------------')
//         }
//     };

//     const openPaymentSheet = async () => {
//         try {
//             const { error } = await presentPaymentSheet();

//             if (error) {
//                 Alert.alert(`Error code: ${error.code}`, error.message);
//                 console.log('Error --:', error);
//                 console.log('Error:', error.message);
//             } else {
//                 Alert.alert('Success! Your order is confirmed!');
//                 console.log('Successfully Payment');
//             }
//         } catch (error) {
//             console.error('An unexpected error occurred:', error);
//         }
//     };


//     return (
//         <View style={styles.mainview}>
//             <ScrollView>
//                 <TouchableOpacity onPress={ToTandCs}>
//                     <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
//                 </TouchableOpacity>
//                 <StripeProvider publishableKey="pk_test_51OTeaHSBqXffrrZCK1LEoqC3gja7pyForywCr00neELKo12IpipXY9pQ43MIxX51J4cWFQi0FynBvpBM63lgz4Cm00HdERJ8VH">

//                     {/* Secret key="sk_test_51OTeaHSBqXffrrZCo791EMHMo2rckGRhbNRAV1PDLWKIhpp2H8bSzLqE8IugsWesyoYp3HxrLp9AN1DIVklpfVXr00W20sVdEK" */}
//                     <View style={styles.viewtwo}>
//                         <Text style={styles.txt1}>Card Details</Text>

//                         {/* <CardField
//                             postalCodeEnabled={true}
//                             placeholders={{
//                                 number: '4242 4242 4242 4242',
//                             }}
//                             cardStyle={{
//                                 backgroundColor: '#F5F5F5',
//                                 textColor: '#000000',
//                                 borderWidth: 1,
//                                 borderRadius: 8,
//                             }}
//                             style={{
//                                 width: '100%',
//                                 height: 50,
//                                 marginVertical: 30,
//                             }}
//                             onCardChange={(cardDetails) => {
//                                 // console.log('cardDetails', cardDetails);
//                             }}
//                         // onFocus={(focusedField) => {
//                         //     console.log('focusField', focusedField); disabled={!ready}
//                         // }}                        
//                         /> */}
//                         <Button
//                             variant="primary"
//                             disabled={!loading}
//                             title="Checkout"
//                             onPress={openPaymentSheet}
//                         />

//                         <View style={{}}>
//                             <Modal isVisible={modalVisible} style={{ margin: 0, justifyContent: 'flex-end' }}>
//                                 <View style={{ backgroundColor: 'white', }}>
//                                     <View style={{ alignItems: 'center', marginTop: 50 }}>
//                                         <Image source={require('../../../Image/checked1.png')} style={styles.checked1} />
//                                     </View>
//                                     <Text style={styles.mtxt1}>Successful</Text>
//                                     <Text style={styles.mtxt2}>Your booking is confirmed</Text>
//                                     <Text style={styles.mtxt3}>You have earned <Text style={styles.mtxt4}>100 points!</Text></Text>

//                                     <TouchableOpacity onPress={ToHome} style={{ marginTop: 30, marginBottom: 4 }}>
//                                         <Text style={globalstyles.Getbtn}>Go to Bookings</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </Modal>
//                         </View>
//                     </View>
//                 </StripeProvider>

//             </ScrollView>
//             <TouchableOpacity style={{ marginBottom: 6, }} onPress={openmodal}>
//                 {/* onPress={openmodal} */}
//                 <Text style={globalstyles.Getbtn}>Make Payment</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

