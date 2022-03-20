import { View, Text, StyleSheet, TouchableNativeFeedback, Dimensions, Linking } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#1ABC9C",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 40
    },
    description: {
        color: "#FFF",
        textAlign: "center",
        marginVertical: 20
    },
    btnAction: {
        backgroundColor: "#FFA900",
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 1000
    }
});

const Footer = function() {
    return(
        <View style={styles.container}>
            <AutoHeightImage 
                width={Dimensions.get('window').width * 0.4}
                source={require('./../../../assets/images/logo-coursify-w.png')}
            />
            <Text style={styles.description}>O Coursify.me é uma plataforma de ensino a distância, onde qualquer pessoa ou empresa pode construir seu EAD e vender cursos pela internet.</Text>
            <View style={{overflow: "hidden", borderRadius: 1000}}>
                <TouchableNativeFeedback onPress={() => Linking.openURL('https://coursify.me/')}>
                    <View style={styles.btnAction}>
                        <Text style={{color: "#FFF"}}>Quero conhecer a plataforma!</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}

export default Footer;