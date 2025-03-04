import { useState } from "react";

const Home =()=>{
    const [item, setItem] = useState('');
    const [results, setResults] = useState()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault();
        fetch(`http://127.0.0.1:5000/getproducts?item=${item}`)
        .then(resp => resp.json())
        .then(data => setResults(data))
        .catch(err => console.log(err))
    }
    return (
        <>
         <Header />
         <div id="welcomemsg" class="m-auto mt-10 mb-5 w-[75%] text-center">welcome to shopEazy this the place where you can take correct decision based on your desired product choose your decision</div>

            {/** search bar starts here */}
            <div id="searchbar" class="m-auto flex w-full justify-center mb-10">
                <form onSubmit={handleSubmit} class="w-75%">
                    <input type="text" name="item" id="item" placeholder="search here.." class="rounded-lg border p-2 shadow w-80%" value={item} onChange={(e)=>{ setItem(e.target.value)}}/>
                    <input type="submit" value="search" class="rounded-md border p-2 hover:bg-gray-800 hover:text-white" />
                </form>
            </div>
            {/** search bar ends here */}

            {results && results.map(item => <ProductCard item={item}/>)}

        </>
    )
}

export default Home;

const Header = ()=>{
    return (
        <header class="flex justify-between p-4">
            <div id="logo" class="text-lg font-bold">ShopEazy</div>
            <div id="nav">
                <a href="#">login</a>
                <a href="#">about</a>
            </div>
        </header>
    )
}

const ProductCard = ({item})=>{
    return (
        <div id="products" class="flex flex-wrap m-2 lg:w-[75%] lg:my-3 lg:mx-auto lg:m-5">
            <div class="flex gap-3 shadow p-2 w-full rounded-xl border overflow-hidden">
                <div class="size-[90px] rounded-2xl" >
                    <img src={item.image_url} alt="" style={{'objectFit':'cover'}} />
                </div>
                <div class="grow">
                    <h2 class="font-bold text-xl"> {item.name}</h2>
                    <p>$ {item.price}</p>
                </div>
            </div>
        </div>
    )
}


{/* <div>
  <div id="products" class="flex flex-wrap m-2 lg:w-[75%] lg:m-auto">
     <div class="flex gap-3 shadow p-2 w-full rounded-xl border">
       <div class="size-[75px] bg-slate-500 rounded-2xl"></div>
       <div class="grow">
         <h2 class="font-bold text-xl">item name</h2>
         <p>$ price</p>
       </div>
     </div>
  </div>
  <div id="products" class="flex flex-wrap m-2 lg:w-[75%] lg:m-auto">
     <div class="flex gap-3 shadow p-2 w-full rounded-xl border">
       <div class="size-[75px] bg-slate-500 rounded-2xl"></div>
       <div class="grow">
         <h2 class="font-bold text-xl">item name</h2>
         <p>$ price</p>
       </div>
     </div>
  </div>
  <div id="products" class="flex flex-wrap m-2 lg:w-[75%] lg:m-auto">
     <div class="flex gap-3 shadow p-2 w-full rounded-xl border">
       <div class="size-[75px] bg-slate-500 rounded-2xl"></div>
       <div class="grow">
         <h2 class="font-bold text-xl">item name</h2>
         <p>$ price</p>
       </div>
     </div>
  </div>

</div> */}
