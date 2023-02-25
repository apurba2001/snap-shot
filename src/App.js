import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import './App.css';

function App() {

  const [pictures, setPictures] = useState([])
  const input = useRef()
  const [load, setLoad] = useState(true)
  const [title, setTitle] = useState('')

  const getPictures = async(query) => {
    setTitle(query)
    setLoad(true)
    const uri = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f07a409da4cbb2810b82847f818266c6&text=${query || 'random'}&per_page=30&page=1&format=json&nojsoncallback=1`
    const data = await axios.get(uri)
    setPictures(data.data.photos.photo)
    setLoad(false)
  }

  useEffect(()=>{
    getPictures('random')
  }, [])
  return (
    <div className="App">
      <h1>Snap Shot</h1>
      <div className='input-cont'>
        <input type='text' id="input-box" ref={input} placeholder="search" />
        <button id="search-btn" onClick={() => getPictures(input.current.value)}>Search</button>
      </div>
      <div className='buttons-box'>
        <button className='nav-btn' onClick={() => getPictures('mountain')}>Mountain</button>
        <button className='nav-btn' onClick={() => getPictures('beach')}>Beaches</button>
        <button className='nav-btn' onClick={() => getPictures('birds')}>Birds</button>
        <button className='nav-btn' onClick={() => getPictures('food')}>Food</button>
      </div>
      <h2>{title.charAt(0).toUpperCase() + title.slice(1)} Pictures</h2>
      <div className='display-box'>
        {load ? <h2>Loding...</h2> : pictures.map((picture) => <img key={picture.id} alt='image' className='images' src={`https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}.jpg`}/>)}
      </div>
    </div>
  )
}

export default App;
