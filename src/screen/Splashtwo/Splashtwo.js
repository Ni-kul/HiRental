import React from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { useNavigation } from '@react-navigation/core';

export default function Splashtwo() {
    const navigation = useNavigation();

    const naviToNextS = () => {
        navigation.navigate('SignUp');
    }
    const ToSignIn = () => {
        navigation.navigate('SignIn');
    }

    const guestlogin = () => {
        navigation.navigate('Home');
    }

    


    return (
        <View style={styles.mainview}>
            <ScrollView></ScrollView>
            <ImageBackground source={require('../../../Image/Rectangle1one.png')} style={styles.Rectangle1image}>
                <ImageBackground source={require('../../../Image/Rectangle2.png')} style={styles.Rectangle1image}>

                    {/*Rectangle2.png */}
                    {/* <ScrollView> */}

                    <View style={{ height: '82%', justifyContent: 'flex-end' }}>

                        <Text style={styles.weltxt}>Welcome to </Text>
                        <Text style={styles.text}>Hi<Text style={styles.des}>-</Text>Rental</Text>
                        <Text style={styles.text1}>From bulldozers to cranes, equip your projects with the strength they need to conquer any task.</Text>
                    </View>
                    {/* </ScrollView> */}

                    <TouchableOpacity style={styles.Getbtntouch} onPress={naviToNextS}>
                        <Text style={globalstyles.Getbtn}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ToSignIn}>
                       <Text style={styles.text2}>Go to login.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={guestlogin}>
                       <Text style={styles.text2}>Guest login.</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </ImageBackground>
            {/* <Image source={require('../../../Image/Rectangle1.png')} style={styles.Rectangle1image} /> */}
        </View>
    )
}
