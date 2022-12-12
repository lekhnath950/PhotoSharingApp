import { Button, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPost } from '../Actions/Post'
import { loadUser } from '../Actions/User'

const Newpost = () => {

    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState("")
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);

    const { loading, error, message } = useSelector((state) => state.like);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.onload = (e) => {
            if (Reader.readyState === 2) {
                setImage(Reader.result)
            };
        }
        Reader.readAsDataURL(file);
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(createNewPost(caption, image));
        setOpen(true)
        dispatch(loadUser());
    }

    // useEffect(()=> {
    //     if(message){
    //         alert(message);
    //     }
    // },[dispatch,message])


    return (
        <div >

            <div className='createpost'>
                <form onSubmit={submitHandler} className="newpost" >
                    <h3>Create New Post</h3>
                    {image && <img src={image} alt="post" style={{ width: '20vw' }} />} <br/>
                    <input type="file" name="file" accepts="image/*" onChange={handleImageChange} className="imageselector" required/> <br/>
                    <label for="file">Choose a Photo</label> <br/>
                    <input type='text' placeholder="caption" value={caption} className="captionn" onChange={(e) => setCaption(e.target.value)} required /> <br/><br/>
                    <Button disabled={loading} type="submit" variant='outlined'  >Post</Button>
                </form>
                    
<Snackbar
  open={open}
  autoHideDuration={6}
  message={message}
/>
            </div>
        </div>
    )
}

export default Newpost