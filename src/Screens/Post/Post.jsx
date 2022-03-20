import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import {decode} from 'html-entities';
import Footer from "../../Components/Footer/Footer";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: "#1FBD9E",
        fontWeight: "bold",
        // marginTop: 20
    },
    description: {
        color: "#878787",
        marginTop: 10
    },
    image: {
        borderRadius: 15
    },
    body: {
        marginTop: 20,
        color: "#878787",
    }
});

const Post = function( {navigation, route }) {

    const { post, img } = route.params;

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text selectable={true} style={styles.title} >{post.title.rendered}</Text>
                <Text selectable={true} style={styles.description}>{decode(post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""))}</Text>
                <AutoHeightImage
                    style={styles.image}
                    width={Dimensions.get('window').width - 40} 
                    source={{
                        uri: img
                    }}
                />
                <Text selectable={true} style={styles.body}>{decode(post.content.rendered.replace(/<\/?[^>]+(>|$)/g, ""))}</Text>
            </View>
            <Footer />
        </ScrollView>
    );
}

export default Post;