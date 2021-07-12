//user profile component
import { View, SafeAreaView, Text, Button, Image } from 'react-native';
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