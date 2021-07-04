import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';

import { _pickImage, _takePhoto, submitToGoogle } from '../../store/scanner';

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
    let { image } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            {image ? null : (
              <Text style={styles.getStartedText}>Upload a Receipt</Text>
            )}
          </View>

          <View style={styles.helpContainer}>
            <Button
              onPress={this.props.pickImage}
              title="Pick an image from camera roll"
            />

            <Button onPress={this.props.takePhoto} title="Take a photo" />
            {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )}
            {this._maybeRenderImage()}
            {/* {this._maybeRenderUploadingOverlay()} */}
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

  // _maybeRenderUploadingOverlay = () => {
  //   if (this.state.uploading) {
  //     return (
  //       <View
  //         style={[
  //           StyleSheet.absoluteFill,
  //           {
  //             backgroundColor: 'rgba(0,0,0,0.4)',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           },
  //         ]}
  //       >
  //         <ActivityIndicator color="#fff" animating size="large" />
  //       </View>
  //     );
  //   }
  // };

  _maybeRenderImage = () => {
    let { image, googleResponse } = this.props;
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
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => this.props.submitToGoogle(this.props.image)}
          title="Analyze Receipt!"
        />

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

        <Text>Raw JSON:</Text>

        {googleResponse && (
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          >
            {/* {googleResponse.responses[0].textAnnotations[0].description} */}
            {this.props.googleResponse}
          </Text>
        )}
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
});

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
  };
};

export default connect(mapState, mapDispatch)(Scanner);
