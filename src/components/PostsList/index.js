import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as actions from '../../redux/actions'
import { postsSelector } from '../../redux/selectors';

import Post from './Post';


function PostsList() {
    const dispatch = useDispatch();
    const postsList = useSelector(postsSelector)

    useEffect(() => {
        dispatch(actions.getPosts.getPostsRequest())
    }, [dispatch])

    return ( 
        <div className='row'>
            {postsList.map(post => {
                return <Post 
                    key={post._id}
                    post={post}
                />
            })}
        </div>
    );
}

export default PostsList