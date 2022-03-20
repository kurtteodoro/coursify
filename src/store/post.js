import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_API_URL } from '@env';

const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        'Authorization' : ''
    }
});

const slice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        categories: []
    },
    reducers: {
        setPosts: function(state, action) {
            state.posts = action.payload;
        },
        setCategories: function(state, action) {
            state.categories = action.payload;
        },
    }
});

export const getPostsAsync = () => async dispatch => {
    await axiosInstance.get('posts').then(({data}) => {
        dispatch(setPosts(data));
    }).catch(err => {
        alert("Ops, houve um erro ao buscar as postagems");
    }); 
}

export const getCategoriesAsync = () => async dispatch => {
    await axiosInstance.get('categories').then(({data}) => {
        dispatch(setCategories(data));
    }).catch(err => {
        alert("Ops, houve um erro ao buscar as categorias");
    });
}

export const { setPosts, setCategories } = slice.actions;
export default slice.reducer;