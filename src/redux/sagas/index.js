import { takeLatest, call, put } from 'redux-saga/effects'
// import * as actions from '../actions'
import { getPosts } from '../actions'
import * as api from '../../api'

function* fetchPostSaga(actions) {
    const posts = yield call(api.fetchPosts);
    console.log(posts.data)
    yield put(getPosts.getPostsSuccess(posts.data));
}

function* mySaga() {
    yield takeLatest(getPosts.getPostsRequest, fetchPostSaga)
}

export default mySaga