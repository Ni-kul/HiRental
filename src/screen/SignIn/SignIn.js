
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { globalstyles } from '../../globalstyles';
import { styles } from './styles';
import { login } from '../API';

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');
    const navigation = useNavigation();
    const navigateTo = () => {
        navigation.navigate('ForgetPassword');
    }
    const navigateToHome = () => {
        navigation.navigate('Home');
    }
    const ToSignUp = () => {
        navigation.navigate('SignUp');
    }
    const signin = async () => {
        if (email == '') {
            setmsg1('*Please Enter The Email of person in charge')
        } else {
            setmsg1('')
        }
        if (password == '') {
            setmsg2('*Please Enter The Password')
        } else {
            setmsg2('')
        }
        // login.php
        // email
        // password
        // device_id
        if (!msg1 && !msg2) {
            const data = {
                email: email,
                password: password,
                // device_id:
            };
            try {
                setLoading(true);
                const response = await login(global.URL + 'login.php', data);
                setLoading(false);

                console.log('login API response:--', response);

                if (response.ResponseCode == 1) {
                    Alert.alert('Login succesfully');
                    // Alert.alert(response.ResponseMsg);
                    navigation.navigate('Home');
                } else if (response.ResponseCode == 0) {
                    Alert.alert(response.ResponseMsg)
                }
            } catch (error) {
                console.error('Error in login API call:', error);
            }
        }
    }
    return (
        <View style={styles.mainview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>
                <View style={{ width: '100%' }}>

                    <Image source={require('../../../Image/Rectangle46.png')} style={styles.Rectangle46} />

                    <Text style={styles.txt1}>Sign In</Text>
                    <Text style={styles.txt2}>Welcome to <Text style={styles.txt3}>Hi-Rental</Text></Text>
                    <View style={styles.inputtxtview}>
                        {email == '' ?
                            <Image source={require('../../../Image/email1.png')} style={styles.image3} />
                            :
                            <Image source={require('../../../Image/email2.png')} style={styles.image3} />
                        }
                        <TextInput
                            style={styles.intxt}
                            placeholder='Email'
                            placeholderTextColor='#999CA5'
                            color='black'
                            value={email}
                            onChangeText={(text) => setemail(text)}
                        >
                        </TextInput>
                    </View>

                    {msg1 ? <Text style={styles.msg}>{msg1}</Text> : null}
                    <View style={styles.inputtxtview1}>
                        {password == '' ?
                            <Image source={require('../../../Image/padlock1.png')} style={styles.image4} />
                            :
                            <Image source={require('../../../Image/padlock2.png')} style={styles.image4} />
                        }
                        <TextInput
                            style={styles.intxt}
                            placeholder='Password'
                            placeholderTextColor='#999CA5'
                            color='black'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setpassword(text)}
                        >
                        </TextInput>
                    </View>
                    {msg2 ? <Text style={styles.msg}>{msg2}</Text> : null}
                    <TouchableOpacity onPress={navigateTo}>
                        <Text style={styles.forgettxt}>Forget Password</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <TouchableOpacity style={styles.Getbtntouch} onPress={signin}>
                <Text style={globalstyles.Getbtn}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ToSignUp}>
                <Text style={styles.txt4}>No account? Register here</Text>
            </TouchableOpacity>
        </View>
    )
}
