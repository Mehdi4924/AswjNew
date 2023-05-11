import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { AppText } from "./AppText";
// import { TextInput } from 'react-native-paper';

// import DatePicker from "react-native-datepicker";

class FormInput extends Component {

    static propTypes = {
        error: PropTypes.any,
        iconName: PropTypes.string,
        containerStyle: PropTypes.any,
        icon_color: PropTypes.string,
        onPress_icon: PropTypes.func,
        ForgetPassword: PropTypes.func,
        forget: PropTypes.bool,
        iconName_s: PropTypes.string,
        text_input_container: PropTypes.any,
        predefineText: PropTypes.string,
        predefineContainer: PropTypes.any,
        predefineTextStyle: PropTypes.any,
        maxLength: PropTypes.any,
        iconName_pColor:PropTypes.any
    }

    render() {
        return (
            <View style={[this.props.containerStyle]} >
                <View style={this.props.text_input_container}>
                    {this.props.iconName_s !== undefined ?
                        <AntDesign color={"#fff"} size={17} name={this.props.iconName_s} style={{ alignSelf: 'center', marginHorizontal: 15 }} />
                        : null}
                        {this.props.iconName_p !== undefined ?
                        <FontAwesome5 color={this.props.iconName_pColor} size={12} name={this.props.iconName_p} style={{ alignSelf: 'center', marginHorizontal: 15 }} />
                        : null}
                    {this.props.predefineText ?
                        <View style={this.props.predefineContainer}>
                            <Text style={{ marginBottom: 2 }}>{this.props.predefineText}</Text>
                            <TextInput
                                {...this.props}
                                autoCapitalize="none"
                            //     error={false}
                            //     theme={{ colors: { primary: 'none', background: "transparent" }

                            // }} underlineColor="transparent" 
                            />
                        </View>
                        : <TextInput
                            {...this.props}
                            autoCapitalize="none"
                        //     error={false}
                        //     theme={{ colors: { primary: 'none', background: "transparent" }
                        // }} underlineColor="transparent" 
                        />
                    }

                    {this.props.iconName !== undefined ?
                        <View style={{
                            alignSelf: 'center', paddingHorizontal: 25, paddingVertical: 10, marginHorizontal: 15, backgroundColor: 'rgba(255,255,255,0.06)', shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 2,
                        }}>
                            <Ionicons color={this.props.icon_color} onPress={this.props.onPress_icon} size={17} name={this.props.iconName} style={{ alignSelf: 'center' }} />
                        </View>
                        : null}
                </View>
                {this.props.forget &&
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={this.props.ForgetPassword}>
                        <Text style={{ textAlign: 'right', marginTop: 10, color: 'grey' }}>Forget password?</Text>
                    </TouchableOpacity>
                }
                {this.props.error && <AppText style={{ color: "red" }} >{this.props.error}</AppText>}
            </View>
        );
    }
}

// class Date_picker extends Component {

//     static propTypes = {
//         error: PropTypes.any,
//         dob: PropTypes.any,
//         maxDate: PropTypes.any,
//         onDateChange: PropTypes.func
//     }

//     render() {
//         return (
//             <View style={[this.props.containerStyle]} >
//               <DatePicker
//                  style={{ marginTop: 15, width: '100%' }}
//                 date={this.props.dob}
//                 value={this.props.dob}
//                 mode="date"
//                 placeholder="D/O/B"
//                 format="YYYY-MM-DD"
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 maxDate = {this.props.maxDate}
//                 showIcon={false}
//                 customStyles={{
//                   dateText: { fontSize: 14, color: "#fff", textAlign: "left", },
//                   dateInput: {  alignItems: "flex-start", borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, }
//                 }}
//                 onDateChange={this.props.onDateChange}
//               />
//                 {this.props.error && <AppText style={{ color: "red" }} >{this.props.error}</AppText>}
//             </View>
//         );
//     }
// }

export { FormInput }