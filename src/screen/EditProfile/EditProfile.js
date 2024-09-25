// EditProfile
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { updateprofile } from '../API';

export default function EditProfile() {
    const [loading, setLoading] = useState(false);
    const [id, setid] = useState('');
    const [company_name, setcompany_name] = useState('');
    const [company_uen, setcompany_uen] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [msg, setmsg] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('userdetail');
            setLoading(false);
            // console.log('userData in AsyncStorage:', userData);
            const userDataArray = JSON.parse(userData);
            // console.log('userData in userDataArray---:', userDataArray.user_data);
            if (userDataArray) {
                {
                    setid(userDataArray.id)
                    // console.log('userData in userDataArray(1):', userDataArray.user_data.id);
                    setcompany_name(userDataArray.company_name);
                    setcompany_uen(userDataArray.company_uen)
                    // Alert.alert('userData in name(1):', userDataArray.name);
                    setname(userDataArray.name);
                    setemail(userDataArray.email)
                }
            } else {
                console.log('Data array is empty or not an array.');
            }
        };
        loadData();

    }, []);
    const ToProfile = () => {
        navigation.navigate('Profile');
    }
    const signup = async () => {
        if (company_name == '') {
            setmsg('*Please Enter The Company Name')
        } else {
            setmsg('')
        }
        if (company_uen == '') {
            setmsg2('*Please Enter The Company UEN')
        } else {
            setmsg2('')
        }
        if (name == '') {
            setmsg3('*Please Enter The Name of person in charge')
        } else {
            setmsg3('')
        }
        if (email == '') {
            setmsg4('*Please Enter The Email of person in charge')
        } else {
            setmsg4('')
        }
        if (!msg && !msg2 && !msg3 && !msg4) {
            const data = {
                user_id: id,
                company_name: company_name,
                company_uen: company_uen,
                name: name,
                email: email,
            };
            try {
                setLoading(true);
                const response = await updateprofile(global.URL + 'updateprofile.php', data);
                setLoading(false);
                console.log('updateprofile API response:(2)--', response);

                const result1 = await AsyncStorage.getItem('userdetail')
                console.log('Data in result1 UserInfo (3):', result1);

                const screenData = JSON.parse(result1)
                console.log('Data in screenData ------(4) :', screenData);

                const newUpdatedUserInfo = {
                    ...screenData,
                    "company_name": company_name,
                    "company_uen": company_uen,
                    "name": name,
                    "email": email,
                };
                console.log('new--updateprofile--Info:(5)', newUpdatedUserInfo);

                AsyncStorage.setItem('userdetail', JSON.stringify(newUpdatedUserInfo))

                const updateget = await AsyncStorage.getItem('userdetail');
                console.log('Data updateget  ---------(6):', updateget);

                // Alert.alert('Profile  Sucessfully updated ');
                if (response.ResponseCode == 1) {
                    Alert.alert(response.ResponseMsg);

                } else if (response.ResponseCode == 0) {
                    Alert.alert(response.ResponseMsg)
                }
            } catch (error) {
                console.error('Error in updateprofile API call:', error);
            }
        }
    }
    // updateprofile.php
    // user_id
    // company_name
    // company_uen
    // name
    // email
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
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
                <View style={styles.viewone}>
                    <Text style={globalstyles.hadtxt}>Edit Profile</Text>

                    <View style={styles.maininputview}>
                        <View style={styles.inputtxtview}>
                            {company_name == '' ?
                                <Image source={require('../../../Image/businessandtrade1.png')} style={styles.image1} />
                                :
                                <Image source={require('../../../Image/businessandtrade2.png')} style={styles.image1} />
                            }
                            <TextInput
                                style={styles.intxt}
                                placeholder='Company name'
                                placeholderTextColor='#999CA5'
                                color='black'
                                value={company_name}
                                onChangeText={(text) => setcompany_name(text)}
                            >
                            </TextInput>
                        </View>
                        {msg ? <Text style={styles.msg}>{msg}</Text> : null}
                        <View style={styles.inputtxtview}>
                            {company_uen == '' ?
                                <Image source={require('../../../Image/businessandtrade1.png')} style={styles.image1} />
                                :
                                <Image source={require('../../../Image/businessandtrade2.png')} style={styles.image1} />
                            }

                            <TextInput
                                style={styles.intxt}
                                placeholder='Company UEN'
                                placeholderTextColor='#999CA5'
                                color='black'
                                value={company_uen}
                                onChangeText={(text) => setcompany_uen(text)}
                            >
                            </TextInput>
                        </View>
                        {msg2 ? <Text style={styles.msg}>{msg2}</Text> : null}

                        <View style={styles.inputtxtview}>
                            {name == '' ?
                                <Image source={require('../../../Image/person1.png')} style={styles.image2} />
                                :
                                <Image source={require('../../../Image/person2.png')} style={styles.image2} />
                            }
                            {/* person2 */}
                            <TextInput
                                style={styles.intxt}
                                placeholder='Name of person in charge'
                                placeholderTextColor='#999CA5'
                                color='black'
                                value={name}
                                onChangeText={(text) => setname(text)}
                            >
                            </TextInput>
                        </View>


                        {msg3 ? <Text style={styles.msg}>{msg3}</Text> : null}

                        <View style={styles.inputtxtview}>
                            {email == '' ?
                                <Image source={require('../../../Image/email1.png')} style={styles.image3} />
                                :
                                <Image source={require('../../../Image/email2.png')} style={styles.image3} />
                            }
                            <TextInput
                                style={styles.intxt}
                                placeholder='Email of person in charge'
                                placeholderTextColor='#999CA5'
                                color='black'
                                value={email}
                                onChangeText={(text) => setemail(text)}
                            >
                            </TextInput>
                        </View>
                        {msg4 ? <Text style={styles.msg}>{msg4}</Text> : null}
                    </View>

                </View>
            </ScrollView>
            <TouchableOpacity style={styles.Getbtntouch} onPress={signup}>
                <Text style={globalstyles.Getbtn}>Update</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}
