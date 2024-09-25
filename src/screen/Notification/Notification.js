// T&Cs2
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { getreward } from '../API';

export default function Notification({ navigation }) {
    const [loading, setLoading] = useState(false);
    //const [user_id, setuser_id] = useState(false);
    const [data, setdata] = useState([]);


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


        const userDataArray = JSON.parse(userData);


        try {

            const data = {
                user_id: userDataArray.id,
            };
            const config = await getreward(global.URL + 'getnotification.php', data);
            setLoading(false);

            if (config.ResponseCode == 1) {

                setdata(config.data);

            } else {

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
                    <Text style={globalstyles.hadtxt}>Notification</Text>
                </View>

                <View>
                    {data && data.length > 0 ? (
                        data.map((result, index) => (
                            <View style={{ padding: 15, borderBottomWidth: 1, width: '95%', alignSelf: 'center', borderColor: '#808080' }}>
                                <Text style={{ fontSize: 16 }}>{result.title}</Text>
                                <Text>{result.message}</Text>
                            </View>

                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20, fontWeight: 'bold' }}>No notification available.</Text>
                    )}
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