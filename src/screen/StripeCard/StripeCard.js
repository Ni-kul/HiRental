// // StripeCard
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { CardField, createToken, useStripe } from '@stripe/stripe-react-native';

export default function StripeCard() {

    const [cardInfo, setCardInfo] = useState(null);


    const fetchCardDetail = (cardDetail) => {
        // console.log("my card details",cardDetail)
        if (cardDetail.complete) {
            setCardInfo(cardDetail)
        } else {
            setCardInfo(null)
        }
    }



    const onDone = async () => {

        console.log("cardInfocardInfocardInfo", cardInfo)
        if (!!cardInfo) {
            try {
                const resToken = await createToken({ ...cardInfo, type: 'Card' })
                console.log("resToken", resToken)

            } catch (error) {
                alert("Error raised during create token")
            }
        }


    }

    return (
        <View>
            <Text>Card</Text>
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#F5F5F5',
                    textColor: '#000000',
                    borderWidth: 1,
                    borderRadius: 8,
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    fetchCardDetail(cardDetails)
                }}
            />
            <Button title="Pay" onPress={onDone} />
        </View>
    );
};



// import React, { useState } from 'react';
// import { FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
// import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
// import { styles } from './styles';

// export default function StripeCard() {
//     const { initPaymentSheet, presentPaymentSheet } = useStripe();
//     const [selectedItems, setSelectedItems] = useState([]);

//     const cartItems = [
//         { id: '1', name: 'A', subtotal: 10, deliveryFee: 10, total: 30 },
//         { id: '2', name: 'B', subtotal: 20, deliveryFee: 10, total: 40 },
//     ];

//     const onToggleItem = (itemId) => {
//         const isSelected = selectedItems.includes(itemId);
//         if (isSelected) {
//             setSelectedItems(selectedItems.filter((id) => id !== itemId));
//         } else {
//             setSelectedItems([...selectedItems, itemId]);
//         }
//     };

//     const onCheckout = async () => {
//         if (selectedItems.length === 0) {
//             Alert.alert('Please select items to checkout');
//             return;
//         }

//         const selectedItemsData = cartItems.filter((item) => selectedItems.includes(item.id));
//         console.log('selectedItemsData', selectedItemsData)

//         const initResponse = await initPaymentSheet({
//             merchantDisplayName: 'notJust.dev',
//             paymentIntentClientSecret: 'pi_3OZpmFSBqXffrrZC0ypHRhp2_secret_7iPgC7FuYPkjGrYCI1Cl2xAx4',
//         });

//         if (initResponse.error) {
//             Alert.alert('Something went wrong');
//             return;
//         }
//         // Alert.alert('one');
//         console.log('one');
//         try {
//             const paymentResponse = await presentPaymentSheet();
//             if (paymentResponse.error) {
//                 Alert.alert(`Error code: ${paymentResponse.error.code}`);
//                 return;
//             }
//             console.log('Two');

//             // If payment is successful, create the order
//             onCreateOrder(selectedItemsData);
//         } catch (error) {
//             Alert.alert('--error', error);
//             console.log('--error', error);
//         }
//     };


//     const onCreateOrder = async (items) => {
//         try {

//             const orderRef = generateOrderRef();
//             const simulatedOrder = {
//                 status: 'OK',
//                 data: { ref: orderRef },
//             };

//             if (simulatedOrder.status === 'OK') {
//                 Alert.alert(
//                     'Order has been submitted',
//                     `Your order reference is: ${simulatedOrder.data.ref}`
//                 );
//                 // Clear the selected items after a successful order
//                 setSelectedItems([]);
//             } else {
//                 // Handle error case
//                 Alert.alert('Order creation failed');
//             }
//         } catch (error) {
//             console.log('err', error);
//             // Handle any errors
//             Alert.alert('Order creation failed');
//         }
//     };
//     const generateOrderRef = () => {
//         return 'ORDER_REF_' + Math.floor(Math.random() * 1000);
//     };

//     return (
//         <View style={styles.mainview}>
//             <StripeProvider
//                 publishableKey="pk_test_51OTeaHSBqXffrrZCK1LEoqC3gja7pyForywCr00neELKo12IpipXY9pQ43MIxX51J4cWFQi0FynBvpBM63lgz4Cm00HdERJ8VH"
//                 urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
//             >
//                 <View style={styles.viewtwo}>
//                     <Text style={styles.txt1}>Card Details</Text>

//                     <FlatList
//                         data={cartItems}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity onPress={() => onToggleItem(item.id)}>
//                                 <Text style={{ fontWeight: selectedItems.includes(item.id) ? 'bold' : 'normal' }}>
//                                     {item.name}
//                                 </Text>
//                             </TouchableOpacity>
//                         )}
//                         keyExtractor={(item) => item.id}
//                     />

//                     <TouchableOpacity onPress={onCheckout}>
//                         <Text style={styles.buttonText}>Checkout</Text>
//                     </TouchableOpacity>
//                 </View>
//             </StripeProvider>
//         </View>
//     );
// }

