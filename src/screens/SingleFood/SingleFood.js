//single food component

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { firebase } from '../../firebase/config'
import { addFoodItem } from '../../store/singleFood'

class SingleFood extends React.Component {

    // componentDidMount() {
    //     this.props.loadSingleFood()
    // }

    render() {
        // console.log("AllFoodsFridge from FridgeScreen : ", this.props.allFoodsFridge)
        return (
            <View>
                    {this.props.singleFoodFridge.map((food, index) => {
                        return <View key = {food.name}>
                            <Text style = {styles.entityText}> {food.name} </Text>
                            <Text style = {styles.entityText}> This food expires in {food.expiration} days</Text>
                            </View>
                    })}
            </View>
        )
    }
}

// const mapState = (state) => {
//     return {
//         singleFoodFridge: state.singleFood
//     }
// }

const mapDispatch = (dispatch) => {
    return {
        loadSingleFood: (food) => dispatch(addFoodItem(food))
    }
}

export default connect(null, mapDispatch)(SingleFood)


