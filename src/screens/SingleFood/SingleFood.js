//single food component

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { firebase } from '../../firebase/config'
import { addFoodItem } from '../../store/singleFood'
import styles from '../FridgeScreen/styles'

class SingleFood extends React.Component {

    componentDidMount() {
        this.props.loadSingleFood()
    }

    render() {
        console.log("single food fridge props", this.props.singleFoodFridge)
        return (
            <View>
                    <Text style={styles.entityText}>{this.props.singleFoodFridge[0].name}</Text>
                    <Text style={styles.entityText}>This food expires in {this.props.singleFoodFridge[0].expiration} days</Text>
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        singleFoodFridge: state.singleFood
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadSingleFood: (food) => dispatch(addFoodItem(food))
    }
}

export default connect(mapState, mapDispatch)(SingleFood)


