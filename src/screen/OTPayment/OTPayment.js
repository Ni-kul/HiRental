// HistoryDetails
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';

export default function OTPayment() {
    const [promocode, setpromocode] = useState('')

    const navigation = useNavigation();

    const ToHistoryDetails = () => {
        navigation.navigate('HistoryDetails');
    }
    return (
        <View style={styles.mainview}>
            <ScrollView>

                <TouchableOpacity onPress={ToHistoryDetails}>
                    <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                </TouchableOpacity>
                <View style={styles.mainScroll}>
                    <View style={styles.maindateview}>
                        <View >
                            <Text style={styles.txt1}>Start Date</Text>
                            <Text style={styles.txt2}>30 Aug 2023</Text>
                        </View>
                        <View style={styles.dateview}>
                            <Text style={styles.txt1}>Time</Text>
                            <Text style={styles.txt2}>8:00am to 12:00pm</Text>
                        </View>
                    </View>
                    <Text style={styles.txt3}>Location</Text>
                    <Text style={styles.txt2}>101 Singapore Road, S983001</Text>
                    <Text style={styles.txt3}>Lamp Pole Number</Text>
                    <Text style={styles.txt2}>13</Text>
                </View>
                <Text style={globalstyles.line1}></Text>

                <View style={styles.mainScroll1}>
                    <Text style={styles.txt3}>Any Promocode?</Text>
                    <View style={styles.inputtxtview1}>
                        <TextInput
                            style={styles.intxt}
                            placeholder='Enter Promocode'
                            placeholderTextColor='#999CA5'
                            color='black'
                            value={promocode}
                            onChangeText={(text) => setpromocode(text)}
                        >
                        </TextInput>
                        <TouchableOpacity>
                            <Text style={styles.txt4}>Enter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={globalstyles.line1}></Text>
                <View style={styles.mainScroll2}>
                    <TouchableOpacity >
                        <View style={styles.pointsview}>
                            <Text style={styles.txt5}>Redeem Points?</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={globalstyles.line1}></Text>

                <View style={styles.mainScroll3}>
                    <Text style={styles.txt5}>Total Charges</Text>
                    <View style={styles.chargeview1}>
                        <Text style={styles.txt6}>Rental Charges</Text>
                        <Text style={styles.txt6}>$400</Text>
                    </View>
                    <View style={styles.chargeview}>
                        <Text style={styles.txt6}>Transportation Fees</Text>
                        <Text style={styles.txt6}>$80</Text>
                    </View>
                    <View style={styles.chargeview}>
                        <Text style={styles.txt6}>Promocode</Text>
                        <Text style={styles.txt6}>-$10</Text>
                    </View>
                    {/* {calculatedAmoun ? */}
                    <View style={styles.chargeview}>
                        <Text style={styles.txt6}>Redeemed Points</Text>
                        <Text style={styles.txt6}>-$</Text>
                    </View>
                    <View style={styles.chargeview}>
                        <Text style={styles.txt8}>OT Payment from prev order</Text>
                        <Text style={styles.txt8}>$60</Text>
                    </View>
                    {/* :
                        null
                    } */}
                </View>
                <Text style={globalstyles.line1}></Text>

                <View style={styles.mainScroll4}>
                    <View style={styles.payMethodview}>
                        <Text style={styles.txt5}>Payment Method</Text>
                        <Image source={require('../../../Image/image3.png')} style={styles.image3} />
                    </View>
                    <View style={styles.payMethodview1}>
                        <Text style={styles.txt5}>Total Charges</Text>
                        <Text style={styles.txt7}> $</Text>
                    </View>

                </View>
                <TouchableOpacity style={{ marginBottom: 6, marginTop: 1 }} >
                    <Text style={globalstyles.Getbtn}>Make Payment</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}
