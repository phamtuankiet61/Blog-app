import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header'
import PostsList from '../components/PostsList'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { showModal } from '../redux/actions'; 
import { useDispatch, useSelector } from 'react-redux'
import { modalSelector } from '../redux/selectors';
import Modal from '../components/Modal';

function HomePage() {
    const { isShow } = useSelector(modalSelector)
    const dispatch = useDispatch();

    const handleShowModal = () => {
        dispatch(showModal())
    }

    return ( 
        <div className="container">
            <Header />
            <PostsList />
            { isShow && <Modal />}
            <div className='add_post-icon' onClick={handleShowModal}>
                <FontAwesomeIcon icon={faPlus} className='icon-plus'/>
            </div>
        </div>
    );
}

export default HomePage;