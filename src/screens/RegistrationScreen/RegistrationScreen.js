import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { signup } from '../../store/user';

class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.onRegisterPress = this.onRegisterPress.bind(this);
  }

  onRegisterPress = (fullName, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    this.props.signupUser(fullName, email, password);
  };
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
        >
          <Image
            style={styles.logo}
            source={require('../../../assets/avoIcon.png')}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => this.setState({ fullName: text })}
            value={this.state.fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(text) => this.setState({ confirmPassword: text })}
            value={this.state.confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.onRegisterPress(
                this.state.fullName,
                this.state.email,
                this.state.password,
                this.state.confirmPassword
              )
            }
          >
            <Text style={styles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    signupUser: (fullName, email, password) =>
      dispatch(signup(fullName, email, password)),
  };
};

export default connect(null, mapDispatch)(RegistrationScreen);
