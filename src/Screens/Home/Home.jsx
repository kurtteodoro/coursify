import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAsync, getPostsAsync } from '../../store/post';
import CardPost from '../../Components/CardPost/CardPost';
import { Picker } from '@react-native-picker/picker';
import { az, za, minToMax, maxToMin } from './SortPost';
import Footer from '../../Components/Footer/Footer';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        color: "black",
        backgroundColor: "#FFF"
    },
    titleSection: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#348A8D"
    },
    seeMore: {
        color: "black"
    },
    rowTitle: {
        flexDirection: 'row', 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: 20
    },
    containerCardPostagem: {
        marginBottom: 15
    }
});

const Home = function({ navigation }) {

    const dispatch = useDispatch();
    const { post } = useSelector(state=>state);
    const [allCategorys, setAllCategorys] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [categorysShow, setCategorysShow] = useState([]);
    const [filter, setFilter] = useState(0); // 0 = Normal; 1 = A-Z; 2 = Z-A; 3 = + lidos; 4 = - Lidos; 

    useEffect(() => {
        if(post.posts.length == 0) {
            dispatch(getCategoriesAsync());
        }
    }, []);
    
    useEffect(() => {
        if(post.categories) {
            setAllCategorys(post.categories)
            dispatch(getPostsAsync());
        }
    }, [post.categories]);
    
    useEffect(() => {
        if(post.posts) {

            var _categories = [];

            /*
            *
            *   Aqui poderia ser feito de 2 formas, optei por fazer menos requisições ao servidor;
            *   Mas eu também poderia buscar apenas as categorias e depois ir buscando os posts de cada categoria
            * 
            */
            post.posts.forEach(post => {    
                post.categories.forEach(category_id => {
                    
                    var indexToAddPost = _categories.findIndex(c=>c.id==category_id)

                    if(indexToAddPost > 0)  {
                        _categories[indexToAddPost].posts.push(post);
                        _categories[indexToAddPost].views += post.page_views;
                    } else {
                        var category = allCategorys.find(c=>c.id==category_id);
                        _categories.push({
                            name: (category && category.name) ? category.name : "Unnamed",
                            id: category_id,
                            views: post.page_views,
                            posts: [post]
                        });
                    }

                });
            });

            setCategorys(_categories);
            setCategorysShow(_categories);

        }
    }, [post.posts]);

    const handleOpenPost = function(post, img) {
        navigation.navigate('Post', {
            post,
            img
        });
    }

    const sortCategory = function(type) {
        var _categorys = [...categorys];
        if(parseInt(type) == 0) {
            setCategorysShow(_categorys);
        } else if (parseInt(type) == 1) {
            setCategorysShow(_categorys.sort(az));
        } else if (parseInt(type) == 2){
            setCategorysShow(_categorys.sort(za));
        } else if (parseInt(type) == 3){
            setCategorysShow(_categorys.sort(minToMax));
        } else if (parseInt(type) == 4){
            setCategorysShow(_categorys.sort(maxToMin));
        }
    }

    

    return (
        <View>

            <ScrollView>
                <View style={styles.container}>

                    <Text>Filtro</Text>
                    <Picker
                        selectedValue={filter}
                        mode="dropdown"
                        onValueChange={(itemValue) => {
                            setFilter(itemValue);
                            sortCategory(itemValue)
                        }}
                    >
                        <Picker.Item label="Padrão" value="0" />
                        <Picker.Item label="A-Z" value="1" />
                        <Picker.Item label="Z-A" value="2" />
                        <Picker.Item label="Mais acessados" value="3" />
                        <Picker.Item label="Menos acessados" value="4" />
                    </Picker>

                    {
                        categorysShow.map( (category, index) => 
                            <View key={index} style={{marginBottom: 20}}>

                                <View style={styles.rowTitle}>
                                    <Text style={styles.titleSection}>{ category.name }</Text>
                                    <View style={{borderRadius: 100, overflow: "hidden"}}>
                                        <TouchableNativeFeedback>
                                            <View style={{padding: 5}}>
                                                <Text style={styles.seeMore}>Ver mais</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View>
                                </View>

                                <FlatList 
                                    data={category.posts}
                                    keyExtractor={(item) => item.id}
                                    horizontal={true}
                                    renderItem={post => 
                                        <View style={styles.containerCardPostagem}>
                                            <CardPost onPress={handleOpenPost} post={post.item} key={index} />
                                        </View>
                                    }
                                />

                            </View>
                        )
                    }
                </View>
                <Footer />
            </ScrollView>

        </View>
    );
}

export default Home;