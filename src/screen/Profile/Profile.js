import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';

export default function Profile() {

    const [user_id, setuser_id] = useState(false);
    const [company_name, setcompany_name] = useState('');
    const [company_uen, setcompany_uen] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const userData = await AsyncStorage.getItem('userdetail');
                setLoading(false);
                const userDataArray = JSON.parse(userData);
                if (userDataArray) {
                    {
                        setuser_id(userDataArray.id);
                        setcompany_name(userDataArray.company_name);
                        setcompany_uen(userDataArray.company_uen)
                        setname(userDataArray.name);
                        setemail(userDataArray.email)
                    }
                } else {
                    alert('Please login');
                    navigation.navigate('SignIn');
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        navigation.addListener('focus', () => {
            loadData();
        })

    }, []);
    const ToEditProfile = () => {
        navigation.navigate('EditProfile');
    }
    const ToGetHelp = () => {
        navigation.navigate('GetHelp');
    }
    const ToRentalHistory = () => {
        navigation.navigate('RentalHistory');
    }
    const ToTandCs2 = () => {
        navigation.navigate('TandCs2');
    }
    const ToFAQs = () => {
        navigation.navigate('FAQs');
    }
    const ToAboutus = () => {
        navigation.navigate('Aboutus');
    }
    const ToPrivacypolicy = () => {
        navigation.navigate('Privacypolicy');
    }

    const LogOut = async () => {
        const userdetail = await AsyncStorage.removeItem('userdetail');
        console.log('userdetail-LogOut', userdetail)
        navigation.navigate('SignIn');
    }
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
        <View style={styles.mainview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>
                <View style={styles.viewone}>
                    <Text style={globalstyles.hadtxt}>My Profile</Text>
                    <Text style={styles.txt1}>{company_name}</Text>
                    <Text style={styles.txt2}>{company_uen}</Text>
                    <Text style={styles.txt3}>{name}</Text>
                    <Text style={styles.txt4}>{email}</Text>
                    {/* <Text style={styles.txt2}>+65 9339 4924</Text> */}
                </View>
                <Text style={styles.line}></Text>
                <View style={styles.viewtwo}>
                    <Text style={styles.txt1}>Settings</Text>

                    <TouchableOpacity onPress={ToEditProfile}>
                        <View style={styles.viewnext1}>
                            <Text style={styles.txt5}>Edit Profile</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ToRentalHistory}>
                        <View style={styles.viewnext}>
                            <Text style={styles.txt5}>Rental History</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ToGetHelp}>
                        <View style={styles.viewnext}>
                            <Text style={styles.txt5}>Get Help</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ToTandCs2}>
                        <View style={styles.viewnext}>
                            <Text style={styles.txt5}>Terms & Conditions</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ToFAQs}>
                        <View style={styles.viewnext}>
                            <Text style={styles.txt5}>FAQs</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={ToAboutus}>
                        <View style={styles.viewnext}>
                            <Text style={styles.txt5}>About us</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ToPrivacypolicy}>
                        <View style={styles.viewnext}>
                            <Text style={styles.txt5}>Privacy policy</Text>
                            <Image source={require('../../../Image/previous2.png')} style={styles.previous2} />
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={LogOut}>
                        <Text style={styles.txt6}>Logout </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
    )
}
