// GetHelp danger1.png previousin
import { useNavigation } from '@react-navigation/core';
import React, { useMemo, useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import RadioGroup from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { help } from '../API';

export default function GetHelp() {

    const [user_id, setuser_id] = useState('');
    const [value, setValue] = useState(null);
    const [message, setmessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [msg1, setmsg1] = useState('');


    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('userdetail');
            setLoading(false);
            console.log('userData in AsyncStorage:', userData);
            const userDataArray = JSON.parse(userData);
            if (userDataArray) {
                {
                    setuser_id(userDataArray.id)
                }
            } else {
                console.log('Data array is empty or not an array.');
            }
        };
        loadData();

    }, []);
    const data = [
        { label: 'Feedback', value: 'Feedback' },
        { label: 'Bug', value: 'Bug' },
        { label: 'Payment', value: 'Payment' },

    ];

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Yes',
            value: 'option1',
            color: '#999CA5',
            size: 14,
            labelStyle: {
                fontSize: 15,
                fontWeight: '500',
                color: '#999CA5'
            },
            borderColor: '#999CA5',
        },
        {
            id: '2',
            label: 'No',
            value: 'option2',
            color: '#999CA5',
            size: 14,
            labelStyle: {
                fontSize: 15,
                fontWeight: '500',
                color: '#999CA5'
            },
        }
    ]), []);



    const navigation = useNavigation();
    const ToProfile = () => {
        // navigation.navigate('Profile');
        navigation.goBack();
    }
    // help.php
    // user_id
    // issue_type
    // message
    // back_to_you
    const Ghelp = async () => {

        if (message == '') {
            setmsg1('*Please Enter The Message')
        } else {
            setmsg1('')
            const data = {
                user_id: user_id,
                issue_type: value,
                message: message,
                back_to_you: selectedId
            }
            try {
                setLoading(true);
                const response = await help(global.URL + 'help.php', data);
                setLoading(false);

                // console.log('help API response:--', response);

                if (response.ResponseCode == 1) {
                    // Alert.alert('help succesfully');
                    Alert.alert(response.ResponseMsg);
                    // navigation.navigate('Home');
                } else if (response.ResponseCode == 0) {
                    Alert.alert(response.ResponseMsg)
                }
            } catch (error) {
                console.error('Error in help API call:', error);
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
                <TouchableOpacity onPress={ToProfile}>
                    <Image source={require('../../../Image/previous1.png')} style={globalstyles.imagearrow} />
                </TouchableOpacity>
                <View style={styles.viewone}>
                    <Text style={globalstyles.hadtxt}>Get Help</Text>
                    <Text style={styles.txt1}>Need help? Write in to us and we will get back to you as soon as possible.</Text>
                    <View style={styles.dropdownview}>
                        <Image source={require('../../../Image/danger1.png')} style={styles.danger1} />
                        <Dropdown
                            style={styles.dropdown}
                            itemTextStyle={styles.itemTextStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            placeholderStyle={styles.placeholderStyle}
                            placeholder="Issues Type"
                            color='black'
                            value={value}
                            onChange={(item) => setValue(item.value)}
                            labelField="label"
                            valueField="value"
                            data={data}
                        />
                    </View>
                    <Text style={styles.txt2}>Do you need us to get back to you?</Text>

                    <View style={styles.radioview}>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setSelectedId}
                            selectedId={selectedId}
                            layout='row'
                        />
                    </View>

                    <View style={styles.inputtxtview}>
                        {message == '' ?
                            <Image source={require('../../../Image/email1.png')} style={styles.image3} />
                            :
                            <Image source={require('../../../Image/email2.png')} style={styles.image3} />
                        }
                        <TextInput
                            style={styles.intxt}
                            placeholder='Enter your message'
                            placeholderTextColor='#999CA5'
                            color='black'
                            multiline={true}
                            value={message}
                            onChangeText={(text) => setmessage(text)}
                        >
                        </TextInput>
                    </View>
                    <Text style={styles.msg}>{msg1}</Text>
                </View>
                <TouchableOpacity style={{ marginBottom: 4, marginTop: 30 }} onPress={Ghelp}>
                    <Text style={globalstyles.Getbtn}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.txt4}>Or Whatsapp us</Text>
                </TouchableOpacity>

            </ScrollView>

        </View>
    </SafeAreaView>
    )
}