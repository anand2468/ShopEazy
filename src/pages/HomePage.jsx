import './index.css';
import {  useEffect, useState } from 'react';
import Header from '../components/Header';
import ScrollItems from '../components/Scroll';


const HomePage =()=>{

    const [searchitem , setSearchItem] = useState('');
    const [results, setResults] = useState([{name: "Apple iPhone 16 (Black, 128 GB)", price: "69,999", url: "/apple-iphone-16-black-128-gb/p/itmb07d67f995271", website: "flipkart"},
        {name: "Apple iPhone 13 (Blue, 128 GB)", price: "44,999", url: "/apple-iphone-13-blue-128-gb/p/itm6c601e0a58b3c", website: "flipkart"}])

    const handleChange = (e)=>{
        setSearchItem(e.target.value);
    }

    const SubmitForm =()=>{
        fetch(`http://127.0.0.1:5000/getproducts?item=${results}`)
        .then((resp) => resp.json())
        .then(data=> setResults(data))
        .catch(err =>console.log(err))
    }

    return (<>
    <Header/>
        <h1>
            <center>Welcome to $hopEZ</center>
        </h1>
    <div>
        <center>
  <div className="search-container">
    <input type="text" id="search-input" placeholder="Search..." value={searchitem} onChange={handleChange} />
     <button id="search-button" onClick={SubmitForm}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="feather feather-search">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      </button>
  </div>
  
</center>
</div>
<ScrollItems />
<ProductSection itemList = {results}/>
    
    </>);
}

const ProductSection =({itemList})=>{
    useEffect(()=>{ console.log(itemList)},[])
    return (
        <main className="container mx-auto py-12 px-6">
            {itemList && itemList.map(item=> <ProductCard item={item}/>)}
        </main>
    )
}

const ProductCard =({item})=>{
    useEffect(()=>{console.log(item)}, [])
    return (
    <div className="text-center">
        <div className="relative">
            <img alt="Tote bag with a funky print" height="400"
                src={`https://www.${item.website}.com${item.url}`}
                width="300" />
                <img src={`${item.website}.jpg`} height="100" width="80"/>
        </div>
        <p className="mt-4">
            {item.name}
        </p>
        <p className="text-gray-600">
            ${item.price}
        </p>
    </div>)
}


export default HomePage;