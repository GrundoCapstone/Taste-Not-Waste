import React from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import styles from './styles';

import {
  _pickImage,
  _takePhoto,
  submitToGoogle,
  resetImage,
} from '../../store/scanner';

class Scanner extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
  };

  async componentDidMount() {
    MediaLibrary.requestPermissionsAsync();
    Camera.requestPermissionsAsync();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.textStyle} title="Go back">
              Back
            </Text>
          </TouchableOpacity>
          <Text style={styles.getStartedText}>Upload a Receipt</Text>
          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this.props.pickImage}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Pick an image from camera roll
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.props.takePhoto}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Take a Photo</Text>
            </TouchableOpacity>
            {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )}
            {this._maybeRenderImage()}
          </View>
        </View>
      </ScrollView>
    );
  }

  organize = (array) => {
    return array.map(function (item, i) {
      return (
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };

  _maybeRenderImage = () => {
    let { image } = this.props;
    if (!image) {
      return;
    }
    return (
      <View
        style={{
          marginTop: 20,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={() => {
            this.props.submitToGoogle(this.props.image);
            this.props.resetImage();
            this.props.navigation.navigate('ReviewOrder');
          }}
          title="Analyze Receipt!"
        >
          <Text style={styles.buttonText}>Analyze Receipt!</Text>
        </TouchableOpacity>

        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;
}

const mapState = (state) => {
  return {
    image: state.scanner.image,
    googleResponse: state.scanner.googleResponse,
  };
};

const mapDispatch = (dispatch) => {
  return {
    pickImage: () => dispatch(_pickImage()),
    takePhoto: () => dispatch(_takePhoto()),
    submitToGoogle: (image) => dispatch(submitToGoogle(image)),
    resetImage: () => dispatch(resetImage()),
  };
};

export default connect(mapState, mapDispatch)(Scanner);
