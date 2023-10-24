import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Appbar from './NavBar'
import Body from './Body'
import Pages from './Pagination'


export default function App(){
return (
<div>
    <Appbar />
    <Body />
    <Pages />
</div>
)}


