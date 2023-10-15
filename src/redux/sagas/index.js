import { takeLatest, call, put } from 'redux-saga/effects'
import { getPosts, createPost, updatePost, deletePost } from '../actions'
import * as api from '../../api'

function* fetchPostSaga(actions) {
    try {
        const posts = yield call(api.fetchPosts);
        yield put(getPosts.getPostsSuccess(posts.data));
        
    } catch (error) {
        console.log(error);
        yield put(getPosts.getPostsFailure(error));
    }
}

function* createPostSaga(actions) {
    try {
        const posts = yield call(api.createPost, actions.payload);
        yield put(createPost.createPostSuccess(posts.data));
        
    } catch (error) {
        console.log(error);
        yield put(createPost.createPostFailure(error));
    }
}

function* updatedPostSaga(actions) {
    try {
        const updatedPost = yield call(api.updatePost, actions.payload);
        yield put(updatePost.updatePostSuccess(updatedPost.data));
        
    } catch (error) {
        console.log(error);
        yield put(updatePost.updatePostFailure(error));
    }
}

function* deletePostSaga(actions) {
    try {
        yield call(api.deletePost, actions.payload);
        yield put(getPosts.getPostsRequest());
        
    } catch (error) {
        console.log(error);
        yield put(deletePost.deletePostFailure(error));
    }
}

function* mySaga() {
    yield takeLatest(getPosts.getPostsRequest, fetchPostSaga)
    yield takeLatest(createPost.createPostRequest, createPostSaga)
    yield takeLatest(updatePost.updatePostRequest, updatedPostSaga)
    yield takeLatest(deletePost.deletePostRequest, deletePostSaga)
}

export default mySaga