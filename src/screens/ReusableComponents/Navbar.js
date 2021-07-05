import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';


const FridgeRoute = () => <Text>Fridge</Text>
const NewOrderRoute = () => <Text>New Order</Text>
const RecipesRoute = () => <Text>Recipes</Text>
//bowl plus-square
//font awesome 5 - shopping basket
//materialCommunityIcons corn   food-apple   food-apple-outline   food-variant   fridge-outline silverware-variant
const NavBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'fridge', title: 'Fridge', icon: 'fridge-outline'},
        {key: 'newOrder', title: 'New Order', icon: 'shopping basket'},
        {key: 'recipes', title: 'Recipes', icon: 'silverware-variant'}
    ])
    const renderScene = BottomNavigation.SceneMap({
        fridge: FridgeRoute,
        newOrder: NewOrderRoute,
        recipes: RecipesRoute,
    })
    return (
        <BottomNavigation 
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene} />
    )
}

export default NavBar