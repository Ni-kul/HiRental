import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ScrollView, ActivityIndicator, SafeAreaView,Alert } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { myrental } from '../API';

export default function Reward({navigation}) {
    const [loading, setLoading] = useState(false);
    const [Rewarddata, setRewarddata] = useState('');
    const [points, setpoints] = useState(0);



    useEffect(() => {
        navigation.addListener('focus', () => {
            getrewardinfo();
        })

    }, []);
    // getreward.php
    // user_id
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



    const getrewardinfo = async () => {

       
        const userData = await AsyncStorage.getItem('userdetail');

        if(userData){

            setLoading(true);

            const userDataArray = JSON.parse(userData);
            const data = {user_id: userDataArray.id}
            setLoading(true);
            const rewardinfo = await myrental(global.URL + 'myrental.php', data);
            setLoading(false);

            if(rewardinfo.ResponseCode == 1) {
                setRewarddata(rewardinfo.data);
                setpoints(rewardinfo.points);
            }

            setLoading(false);

        }else{
            showAlert();
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
                <View style={{ width: '92%', alignSelf: 'center' }}>
                    <Text style={globalstyles.hadtxt}>Reward</Text>
                </View>


                <View style={styles.viewone}>
                    <View style={styles.viewtwo}>
                        <Text style={styles.txt1}>Your Points</Text>
                        <Text style={styles.txt2}>{points}</Text>
                    </View>
                </View>
                <Text style={globalstyles.line1}></Text>

                {Rewarddata == '' ?
                    <View style={{ marginLeft: '4%', alignSelf: 'center' }}>
                        <Text style={styles.txt1}>No Reward Found</Text>
                    </View>
                    :

                    Rewarddata && Rewarddata.length > 0 ? (
                        Rewarddata.map((d, index) => (
                            <View key={index}>


                                <View style={styles.viewthree}>
                                    <Text style={styles.txt3}>Transactions</Text>
                                    <Text style={styles.txt4}>{d.created_date}</Text>
                                    <View style={styles.viewfour}>
                                        <Text style={styles.txt5}>Booking ID {d.id} ${d.total}</Text>
                                        <Text style={styles.greentxt}>+{d.earned_point} Pts</Text>
                                    </View>
                                    {d.redeemed_point ?
                                        <View style={styles.viewfour}>
                                            <Text style={styles.txt5}>Booking ID {d.id} Redeem {d.redeemed_point} points</Text>
                                            <Text style={styles.orangetxt}>-{d.redeemed_point} Pts</Text>
                                        </View> : null
                                    }

                                </View>

                                <Text style={globalstyles.line1}></Text>

                            </View>
                        ))
                    ) : (
                        
                         <Text style={styles.nodata}>No data available</Text>
                    )
                }

            </ScrollView>
        </View>
    </SafeAreaView>
    )
}
