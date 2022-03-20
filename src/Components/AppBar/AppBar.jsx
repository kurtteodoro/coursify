import { StatusBar } from 'react-native';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingVertical: 10,
        paddingLeft: 10,
        flexDirection: 'row'
    }
});

const AppBar = function({ navigation, back }) {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {
                    back ? 
                    <View style={{marginRight: 10, borderRadius: 100, overflow: "hidden"}}>
                        <TouchableNativeFeedback onPress={() => navigation.goBack()}>
                            <View style={{padding: 5, borderRadius: 100}}>
                                <Ionicons name="arrow-back-outline" size={32} color="black" />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    : null
                }
                <AutoHeightImage
                    width={150}
                    source={require('./../../../assets/images/logo.png')} 
                />
            </View>
            <View>
                <View style={{marginRight: 10, borderRadius: 100, overflow: "hidden"}}>
                    <TouchableNativeFeedback onPress={() => {console.log("Clique no menu superior")}}>
                        <View style={{padding: 5, borderRadius: 100}}>
                            <Ionicons name="menu" size={28} color="black" />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>
    );
}

export default AppBar;