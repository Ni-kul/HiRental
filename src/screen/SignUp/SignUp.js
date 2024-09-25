import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { signup } from '../API';

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [company_name, setcompany_name] = useState('');
    const [company_uen, setcompany_uen] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [msg, setmsg] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');
    const [msg5, setmsg5] = useState('');
    const [Selected, setSelected] = useState();
    const [msg6, setmsg6] = useState('');
    const [id, setid] = useState('');

    const navigation = useNavigation();
    const navigateTo = () => {
        navigation.navigate('Verification');
    }
    const navigateToSplashtwo = () => {
        navigation.navigate('Splashtwo');
    }
    const navigateToTandCs2 = () => {
        navigation.navigate('TandCs2');
    }
    // const twofun = () => {
    //     signup();
    //     navigateTo();
    // }
    const usersignup = async () => {

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
        if (password == '') {
            setmsg5('*Please Enter The Password')
        } else {
            setmsg5('')
        }
        if (!Selected) {
            setmsg6('*Please Agree With The Terms & Conditions.')
        } else {
            setmsg6('')
        }
        if (!msg && !msg2 && !msg3 && !msg4 && !msg5 && Selected) {
            const data = {
                company_name: company_name,
                company_uen: company_uen,
                name: name,
                email: email,
                password: password,
            };
            try {
                setLoading(true);
                const response = await signup(global.URL + 'signup.php', data);
                setLoading(false);

                console.log('Signup API response:--', response);
                // Alert.alert(response.Result)

                if (response.ResponseCode == 1) {
                    // setid(response.user_id);
                    Alert.alert(response.ResponseMsg);
                    navigation.navigate('Verification', { userid: response.user_id });
                } else {
                    Alert.alert(response.ResponseMsg)
                }
            } catch (error) {
                console.error('Error in signup API call:', error);
            }
        }
    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
        <View style={styles.mainview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>
                <View style={styles.Fview}>
                    <TouchableOpacity onPress={navigateToSplashtwo}>
                        <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                    </TouchableOpacity>
                    <Text style={styles.SignUp}>Sign Up</Text>
                    <Text style={styles.SignUptxt}>Share your company details with us to be verified to join our community.</Text>

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

                        <View style={styles.inputtxtview}>
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
                        {msg5 ? <Text style={styles.msg}>{msg5}</Text> : null}

                    </View>

                    <View style={styles.checkview}>
                        <CheckBox
                            style={styles.check}
                            value={Selected}
                            onValueChange={setSelected}
                            tintColors={{
                                // false: '#707175',
                                // true: '#707175'
                            }}

                        />
                        <Text style={styles.checktxt}>I agree with the
                        {/* <TouchableOpacity> */}
                            <Text style={styles.checktxt2} onPress={navigateToTandCs2}> terms & conditions.</Text>
                            {/* </TouchableOpacity> */}

                        </Text>
                    </View>
                    {msg6 ? <Text style={styles.msg6}>{msg6}</Text> : null}

                </View>
            </ScrollView>
            <View>
                <TouchableOpacity style={styles.Getbtntouch} onPress={usersignup}>
                    <Text style={globalstyles.Getbtn}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    )
}
