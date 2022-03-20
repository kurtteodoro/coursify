import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { getMediasPostAsync } from '../../store/post';
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import { decode } from 'html-entities';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        width: 250,
        borderRadius: 15,
        overflow: "hidden",
        marginRight: 15,
        borderWidth: 1,
        borderColor: "#eee"
    },
    img: {
        width: '100%',
        height: 130
    },
    title: {
        fontSize: 17,
        color: "#1FBD9E",
        fontWeight: "bold",
    },
    content: {
        padding: 10,
    },
    description: {
        fontSize: 14,
        marginTop: 7,
        color: "#878787"
    },
    gradient: {
        width: 250,
        height: 50,
        position: "absolute",
        bottom: 0
    },
    readMore: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#FFBB37",
        paddingVertical: 5
    },
    views: {
        color: "#878787",
        marginRight: 5,
        fontWeight: 'bold'
    }
});

const CardPost = function({ post, onPress }) {

    const dispatch = useDispatch();
    const [imgUrl, setImgUrl] = useState('');

    useEffect(()=>{
        // dispatch(getMediasPostAsync(post.id));
        if(post.featured_media)
            axios.get(`https://blog.coursify.me/wp-json/wp/v2/media/${post.featured_media}`).then( ({data}) => {
                setImgUrl(data.media_details.sizes.medium_large.source_url);
            });
    }, []);
    
    return(
        <TouchableOpacity onPress={() => onPress(post, imgUrl)} style={styles.container}>
            <View>
                {
                    imgUrl ? 
                    <Image style={styles.img} source={{
                        uri: imgUrl
                    }} /> : null 
                }
                <View style={styles.content}>

                    <View style={{position: "relative"}}>
                        <Text numberOfLines={2} style={styles.title}>{post.title.rendered}</Text>
                        <Text numberOfLines={4} style={styles.description}>{decode(post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""))}</Text>
                        <LinearGradient style={styles.gradient} colors={['rgba(255,255,255,0.5)', '#FFF']} ></LinearGradient>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.readMore}>Leia mais</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.views}>{post.page_views}</Text>
                            <Ionicons name="eye" size={20} color="#878787" />
                        </View>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CardPost;