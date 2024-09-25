import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalstyles } from '../../globalstyles';
import { myrental } from '../API';

export default function Rentals() {
    const [loading, setLoading] = useState(false);
    const [Getdata, setGetdata] = useState([]);
    const [current_date, setcurrent_date] = useState('');
    // const [lastdate, setlastdate] = useState('');
    let counter = 0;
    const navigation = useNavigation();
    const ToRentalDetails = (selectedData) => {
        global.current_date = current_date;
        navigation.navigate('RentalDetails', { selectedData });
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
        if(userData){
            const userDataArray = JSON.parse(userData);
        const data = {
            user_id: userDataArray.id,
        }
        try {
            setLoading(true);
            const response = await myrental(global.URL + 'myrental.php', data);
            setLoading(false);

            // console.log('myrental API response:--', response);

            if (response.ResponseCode == 1) {
                setcurrent_date(response.current_date);
                if (response.data == null) {
                    // Alert.alert('Not Available');
                } else {
                    // setGetdata(response.data.map(item => ({
                    //     ...item,
                    //     start_date: item.start_date,
                    //     period: formatDate(item.period)
                    // })));

                    const filteredData = await response.data.filter(result =>
                        !((result.new_start_date <= response.current_date && result.new_end_date < response.current_date) ||
                            (result.new_start_date < response.current_date && result.new_end_date == null) ||
                            (result.status == 2))
                    );
                    // console.log('filteredData--> ', filteredData)

                    setGetdata(filteredData.map(item => ({
                        ...item,
                        start_date: item.start_date,
                        period: formatDate(item.period)
                    })))
                    // Alert.alert('myrental succesfully'); 
                    // setGetdata(response.data);
                }

                } else if (response.ResponseCode == 0) {
                    Alert.alert(response.ResponseMsg)
                }
            } catch (error) {
                console.error('Error in myrental API call:', error);
            }
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

  
    const isUpcoming = (startD, endD) => {
        // console.log('startD , endD ', startD, endD)
        const sdate = startD;
        //const edate = '2024-04-12';
        const edate = endD;

        const startDate = new Date(sdate); // Start date

        // Check if end date is provided and not empty
        let endDate = null;
        if (edate) {
            endDate = new Date(edate);   // End date
        }

        const cdate = current_date;
        const currentDate = new Date(cdate);  // Current date

        if (endDate && (currentDate >= startDate && currentDate <= endDate)) {
            return false;
        }
        else if (startDate > currentDate) {
            return true;
        }
        else if (currentDate.getTime() === startDate.getTime()) {
            return false;
        }
        // else if (startDate <= currentDate && endDate <= currentDate) {
        //     return false; // Event is not upcoming
        // }
        else {
            return false;
        }
    };
    const formatDate = (dateString) => {
        // console.log('dateString', dateString)

        const date = new Date(dateString);

        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dd = date.getDate();
        var mm = month[date.getMonth()];
        var yyyy = date.getFullYear();
        var conformdate = dd + ' ' + mm + ' ' + yyyy;
        return conformdate;
    };

    // myrental.php
    // user_id
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }}>
        <View style={styles.mainview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>
                <View style={{ width: '92%', alignSelf: 'center' }}>
                    <Text style={globalstyles.hadtxt}>Rentals</Text>
                </View>

                <View style={styles.viewone}>
                    {Getdata.length > 0 ? (
                        Getdata.map((result, index) => (
                            // ((result.new_start_date <= current_date && result.new_end_date <= current_date) || (result.new_start_date < current_date && result.new_end_date == null) || (result.status == 2)) ?
                            // null
                            // { counter == 0 ? <Text style={globalstyles.nothadtxt}>Not Available 11</Text> : null}
                            // :

                            <View key={index}>
                                {/* {counter++} */}
                                <View style={styles.viewtwoqqq} >
                                    <View style={styles.imgview}>
                                        <TouchableOpacity onPress={() => ToRentalDetails(result)}>
                                            <Image source={{ uri: `${global.IMG + result.image}` }} style={styles.Rectangle18} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.viewthree} onPress={() => ToRentalDetails(result)}>

                                        <Text style={styles.txt1}>{result.name}</Text>
                                        {/* {(result.start_date == ' ' && result.period == ' ') ?
                                            <Text style={styles.txt2}>{`${result.start_time} - ${result.end_time}`}</Text>
                                            :
                                            <Text style={styles.txt2}>{`${result.start_date} - ${result.period}`}</Text>
                                        } */}
                                        {/* <Text style={styles.txt2}>{result.start_date}</Text> */}

                                        {result.start_time !== '' && (
                                            <View>
                                                <Text style={styles.txt2}>{`${result.start_date}`}</Text>
                                                {/* <Text style={styles.txt2}>{`${result.start_time} - ${result.end_time}`}</Text> */}
                                            </View>
                                        )}
                                        {result.start_time === '' && (
                                            result.period ?
                                                <Text style={styles.txt2}>{`${result.start_date} - ${result.period}`}</Text>
                                                : null
                                        )}
                                        {/* ${result.start_date}*/}
                                        <Text style={styles.txt2}>{result.location != 'undefined' ? result.location : null}</Text>

                                        {/* {result.new_start_date < current_date ?
                                            <Text style={styles.txt3}>Ongoing</Text> : null
                                        } */}
                                        {isUpcoming(result.new_start_date, result.new_end_date) ? (
                                            <Text style={styles.txt3}>Upcoming</Text>
                                        ) : (
                                            <Text style={styles.txt3}>Ongoing</Text>
                                        )}

                                        {/* {result.status == 0 && result.new_start_date > current_date ?
                                            <Text style={styles.txt3}>Upcoming</Text> : null
                                        } */}

                                        {/* {result.status == 2 ?
                                            <Text style={styles.txt3}>Canceled</Text> : null
                                        }
                                        {result.status == 1 ?
                                            <Text style={styles.txt3}>Completed</Text> : null
                                        } */}

                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={globalstyles.line1}></Text>
                                </View>
                            </View>
                            // )
                        ))
                    ) : (
                        // null
                        <Text style={globalstyles.nothadtxt}>Not data available</Text>
                    )
                    }
                    {/* <Text style={globalstyles.line1}></Text> */}

                </View>
                {/* <View>
                    <Text style={globalstyles.line1}></Text>
                </View> */}
            </ScrollView>

        </View >
    </SafeAreaView>
    )
}
