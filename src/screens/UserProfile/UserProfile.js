//user profile component
import { SafeAreaView, Text, Image } from 'react-native';
import React from 'react';
import styles from './styles'
import LogoutScreen from '../LogoutScreen/LogoutScreen';
import {connect} from 'react-redux'
import { gettingUserInfo } from '../../store/user';
import RadioGroup from 'react-native-radio-buttons-group';
import CheckboxFlex from "react-native-checkbox-flex";
import CheckBox from 'react-native-check-box'

const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Option 1',
    value: 'option1'
}, {
    id: '2',
    label: 'Option 2',
    value: 'option2'
}]

class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            radioButtons: [...radioButtonsData],
            isChecked: false,
        }
        this.onPressRadioButton = this.onPressRadioButton.bind(this)
    }

    onPressRadioButton(radioButtonsArray) {
        this.setState({radioButtons: radioButtonsArray});
    }

    componentDidMount(){
        this.props.loadUserInfo()
    }
    // {name: vegan, isChecked: true/false}
    render(){
        let userName = ""
        let userEmail = ""
        if(this.props.userInfo !== null){
            userName = this.props.userInfo.fullName
            userEmail = this.props.userInfo.email
        }
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>My Profile</Text>
                <Image source={require("../../../assets/avoIcon.png")} style={styles.iconLogo}/>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userEmail}>{userEmail}</Text>
            <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>{
            this.setState({
            isChecked:!this.state.isChecked
      })
    }}
    isChecked={this.state.isChecked}
    leftText={"CheckBox"}
/>
                <LogoutScreen />
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadUserInfo: (user) => dispatch(gettingUserInfo(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)
