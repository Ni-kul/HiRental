// RentalDetails
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { cancelbooking } from '../API';


export default function RentalDetails({ route }) {

    const navigation = useNavigation();
    const ToGetHelp = () => {
        navigation.navigate('GetHelp');
    }
    const { selectedData } = route.params || {};

    const { image, name, attechment, created_date, discount, duration, id, lamp_pol_number, start_time, end_time, list_id, location, payment_status, period, postal_code, promocode, redeemed_point, start_date, status, total, transport_fees, user_id, new_start_date } = selectedData;
    const rentalcharge = parseFloat(total) + parseFloat(promocode);
    const [loading, setLoading] = useState(false);

    const ToRentals = () => {
        navigation.navigate('Rentals');
    }
    const cancelbookingbyid = async (id) => {

        const data = {
            booking_id: id,
        }
        try {
            setLoading(true);
            const response = await cancelbooking(global.URL + 'cancelbooking.php', data);
            setLoading(false);
            if (response) {
                console.log('cancelbooking API response:--', response);

                Alert.alert('Booking successfully cancelled.');
                navigation.navigate('Rentals');

            }


        } catch (error) {
            console.error('Error in cancelbooking API call:', error);
        }

    }



    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }}>
        <View style={styles.mainview}>
            {
                loading ?
                    <View style={globalstyles.spinner}>
                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                    </View>
                    : null
            }
            <ScrollView>

                <View style={styles.arrowview}>
                    <TouchableOpacity onPress={ToRentals}>
                        <Image source={require('../../../Image/previous1.png')} style={styles.imagearrow} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ToGetHelp}>
                        <Text style={styles.NeedHelptxt}>Need Help?</Text>
                    </TouchableOpacity>
                </View>
                <Image source={{ uri: `${global.IMG + image}` }} style={styles.Rectangle18} />

                <View style={styles.viewone}>
                    <Text style={styles.txt1}>{name}</Text>
                    <Text style={styles.txt4}>Dates</Text>

                    {/* {period === '' ? (
                        <Text style={styles.txt2}>{start_date} - {period} P</Text>
                    ) : (
                        <Text style={styles.txt2}>{start_date} ''</Text>
                    )} */}
                    {/* {console.log('period:', period)} */}
                    {period !== 'NaN undefined NaN' ? (
                        // <View>
                        <Text style={styles.txt2}>{start_date} - {period}</Text>
                        // <Text>
                        // </Text></View>
                    ) : (
                        <View>
                            <Text style={styles.txt2}>{start_date}</Text>
                            {/* <Text style={styles.txt2}>{`${start_time} - ${end_time}`}</Text> */}
                        </View>
                    )}

                    <Text style={styles.txt4}>Location</Text>
                    <Text style={styles.txt2}>{location}</Text>
                </View>
                <Text style={globalstyles.line1}></Text>
                {/* {start2date(period)} */}
                <View style={styles.viewtwo}>
                    <View style={styles.viewthree}>
                        <Text style={styles.txtTotal}>Total Charges</Text>
                        <Text style={styles.txtred}>${total}</Text>
                    </View>
                    <View style={styles.viewfour}>
                        <Text style={styles.txt2}>Rental Charges</Text>
                        <Text style={styles.txt2}>${rentalcharge}</Text>
                    </View>
                    {transport_fees == '' ? null :
                        <View style={styles.viewthree}>
                            <Text style={styles.txt2}>Transportation Fees</Text>
                            <Text style={styles.txt2}>${transport_fees}</Text>
                        </View>
                    }
                    {promocode == 0 ? null :
                        <View style={styles.viewthree}>
                            <Text style={styles.txt2}>Promocode</Text>
                            <Text style={styles.txt2}>-${promocode}</Text>
                        </View>
                    }
                    {redeemed_point == '' ? null :
                        <View style={styles.viewthree}>
                            <Text style={styles.txt2}>Redeemed Points</Text>
                            <Text style={styles.txt2}>-${redeemed_point}</Text>
                        </View>
                    }
                </View>


                <Text style={globalstyles.line1}></Text>
                <View style={styles.payMethodview}>
                    <Text style={styles.txt4}>Payment Method</Text>
                    <Image source={require('../../../Image/image3.png')} style={styles.image3} />
                </View>
                <Text style={globalstyles.line1}></Text>

                {(global.current_date < new_start_date) ?
                    <View style={styles.viewfive}>
                        <TouchableOpacity>
                            <Text style={styles.txt6}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { cancelbookingbyid(id) }}>
                            <Text style={styles.txt7}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null}

                {/* {
                        status == 2 ?
                            <TouchableOpacity>
                                <Text style={styles.txt7}>Canceled</Text>
                            </TouchableOpacity>
                            :
                            (global.current_date > new_start_date) ?
                                <TouchableOpacity onPress={() => { cancelbookingbyid(id) }}>
                                    <Text style={styles.txt7}>Cancel</Text>
                                </TouchableOpacity>
                                :
                                null
                    } */}
            </ScrollView>
        </View>
    </SafeAreaView>
    )
}
