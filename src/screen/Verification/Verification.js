import React, { useState, useEffect } from 'react';
import OTPTextInput from 'react-native-otp-textinput'
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, TouchableOpacity, Alert, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { useNavigation } from '@react-navigation/core';
import { verifyotp } from '../API';
import { resendotp } from '../API';

export default function Verification({ route }) {
    const user_id = route.params?.userid;
    const [loading, setLoading] = useState(false);
    const [otp, setotp] = useState('');
    const [timer, setTimer] = useState(120);
    const [showResend, setShowResend] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [msg, setmsg] = useState('');

    useEffect(() => {

        let newIntervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(newIntervalId);
                    setShowResend(true);
                    return 0;
                }
            });
        }, 1000);
        setIntervalId(newIntervalId);

        return () => {
            clearInterval(newIntervalId);
        };
    }, []);
    const formatTime = (timeInSeconds) => {
        // const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 120;
        return `${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const navigation = useNavigation();
    const navigateToSignUp = () => {
        navigation.navigate('SignUp');
    }
    const startTimer = () => {
        setTimer(60);
        setShowResend(false)
    };
    // resendotp.php
    // user_id
    const handleResend = async () => {
        try {
            clearInterval(intervalId);
            startTimer();
            const newIntervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(newIntervalId);
                        setShowResend(true);
                        return 0;
                    }
                });
            }, 1000);
            setIntervalId(newIntervalId);

            const verifyotpdata = {
                user_id: user_id,
            }
            setLoading(true);
            const OTPresponse = await resendotp(global.URL + 'resendotp.php', verifyotpdata);
            setLoading(false);

            console.log('resendotp API OTPresponse:--', OTPresponse);
            if (OTPresponse.ResponseCode == 1) {
                // Alert.alert(OTPresponse.ResponseMsg);
                openmodal();
            }
            else {
                Alert.alert(OTPresponse.ResponseMsg);
            }

        } catch (error) {
            console.error('resendotp API call error:', error);
        }

    }

    const navigateToSignIn = () => {
        closemodal();
        setModalVisible(false);
        navigation.navigate('SignIn');
    }
    const openmodal = () => {
        setModalVisible(true);
    }
    const closemodal = () => {
        setModalVisible(false);
    }
    const confm = async () => {
        if (otp == '') {
            setmsg('*Please Enter The OTP')
        } else {
            setmsg('');
            // verifyotp.php
            // user_id
            // otp
            const data = {
                user_id: user_id,
                otp: otp,
            };
            try {
                setLoading(true);
                const response = await verifyotp(global.URL + 'verifyotp.php', data);
                setLoading(false);

                console.log('verifyotp API response:--', response);

                if (response.ResponseCode == 1) {
                    // Alert.alert(response.ResponseMsg);
                    openmodal();
                } else if (response.ResponseCode == 0) {
                    Alert.alert(response.ResponseMsg)
                }
            } catch (error) {
                console.error('Error in verifyotp API call:', error);
            }
        }
    }
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }}>
        <View style={styles.mainview}>
            <View>
                {loading ?
                    <View style={globalstyles.spinner}>
                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                    </View>
                    : null}
                <ScrollView>

                    <TouchableOpacity onPress={navigateToSignUp}>
                        <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                    </TouchableOpacity>
                    <Text style={styles.txt1}>Verify your account.</Text>
                    <Text style={styles.txt2}>An otp has been sent to your email, please enter the 4 digit code.</Text>

                    <View style={{ width: '92%', alignSelf: 'center', marginTop: '2%' }}>
                        <OTPTextInput
                            containerStyle={{ marginTop: '8%', width: '100%' }}
                            textInputStyle={{ backgroundColor: '#F5F5F5', borderRadius: 10 }}
                            tintColor='#F5F5F5'
                            offTintColor='#F5F5F5'
                            defaultValue={otp}
                            handleTextChange={(text) => setotp(text)}
                        />
                    </View>
                    {msg ? <Text style={styles.msg}>{msg}</Text> : null}

                    <TouchableOpacity style={styles.Getbtntouch} onPress={confm}>
                        <Text style={globalstyles.Getbtn}>Confirm</Text>
                    </TouchableOpacity>

                    <View style={styles.timerview}>
                        <Text style={styles.timer}>{formatTime(timer)}s </Text>
                        {showResend &&
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={styles.otptime}> Resend otp</Text>
                            </TouchableOpacity>
                        }
                    </View>

                </ScrollView>

                <View>
                    <Modal isVisible={modalVisible} style={{ margin: 0, justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'white' }}>
                            <View style={{ alignItems: 'center', marginTop: 50 }}>
                                <Image source={require('../../../Image/checked1.png')} style={styles.checked1} />
                            </View>
                            <Text style={styles.mtxt1}>Successful</Text>
                            <Text style={styles.mtxt2}>Your account has been registered. Please give us 1-3 working days to verify your account.</Text>
                            <Text style={styles.mtxt3}>An email notification will be sent to you once account has been successfully verified.</Text>

                            <TouchableOpacity onPress={navigateToSignIn} style={{ marginTop: 30, marginBottom: 4 }}>
                                <Text style={globalstyles.Getbtn}>Back to login</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>

            </View>

        </View>
    </SafeAreaView>
    )
}
