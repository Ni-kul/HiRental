// Privacypolicy
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { globalstyles } from '../../globalstyles';
import { getcanfig } from '../API';

export default function Privacypolicy({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState();

    useEffect(() => {
        configfun();
    }, []);


    const Toback = () => {
        navigation.goBack();
    }

    const configfun = async () => {

        setLoading(true);
        const userData = await AsyncStorage.getItem('userdetail');
        setLoading(false);
        // console.log('getrewardinfo AsyncStorage:--', userData);
        const userDataArray = JSON.parse(userData);

        try {
            setLoading(true);
            const config = await getcanfig(global.URL + 'getcanfig.php');
            setLoading(false);

            if (config.ResponseCode == 1) {
                setdata(config.data[2]['value'])
            } else {
                // Alert.alert('Invalid configfun');
            }
        } catch (error) {
            console.error('Error configfun  code:', error);
        }
    }
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
        <View style={globalstyles.configmainview}>
            <ScrollView>
                <TouchableOpacity onPress={Toback}>
                    <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                </TouchableOpacity>

                <View style={globalstyles.configview}>
                    <Text style={globalstyles.hadtxt}>Privacy policy</Text>
                    <Text style={globalstyles.getconfigtxt}>{data ? data : null}</Text>
                </View>
            </ScrollView>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
        </View>
    </SafeAreaView>
    )
}