//user profile component
import { View, SafeAreaView, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '../../firebase/config'
import styles from './styles'
import LogoutScreen from '../LogoutScreen/LogoutScreen';
import {connect} from 'react-redux'
import { gettingUserInfo } from '../../store/user';

class UserProfile extends React.Component{

    componentDidMount(){
        this.props.loadUserInfo()

    }
    render(){
        console.log("USER PROFILE THIS PROPS =====", this.props.userInfo)
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>My Profile</Text>
                <Text>{this.props.userInfo.fullName}</Text>
                <Text>{this.props.userInfo.email}</Text>
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

//editable pre-populated form for full name name email
//sign out

//const userId = firebase.auth().currentUser.uid
//const userRef = firebase.firestore().collection(`/users/${userId}`)