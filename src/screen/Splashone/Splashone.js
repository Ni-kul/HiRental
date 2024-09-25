import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';

export default function Splashone() {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', () => {
        const checkUserLogin = async () => {
            setLoading(true);
            const userDataString = await AsyncStorage.getItem('userdetail');
            setLoading(false);
            console.log('spalsh1- screen---', userDataString)
            if (userDataString) {
                // console.log('spalsh1 screen---', userDataString)
                navigation.navigate('Home');
            } else {
                navigation.navigate('Splashtwo');
            }
        }
        const timer = setTimeout(checkUserLogin, 1000);

        return () => clearTimeout(timer);
        })
    }, []);

    return (
        <View style={styles.mainview}>
            <Image source={require('../../../Image/image1.png')} style={styles.image} />
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
        </View>
    )
}
//  useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigation.navigate('Splashtwo');
    //     }, 3000);

    //     return () => clearTimeout(timer);
    // }, []);