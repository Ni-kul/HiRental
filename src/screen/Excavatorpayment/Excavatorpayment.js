import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { applycoupon } from '../API';
// category
export default function Excavatorpayment({ route }) {

    let {
        // selectedId2,
        radiobtntwo,
        tot,
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
        rentCharges,
        formetdatefff,
        formetdate1,
        enddate,
        locationone,
        city,
        polenum2,
        polenum,
        Period
    } = route.params;

    const [promocode, setpromocode] = useState('')
    const [totalCharges, setTotalCharges] = useState('');
    const [msg1, setmsg1] = useState('');

    const [loading, setLoading] = useState(false);
    const [user_id, setuser_id] = useState('');
    const [promoCodeDiscountr, setPromoCodeDiscountr] = useState(0);
    const calculatedAmount = global.calculatedAmount;
    const rentalCharges = Number(rentCharges);

    const transportationFees = 0;

    useEffect(() => {

        navigation.addListener('focus', () => {

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
            };
            loadData();

            console.log('rentalCharges', rentalCharges);
            console.log('transportationFees', transportationFees);
            console.log('calculatedAmount', global.calculatedAmount);
            console.log('promoCodeDiscountr--', promoCodeDiscountr);

            let newTotalCharges = '';
            console.log('new-total', newTotalCharges)
            if (promoCodeDiscountr > 0 && global.calculatedAmount > 0) {
                newTotalCharges = rentalCharges + transportationFees - promoCodeDiscountr - global.calculatedAmount;
                console.log('newTotalCharges-A', newTotalCharges);
            }
            else if (global.calculatedAmount >= 1) {
                newTotalCharges = rentalCharges + transportationFees - global.calculatedAmount;
                console.log('newTotalCharges-B', newTotalCharges);
            }
            else if (promoCodeDiscountr > 0) {
                newTotalCharges = rentalCharges + transportationFees - promoCodeDiscountr;
                console.log('newTotalCharges-C', newTotalCharges);
            }
            else {
                newTotalCharges = rentalCharges + transportationFees;
                console.log('newTotalCharges-D', newTotalCharges);
            }
            setTotalCharges(newTotalCharges.toFixed(2));

        })

    }, [promoCodeDiscountr, global.calculatedAmount]);


    const valueformatedatetwo2 = () => {

        if (Period == 1 && radiobtnone == 0) {
            enddate = formetdatefff;
            return formetdatefff;
        } else {
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July",
                "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dates = new Date(enddate);
            // console.log('dates', dates)
            var dd = dates.getDate();
            // console.log('dd', dd)
            var mm = month[dates.getMonth()];
            // console.log('mm', mm)
            var yyyy = dates.getFullYear();
            // console.log('yyyy', yyyy)
            var conformdate = dd + ' ' + mm + ' ' + yyyy
            console.log('conformdate-enddate', conformdate)
            enddate = conformdate;
            return conformdate;
        }
    }

    const navigation = useNavigation();
    const navigateToRedeemPoints = () => {
        navigation.navigate('RedeemPoints', {
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
            rentCharges,
            formetdatefff,
            formetdate1,
            enddate,
            locationone,
            city,
            polenum,
            polenum2,
            promoCodeDiscountr,
        });
    }
    const navigateToTandCs = () => {
        
       
        navigation.navigate('TandCs', {
            // selectedId2,
            radiobtntwo,
            isid,
            category,
            totalCharges,
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
            formetdate1,
            enddate,
            locationone,
            city,
            polenum,
            polenum2,
            promoCodeDiscountr,
            calculatedAmount,
            promocode,
        });
    }

    const ToExcavatorRental = () => {
        navigation.navigate('ExcavatorRental');
    }

    const rentnowfun = async () => {
        if (promocode == '') {
            setmsg1('*Enter Promocode')
        } else {
            setmsg1('')

            const data = {
                user_id: user_id,
                code: promocode,
            }
            try {
                setLoading(true);
                const rent = await applycoupon(global.URL + 'applycoupon.php', data);
                setLoading(false);
                console.log('applycoupon API response:--', rent);
                if (rent.ResponseCode == 1) {
                    if (rent.data.type == 2) {
                        const promoCodeDiscountPercentage = rent.data.percentage;
                        console.log('promoCodeDiscountPercentage:--', promoCodeDiscountPercentage);

                        const promoCodeDiscount = promocode ? (rentalCharges + transportationFees) * (promoCodeDiscountPercentage / 100) : 0;
                        console.log('promoCodeDiscount:100--', promoCodeDiscount);

                        let newTotalCharges = '';
                        console.log('new-total1', newTotalCharges)
                        if (global.calculatedAmount > 0) {
                            newTotalCharges = rentalCharges + transportationFees - promoCodeDiscount - global.calculatedAmount;
                            console.log('newTotalCharges--code1', newTotalCharges)
                        } else {
                            newTotalCharges = rentalCharges + transportationFees - promoCodeDiscount;
                            console.log('newTo{{}}1:--', newTotalCharges);
                        }

                        setPromoCodeDiscountr(promoCodeDiscount.toFixed(2));
                        setTotalCharges(newTotalCharges.toFixed(2));
                        Alert.alert('Succesfully Applied Promocode')
                    } else {
                        if (rent.data.type == 1) {
                            const promoCodeDiscountPercentage = rent.data.percentage;
                            console.log('promoCodeDiscountPercentage:--', promoCodeDiscountPercentage);

                            const promoCodeDiscount = promocode ? promoCodeDiscountPercentage : 0;

                            let newTotalCharges = '';
                            console.log('new-total2', newTotalCharges)
                            if (global.calculatedAmount > 0) {
                                newTotalCharges = rentalCharges + transportationFees - promoCodeDiscount - global.calculatedAmount;
                                console.log('newTotalCharges--code2', newTotalCharges)
                            } else {
                                newTotalCharges = rentalCharges + transportationFees - promoCodeDiscount;
                                console.log('newTo{{}}2:--', newTotalCharges);
                            }
                            // const newTotalCharges = rentalCharges + transportationFees - promoCodeDiscount ;

                            setPromoCodeDiscountr(promoCodeDiscount);
                            setTotalCharges(newTotalCharges.toFixed(2));
                            Alert.alert('Succesfully Applied promocode')
                        }
                    }

                } else {
                    setPromoCodeDiscountr(0);
                    // const newTotalCharges = rentalCharges + transportationFees - calculatedAmount;
                    let newTotalCharges = '';
                    if (global.calculatedAmount > 0) {
                        newTotalCharges = rentalCharges + transportationFees - global.calculatedAmount;
                        console.log('newTotalCharg--', newTotalCharges)
                    }
                    else {
                        newTotalCharges = rentalCharges + transportationFees;
                        console.log('newTotalCharg --', newTotalCharges)
                    }
                    setTotalCharges(newTotalCharges.toFixed(2));
                    Alert.alert('Invalid promocode');
                }
            } catch (error) {
                console.error('Error applying promo code:', error);
            }
        }
    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }}>
        <View style={styles.mainview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>
                <TouchableOpacity onPress={ToExcavatorRental}>
                    <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                </TouchableOpacity>
                {category == 2 ?
                    <View style={styles.mainScroll}>
                        <View style={styles.maindateview}>
                            <View >
                                <Text style={styles.txt1}>Start Date</Text>
                                <Text style={styles.txt2}>{formetdatefff}</Text>
                            </View>
                            <View style={styles.dateview}>
                                <Text style={styles.txt1}>End Date</Text>
                                <Text style={styles.txt2}>{valueformatedatetwo2(enddate)}</Text>
                            </View>
                        </View>
                        <Text style={styles.txt3}>Location</Text>
                        <Text style={styles.txt2}>{locationone}</Text>
                        <Text style={styles.txt3}>Lamp Pole Number</Text>
                        <Text style={styles.txt2}>{polenum}</Text>
                    </View>
                    :
                    null}

                {category == 3 ?
                    <View style={styles.mainScroll}>
                        <View style={styles.maindateview}>
                            <View >
                                <Text style={styles.txt1}>Dates</Text>
                                <Text style={styles.txt2}>{formetdate2}</Text>
                            </View>

                            {radiobtntwo == '0' ?

                                <View style={styles.dateview}>
                                    <Text style={styles.txt1}>Number of Trips</Text>
                                    <Text style={styles.txt2}>{trips}</Text>
                                </View>
                                :
                                <View style={styles.dateview}>
                                    <Text style={styles.txt1}>Time</Text>
                                    {radiobtntwo == '6' ?

                                        <Text style={styles.txt2}>08:00 AM to 05:00 PM</Text>
                                        :
                                        <Text style={styles.txt2}>{sendtime.toString()} {sendtimetwo ? ' to ' : ''}{sendtimetwo.toString()}</Text>
                                    }
                                </View>
                            }

                        </View>
                        <Text style={styles.txt3}>Location</Text>
                        <Text style={styles.txt2}>{location}</Text>
                        {location2 != '' && <Text style={styles.txt2}>{location2}</Text>}
                    </View>
                    :
                    null}

                <Text style={styles.line}></Text>

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
                        <TouchableOpacity onPress={rentnowfun}>
                            <Text style={styles.txt4}>Enter</Text>
                        </TouchableOpacity>
                    </View>
                    {msg1 ? <Text style={styles.msg2}>{msg1}</Text> : null}

                </View>
                <Text style={styles.line}></Text>

                <View style={styles.mainScroll2}>
                    <TouchableOpacity onPress={navigateToRedeemPoints}>
                        <View style={styles.pointsview}>
                            <Text style={styles.txt5}>Redeem Points?</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.line}></Text>
                <View style={styles.mainScroll3}>
                    <Text style={styles.txt5}>Total Charges</Text>
                    <View style={styles.chargeview1}>
                        <Text style={styles.txt6}>Rental Charges</Text>
                        <Text style={styles.txt6}>${rentCharges}</Text>
                    </View>
                    {/* <View style={styles.chargeview}>
                        <Text style={styles.txt6}>Transportation Fees</Text>
                        <Text style={styles.txt6}>$80</Text>
                    </View> */}
                    {promoCodeDiscountr == 0 ? null
                        :
                        <View style={styles.chargeview}>
                            <Text style={styles.txt6}>Discount</Text>
                            {/* <Text style={styles.txt6}>-$00</Text> */}
                            <Text style={styles.txt6}>-${promoCodeDiscountr}</Text>
                        </View>
                    }
                    {calculatedAmount ?
                        <View style={styles.chargeview}>
                            <Text style={styles.txt6}>Redeemed Points</Text>
                            <Text style={styles.txt6}>-${calculatedAmount}</Text>
                        </View>
                        :
                        null
                    }
                </View>
                <Text style={styles.line}></Text>
                <View style={styles.mainScroll4}>
                    <View style={styles.payMethodview}>
                        <Text style={styles.txt5}>Payment Method</Text>
                        <Image source={require('../../../Image/image3.png')} style={styles.image3} />
                    </View>
                    <View style={styles.payMethodview1}>
                        <Text style={styles.txt5}>Total Charges</Text>
                        {calculatedAmount?
                                <Text style={styles.txt7}> ${totalCharges-calculatedAmount}</Text>:
                                <Text style={styles.txt7}> ${totalCharges}</Text>
                        }
                        
                    </View>

                </View>
                <TouchableOpacity style={{ marginBottom: 6, marginTop: 1 }} onPress={navigateToTandCs}>
                    <Text style={globalstyles.Getbtn}>Make Payment</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    </SafeAreaView>
    )
}
