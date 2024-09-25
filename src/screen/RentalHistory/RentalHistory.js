// RentalHistory
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { myrental } from '../API';

export default function RentalHistory() {
    const [loading, setLoading] = useState(false);
    const [Getdata, setGetdata] = useState([]);
    const [current_date, setcurrent_date] = useState('');
    const navigation = useNavigation();

    const ToProfile = () => {
        navigation.navigate('Profile');
    }

    const ToHistoryDetails = (selectedData) => {
        navigation.navigate('HistoryDetails', { selectedData });
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            rentall();
        })
    }, []);

    const rentall = async () => {
        setLoading(true);
        const userData = await AsyncStorage.getItem('userdetail');
        setLoading(false);
        // console.log('userData in AsyncStorage:', userData);
        const userDataArray = JSON.parse(userData);
        const data = {
            user_id: userDataArray.id,
        }
        try {
            setLoading(true);
            const response = await myrental(global.URL + 'myrental.php', data);
            setLoading(false);

            // console.log('RentalHistory API response:--', response);

            if (response.ResponseCode == 1) {
                setcurrent_date(response.current_date);
                if (response.data == null) {
                    // Alert.alert('Not Available');
                } else {
                    // setGetdata(response.data)
                    const filteredData = await response.data.filter(result =>
                    ((result.new_start_date <= response.current_date && result.new_end_date < response.current_date) ||
                        (result.new_start_date < response.current_date && result.new_end_date == null) ||
                        (result.status == 2))
                    );
                    // console.log('filteredData-->', filteredData)
                    setGetdata(filteredData)
                }
                // Alert.alert(response);
            } else if (response.ResponseCode == 0) {
                Alert.alert(response.ResponseMsg)
            }
        } catch (error) {
            // console.error('Error in RentalHistory API call:', error);
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
                <TouchableOpacity onPress={ToProfile}>
                    <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                </TouchableOpacity>
                <View style={{ marginLeft: '4%' }}>
                    <Text style={globalstyles.hadtxt}>Rental History</Text>
                </View>

                {/* <View style={styles.viewtwo}> */}
                <View style={styles.viewone}>

                    {Getdata.length > 0 ? (
                        Getdata.map((result, index) => (
                            // (((result.new_start_date <= current_date && result.new_end_date <= current_date) || (result.new_start_date < current_date && result.new_end_date == null) || (result.status == 2)) ?

                            <View key={index}>
                                <View style={styles.viewtwoqqq} >
                                    <View style={styles.imgview}>
                                        <TouchableOpacity onPress={() => ToHistoryDetails(result)}>
                                            <Image source={{ uri: `${global.IMG + result.image}` }} style={styles.Rectangle18} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.viewthree} onPress={() => ToHistoryDetails(result)}>

                                        <Text style={styles.txt1}>{result.name}</Text>
                                        {result.start_time !== '' && (
                                            <Text style={styles.txt2}>{`${result.start_date}`}</Text>
                                        )}
                                        {result.start_time === '' && (
                                            <Text style={styles.txt2}>{`${result.start_date} - ${result.period}`}</Text>
                                        )}
                                        {/* <Text style={styles.txt2}>{result.start_date} - {result.period}</Text> */}
                                        <Text style={styles.txt2}>{result.location}</Text>
                                        {/* {result.status == 0 ?
                                            <Text style={styles.txt3}>Upcoming</Text> : null
                                        }
                                        {result.status == 2 ?
                                            <Text style={styles.txt3}>Canceled</Text> : null
                                        }
                                        {result.status == 1 ?
                                            <Text style={styles.txt3}>Past</Text> : null
                                        } */}
                                        {result.status == 2 ? <Text style={styles.txt3}>Canceled</Text> :
                                            <Text style={styles.txt3}>Completed</Text>
                                        }


                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={globalstyles.line1}></Text>
                                </View>
                            </View>
                            //     :
                            //     null
                            // )
                        ))
                    ) : (
                        <Text style={globalstyles.nothadtxt}>Not Available</Text>
                    )}

                </View>
            </ScrollView>

        </View>
    </SafeAreaView>
    )
}
