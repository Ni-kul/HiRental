import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splashone from './src/screen/Splashone/Splashone';
import Splashtwo from './src/screen/Splashtwo/Splashtwo';
import SignUp from './src/screen/SignUp/SignUp';
import Verification from './src/screen/Verification/Verification'
import ForgetPassword from './src/screen/ForgetPassword/ForgetPassword'
import SignIn from './src/screen/SignIn/SignIn'
import Home from './src/screen/Home/Home'
import Rentals from './src/screen/Rentals/Rentals'
import Reward from './src/screen/Reward/Reward'
import Profile from './src/screen/Profile/Profile'
import ExcavatorRental from './src/screen/ExcavatorRental/ExcavatorRental'
import Excavatorpayment from './src/screen/Excavatorpayment/Excavatorpayment';
import { View, Image, Text } from 'react-native';
import RedeemPoints from './src/screen/RedeemPoints/RedeemPoints';
import TandCs from './src/screen/T&Cs/TandCs';
import CardDetails from './src/screen/CardDetails/CardDetails';
import EditProfile from './src/screen/EditProfile/EditProfile';
import GetHelp from './src/screen/GetHelp/GetHelp';
import RentalHistory from './src/screen/RentalHistory/RentalHistory';
import TandCs2 from './src/screen/T&Cs2/TandCs2';
import RentalDetails from './src/screen/RentalDetails/RentalDetails';
import HistoryDetails from './src/screen/HistoryDetails/HistoryDetails';
import OTPayment from './src/screen/OTPayment/OTPayment';
import Notification from './src/screen/Notification/Notification';

import Aboutus from './src/screen/Aboutus/Aboutus';
import FAQs from './src/screen/FAQs/FAQs';
import Privacypolicy from './src/screen/Privacypolicy/Privacypolicy';




import { StripeProvider } from '@stripe/stripe-react-native';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// global.URL = 'https://appdevelopmentsingapore.com/hirental/api/';
// global.IMG = 'https://appdevelopmentsingapore.com/hirental/admin/';


global.URL = 'https://hirent.hitact.com.sg/api/';
global.IMG = 'https://hirent.hitact.com.sg/admin/';






//const data = stripe.initModule('pk_test_51OTeaHSBqXffrrZCK1LEoqC3gja7pyForywCr00neELKo12IpipXY9pQ43MIxX51J4cWFQi0FynBvpBM63lgz4Cm00HdERJ8VH');

const STRIPE_KEY =
  'pk_live_51OgjhpJlesIKDUXlzEU5TwqzClBMPCrVmVGmGzqaUKeuixur0XmvsVQXoA2M9Eqs15Wnn9YrUApP0Jko4U30uclK00eaPXnYxo';


// const STRIPE_KEY =
//   'pk_test_1aGhx6LTU7YeyFhIHf4rHHF000spOsIyLF';

//console.log('data>>>>>>>>>>>',data);



export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }} >
      <Tab.Screen name="HomeExplore"
        options={{
          // tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <View>
              {/* searchinterfacesymbol1.png */}
              {focused ?
                <Image
                  source={require('./Image/searchinterfacesymbol1.png')}
                  style={{
                    // marginTop:4,
                    height: 19,
                    width: 19,
                    alignSelf: 'center'
                  }}
                />
                :
                <Image
                  source={require('./Image/explorei.png')}
                  style={{
                    // marginTop:4,
                    height: 19,
                    width: 19,
                    alignSelf: 'center'
                  }}
                />
              }
              {focused ? <Text style={{ fontSize: 14, color: '#ee3b43', textAlign: 'center', fontWeight: '500', }}>Explore</Text>
                :
                (
                  <Text style={{ fontSize: 14, color: '#b3b5bc', textAlign: 'center', fontWeight: '500', }}>Explore</Text>
                )}
            </View>
          ),
        }}
        component={Home}
      />
      <Tab.Screen name="Rentals" component={Rentals}
        options={{
          // tabBarLabel: 'Explore',excavator1
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ?
                <Image
                  source={require('./Image/excavator1.png')}
                  style={{
                    alignSelf: 'center',
                    // marginTop:2,
                    height: 24,
                    width: 25,
                  }}
                />
                :
                <Image
                  source={require('./Image/path6139.png')}
                  style={{
                    alignSelf: 'center',
                    // marginTop:2,
                    height: 24,
                    width: 25,
                  }}
                />
              }
              {focused ? <Text style={{ fontSize: 14, color: '#ee3b43', textAlign: 'center', fontWeight: '500', }}>Rentals</Text>
                :
                (
                  <Text style={{ fontSize: 14, color: '#b3b5bc', textAlign: 'center', fontWeight: '500', }}>Rentals</Text>
                )}
            </View>
          ),
        }}
      />
      <Tab.Screen name="Reward" component={Reward}
        options={{
          // tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ?
                <Image
                  source={require('./Image/medalribbon1.png')}
                  style={{
                    alignSelf: 'center',
                    // marginTop:2,
                    height: 26,
                    width: 27,
                  }}
                />
                :
                <Image
                  source={require('./Image/medalribbo.png')}
                  style={{
                    alignSelf: 'center',
                    // marginTop:2,
                    height: 26,
                    width: 27,
                  }}
                />
              }
              {focused ? <Text style={{ fontSize: 14, color: '#ee3b43', textAlign: 'center', fontWeight: '500', }}>Reward</Text>
                :
                (
                  <Text style={{ fontSize: 14, color: '#b3b5bc', textAlign: 'center', fontWeight: '500', }}>Reward</Text>
                )}
            </View>
          ),
        }}

      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          // tabBarLabel: 'Profile',user12
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ?
                <Image
                  source={require('./Image/user12.png')}
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'center'
                  }}
                />
                :
                <Image
                  source={require('./Image/user1.png')}
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'center'
                  }}
                />
              }
              {focused ? <Text style={{ fontSize: 14, color: '#ee3b43', textAlign: 'center', fontWeight: '500', }}>Profile</Text>
                :
                (
                  <Text style={{ fontSize: 14, color: '#b3b5bc', textAlign: 'center', fontWeight: '500', }}>Profile</Text>
                )}
            </View>
          ),
        }}

      />
    </Tab.Navigator>

  )
}
export default function App() {

  return (
    <StripeProvider publishableKey={STRIPE_KEY}>

      <NavigationContainer>
        <Stack.Navigator screenOptions={false} initialRouteName="Splashone">
          <Stack.Screen
            name="Splashone"
            component={Splashone}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: false }}
          />




          <Stack.Screen
            name="Privacypolicy"
            component={Privacypolicy}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Aboutus"
            component={Aboutus}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQs"
            component={FAQs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Splashtwo"
            component={Splashtwo}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false,gestureEnabled:false }}
          />
          <Stack.Screen
            name="ExcavatorRental"
            component={ExcavatorRental}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Excavatorpayment"
            component={Excavatorpayment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RedeemPoints"
            component={RedeemPoints}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TandCs"
            component={TandCs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CardDetails"
            component={CardDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GetHelp"
            component={GetHelp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RentalHistory"
            component={RentalHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TandCs2"
            component={TandCs2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RentalDetails"
            component={RentalDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HistoryDetails"
            component={HistoryDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTPayment"
            component={OTPayment}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );


}