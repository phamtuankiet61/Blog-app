import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost, deletePost } from '../../../redux/actions'; 
import images from "../../../assets/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'

function Post({ post }) {
    const dispatch = useDispatch();
    const iconHeartElement = useRef();

    const handleIconHeartClick = () => {
        iconHeartElement.current.classList.add('like-post');
        dispatch(updatePost.updatePostRequest({ ...post, likeCount: post.likeCount + 1 }))
    }

    const handleClickDeletePost = () => {
        dispatch(deletePost.deletePostRequest({ id: post._id }))
    }

    return (             
        <div className='card col-lg-6 col-sm-12'>
            <div className='card_header'>
                <img src={images.noImage} alt='noImage' className='card_header-avatar'></img>
                <div className='card_header-info'>
                    <h4 className='card_header-name'>{post.author}</h4>
                    <p className='card_header_create-date'>{moment(post.updatedAt).format('HH:MM MMM DD, YYYY')}</p>
                </div>
                <div className='card_header_icon-vertical'>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                    <div className="card_header_icon_option">
                        <ul>
                            <li onClick={handleClickDeletePost}><FontAwesomeIcon className="icon-trash" icon={faTrash}/>Delete</li>
                        </ul>
                    </div>
                </div>
            </div>

            <img className="card_image" src={post.attachment} alt="noImage"></img>

            <div className='card_content'>
                <h1 className='card_content-title'>{post.title}</h1>
                <p className='card_content_content'>{post.content}</p>
                <div className='card_content_icon-heart' >
                    <div 
                        className='icon-heart' 
                        ref={iconHeartElement}
                        onClick={handleIconHeartClick}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <p className="like">{post.likeCount} likes</p>
                </div>
            </div>
        </div>
    );
}

export default Post;