import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getallusersPosts } from '../Actions/User'
import User from './User/User'

const Search1 = () => {

    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])
    const [data, setData] = useState([])
    const [type1,setType1] = useState([])

    const {users} = useSelector((state)=> state.allUsers)
    const dispatch = useDispatch();

    function getUser() {
        var obj1 = {type1 : type1}
        axios.get("/api/users/",obj1).then((succ) => {
            setData(succ.data)
            console.log(users)
        })
    }
 
    useEffect(() => {
        dispatch(getallusersPosts())
        getUser()
    }, [type1])

    useEffect(() => {
        if (search) {
            const newData = data.filter((user) => {

                const textData = search.toLowerCase();
                if (user.name.toLowerCase().startsWith(textData)) {
                    return user;
                } else if (user.city.toLowerCase().startsWith(textData)) {
                    return user
                }
                else {
                    return <h1>hehe</h1>
                }


            });
            setSearchData(newData);
            console.log(newData);
        } else {
            setSearchData([]);
            console.log('no data');
        }
    }, [search]);


    return (
        <div>
            <input onChange={(e) => setSearch(e.target.value)} className="ab" type="text" placeholder='Search'></input>
            { search ? (searchData.map((user) => (
                // <div className='col-lg-3 col-md-4 col-sm-4 col-xs-6 f-fmly' style={{ marginBottom: 30, cursor: 'pointer' }}>
                //     <div className='' style={{ boxShadow: '0 0 3px rgba(0,0,0,.5', borderRadius: '5px', height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
                //         <h3>{user.name}</h3>                    
                    <User
                    key={user.name}
                    UserId={user._id}
                    name={user.name}
                    Avatar={user.avatar.url}
                    />
                // </div>
            ))) : (data.map((user) => (
                <div className='col-lg-3 col-md-4 col-sm-4 col-xs-6 f-fmly' style={{ marginBottom: 30, cursor: 'pointer' }}>
                    <div className='' style={{ boxShadow: '0 0 3px rgba(0,0,0,.5', borderRadius: '5px', height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
                        <h3>{user.city}</h3>
                        
                    </div>
                </div>
            )))}


        </div>
    )
}

export default Search1