//user profile component
import { SafeAreaView, Text, Image, TouchableOpacity, Modal, View, Pressable } from 'react-native';
import React from 'react';
import styles from './styles'
import LogoutScreen from '../LogoutScreen/LogoutScreen';
import {connect} from 'react-redux'
import { gettingUserInfo, updateHealthRestrictions } from '../../store/user';
import {CheckBox} from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            vegan: false,
            vegetarian: false,
            dairyFree: false,
            glutenFree: false,
            modalVisible: false,
             }
    }

    componentDidMount(){
        this.props.loadUserInfo();
        console.log('USER INFO IN COMPONENT DID MOUNT',this.props.userInfo)
        this.setState({
            vegan: this.props.userInfo.healthLabels.vegan,
            vegetarian: this.props.userInfo.healthLabels.vegetarian,
            dairyFree: this.props.userInfo.healthLabels.dairyFree,
            glutenFree: this.props.userInfo.healthLabels.glutenFree
        })
    }
    render(){
        let userName = ""
        let userEmail = ""
        let vegan;
        let vegetarian;
        let glutenFree;
        let dairyFree;
        console.log('OUTSIDE CONTIDIONAL', this.props.userInfo)
        if(this.props.userInfo.id){
            console.log('IN CONDITIONAL',this.props.userInfo)
            userName = this.props.userInfo.fullName
            userEmail = this.props.userInfo.email
            vegan = this.props.userInfo.healthLabels.vegan
            vegetarian = this.props.userInfo.healthLabels.vegetarian
            glutenFree = this.props.userInfo.healthLabels.glutenFree
            dairyFree = this.props.userInfo.healthLabels.dairyFree
        }
        console.log(vegan, vegetarian, glutenFree, dairyFree)
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>My Profile</Text>
                <Image source={require("../../../assets/avoIcon.png")} style={styles.iconLogo}/>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userEmail}>{userEmail}</Text>
                <Text style = {vegan ? styles.checked : styles.unChecked}>Vegan</Text>
                <Text style = {vegetarian ? styles.checked : styles.unChecked}>Vegetarian</Text>
                <Text style = {glutenFree ? styles.checked : styles.unChecked}>Gluten Free</Text>
                <Text style = {dairyFree ? styles.checked : styles.unChecked}>Dairy Free</Text>
                <TouchableOpacity onPress={() =>this.setState({modalVisible:true})}><Text>Edit Dietary Preferences</Text></TouchableOpacity>
                <LogoutScreen />
                {this.maybeRenderModal()}
                <Text style={styles.appName}>Taste Not Waste</Text>
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
                    onPress={()=>{
                    this.setState({
                     glutenFree:!this.state.glutenFree
                    })
                 }}
                checked={this.state.glutenFree}
                uncheckedIcon = {<FontAwesome5
                    name="square"
                  />}
                checkedIcon= {<FontAwesome5
                    name="shopping-basket"
                  />}
                  iconType = 'material'
                title = {'Gluten Free'}
                />
                 <CheckBox
                    style={{flex: 1, padding: 10, margin: 10}}
                    onPress={()=>{
                    this.setState({
                     vegetarian:!this.state.vegetarian
                    })
                 }}
                checked={this.state.vegetarian}
                uncheckedIcon = {<FontAwesome5
                    name="square"
                  />}
                checkedIcon= {<FontAwesome5
                    name="shopping-basket"
                  />}
                  iconType = 'material'
                title = {'Vegetarian'}
                />
                <CheckBox
                    style={{flex: 1, padding: 10, margin: 10}}
                    onPress={()=>{
                    this.setState({
                     vegan:!this.state.vegan
                    })
                 }}
                checked={this.state.vegan}
                uncheckedIcon = {<FontAwesome5
                    name="square"
                  />}
                checkedIcon= {<FontAwesome5
                    name="shopping-basket"
                  />}
                  iconType = 'material'
                title = {'Vegan'}
                />
                <CheckBox
                    style={{flex: 1, padding: 10, margin: 10}}
                    onPress={()=>{
                    this.setState({
                     dairyFree:!this.state.dairyFree
                    })
                 }}
                checked={this.state.dairyFree}
                uncheckedIcon = {<FontAwesome5
                    name="square"
                  />}
                checkedIcon= {<FontAwesome5
                    name="shopping-basket"
                  />}
                  iconType = 'material'
                title = {'Dairy Free'}
                />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                    let healthLabels = {
                        'vegan':this.state.vegan,
                        'vegetarian': this.state.vegetarian,
                        'glutenFree': this.state.glutenFree,
                        'dairyFree': this.state.dairyFree}
                  this.props.editHealthInfo(healthLabels);
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
