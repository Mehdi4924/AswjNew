export const loginValidation = (username, password) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username === '') {
        return {
            valid: false,
            errors: username === '' ? "Error:Email must be a valid email" : null
        }
    }
    else if (reg.test(username) === false) {
        return {
            valid: false,
            errors: reg.test(username) === false ? "Error:The email address is badly formatted" : null
        }
    }

    else if (password === '' ) {
        return {
            valid: false,
            errors: password === '' ? "Error : Password must be a valid password" : null
        }
    }
 
    else {
        return { valid: true, errors: null }
    }
}

export const Signup_validation = (email, password) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

   
 if (email === '') {
        return {
            valid: false,
            errors: email === '' ? "Please enter correct E-mail!" : null
        }
    }
    else if (reg.test(email) === false) {
        return {
            valid: false,
            errors: reg.test(email) === false ? "Error:The email address is badly formatted" : null
        }
    }
  
     else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Password should not be empty!" : null
        }
    }
    else if (password.length < 6) {
        return {
            valid: false,
            errors: password.length < 6 ? "Password should atleast 6 characters!" : null
        }
    }
  

    
    else {
        return { valid: true, errors: null }
    }
}


export const Edit_validation = (title, fname, lastname, email, Country, City, PhoneNumber, oldPassword, checkPassword, newpassword, userConfirmPassword, emailFlag, socialFlag, DateOfBirth) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (title === "") {
        return {
            valid: false,
            errors: title === "" ? "Please enter Your Title" : null
        }
    }
    else if (fname === "") {
        return {
            valid: false,
            errors: fname === "" ? "Please enter your first name" : null
        }
    }
    else if (lastname === "") {
        return {
            valid: false,
            errors: lastname === "" ? "Please enter your last name" : null
        }
    }
    else if (email === '' && emailFlag == true) {
        return {
            valid: false,
            errors: email === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(email) === false && emailFlag == true) {
        return {
            valid: false,
            errors: reg.test(email) === false ? "Email format is invalid" : null
        }
    }
    else if (Country === "") {
        return {
            valid: false,
            errors: Country === "" ? "Please select your Country" : null
        }
    }
    else if (City === "") {
        return {
            valid: false,
            errors: City === "" ? "Please enter your City" : null
        }
    }

    else if (PhoneNumber === "") {
        return {
            valid: false,
            errors: PhoneNumber === "" ? "Please enter your Phone Number" : null
        }
    }

    else if (PhoneNumber.length < 8) {
        return {
            valid: false,
            errors: PhoneNumber.length < 8 ? "Your Phone number must should be greater than 8" : null
        }
    }
    else if (DateOfBirth === "") {
        return {
            valid: false,
            errors: DateOfBirth === "" ? "Select Your Date of Birth" : null
        }
    }
    else if (oldPassword !== checkPassword && checkPassword !== '') {
        return {
            valid: false,
            errors: oldPassword !== checkPassword ? "Your Password is incorrect" : null
        }
    }
    else if (newpassword === '' && checkPassword !== '' || socialFlag == true && newpassword === '') {
        return {
            valid: false,
            errors: newpassword === '' ? "Please Enter Your new Password" : null
        }
    }
    else if (newpassword.length < 9 && checkPassword !== '' || socialFlag == true && newpassword.length < 9) {
        return {
            valid: false,
            errors: newpassword.length < 9 ? "Password must should contain 9 digits" : null
        }
    }
    else if (userConfirmPassword === "" && checkPassword !== '' || socialFlag == true && userConfirmPassword === "") {
        return {
            valid: false,
            errors: userConfirmPassword === "" ? "Please enter your confirm password" : null
        }
    }
    else if (newpassword !== userConfirmPassword && checkPassword !== '' || newpassword !== userConfirmPassword && socialFlag == true) {
        return {
            valid: false,
            errors: newpassword !== userConfirmPassword ? "Password doesn't match" : null
        }
    }

    else {
        return { valid: true, errors: null }
    }
}


export const ForgetPassword_Validation = (Email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    
     if (Email === '') {
        return {
            valid: false,
            errors: Email === '' ? "Please enter your correct E-mail !" : null
        }
    }
    else if (reg.test(Email) === false) {
        return {
            valid: false,
            errors: reg.test(Email) === false ? "Error:The email address is badly formatted" : null
        }
    }
  
    else {
        return { valid: true, errors: null }
    }
}

export const Update_Profile_Validations = (Name, Mosque, gender) => {
    // let minNumer = cardtype == 'Amex' ? 15 : 16
    // let minCvc = cardtype == 'Amex' ? 4 : 3
    if (Name === "") {
        return {
            valid: false,
            errors: Name === "" ? "Error:Please Enter Full Name!" : null
        }
    }
    else if (Mosque === "Nearby AWSJ Centers") {
        return {
            valid: false,
            errors: Mosque === "Nearby AWSJ Centers" ? "Error:Please select Center!" : null
        }
    }
    else if (gender===false) {
        return {
            valid: false,
            errors: gender===false ? "Error:Please Select Gender!" : null
        }
    }
   
    else {
        return { valid: true, errors:'' }
    }
   
}
