//user profile component
import { SafeAreaView, Text, Image, TouchableOpacity, Modal, View, Pressable } from 'react-native';
import React from 'react';
import styles from './styles'
import LogoutScreen from '../LogoutScreen/LogoutScreen';
import {connect} from 'react-redux'
import { gettingUserInfo, updateHealthRestrictions } from '../../store/user';
import {CheckBox} from 'react-native-elements'


class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            healthLabels: {'vegan': false,
                        'vegetarian': false,
                    'dairy-free': false,
                    'gluten-free': false},
                    isChecked: false,
                    modalVisible: true,
             }
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
                <TouchableOpacity onPress={() =>this.setState({modalVisible:true})}><Text>Edit Dietary Preferences</Text></TouchableOpacity>
                <LogoutScreen />
                {this.maybeRenderModal()}
            </SafeAreaView>
        )
    }
    maybeRenderModal = () => {
        return (
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setState({
                ...this.state,
                modalVisible: !visible,
              });
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select Your Preferences</Text>
              <CheckBox
                    style={{flex: 1, padding: 10, margin: 10}}
                    onClick={()=>{
                    let labels = this.state.healthLabels;
                    this.setState({
                     isChecked:!this.state.isChecked
                    })
                 }}
                isChecked={this.state.isChecked}
                title = {'Gluten Free'}
                />
                 <CheckBox
                    style={{flex: 1, padding: 10, margin: 10}}
                    onClick={()=>{
                    let labels = this.state.healthLabels;
                    this.setState({
                     isChecked:!this.state.isChecked
                    })
                 }}
                isChecked={this.state.isChecked}
                title = {'Vegetarian'}
                />
                <CheckBox
                    style={{flex: 1, padding: 10, margin: 10}}
                    onClick={()=>{
                    let labels = this.state.healthLabels;
                    this.setState({
                     isChecked:!this.state.isChecked
                    })
                 }}
                isChecked={this.state.isChecked}
                title = {'Vegan'}
                />
                <CheckBox
                    style={{flex: 1, padding: 10, margin: 10}}
                    onClick={()=>{
                    let labels = this.state.healthLabels;
                    this.setState({
                     isChecked:!this.state.isChecked
                    })
                 }}
                isChecked={this.state.isChecked}
                title = {'Dairy Free'}
                />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  this.props.loadSingleFood(this.state.newFood);
                  this.setState({
                    ...this.state,
                    modalVisible: !this.state.modalVisible,
                  });
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  this.setState({
                    ...this.state,
                    modalVisible: !this.state.modalVisible,
                  });
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </Modal>
        );
      };
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadUserInfo: (user) => dispatch(gettingUserInfo(user)),
        editHealthInfo: (restrictions) => dispatch(updateHealthRestrictions(restrictions))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)
