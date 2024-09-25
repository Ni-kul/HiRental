import AsyncStorage from '@react-native-async-storage/async-storage';

// signup.php
export const signup = async (url, data) => {
    console.log('signup-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const signupdata = await res.json();
        console.log('signup==>>', signupdata);
        if (signupdata.ResponseCode == 1) {
            console.log("signupdata-data:", signupdata);
            // return signupdata;
        } else {

            console.log('ResponseCode-error')
        }
        return signupdata;

    } catch (error) {
        console.error('Error in signup API fun call: ', error);
        throw error;
    }
};
//verifyotp
export const verifyotp = async (url, data) => {
    console.log('verifyotp-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const verifyotpdata = await res.json();
        return verifyotpdata;
        // return verifyotpdata;
    } catch (error) {
        console.error('Error in verifyotp API fun call: ', error);
        throw error;
    }
};
// resendotp
export const resendotp = async (url, data) => {
    console.log('resendotp-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const resendotpdata = await res.json();
        console.log('resendotp==>>', resendotpdata);
        // if (verifyotpdata.ResponseCode == 1) {
        //     console.log("resendotp-data:", verifyotpdata);
        // } else {
        //     // alert('error')
        //     console.log('ResponseCode-error')
        // }
        return resendotpdata;
    } catch (error) {
        console.error('Error in resendotp API fun call: ', error);
        throw error;
    }
};
// login
export const login = async (url, data) => {
    console.log('login-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const logindata = await res.json();
        console.log('login==>>', logindata);
        if (logindata.ResponseCode == 1) {
            await AsyncStorage.setItem('userdetail', JSON.stringify(logindata.user_data));
            console.log("store-logindata-data:", logindata.user_data);
            // return logindata;
        } 
        return logindata;
    } catch (error) {
        console.error('Error logindata :', error);
        return {
            success: false,
            error: 'logindata failed',
        };
    }
};
// forgotpassword
export const forgotpassword = async (url, data) => {
    console.log('forgotpassword-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const forgotpassworddata = await res.json();
        console.log('forgotpassword==>>', forgotpassworddata);
        if (forgotpassworddata.ResponseCode == 1) {
            console.log("forgotpassworddata-data:", forgotpassworddata);
            // return forgotpassworddata;
        } else {
            console.log('forgotpassworddata-ResponseCode-error')
        }
        return forgotpassworddata;
    } catch (error) {
        console.error('Error in forgotpassworddata API fun call: ', error);
        throw error;
    }
};

export const checkavailability = async (url, data) => {
    
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const forgotpassworddata = await res.json();
        
        return forgotpassworddata;
    } catch (error) {
        console.error('Error in forgotpassworddata API fun call: ', error);
        throw error;
    }
};

// updateprofile
export const updateprofile = async (url, data) => {
    console.log('updateprofile-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const updateprofiledata = await res.json();
        console.log('updateprofile==>>', updateprofiledata);
        // if (updateprofiledata.ResponseCode == 1) {
        //     console.log("logindata-data:", updateprofiledata);
        // } else {
        //     // alert('error')
        //     console.log('updateprofiledata-ResponseCode-error')
        // }
        return updateprofiledata;
    } catch (error) {
        console.error('Error in updateprofiledata API fun call: ', error);
        throw error;
    }
};
// getproduct.php
export const getproduct = async (url, data) => {
    // console.log('getproduct-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const getproductdata = await res.json();
        // console.log('getproduct==>>', getproductdata);
        // if (getproductdata.ResponseCode == 1) {
        //     console.log("logindata-data:", getproductdata);
        // } else {
        //     // alert('error')
        //     console.log('getproductdata-ResponseCode-error')
        // }
        return getproductdata;
    } catch (error) {
        console.error('Error in getproductdata API fun call: ', error);
        throw error;
    }
};



export const getovertime = async (url, data) => {
    
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const getproductdata = await res.json();
        
        return getproductdata;
    } catch (error) {
        console.error('Error in getproductdata API fun call: ', error);
        throw error;
    }
};

export const overtimepaymentupdate = async (url, data) => {
    
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const getproductdata = await res.json();
        
        return getproductdata;
    } catch (error) {
        console.error('Error in getproductdata API fun call: ', error);
        throw error;
    }
};



// rentnow
export const rentnow = async (url, data) => {
    console.log('rentnow-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const rentnowdata = await res.json();
        console.log('rentnow==>>', rentnowdata);
        // if (rentnowdata.ResponseCode == 1) {
        //     console.log("logindata-data:", rentnowdata);
        // } else {
        //     // alert('error')
        //     console.log('rentnowdata-ResponseCode-error')
        // }
        return rentnowdata;
    } catch (error) {
        console.error('Error in rentnowdata API fun call: ', error);
        throw error;
    }
};
// myrental
export const myrental = async (url, data) => {
    // console.log('myrental-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const myrentaldata = await res.json();
        // console.log('myrentaldata==>>', myrentaldata);
        // if (myrentaldata.ResponseCode == 1) {
        //     console.log("logindata-data:", myrentaldata);
        // } else {
        //     // alert('error')
        //     console.log('myrentaldata-ResponseCode-error')
        // }
        return myrentaldata;
    } catch (error) {
        console.error('Error in myrentaldata API fun call: ', error);
        throw error;
    }
};


export const cancelbooking = async (url, data) => {
    // console.log('myrental-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const myrentaldata = await res.json();
       
        return myrentaldata;
    } catch (error) {
        console.error('Error in myrentaldata API fun call: ', error);
        throw error;
    }
};


// help
export const help = async (url, data) => {
    console.log('help-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const helpdata = await res.json();
        console.log('helpdata==>>', helpdata);
        // if (helpdata.ResponseCode == 1) {
        //     console.log("helpdata-data:", myrentaldata);
        // } else {
        //     // alert('error')
        //     console.log('helpdata-ResponseCode-error')
        // }
        return helpdata;
    } catch (error) {
        console.error('Error in helpdata API fun call: ', error);
        throw error;
    }
};
// applycoupon
export const applycoupon = async (url, data) => {
    console.log('applycoupon-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const applycoupondata = await res.json();
        console.log('applycoupon==>>', applycoupondata);
        return applycoupondata;
    } catch (error) {
        console.error('Error in applycoupondata API fun call: ', error);
        throw error;
    }
};

// getuserdetail
export const getuserdetail = async (url, data) => {
    // console.log('getuserdetail-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const getuserdetaildata = await res.json();
        // console.log('getuserdetail==>>', getuserdetaildata);
        return getuserdetaildata;
    } catch (error) {
        console.error('Error in getuserdetail API fun call: ', error);
        throw error;
    }
};
// getreward
export const getreward = async (url, data) => {
    console.log('getreward-data', data)
    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const getrewarddata = await res.json();
        console.log('getreward==>>', getrewarddata);
        return getrewarddata;
    } catch (error) {
        console.error('Error in getrewarddata API fun call: ', error);
        throw error;
    }
};
// getcanfig
export const getcanfig = async (url, data) => {

    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
        });

        const getcanfigdata = await res.json();
        // console.log('getcanfig==>>', getcanfigdata);
        return getcanfigdata;
    } catch (error) {
        console.error('Error in getcanfigdata API fun call: ', error);
        throw error;
    }
};