import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../store/user';
import styles from './styles';

class LogoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatch)(LogoutScreen);
