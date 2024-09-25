// T&Cs2
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { getcanfig } from '../API';

export default function TandCs2({ navigation }) {
    const [loading, setLoading] = useState(false);
    //const [user_id, setuser_id] = useState(false);
    const [data, setdata] = useState();


    useEffect(() => {
        configfun();
    }, []);

    //const navigation = useNavigation();


    const ToSignUp = () => {
        navigation.goBack();
    }

    const configfun = async () => {

        setLoading(true);
        const userData = await AsyncStorage.getItem('userdetail');
        setLoading(false);
        console.log('getrewardinfo AsyncStorage:--', userData);
        const userDataArray = JSON.parse(userData);
        //setuser_id(userDataArray.id)

        try {
            setLoading(true);
            const config = await getcanfig(global.URL + 'getcanfig.php');
            setLoading(false);

            if (config.ResponseCode == 1) {
                setdata(config.data[1]['value'])
                // console.log('configfun id--', config.data[1].id);
            } else {
                // Alert.alert('Invalid configfun');
            }
        } catch (error) {
            console.error('Error configfun  code:', error);
        }
    }
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
        <View style={styles.mainview}>
            <ScrollView>
                <TouchableOpacity onPress={ToSignUp}>
                    <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                </TouchableOpacity>

                <View style={styles.viewone}>
                    <Text style={globalstyles.hadtxt}>Terms & Conditions</Text>

                    <Text style={styles.txt1}>{data ? data : null}</Text>


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