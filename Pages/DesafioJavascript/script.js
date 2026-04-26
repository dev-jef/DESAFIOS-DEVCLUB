const btnForeach = document.getElementById("btn_Foreach");
const btnMap = document.getElementById("btn_Map");
const btnReduce = document.getElementById("btn_Reduce");
const btnFilter = document.getElementById("btn_Filter");
const ulProducts = document.querySelector("ul");


const Real = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' });
let n = 0;

function generateProducts(arrayProducts){
    ulProducts.innerHTML = "";
    arrayProducts.forEach(element => {
        ulProducts.innerHTML +=
        `
            <li >
                <button class="btnProduct">
                    <img src="${element.src}" alt="" srcset="">
                    <p>${element.name}</p>
                    <p class="item-price">${Real.format(element.price)}</p>
                </button>
            </li>
        `  
    });
}

function mapProducts(){
    let listMapProducts= menuOptions.map(product =>{  
        
        return { name: product.name, price: product.price -(product.price*0.10), vegan: product.vegan, src:product.src }
    })
    return listMapProducts
}

function reduceProducts(){
    const totalValue = menuOptions.reduce((acc,product) =>{
       acc += product.price
        return acc
    },0)
    console.log(totalValue)
    const listReduceProducts= [{ name: 'Pack All Burguer', price: totalValue, vegan: false, src: './img/AllBurguer.png' }]
    generateProducts(listReduceProducts)
}

function filterProducts(){
    const filteredProducts = menuOptions.filter( products => products.vegan ? true:false)
    generateProducts(filteredProducts)
}




function ulDisplayGrid(grid=true){
    if(grid){
        ulProducts?.classList.remove("flexProduct")
        ulProducts?.classList.remove("gridProducts")
        ulProducts?.classList.remove("fadeIn")
        ulProducts?.offsetWidth
        ulProducts?.classList.add("gridProducts")
        ulProducts?.classList.add("fadeIn")
    }else{
        
        ulProducts?.classList.remove("fadeIn")
        ulProducts?.classList.remove("flexProduct")
        ulProducts?.classList.remove("gridProducts")
        ulProducts?.offsetWidth
        ulProducts?.classList.add("flexProduct")
        ulProducts?.classList.add("fadeIn")
        
    }
}


btnForeach.addEventListener('click',()=>{
    generateProducts(menuOptions)
    ulDisplayGrid()
})


btnMap.addEventListener('click',()=>{
    generateProducts(mapProducts())
    ulDisplayGrid()
})

btnReduce.addEventListener('click',()=>{
    reduceProducts()
    ulDisplayGrid(false)  
})

btnFilter.addEventListener('click',()=>{
    filterProducts()
    ulDisplayGrid()
})


            