import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import FileBase64 from 'react-file-base64'
import { hideModal, createPost } from "../../redux/actions";

function Modal() {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        title: '',
        content: '',
        attachment: ''
    });

    const formModalElement = useRef();
    const modalElement = useRef();

    const handleClickModal = useCallback((e) => {
        const allChildrenFrom = Array.from(formModalElement.current.getElementsByTagName("*"));
        if (e.target !== formModalElement.current && !allChildrenFrom.includes(e.target)) {
            dispatch(hideModal())
        };
    }, [dispatch]);

    useEffect(() => {
        const modalElements = modalElement.current;
        modalElements.addEventListener("click", handleClickModal)

        return () => {
            modalElements.removeEventListener("click", handleClickModal)
        }
    }, [handleClickModal]);

    const handleClickSubmit = () => {
        dispatch(createPost.createPostRequest(data))
        setData({ ...data, title: '', content: '', attachment: '' })
    }

    return (
        <div ref={modalElement} className="modal">
            <div ref={formModalElement} className='modal_form'>
                <h1 className='modal_form-title'>Create New Post</h1>
                <div className='form-group'>
                    <input 
                        type='text' 
                        id='title' 
                        name='title' 
                        placeholder=' '
                        value={data.title}
                        onChange={e => setData({ ...data, title: e.target.value })}
                    />
                    <label htmlFor='title' className="label-title">Title</label>
                </div>
                <div className='form-group'>
                    <label htmlFor="text_content" className="label-content">Content post</label>
                    <textarea 
                        name="content" 
                        id="text_content" 
                        maxLength="130"
                        value={data.content}
                        onChange={e => setData({ ...data, content: e.target.value })}
                    >
                    </textarea>
                </div>
                <FileBase64
                    accept='image/*'
                    multiple={false}
                    type='file'
                    value={data.attachment}
                    onDone={({ base64 }) => setData({ ...data, attachment: base64 })}
                />
                <button className="create_post-btn" onClick={handleClickSubmit}>Create Post</button>
            </div>
        </div>
    );
}

export default Modal;