// HistoryDetails
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';

export default function HistoryDetails({ route }) {

    const navigation = useNavigation();
    const [location, setlocation] = useState('');
    const [period, setperiod] = useState('');
    const [image, setimage] = useState(null);
    const [name, setname] = useState('');
    const [promocode, setpromocode] = useState('');
    const [start_date, setstart_date] = useState('');
    const [start_time, setstart_time] = useState('');
    const [end_time, setend_time] = useState('');
    const [total, settotal] = useState('');
    const [transport_fees, settransport_fees] = useState('');
    const [redeemed_point, setredeemed_point] = useState('');
    const [rentalcharge, setrentalcharge] = useState('');

    useEffect(() => {
        let dataa = route.params;
        // console.log('dataa', dataa.selectedData)
        setimage(dataa.selectedData.image);
        setname(dataa.selectedData.name)
        settotal(dataa.selectedData.total)
        setpromocode(dataa.selectedData.promocode)
        setstart_date(dataa.selectedData.start_date)
        setstart_time(dataa.selectedData.start_time)
        setend_time(dataa.selectedData.end_time)
        settransport_fees(dataa.selectedData.transport_fees)
        setredeemed_point(dataa.selectedData.redeemed_point)
        setlocation(dataa.selectedData.location);
        setperiod(dataa.selectedData.period)

       
        const rentalcharge = parseFloat(dataa.selectedData.total) + parseFloat(dataa.selectedData.promocode);
        
        setrentalcharge(rentalcharge);

    }, []);

    const ToRentalHistory = () => {
        navigation.navigate('RentalHistory');
    }
    // const ToOTPayment = () => {
    //     navigation.navigate('OTPayment');
    // }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <View style={styles.mainview}>
            <ScrollView>

                <View style={styles.viewhead}>
                    <TouchableOpacity onPress={ToRentalHistory}>
                        <Image source={require('../../../Image/previous1.png')} style={styles.imgarrow} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={ToOTPayment}>
                        <Text style={styles.OTtxt}>Pay OT</Text>
                    </TouchableOpacity> */}
                </View>
                {/* <Text style={styles.OTtxt2}>Please pay the overtime payment</Text> */}

                <Image source={{ uri: `${global.IMG + image}` }} style={styles.Rectangle18} />

                <View style={styles.viewone}>
                    <Text style={styles.txt1}>{name}</Text>
                    <Text style={styles.txt4}>Dates</Text>

                    {console.log('period:', period)}
                    {period !== 'NaN undefined NaN' ? (
                        <Text style={styles.txt2}>{start_date} - {period}</Text>

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
                {/* <View style={styles.viewfive}>
                    <Text style={styles.txt4}>OT Payment</Text>
                    <Text style={styles.txtred}>$100</Text>
                </View> */}
            </ScrollView>
        </View>
    </SafeAreaView >
    )
}
