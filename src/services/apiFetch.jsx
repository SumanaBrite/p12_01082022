import {useEffect} from 'react'

export const fetchUser =  () =>{
useEffect( () =>{
    fetch('http://localhost:3000/user')
    .then(res => res.json())
    console.log(res);
})
}