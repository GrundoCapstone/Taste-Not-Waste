//user profile component
import { SafeAreaView, Text, Image } from 'react-native';
import React from 'react';
import styles from './styles'
import LogoutScreen from '../LogoutScreen/LogoutScreen';
import {connect} from 'react-redux'
import { gettingUserInfo } from '../../store/user';

class UserProfile extends React.Component{

    componentDidMount(){
        this.props.loadUserInfo()
    }
    
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
