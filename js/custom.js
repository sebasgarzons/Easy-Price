function showHome() {
  console.log("Hola entré a la función");
  setTimeout(function () {
    $('#home_greeting').fadeIn();
  }, 1888);
  console.log("Hola salí de la función");
}

response_value = JSON.parse(window.localStorage.getItem('authenticate'))??{};
response_categories = JSON.parse(window.localStorage.getItem('list_of_categories'))??{};
response_products_user = JSON.parse(window.localStorage.getItem('products_by_user'))??{};
response_products_by_category = JSON.parse(window.localStorage.getItem('list_products_by_category'))??{};


jQuery(document).ready(function ($) {

  $(".btn_login, .close_login").click(function () {
    $('.cont_login').toggleClass("slid");
  });

  $(".btn_register, .close_register").click(function () {
    $('.cont_register').toggleClass("slid");
  });

  $(".submit_login").click(e => {
    e.preventDefault();
    console.log('login');
    get_user_api();
    console.log('Ejecuté antes de tiempo categories');
  });

  $(".submit_register").click(e => {
    e.preventDefault();
    register_user_api();
  });

  $("#boton_test").click(e => {
    e.preventDefault();
    register_new_password();
  });

  $('.submit_search').click(e => {
    e.preventDefault();
    get_only_products_by_category();
  });

  $('.create_pr_bttn').click(e => {
    e.preventDefault();
    console.log('Test bUTTON')
    /* create_product(); */
    test();
  });

  $('.close_register_password').click(function () {
    console.log('Hola');
    $('.pop_up_change_psswrd').fadeOut();
  });

  $('.forgot_psswrd').click(function () {
    $('.pop_up_change_psswrd').fadeIn();
  });

  $('.log_out').click(function () {
    location.assign('index.html')
    localStorage.clear();
  });

});




console.log(response_value);
let user_name_value = document.getElementById('user_name');


function get_name_user() {
  user_name_value.innerHTML = response_value.email;
  console.log(user_name_value);
}

/* function set_data_products_search(){
  const datalist_search = document.getElementById('type_prod_search_datalist')
  const data_search = JSON.parse(localStorage.getItem('products'));

  data_search.forEach(producto => {
      datalist_search.innerHTML += `<option value="${producto}">${producto}</option>`
  });
} */

/* function set_data_products_create(){
  const datalist = document.getElementById('type_prod_create_datalist')
  const data = JSON.parse(localStorage.getItem('products'));

  data.forEach(producto => {
      datalist.innerHTML += `<option>${producto}</option>`
  });
} */













async function get_user_api() {
  const user_data = {
    email: document.getElementById('username').value,
    password: document.getElementById('password').value
  }
  try {
    const {
      data
    } = await axios.post('https://pricehbtn-login.azurewebsites.net/login/', user_data);
    // Respuesta de la API
    console.log('Envié datos del login')
    window.localStorage.setItem('authenticate', JSON.stringify(data));
    console.log('Data de usuario antes de enviar a LocalStorage: ', data)
    /* let response_value = JSON.parse(window.localStorage.getItem('authenticate')); */
    location.assign('home.html')
  }catch (error) {
    alert('Contraseña ó Usuario incorrectos');
  }
  
}

function show_data_home(){
  let response_value = JSON.parse(window.localStorage.getItem('authenticate'));
  console.log('El response es', response_value)
}

async function register_user_api() {

  const reg_user = {

    email: document.getElementById('reg_mail_user').value,
    name: document.getElementById('reg_name_user').value,
    cel: document.getElementById('reg_cel_user').value,
    password: document.getElementById('reg_psswrd_user').value
  }
  try {
    await axios.post('https://pricehbtn-login.azurewebsites.net/login/register/', reg_user);
    setTimeout(() => {
      alert('Usuario creado éxitosamente. Por favor inicia sesión')
      window.location.reload(true);
    }, 500);
  } catch (error) {
    console.error('Error', error);
    alert(error.message);
  }
}

async function register_new_password() {

  const reg_new_password = {

    email: response_value.email,
    password: document.getElementById('actual_password').value,
    new_password: document.getElementById('reg_nw_password').value

  }

  console.log(reg_new_password);

  try {
    await axios.patch('https://pricehbtn-login.azurewebsites.net/login/update/password/', reg_new_password);
    alert('Clave cambiada éxitosamente. Por favor inicia sesión de nuevo.')
    setTimeout(() => {
      location.assign('index.html')
    }, 500);
  } catch (error) {
    console.error(error);
    alert('Error');
  }


}

async function get_all_categories() {

  console.log('Llegó al inicio de obtener categorías')
  try {
    const {
      data
    } = await axios.get('https://pricehbtn-crud.azurewebsites.net/product/categories', {
      headers: {
        'logintoken': response_value.token
      }
    });

    // Respuesta de la API
    console.log('La data de categories es: ', data)
    window.localStorage.setItem('list_of_categories', JSON.stringify(data));
    response_categories = JSON.parse(window.localStorage.getItem('list_of_categories'));
    console.log('El response de categories es', response_categories)
  } catch (error) {
    console.error(error);
    alert('Error');
  }











/*   console.log('Llegué')
  var config = {
    method: 'get',
    url: 'https://pricehbtn-crud.azurewebsites.net/product/categories',
    headers: {
      'logintoken': response_value.token,
    }
  };

  const response = await axios(config) */

/*   var myHeaders = new Headers();
  myHeaders.append("logintoken", response_value.token);
  myHeaders.append("Content-Type", "application/json"); */

/*   var raw = JSON.stringify({
    "name": "Sal",
    "price": "14500",
    "measure_unity": "2",
    "category": "Semillas",
    "user_id": "b753afa7ac8484e95a38119712873580"
  }); */

/*   var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://pricehbtn-crud.azurewebsites.net/product/categories", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); */




/*   console.log(response.data)
  window.localStorage.setItem('products', JSON.stringify(response.data)) */
  /*   set_data_products_search();
    set_data_products_create(); */
}

/* let loader = document.getElementById('loader_cont_id');
window.addEventListener('load', function () {
  loader.style.display = 'none';
}); */











async function get_only_products_by_category() {
  let selected_value = document.getElementById('type_prod_search').value;
  console.log(selected_value);

  var config = {
    method: 'get',
    url: 'https://pricehbtn-crud.azurewebsites.net/product/?key=category&value=' + selected_value,
    headers: {
      'logintoken': response_value.token,
    }
  };
  const response = await axios(config)
  console.log(response.data)
  window.localStorage.setItem('list_products_by_category', JSON.stringify(response.data));
  response_products_by_category = JSON.parse(window.localStorage.getItem('list_products_by_category'));
  console.log(response_products_by_category)
  console.log(response_products_by_category[0].name)
  drawproducts_inDOM()
}

function drawproducts_inDOM(){
  let draw_products_cont = document.getElementById('draw_products');
  draw_products_cont.innerHTML = '';
  
  for (let i=0; i<response_products_by_category.length; i++){
    let draw_products = `
    <div class="card_user">
        <div>
            <h3>Producto: ${response_products_by_category[i].name}</h3>
            <h5>Categoría: ${response_products_by_category[i].category}</h5>
            <p>Precio: ${response_products_by_category[i].price}</p>
        </div>
    </div>
    `;
    draw_products_cont.innerHTML += draw_products
  }

  console.log(response_products_by_category[0].name)

}





async function create_product() {
  let selected_value = document.getElementById('type_prod_create').value;
  console.log(selected_value);
  alert('Producto creado éxitosamente');

  const data = {
    name: document.getElementById('create_nom').value,
    price: document.getElementById('create_prec').value,
    measure_unity: document.getElementById('create_unic').value,
    category: selected_value,
    user_id: response_value.user_id
  };

  /*   const headers = {
      'logintoken': response_value.token
    } */

  console.log('El valor de los campos es ', data)
  console.log(response_value.token)
  response = fetch("", {
    method: "post",
    url: 'https://pricehbtn-crud.azurewebsites.net/product/',
    headers: {
      'logintoken': response_value.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data
  });



}

async function test() {
  let selected_value = document.getElementById('type_prod_create').value;
  console.log(selected_value);
  alert('Producto creado éxitosamente');

  var myHeaders = new Headers();
  myHeaders.append("logintoken", response_value.token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: document.getElementById('create_nom').value,
    price: document.getElementById('create_prec').value,
    measure_unity: document.getElementById('create_unic').value,
    category: selected_value,
    user_id: response_value.user_id
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://pricehbtn-crud.azurewebsites.net/product/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

// This works.
/*     var config = {
      method: 'post',
      url: 'https://pricehbtn-crud.azurewebsites.net/product/',
      headers: {
        'logintoken': response_value.token,
      },
      body: data
    };
  
    const response = await axios(config)
    console.log(response) */

async function products_accord_user(){

  console.log('Llegué a obtener los productos del usuario')
  try {
    const {
      data
    } = await axios.get('https://pricehbtn-crud.azurewebsites.net/product/?key=user_id&value=' + response_value.user_id,{
      headers: {
        'logintoken': response_value.token
      }
    });

    // Respuesta de la API
    console.log('La data de productos antes del local storage es: ', data)
    window.localStorage.setItem('products_by_user', JSON.stringify(data));
    response_products_user = JSON.parse(window.localStorage.getItem('products_by_user'));
    console.log('El response de productos por usuario es', response_products_user)
  } catch (error) {
/*     console.error(error);
    alert('Error'); */
  }

  // ACÁ
  drawproducts_byuser_inDOM()
}


function drawproducts_byuser_inDOM(){

  let draw_products_cont = document.getElementById('draw_products_user');
  draw_products_cont.innerHTML = '';

  for (let i=0; i<response_products_user.length; i++){
    let draw_products = `
    <div class="card_user">
      <div>
          <h3>Producto: ${response_products_user[i].name}</h3>
          <h4>Categoría: ${response_products_user[i].category}</h4>
          <p>Precio: $${response_products_user[i].price}</p>
      </div>
    </div>
    `;
    draw_products_cont.innerHTML += draw_products
  }

  console.log(response_products_user[0].name)
}

/*     try {
      await axios.post('https://pricehbtn-crud.azurewebsites.net/product/',{
        headers: {
          'logintoken': response_value.token
        }
      }, data);
      // Acá va tú código L
    } catch (error) {
      console.error('Error', error);
      alert(error.message);
    } */



/*     var requestOptions = {
      method: 'POST',
      headers: {
        'logintoken': response_value.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data,
    };

    fetch("https://pricehbtn-crud.azurewebsites.net/product/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); */


/* location.assign('https://pricehbtn-demo.azurewebsites.net/home.html') */
/*     const response = await axios.post(
      "https://pricehbtn-crud.azurewebsites.net/product",{
        headers: {
          'logintoken': response_value.token,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          name: document.getElementById('create_nom').value,
          price: document.getElementById('create_prec').value,
          measure_unity: document.getElementById('create_unic').value,
          category: selected_value,
          user_id: response_value.user_id
        }
      }
      ).then(response => console.log('Hola')).catch(error => console.log(error)); */

/* MOEEEEZ

const response = await axios.post(
"https://pricehbtn-crud.azurewebsites.net/product",{
  headers: {
    'logintoken': response_value.token,
  },
  data: {
    name: document.getElementById('create_nom').value,
    price: document.getElementById('create_prec').value,
    measure_unity: document.getElementById('create_unic').value,
    user_id: response_value.user_id
  }
}
).then(response => console.log(response)).catch(error => console.log(error)); */


/* console.log('Llegué hasta el response', response.data) */


function come_categories_search() {
  console.log('Entré al search')
  const datalist_search = document.getElementById('type_prod_search_datalist')
  const data_search = JSON.parse(window.localStorage.getItem('list_of_categories'));

  data_search.forEach(producto => {
      datalist_search.innerHTML += `<option value="${producto}">${producto}</option>`
  });
}

function come_categories_create(){
  const datalist = document.getElementById('type_prod_create_datalist')
  const data = JSON.parse(localStorage.getItem('list_of_categories'));

  data.forEach(producto => {
      datalist.innerHTML += `<option>${producto}</option>`
  });
}
