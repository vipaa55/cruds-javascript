
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let tmp;
let mood = "Title";

// get total
function getTotal() {
    if (price.value) {
        let result = +price.value + +taxes.value + +ads.value - discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "rgb(2, 102, 37)"
    } else {
        total.innerHTML = ""
        total.style.backgroundColor = "rgb(145, 6, 6)"
    }
}
// creat products and store it in a arry
let dataProducts;
if (localStorage.products != null) {
    dataProducts = JSON.parse(localStorage.products)
} else {
    dataProducts = [];
}


submit.onclick = () => {
    if (!title.value || !price.value || count.value>100) {
        total.style.backgroundColor = "rgb(145, 6, 6)"
        alert("please be sure from data")

    } else {

        let newpro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }

        if (submit.innerHTML == "Create") {
            if (count.value > 1) {
                for (let i = 0; i < newpro.count; i++) {

                    dataProducts.push(newpro);
                }
            } else {
                dataProducts.push(newpro);
            }
        } else {
            dataProducts[tmp] = newpro;
            count.style.display = "block"
            submit.innerHTML = "Create"
        }


        total.style.backgroundColor = "rgb(145, 6, 6)"
        localStorage.setItem('products', JSON.stringify(dataProducts))
        clearData()
    }

    showData()

}


function clearData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""

}

//  red

function showData() {
    let table = "";
    for (let i = 0; i < dataProducts.length; i++) {

        table += `
       <tr>
       <td>${i+1}</td>
       <td>${dataProducts[i].title}</td>
       <td>${dataProducts[i].price}</td>
       <td>${dataProducts[i].taxes}</td>
       <td>${dataProducts[i].ads}</td>
       <td>${dataProducts[i].discount}</td>
       <td>${dataProducts[i].total}</td>
       <td>${dataProducts[i].category}</td>
       <td><button id="update" onclick="update(${i})">Update</button></td>
       <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>` ;


    }
    document.getElementById("tbody").innerHTML = table;

    if (localStorage.products != "[]") {
        document.getElementById("deleteAll").innerHTML = ` 
        <button onclick="deletAll()">Dedlet All (${dataProducts.length})</button>
        `;
    } else {
        document.getElementById("deleteAll").innerHTML = "";
    }

}

showData()

function deleteData(i) {
    dataProducts.splice(i, 1);
    localStorage.products = JSON.stringify(dataProducts);
    showData()
}

function update(i) {

    title.value = dataProducts[i].title
    price.value = dataProducts[i].price
    taxes.value = dataProducts[i].taxes
    ads.value = dataProducts[i].ads
    discount.value = dataProducts[i].discount
    category.value = dataProducts[i].category

    count.style.display = "none"
    submit.innerHTML = "Update"
    tmp = i
    scroll({ top: 0, behavior: "smooth" })
    getTotal()
    //localStorage.products = JSON.stringify(dataProducts);
    //showData()
}

function deletAll() {

    document.getElementById("tbody").innerHTML = "";
    localStorage.products = "[]";
    dataProducts = []
    showData()

}


function getSearchMood(id) {
    let search = document.getElementById("search")
    if (id == "searchTitle") {

        mood = "Title";
    } else {

        mood = "Category";
    };
    search.placeholder = "searchBy" + mood
    search.value = ""
    showData()
    search.focus()


}

function searching(v) {
    let tablee = "";
    for (let i = 0; i < dataProducts.length; i++) {
        if (mood == "Title") {


            if (dataProducts[i].title.includes(v.toLowerCase())) {

                tablee += `
        <tr>
        <td>${i}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button id="update" onclick="update(${i})">Update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
         </tr>` ;

            }

        } else {

            if (dataProducts[i].category.includes(v.toLowerCase())) {

                tablee += `
            <tr>
            <td>${i}</td>
            <td>${dataProducts[i].title}</td>
            <td>${dataProducts[i].price}</td>
            <td>${dataProducts[i].taxes}</td>
            <td>${dataProducts[i].ads}</td>
            <td>${dataProducts[i].discount}</td>
            <td>${dataProducts[i].total}</td>
            <td>${dataProducts[i].category}</td>
            <td><button id="update" onclick="update(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
             </tr>` ;

            }

        }
    }
    document.getElementById("tbody").innerHTML = tablee;
}
