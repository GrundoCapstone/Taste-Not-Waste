import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../store/user';

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
        <TouchableOpacity
          style={{ marginTop: 300 }}
          onPress={this.handleLogout}
        >
          <Text>Logout</Text>
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
