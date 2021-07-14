import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import { fetchAllFoods } from '../../store/allFood';

class FridgeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onNavigationPress = this.onNavigationPress.bind(this);
  }

  componentDidMount() {
    this.props.loadAllFoods();
  }
  onNavigationPress(food) {
    this.props.navigation.navigate('SingleFood', {
      name: food.name,
      expiration: food.expiration,
    });
  }

  render() {
    let foods = this.props.allFoodsFridge;
    foods.sort(function (a, b) {
      const keyA = a.expiration;
      const keyB = b.expiration;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Fridge</Text>
          <View style={styles.totalList}>
            {foods.map((food, index) => {
              return (
                <TouchableOpacity
                  onPress={() => this.onNavigationPress(food)}
                  key={`${food.name}${index}`}
                >
                  <View style={styles.foodTile}>
                    <View style={styles.tileContent}>
                      <Text style={styles.foodName}>{food.name}</Text>
                      {parseInt(food.expiration) > 0 ? (
                        <Text style={styles.foodExpiration}>
                          {food.expiration} Days Left
                        </Text>
                      ) : food.expiration === 'unkown' ? (
                        <Text style={styles.unkown}>UNKNOWN EXPIRATION</Text>
                      ) : (
                        <Text style={styles.expired}>EXPIRED</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapState = (state) => {
  return {
    allFoodsFridge: state.allFoods,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllFoods: () => dispatch(fetchAllFoods()),
  };
};

export default connect(mapState, mapDispatch)(FridgeScreen);
