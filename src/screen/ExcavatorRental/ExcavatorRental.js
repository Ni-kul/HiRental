import { useNavigation } from '@react-navigation/core';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Modal from "react-native-modal";
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Linking, Image, ScrollView, TouchableOpacity, TextInput, Platform, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Keyboard, useColorScheme } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../../globalstyles';
import { checkavailability } from '../API';

// 13. Excavator Rental
export default function ExcavatorRental({ route }) {
    const colorScheme = useColorScheme();

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [datefff, setDatefff] = useState('')
    const [open, setOpen] = useState(false)

    const [Period, setPeriod] = useState('');

    const [selectdate, setselectdate] = useState(new Date())
    const [opentwo, setopentwo] = useState(false)
    const [city, setcity] = useState('')
    const [postcode, setpostcode] = useState('')
    const [polenum, setpolenum] = useState('')
    const [Starttime, setStarttime] = useState('')
    const [Endtime, setEndtime] = useState('');
    const [trips, settrips] = useState('')
    const [location, setlocation] = useState('')
    const [modalVisible2, setModalVisible2] = useState(false);
    const [city1, setcity1] = useState('')
    const [postcode1, setpostcode1] = useState('')
    const [polenum1, setpolenum1] = useState('');

    const [location2, setlocation2] = useState('');
    const [modalVisible3, setModalVisible3] = useState(false);
    const [city2, setcity2] = useState('')
    const [postcode2, setpostcode2] = useState('')
    const [polenum2, setpolenum2] = useState('');

    const [user_id, setuser_id] = useState('');
    const [Getdata, setGetdata] = useState('');
    const [attech, setattech] = useState('');
    const [specific, setspecific] = useState('');
    const [iscatalog, setiscatalog] = useState('');
    const [isid, setisid] = useState('');
    const [isname, setisname] = useState('');
    const [isimage, setisimage] = useState('');
    const [isprice, setisprice] = useState('');
    const [ispriceday, setispriceday] = useState('');
    const [isdescription, setisdescription] = useState('');
    const [msg0, setmsg0] = useState('');
    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');
    const [msg5, setmsg5] = useState('');
    const [openS, setopenS] = useState(false);
    const [openE, setopenE] = useState(false);
    const [msgRB, setmsgRB] = useState('');
    const [msg6, setmsg6] = useState('');
    const [msg7, setmsg7] = useState('');
    const [msg8, setmsg8] = useState('');
    const [msg9, setmsg9] = useState('');
    const [msg10, setmsg10] = useState('');
    const [locationone, setlocationone] = useState('');
    const [price, setprice] = useState('');
    const [price_day, setprice_day] = useState('');
    const [price_month, setprice_month] = useState('');
    const [price_week, setprice_week] = useState('');
    const [bytrip, setbytrip] = useState('');

    const [category, setcategory] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [enddate, setenddate] = useState('');
    const [rentCharges, setrentCharges] = useState('');
    const [grandTotal, setgrandTotal] = useState(0);
    const [radiobtnone, setradiobtnone] = useState(0);
    const [radiobtntwo, setradiobtntwo] = useState('4');
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [mode, setMode] = useState('');

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardOpen(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOpen(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        setMode(colorScheme === 'dark' ? 'date' : 'date');
    }, [colorScheme]);


    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const userData = await AsyncStorage.getItem('userdetail');
                setLoading(false);
                // console.log('userData in AsyncStorage:', userData);
                const userDataArray = JSON.parse(userData);
                if (userDataArray) {
                    {
                        setuser_id(userDataArray.id)
                    }
                } else {
                    console.log('Data array is empty or not an array.');
                }
                let databack = route.params
                // console.log('databack ==>> ', databack)
                setisid(databack.selectedData.id)
                setcategory(databack.selectedData.category)
                console.log('databack.selectedData.category-ex:', databack.selectedData.category);
                setisname(databack.selectedData.name)
                setisimage(databack.selectedData.image)
                setisprice(databack.selectedData.price)
                setispriceday(databack.selectedData.price_day)

                setisdescription(databack.selectedData.description)
                setGetdata(databack.selectedData.certificate)


                if(databack.selectedData.category === '2')
                    {
                        
                        setattech(databack.selectedData.attechments);
                    }


                //setattech(databack.selectedData.attechments)
                setspecific(databack.selectedData.specification)
                setiscatalog(databack.selectedData.catalog)
                setprice(databack.selectedData.price)
                setprice_day(databack.selectedData.price_day)
                setprice_month(databack.selectedData.price_month)
                setprice_week(databack.selectedData.price_week)
                setbytrip(databack.selectedData.bytrip);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };


        navigation.addListener('focus', () => {
            loadData();
        })
    }, []);

    const addDays = (date, days, value) => {
        // console.log('date-adddays', date, days, value)


        const result = new Date(date);
        if (!isNaN(result.getTime())) {
            console.log('result', result)
            if (value == '0') {
                result.setDate(date.getDate() + (days * 1));
                console.log('===day>>', result.toDateString())
                setenddate(result.toDateString());
            }
            else if (value == '1') {
                result.setDate(date.getDate() + (days * 5));
                console.log('===week =>', result.toDateString())
                setenddate(result.toDateString());
            } else if (value == '2') {
                result.setDate(date.getDate() + (days * 30));
                console.log('===month=>', result.toDateString())
                setenddate(result.toDateString());
            }

        } else {
            // alert('afd')
        }
    };

    const showradiobtnone = (value, per) => {
        console.log('value:-', value, per); //per = Period value
        setradiobtnone(value)
        // setPeriod(per);

        if (category == 3) {
            return price;
        } else if (value == '0') {
            const daytot = Number(price_day.replace(/\$/g, ''));
            console.log('daytot', daytot)

            const daytotal = (daytot * per)
            // console.log('Period--0:-', per)
            // console.log('daytotal---', daytotal)
            addDays(datefff, per - 1, value)
            const numericRentCharges = daytotal;
            const rentChargesValue = typeof numericRentCharges === 'string' ? numericRentCharges : numericRentCharges.toString();

            const rentCharges = Number(rentChargesValue.replace(/\$/g, ''));
            setrentCharges(rentCharges);
            const grandTotal = rentCharges + 0;
            setgrandTotal(grandTotal);
            // console.log("rentCharges 0:", rentCharges);
            // console.log("Grand Total 0:", grandTotal);
            // return daytotal;

        } else if (value == '1') {
            const weektot = Number(price_week.replace(/\$/g, ''));
            console.log('week', weektot)
            const weektotal = (weektot) * per
            // console.log('weektotal--', weektotal)
            addDays(datefff, per, value)

            const numericRentCharges = weektotal;
            const rentChargesValue = typeof numericRentCharges === 'string' ? numericRentCharges : numericRentCharges.toString();

            const rentCharges = Number(rentChargesValue.replace(/\$/g, ''));
            setrentCharges(rentCharges);
            const grandTotal = rentCharges;
            setgrandTotal(grandTotal);
            // console.log("rentCharges 1:", rentCharges);
            // console.log("Grand Total 1:", grandTotal);
            // return weektotal;
        }
        else if (value == '2') {

            const currentDate = new Date();
            // console.log('currentDate', currentDate);
            const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed
            // console.log('currentMonth', currentMonth);

            const daysInMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
            // console.log('daysInMonth', daysInMonth);
            addDays(datefff, per, value)

            const monthtot = Number(price_month.replace(/\$/g, ''));
            // console.log('monthtot', monthtot)
            const monthtotal = (monthtot) * per
            // console.log('monthtotal--', monthtotal)

            const numericRentCharges = monthtotal;
            const rentChargesValue = typeof numericRentCharges === 'string' ? numericRentCharges : numericRentCharges.toString();

            const rentCharges = Number(rentChargesValue.replace(/\$/g, ''));
            setrentCharges(rentCharges);
            const grandTotal = rentCharges;
            setgrandTotal(grandTotal);
            // console.log("rentCharges 2:", rentCharges);
            // console.log("Grand Total 2:", grandTotal);
            // return monthtotal;
        }
        return 0;
    };


    const onChangeperiod = (value) => {
        // console.log('value-P', value);
        setPeriod(value);
        // calculateTotal();
        showradiobtnone(radiobtnone, value);
    }

    const showradiobtntwo = (value, trip, sttime, edtime) => {
        // console.log('value-To', value, trip, sttime, edtime);
        setradiobtntwo(value);


        if (value == '4') {
            //const bytrip = bytrip;

            if (trip == undefined) {
                setrentCharges(0);
                setgrandTotal(0);
            } else {

                const bytriptotal = (bytrip * trip)
                console.log('trip--0:-', trip)
                console.log('bytriptotal-0:-', bytriptotal)
                const numericRentCharges = bytriptotal;
                const rentChargesValue = typeof numericRentCharges === 'string' ? numericRentCharges : numericRentCharges.toString();

                const rentCharges = Number(rentChargesValue.replace(/\$/g, ''));
                setrentCharges(rentCharges);
                const grandTotal = rentCharges;
                setgrandTotal(grandTotal);
                // console.log("rentCharges 0:", rentCharges);
                // console.log("Grand Total 0:", grandTotal);
            }
        } else if (value == '5') {

            if (sttime && edtime) {
                const timeDifference = edtime.getTime() - sttime.getTime();
                const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);

                const numericRentCharges = timeDifferenceInHours.toFixed(2);
                if (numericRentCharges < 3) {
                    alert('Minimum 3 hours required.');
                }
                console.log(`Time difference: ${numericRentCharges} hours`);
                const rentChargesValue = typeof numericRentCharges === 'string' ? numericRentCharges : numericRentCharges.toString();

                const rentCharges = Number(rentChargesValue.replace(/\$/g, ''));
                setrentCharges((rentCharges * price).toFixed(2));

                const grandTotal = (rentCharges * price).toFixed(2);
                setgrandTotal(grandTotal);

                // console.log("rentCharges 1:", rentCharges);
                // console.log("Grand Total 1:", grandTotal);
            } else {
                // alert('no-time')
            }
        } else if (value == '6') {
            const bydaytotal = price_day;
            console.log('bydaytotal-2:-', bydaytotal)
            // setStarttime();
            // setEndtime();
            const numericRentCharges = bydaytotal;
            const rentChargesValue = typeof numericRentCharges === 'string' ? numericRentCharges : numericRentCharges.toString();

            const rentCharges = Number(rentChargesValue.replace(/\$/g, ''));
            setrentCharges(rentCharges);
            const grandTotal = rentCharges;
            setgrandTotal(grandTotal);
            // console.log("rentCharges 2:", rentCharges);
            // console.log("Grand Total 2:", grandTotal);
        }



    }
    const onChangeTrips = (value) => {
        console.log('onChangeTrips-value', value);
        settrips(value);
        // calculateTotal();
        showradiobtntwo(radiobtntwo, value, Starttime, Endtime);
    }

    const navigation = useNavigation();
    const navigateToHome = () => {
        navigation.navigate('Home');
    }


    const handleCheckboxChange = (result) => {
        if (attachments.includes(result)) {
            console.log('result:-', result)
            setAttachments((prevAttachments) =>
                prevAttachments.filter((item) => item !== result)
            );
        } else {
            setAttachments((prevAttachments) => [...prevAttachments, result]);
        }
    }

    const ToGetHelp = () => {
        navigation.navigate('GetHelp');
    }
    const openmodal = () => {
        setModalVisible(true);
    }
    const closemodal = () => {
        setModalVisible(false);
    }
    const openmodal2 = () => {
        setModalVisible2(true);
    }
    const closemodal2 = () => {
        const combinedLocation = `${city1} ${postcode1} ${polenum1}`;

        setlocation(combinedLocation);
        setModalVisible2(false);
    }

    const openmodal3 = () => {
        setModalVisible3(true);
    }
    const closemodal3 = () => {
        //const combinedLocation2 = `${city2} ${postcode2} ${polenum2}`;

        const combinedLocation2 = `${city2} ${postcode2}`;

        setlocation2(combinedLocation2);
        setModalVisible3(false);
    }

    const addNewLocation = () => {
        openmodal3();
    };

    const formatDate = useMemo(() => {
        if (datefff) {
            const date = new Date(datefff);
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dd = date.getDate();
            var mm = month[date.getMonth()];
            var yyyy = date.getFullYear();
            var conformdate = `${dd} ${mm} ${yyyy}`;

            console.log('datefffconformdate', conformdate)

            return conformdate;
        } else {
            return ''; // Return empty string if date2 is not set
        }
    }, [datefff]);

    const formattime = useMemo(() => {
        if (Starttime) {
            const date = new Date(Starttime);
            var nd = new Date(Starttime); // get current date
            // console.log('nd', nd)
            // var nddd = nd.setHours(nd.getHours() + 3, nd.getMinutes() + 0, 0, 0);
            //var nddd = nd.setHours(nd.getHours() + 3)

            var nddd = new Date(nd.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours to the date


            var nnnn = nd.toLocaleTimeString()
            console.log('nnnn', nnnn)
            console.log('d--->', nddd)
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            // console.log('start-time', formattedHours, formattedMinutes, ampm);

            const endhours = nddd.getHours();
            const endminutes = nddd.getMinutes();
            const endampm = endhours >= 12 ? 'pm' : 'am';
            const endformattedHours = endhours % 12 || 12;
            const endformattedMinutes = endminutes < 10 ? `0${endminutes}` : endminutes;
            //alert(`${endformattedHours}:${endformattedMinutes} ${endampm}`);

            const newendtime = `${endformattedHours}:${endformattedMinutes} ${endampm}`;
            //setEndtime(newendtime);

            return `${formattedHours}:${formattedMinutes} ${ampm}`;
        } else {
            return ''; // Return empty string if Starttime is not set
        }
    }, [Starttime]);

    const formattime2 = useMemo(() => {
        if (Endtime) {
            const date = new Date(Endtime);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            // console.log('End-time', formattedHours, formattedMinutes, ampm);
            return `${formattedHours}:${formattedMinutes} ${ampm}`;
        } else {
            return ''; // Return empty string if Starttime is not set
        }
    }, [Endtime]);

    const formatDatetwo = useMemo(() => {
        if (selectdate) {
            const date = new Date(selectdate);
            var month = ["jan", "feb", "mar", "apr", "may", "jun", "july",
                "aug", "sep", "oct", "nov", "des"];
            var dd = date.getDate();
            var mm = month[date.getMonth()];
            var yyyy = date.getFullYear();
            var conformdate = `${dd} ${mm} ${yyyy}`;

            // console.log('conformdate-2', conformdate)

            return conformdate;
        } else {
            return ''; // Return empty string if selectdate is not set
        }
    }, [selectdate]);

    const sendtime = formattime;
    const sendtimetwo = formattime2;

    const rentnowfun = async () => {
        let flag = true;
        if (radiobtntwo == '') {
            flag = false;
            //setmsgRB('*Enter Duration')
        } else {
            setmsgRB('')
        }
        // if (selectdate == null) {
        //     flag = false;
        //     setmsg6('*Select Date')
        // } else {
        //     setmsg6('')
        // }
        // if (Starttime == '' && selectedId2 != 3) {
        // if (Starttime == '') {
        //     flag = false;
        //     setmsg7('*Enter Start Time')
        // } else {
        //     setmsg7('')
        // }

        // if (trips === '' && Endtime === '') {
        // if (trips === '') {
        //     flag = false;
        //     setmsg9(trips === '' ? '*Enter trip' : '');
        //     setmsg10(Endtime === '' ? '*Enter Time' : '');
        // } else {
        //     setmsg9('')
        //     setmsg10('')
        // }
        if (location == '') {
            flag = false;

            setmsg8('*Enter Location')
        } else {
            setmsg8('')
        }

        if (flag) {

            // console.log('selectdate==', selectdate)

            const formetdate2 = await formatDatetwo
            console.log('date2==', formetdate2)

            console.log('formetdate2-await', formetdate2)

           
            setLoading(true);
            const data = {
                list_id: isid,
                start_date:formetdate2,
                end_date:formetdate2
            };
            const response = await checkavailability(global.URL + 'checkavailability.php', data);
            setLoading(false);
            if (response.ResponseCode == 1) {
                navigation.navigate('Excavatorpayment', {
                    isid,
                    category,
                    // selectedId2,
                    formetdate2,
                    radiobtntwo,
                    location,
                    location2,
                    sendtime,
                    sendtimetwo,
                    trips,
                    polenum2,
                    rentCharges,
                    attachments,
                });
                console.log('attachments', attachments)
                closemodal();
            }else{
                alert('Already booked for selected date. please select different date.');
            }

        } else {
            console.log('44645')
        }
    }

    const rentnowtwo = async () => {
        if (radiobtnone == '') {
            //setmsg0('*Enter Duration')
        } else {
            setmsg0('')
        }
        if (datefff == '') {
            setmsg1('*Enter Start Date')
        } else {
            setmsg1('')
        }
        if (Period == '') {
            setmsg2('*Enter Period')
        } else {
            setmsg2('')
        }
        if (city == '') {
            setmsg3('*Enter Street Name')
        } else {
            setmsg3('')
        }
        if (postcode == '') {
            setmsg4('*Enter Postal Code')
        } else {
            setmsg4('')
        }
        if (polenum == '') {
            setmsg5('*Enter Lamp Pole Number')
        } else {
            setmsg5('')
        }

        if (radiobtnone !== '' && datefff !== '' && Period !== '' && city !== '' && postcode !== '' && polenum !== '') {
            // console.log('selectedId--==', selectedId)

            const combinedLocationone = `${city} ${postcode}`;
            console.log('--------->>', combinedLocationone)
            setlocationone(combinedLocationone);

            const formetdatefff = await formatDate;
            console.log('formetdatefff', formetdatefff)
            // const formetdate1 = await date1.toDateString();

            

            

            setLoading(true);
            const data = {
                list_id: isid,
                start_date:formetdatefff,
                end_date:enddate
            };
            const response = await checkavailability(global.URL + 'checkavailability.php', data);
            setLoading(false);
            
            if (response.ResponseCode == 1) {
                navigation.navigate('Excavatorpayment', {
                    isid,
                    category,
                    // selectedId,
                    radiobtnone,
                    formetdatefff,
                    // formetdate1,
                    Period,
                    enddate,
                    locationone: combinedLocationone,
                    city,
                    polenum2,
                    polenum,
                    rentCharges
                });
                closemodal();
            }else{
                alert('Already booked for selected date. change date and try.');
            }

           
            
        }
    }

    const openpdf = () => {
        const urlopen = 'https://hirent.hitact.com.sg/admin/' + iscatalog;
        // console.log('urlopen =>> ', urlopen)
        Linking.openURL(urlopen)
    }

    const isPDF = (file) => {
        return file.toLowerCase().endsWith('.pdf');
    };

    const openPDF = (pdfFile) => {
        const pdfview = 'https://hirent.hitact.com.sg/admin/' + pdfFile;
        console.log('pdfview =>> ', pdfview)
        Linking.openURL(pdfview)
        console.log('Opening PDF:', pdfFile);
    };



    function showDatePicker() {
        console.log('open');
        setopentwo(true)
    }
    function OnDateSelected(event, selectDate) {
        console.log('close');
        setopentwo(false)
        setselectdate(selectDate);
        showradiobtntwo(radiobtntwo, trips, Starttime, Endtime);

    }


    function OnDateSelected1(event, selectDate) {


        setOpen(false);
        setDatefff(selectDate);
        // calculateTotal();
        showradiobtnone(radiobtnone, Period);

    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }}>

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#FFFF' }}>
            <View style={styles.mainview}>
                {loading ?
                    <View style={globalstyles.spinner}>
                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                    </View>
                    : null}
                <ScrollView automaticallyAdjustKeyboardInsets={true}>
                    <View>
                        <View style={styles.arrowview}>
                            <TouchableOpacity onPress={navigateToHome}>
                                <Image source={require('../../../Image/previous1.png')} style={styles.imagearrow} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ToGetHelp}>
                                <Text style={styles.NeedHelptxt}>Need Help?</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <Text>{iscatalog}</Text> */}

                        <Image resizeMode="cover" source={{ uri: `${global.IMG + isimage}` }} style={styles.Rectangle18} />

                        < View style={styles.nameprice}>
                            <Text style={styles.txt1}>{isname}</Text>
                            <Text style={styles.txt2}>{isprice ? <Text>{isprice.includes('$') ? isprice : `$${isprice}`}/hr</Text> : <Text>{ispriceday.includes('$') ? ispriceday : `$${ispriceday}`}/Day</Text>} </Text>
                        </View>

                        <View>
                            <Text style={styles.txt3}>BOOK 1 WEEK ADVANCE!</Text>
                            <Text style={styles.txt3}>{isdescription}</Text>
                        </View>

                        {/* <Text style={styles.txt3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis tortor vel mauris tincidunt.</Text> */}
                        {iscatalog != '' ?
                            <TouchableOpacity onPress={() => openpdf()}>
                                <Text style={styles.txt4}>Click here to view product catalogue</Text>
                            </TouchableOpacity>
                            :
                            null
                        }

                        <View>
                            {specific.length > 20 ?
                                <Text style={styles.txt5}>Product Specifications</Text>
                                :
                                null
                            }
                            <View style={styles.Specifyview}>
                                {specific.length > 0 ? (

                                    specific.split('|').map((result, outerIndex) => (

                                        <View key={outerIndex} style={[styles.Specifyview3, { backgroundColor: outerIndex % 2 === 0 ? '#F5F5F5' : '#FFFFFF' }]}>
                                            {
                                                result.split(',').map((result, index) => (
                                                    (result.trim() !== '') && (
                                                        <View key={index}>
                                                            <View style={styles.Specifyview2}>
                                                                <View>
                                                                    <Text style={styles.Specifytxt1}>{result}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )
                                                ))
                                            }
                                        </View>
                                    ))
                                ) : (
                                    null
                                )}
                            </View>
                        </View>



                        <View>
                            {Getdata == '' ?
                                null
                                :
                                <Text style={styles.txt8}>Product Certificates</Text>
                            }
                            <View style={styles.proimgview}>
                                {Getdata.length > 0 ? (
                                    Getdata.split(',').map((result, index) => (
                                        <View style={{ marginTop: 10, marginRight: 10 }} key={index}>
                                            {isPDF(result) ? (

                                                <TouchableOpacity onPress={() => openPDF(result)}>
                                                    <Image source={require('../../../Image/pdf.png')} style={styles.check10} />
                                                </TouchableOpacity>
                                            ) : (

                                                <Image source={{ uri: `${global.IMG + result}` }} style={styles.image5} />
                                            )}

                                        </View>
                                    ))
                                ) : (
                                    null
                                )}
                            </View>
                        </View>

                    </View>

                    {user_id != '' ?
                        <TouchableOpacity style={styles.Getbtntouch} onPress={openmodal}>
                            <Text style={globalstyles.Getbtn}>Rent Now</Text>
                        </TouchableOpacity> : null
                    }
                    <View>
                        <Modal isVisible={modalVisible} onBackButtonPress={closemodal}
                            onBackdropPress={closemodal}
                            style={{ margin: 0, justifyContent: keyboardOpen ? 'center' : 'flex-end', marginTop: keyboardOpen ? 0 : 0 }}>

                            <View style={{ backgroundColor: 'white', width: '100%' }}>

                                <Text style={styles.mtxt1}>Rent Now</Text>

                                {category == 2 ?
                                    <View>
                                        <View style={styles.mcheckview}>

                                            <TouchableOpacity style={styles.buttontouchview} onPress={() => showradiobtnone('0', Period)}>
                                                <View style={radiobtnone == '0' ? styles.selectbox : styles.noselectbox}></View>
                                                <Text style={radiobtnone == '0' ? styles.selectedprice : styles.noselectprice}>By Day</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttontouchview} onPress={() => showradiobtnone('1', Period)}>
                                                <View style={radiobtnone == '1' ? styles.selectbox : styles.noselectbox}></View>
                                                <Text style={radiobtnone == '1' ? styles.selectedprice : styles.noselectprice}>By Week</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.buttontouchview} onPress={() => showradiobtnone('2', Period)}>
                                                <View style={radiobtnone == '2' ? styles.selectbox : styles.noselectbox}></View>
                                                <Text style={radiobtnone == '2' ? styles.selectedprice : styles.noselectprice}>By Month</Text></TouchableOpacity>
                                        </View>

                                        {msg0 ? <Text style={styles.msg0}>{msg0}</Text> : null}
                                    </View>
                                    :
                                    null
                                }

                                {category == 3 ?

                                    <View>
                                        <View style={styles.mcheckview}>

                                            <TouchableOpacity style={styles.buttontouchviewtwo1} onPress={() => showradiobtntwo('4', trips, Starttime, Endtime)}>
                                                <View style={radiobtntwo == '4' ? styles.selectbox : styles.noselectbox}></View>
                                                <Text style={radiobtntwo == '4' ? styles.selectedprice : styles.noselectprice}>By Trips</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttontouchviewtwo} onPress={() => showradiobtntwo('5', trips, Starttime, Endtime)}>
                                                <View style={radiobtntwo == '5' ? styles.selectbox : styles.noselectbox}></View>
                                                <Text style={radiobtntwo == '5' ? styles.selectedprice : styles.noselectprice}>By Timeslots (min 3 hours)</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.buttontouchviewtwo} onPress={() => showradiobtntwo('6', trips, Starttime, Endtime)}>
                                                <View style={radiobtntwo == '6' ? styles.selectbox : styles.noselectbox}></View>
                                                <Text style={radiobtntwo == '6' ? styles.selectedprice : styles.noselectprice}>By Day</Text></TouchableOpacity>
                                        </View>

                                        {msgRB ? <Text style={styles.msg0}>{msgRB}</Text> : null}

                                    </View>
                                    :
                                    null

                                }

                                {category == 2 ?
                                    <View style={styles.maindateview}>
                                        <View style={{ width: '48%', }}>

                                            <View style={styles.dateview}>


                                                <TouchableOpacity onPress={() => { if (!open) setOpen(true); }}>
                                                    <View style={[styles.maindateview2, category == 2 ? { width: '100%' } : null]}>
                                                        {datefff ?
                                                            <Image source={require('../../../Image/calendar1.png')} style={styles.dateimg} />
                                                            :
                                                            <Image source={require('../../../Image/calendar1.png')} style={styles.dateimg} />
                                                        }
                                                        {datefff ? (
                                                            <Text style={globalstyles.modaltxt}>{formatDate}</Text>
                                                        ) : (
                                                            <Text style={styles.mtxt3}>Select Date 11</Text>
                                                        )}

                                                    </View>

                                                    {open &&

                                                        <DateTimePicker
                                                            testID="dateTimePicker"
                                                            mode={mode}
                                                            value={datefff || new Date()}
                                                            is24Hour={true}
                                                            onChange={OnDateSelected1}
                                                            display={'inline'}
                                                            style={{ backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}
                                                            textColor={colorScheme === 'dark' ? 'white' : 'black'}

                                                        />
                                                    }
                                                </TouchableOpacity>

                                            </View>
                                            {/* </TouchableOpacity> */}

                                            {msg1 ? <Text style={styles.msg2}>{msg1}</Text> : null}
                                        </View>

                                        <View style={{ width: '48%', }}>
                                            {/* <TouchableOpacity onPress={() => setOpen1(true)}> */}
                                            <View style={styles.dateview1}>
                                                {/* {Period == '' ?
                                                    <Image source={require('../../../Image/calendar1.png')} style={styles.dateimg} />
                                                    :
                                                    <Image source={require('../../../Image/calenda.png')} style={styles.dateimg} />
                                                } */}
                                                {!open &&
                                                    <TextInput
                                                        style={[
                                                            Period == '' ? styles.txtinput : styles.txtinputin
                                                        ]}
                                                        placeholder='Period'
                                                        placeholderTextColor='#999CA5'
                                                        keyboardType='numeric'
                                                        value={Period}
                                                        onChangeText={(text) => onChangeperiod(text)}
                                                    //onChangeText={onChangeperiod()}
                                                    />
                                                }

                                            </View>
                                            {/* </TouchableOpacity> */}

                                            {msg2 ? <Text style={styles.msg2}>{msg2}</Text> : null}

                                        </View>
                                    </View>
                                    :
                                    null}
                                {category == 3 ?
                                    <View>
                                        <TouchableOpacity onPress={() => showDatePicker()}>
                                            <View style={styles.maindateview2}>
                                                {selectdate ?
                                                    <Image source={require('../../../Image/calenda.png')} style={styles.dateimg} />
                                                    :
                                                    <Image source={require('../../../Image/calendar1.png')} style={styles.dateimg} />
                                                }
                                                {selectdate ? (
                                                    <Text style={globalstyles.modaltxt}>{formatDatetwo}</Text>
                                                ) : (
                                                    <Text style={styles.mtxt3}>Select Date</Text>
                                                )}

                                            </View>

                                            {opentwo &&
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    mode={mode}
                                                    value={selectdate}
                                                    is24Hour={true}
                                                    onChange={OnDateSelected}
                                                    display={'inline'}
                                                    style={{ backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}
                                                    textColor={colorScheme === 'dark' ? 'white' : 'black'}

                                                />
                                            }
                                        </TouchableOpacity>

                                        <View>
                                            {msg6 ? <Text style={styles.msg}>{msg6}</Text> : null}
                                        </View>
                                    </View>
                                    :
                                    null
                                }

                                {category == 2 ?
                                    <View>
                                        <View style={styles.inputtxtview1}>
                                            {city == '' ?
                                                <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                                :
                                                <Image source={require('../../../Image/pin12.png')} style={styles.pin1} />
                                            }
                                            <TextInput
                                                style={[
                                                    city == '' ? styles.intxt : globalstyles.modaltxt
                                                ]}
                                                placeholder='Location (Street Name)'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={city}
                                                onChangeText={(text) => setcity(text)}
                                            >
                                            </TextInput>
                                        </View>
                                        {msg3 ? <Text style={styles.msg}>{msg3}</Text> : null}

                                        <View style={styles.inputtxtview1}>
                                            {postcode == '' ?
                                                <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                                :
                                                <Image source={require('../../../Image/pin12.png')} style={styles.pin1} />
                                            }
                                            <TextInput
                                                style={[
                                                    postcode == '' ? styles.intxt : globalstyles.modaltxt
                                                ]}
                                                placeholder='Postal Code'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={postcode}
                                                onChangeText={(text) => setpostcode(text)}
                                            >
                                            </TextInput>
                                        </View>
                                        {msg4 ? <Text style={styles.msg}>{msg4}</Text> : null}

                                        <View style={styles.inputtxtview1}>
                                            {polenum == '' ?
                                                <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                                :
                                                <Image source={require('../../../Image/pin12.png')} style={styles.pin1} />
                                            }
                                            <TextInput
                                                style={[
                                                    polenum == '' ? styles.intxt : globalstyles.modaltxt
                                                ]}
                                                placeholder='Lamp Pole Number'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={polenum}
                                                onChangeText={(text) => setpolenum(text)}
                                            >
                                            </TextInput>
                                        </View>
                                        {msg5 ? <Text style={styles.msg}>{msg5}</Text> : null}

                                    </View>
                                    :
                                    null
                                }

                                {category == 3 ?
                                    <View >
                                        {/* <View style={styles.secinputview}> */}
                                        {radiobtntwo == '4' &&
                                            <View style={{ width: '92%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 8 }}>
                                                {/* {radiobtntwo === '4' ? */}
                                                <View style={{ width: '48%', }}>
                                                    <TouchableOpacity onPress={() => setopenS(true)}>
                                                        <View style={styles.secinputtxtview}>
                                                            {Starttime == '' ?
                                                                <Image source={require('../../../Image/clock1.png')} style={styles.clock1} />
                                                                :
                                                                <Image source={require('../../../Image/calendarW.png')} style={styles.clock1} />
                                                            }

                                                            {Starttime ? (
                                                                <View>
                                                                    <Text style={globalstyles.modaltxt}>{formattime}</Text>
                                                                </View>

                                                            ) : (
                                                                <Text style={styles.mtxt3}>Start time</Text>
                                                            )}
                                                            <DatePicker
                                                                modal
                                                                mode={'time'}
                                                                open={openS}
                                                                date={Starttime || new Date()}
                                                                is24hourSource
                                                                theme={'light'}
                                                                minuteInterval={30}
                                                                onConfirm={(Starttime) => {

                                                                    const hours = Starttime.getHours();
                                                                    setopenS(false)
                                                                    setStarttime(Starttime)
                                                                }}
                                                                onCancel={() => {
                                                                    setopenS(false)
                                                                }}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                    {msg7 ? <Text style={styles.msg2}>{msg7}</Text> : null}

                                                </View>

                                                <View style={{ width: '48%', }}>
                                                    <View style={styles.secinputtxtview}>
                                                        {trips == '' ?
                                                            <Image source={require('../../../Image/cranetruck12.png')} style={styles.clock1} />
                                                            :
                                                            <Image source={require('../../../Image/cranetruck1.png')} style={styles.clock1} />
                                                        }
                                                        <TextInput
                                                            style={[
                                                                city == '' ? styles.intxt : globalstyles.modaltxt
                                                            ]}
                                                            placeholder='Number of Trips'
                                                            placeholderTextColor='#999CA5'
                                                            color='black'
                                                            value={trips}
                                                            keyboardType='numeric'
                                                            onChangeText={(text) => onChangeTrips(text)}
                                                        >
                                                        </TextInput>
                                                    </View>
                                                    {msg9 ? <Text style={styles.msg}>{msg9}</Text> : null}
                                                </View>
                                                {/* } */}
                                            </View>
                                        }
                                        {/* </View> */}
                                        {radiobtntwo == '5' &&

                                            <View style={{ width: '92%', marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                                                <View style={{ width: '48%', }}>
                                                    <TouchableOpacity onPress={() => setopenS(true)}>
                                                        <View style={styles.secinputtxtview}>
                                                            {Starttime == '' ?
                                                                <Image source={require('../../../Image/clock1.png')} style={styles.clock1} />
                                                                :
                                                                <Image source={require('../../../Image/calendarW.png')} style={styles.clock1} />
                                                            }

                                                            {Starttime ? (
                                                                <View>
                                                                    <Text style={globalstyles.modaltxt}>{formattime}</Text>
                                                                </View>

                                                            ) : (
                                                                <Text style={styles.mtxt3}>Start time</Text>
                                                            )}
                                                            <DatePicker
                                                                modal
                                                                mode={'time'}
                                                                open={openS}
                                                                theme={'light'}
                                                                minuteInterval={30}
                                                                date={Starttime || new Date()}
                                                                // is24hourSource
                                                                onConfirm={(Starttime) => {

                                                                    const hours = Starttime.getHours();
                                                                    console.log('hours-->>', hours)
                                                                    //if (hours >= 8 && hours <= 17) 
                                                                    {
                                                                        setopenS(false)

                                                                        const roundedTime = new Date(Starttime);
                                                                        roundedTime.setMinutes(Math.floor(roundedTime.getMinutes() / 30) * 30);


                                                                        setStarttime(roundedTime)
                                                                        showradiobtntwo(radiobtntwo, trips, roundedTime, Endtime)

                                                                        roundedTime.setHours(roundedTime.getHours() + 3);
                                                                        const hours = roundedTime.getHours();
                                                                        setEndtime(roundedTime);

                                                                        // if (hours >= 8 && hours <= 17) {
                                                                            
                                                                        // } else {
                                                                        //     setopenS(false)
                                                                        //     alert("Please select time between 8AM to 5PM");
                                                                        // }

                                                                    } 
                                                                    /*
                                                                    else {
                                                                        setopenS(false)
                                                                        alert("Please select time between 8AM to 5PM");
                                                                    }
                                                                    */    

                                                                }}
                                                                onCancel={() => {
                                                                    setopenS(false)
                                                                }}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                    {msg7 ? <Text style={styles.msg2}>{msg7}</Text> : null}

                                                </View>
                                                <View style={{ width: '48%', }}>
                                                    <TouchableOpacity onPress={() => setopenE(true)}>
                                                        <View style={styles.secinputtxtview}>
                                                            {Endtime == '' ?
                                                                <Image source={require('../../../Image/clock1.png')} style={styles.clock1} />
                                                                :
                                                                <Image source={require('../../../Image/calendarW.png')} style={styles.clock1} />
                                                            }

                                                            {Endtime ? (
                                                                <View>
                                                                    <Text style={globalstyles.modaltxt}>{formattime2}</Text>
                                                                </View>

                                                            ) : (
                                                                <Text style={styles.mtxt3}>End time</Text>
                                                            )}
                                                            <DatePicker
                                                                modal
                                                                mode={'time'}
                                                                open={openE}
                                                                theme={'light'}
                                                                minuteInterval={30}
                                                                date={Endtime || new Date()}
                                                                // is24hourSource
                                                                onConfirm={(Endtime) => {
                                                                    const hours = Endtime.getHours();
                                                                    if (hours >= 8 && hours <= 17) {
                                                                        setopenE(false)
                                                                        setEndtime(Endtime)
                                                                        showradiobtntwo(radiobtntwo, trips, Starttime, Endtime)
                                                                    } else {
                                                                        setopenE(false)
                                                                        alert("Please select time between 8AM to 5PM");
                                                                    }
                                                                }}
                                                                onCancel={() => {
                                                                    setopenE(false)
                                                                }}
                                                            />
                                                        </View>
                                                        {msg10 ? <Text style={styles.msg}>{msg10}</Text> : null}
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        }
                                        {radiobtntwo == '6' &&
                                            <View style={{ flexDirection: 'row', marginTop: 8, width: '92%', justifyContent: 'space-between', alignSelf: 'center' }}>
                                                <View style={styles.byday} >
                                                    <Image source={require('../../../Image/calendarW.png')} style={styles.clock1} />
                                                    <Text style={styles.mtxt7}>08:00 AM</Text>
                                                </View>
                                                <View style={styles.byday}>
                                                    <Image source={require('../../../Image/calendarW.png')} style={styles.clock1} />
                                                    <Text style={styles.mtxt7}>05:00 PM</Text>
                                                </View>

                                            </View>
                                        }

                                        <TouchableOpacity onPress={openmodal2}>
                                            <View style={styles.inputtxtview1}>
                                                {location == '' ?
                                                    <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                                    :
                                                    <Image source={require('../../../Image/pin12.png')} style={styles.pin1} />
                                                }
                                                <TextInput
                                                    style={[
                                                        location == '' ? styles.intxt : globalstyles.modaltxt
                                                    ]}
                                                    placeholder='Location 1'
                                                    placeholderTextColor='#999CA5'
                                                    color='black'
                                                    value={location}
                                                    editable={false}
                                                // onChangeText={(text) => setlocation(text)}
                                                >
                                                </TextInput>
                                            </View>
                                        </TouchableOpacity>
                                        {location2 != '' ?
                                            <TouchableOpacity onPress={addNewLocation}>
                                                <View style={styles.inputtxtview1}>
                                                    {location2 == '' ?
                                                        <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                                        :
                                                        <Image source={require('../../../Image/pin12.png')} style={styles.pin1} />
                                                    }
                                                    <TextInput
                                                        style={[
                                                            location2 == '' ? styles.intxt : globalstyles.modaltxt
                                                        ]}
                                                        placeholder='Location 2'
                                                        placeholderTextColor='#999CA5'
                                                        color='black'
                                                        value={location2}
                                                        editable={false}
                                                    >
                                                    </TextInput>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            null
                                        }
                                        {msg8 ? <Text style={styles.msg}>{msg8}</Text> : null}


                                        <View style={{ width: '92%', alignSelf: 'center' }}>
                                            {location != '' ?
                                                <TouchableOpacity onPress={addNewLocation}>
                                                    <Text style={styles.Addtxt}>+ Add location</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                            }

                                            {attech.length > 0 ?
                                                <View>
                                                    <Text style={styles.Includetxt}>Include Attachments?</Text>
                                                    {(
                                                        attech.split(',').map((result, index) => (

                                                            (result.trim() !== '') && (
                                                                <View style={styles.checkview1} key={index}>
                                                                    <CheckBox
                                                                        style={styles.Attachmentscheck}
                                                                        value={attachments.includes(result)}
                                                                        onValueChange={() => handleCheckboxChange(result)}
                                                                        tintColors={{
                                                                            // false: '#D9D9D9',
                                                                            // true: '#707175'
                                                                            true: '#007AFF'
                                                                        }}
                                                                    />
                                                                    <Text style={styles.checktxt}>{result}</Text>
                                                                </View>
                                                            )
                                                        ))
                                                    )
                                                    }
                                                </View>
                                                :
                                                null
                                            }
                                        </View>
                                    </View>
                                    :
                                    null
                                }
                                <View style={styles.chargeview}>
                                    <Text style={styles.mtxt4}>Rental Charges</Text>
                                    <Text style={styles.mtxt4}>${rentCharges}</Text>
                                </View>
                                {/* <View style={styles.chargeview1}>
                                <Text style={styles.mtxt4}>Transportation Fees</Text>
                                <Text style={styles.mtxt4}>$80</Text>
                            </View> */}
                                <View style={styles.Totalview}>
                                    <Text style={styles.mtxt5}>Grand Total</Text>
                                    <Text style={styles.mtxt5}>${grandTotal}</Text>
                                </View>

                                {category == 2 ?
                                    <TouchableOpacity style={{ marginBottom: 6, marginTop: 18 }} onPress={() => rentnowtwo()}>
                                        <Text style={globalstyles.Getbtn}>Review Rental Details</Text>
                                    </TouchableOpacity>
                                    :
                                    null
                                }

                                {category == 3 ?
                                    <TouchableOpacity style={{ marginBottom: 6, marginTop: 18 }} onPress={() => rentnowfun()}>
                                        <Text style={globalstyles.Getbtn}>Review Rental Details</Text>
                                    </TouchableOpacity>
                                    :
                                    null
                                }

                                {modalVisible2 ?
                                    <View style={{
                                        backgroundColor: 'white', width: '100%', position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <View style={styles.locationview}>
                                            <Text style={styles.mtxt9}>Location 1</Text>
                                            <TouchableOpacity onPress={closemodal2}>
                                                <Image source={require('../../../Image/close1.png')} style={styles.close1} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.inputtxtview1}>
                                            <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                            <TextInput
                                                style={styles.intxt}
                                                placeholder='Delivery Address (Street Name)'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={city1}
                                                onChangeText={(text) => setcity1(text)}
                                            >
                                            </TextInput>
                                        </View>
                                        <View style={styles.inputtxtview1}>
                                            <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                            <TextInput
                                                style={styles.intxt}
                                                placeholder='Postal Code'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={postcode1}
                                                onChangeText={(text) => setpostcode1(text)}
                                            >
                                            </TextInput>
                                        </View>
                                        <View style={styles.inputtxtview1}>
                                            <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                            <TextInput
                                                style={styles.intxt}
                                                placeholder='Lamp Pole Number'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={polenum1}
                                                onChangeText={(text) => setpolenum1(text)}
                                            >
                                            </TextInput>
                                        </View>

                                        {city1 == '' || postcode1 == '' || polenum1 == '' ?
                                            <Text style={styles.ConfirmTimeslot}>Confirm Timeslot</Text>
                                            :
                                            <TouchableOpacity style={{width:'70%',marginTop:15}} onPress={() => closemodal2(city1, postcode1, polenum1)} >
                                                <Text style={globalstyles.Getbtn}>Confirm Timeslot</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    : null
                                }
                                {modalVisible3 ?


                                    <View style={{
                                        backgroundColor: 'white', width: '100%', position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <View style={styles.locationview}>
                                            <Text style={styles.mtxt9}>Location 2</Text>
                                            <TouchableOpacity onPress={closemodal3}>
                                                <Image source={require('../../../Image/close1.png')} style={styles.close1} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.inputtxtview1}>
                                            <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                            <TextInput
                                                style={styles.intxt}
                                                placeholder='Delivery Address (Street Name)'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={city2}
                                                onChangeText={(text) => setcity2(text)}
                                            >
                                            </TextInput>
                                        </View>
                                        <View style={styles.inputtxtview1}>
                                            <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                            <TextInput
                                                style={styles.intxt}
                                                placeholder='Postal Code'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={postcode2}
                                                onChangeText={(text) => setpostcode2(text)}
                                            >
                                            </TextInput>
                                        </View>
                                        <View style={styles.inputtxtview1}>
                                            <Image source={require('../../../Image/pin1.png')} style={styles.pin1} />
                                            <TextInput
                                                style={styles.intxt}
                                                placeholder='Lamp Pole Number'
                                                placeholderTextColor='#999CA5'
                                                color='black'
                                                value={polenum2}
                                                onChangeText={(text) => setpolenum2(text)}
                                            >
                                            </TextInput>
                                        </View>

                                        {city2 == '' || postcode2 == '' || polenum2 == '' ?
                                            <Text style={styles.ConfirmTimeslot}>Confirm Timeslot</Text>
                                            :
                                            <TouchableOpacity style={globalstyles.locationbtn} onPress={() => closemodal3(city2, postcode2, polenum2)} >
                                                <Text style={globalstyles.Getbtn}>Confirm Timeslot</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    : null

                                }


                            </View>
                        </Modal>
                    </View>
                </ScrollView>




                {/* <Modal isVisible={modalVisible2} style={{ margin: 0, justifyContent: 'flex-end' }}>
            </Modal> */}

                {/* <Modal isVisible={modalVisible3} style={{ margin: 0, justifyContent: 'flex-end' }}>
            </Modal> */}

            </View >
        </KeyboardAvoidingView>
    </SafeAreaView>
    )
}
