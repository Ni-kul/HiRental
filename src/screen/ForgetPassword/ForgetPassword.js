import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { globalstyles } from '../../globalstyles';
import { styles } from './styles';
import { forgotpassword } from '../API';

export default function ForgetPassword() {
    const [email, setemail] = useState('');
    const [msg1, setmsg1] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const ToSignIn = () => {
        navigation.navigate('SignIn');
    }
    const forgetpass = async () => {
        if (email == '') {
            setmsg1('*Please Enter The Email of person in charge')
        } else {
            setmsg1('');
            // forgotpassword.php
            // email
            // navigation.navigate('SignIn');
            // if (!msg1 && !msg2) {
            const data = {
                email: email,
            };
            try {
                setLoading(true);
                const response = await forgotpassword(global.URL + 'forgotpassword.php', data);
                setLoading(false);

                console.log('forgotpassword API response:--', response);

                if (response.ResponseCode == 1) {
                    // Alert.alert('forgotpassword succesfully');
                    Alert.alert(response.ResponseMsg);
                    // navigation.navigate('Home');
                } else if (response.ResponseCode == 0) {
                    Alert.alert(response.ResponseMsg)
                }
            } catch (error) {
                console.error('Error in forgotpassword API call:', error);
            }
            // }
        }
    }
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
        <View style={styles.mainview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <TouchableOpacity onPress={ToSignIn}>
                <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
            </TouchableOpacity>
            <Text style={styles.txt1}>Forget Password</Text>
            <Text style={styles.txt2}>Please enter your email below and a forget password link will be sent to your email address.</Text>
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

            <TouchableOpacity style={styles.Getbtntouch} onPress={forgetpass}>
                <Text style={globalstyles.Getbtn}>Submit</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}
