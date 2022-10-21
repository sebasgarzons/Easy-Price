function showHome() {
  console.log("Hola entré a la función");
  setTimeout(function () {
    $('#home_greeting').fadeIn();
  }, 1888);
  console.log("Hola salí de la función");
}



jQuery(document).ready(function ($) {

  /* get_all_products(); */
  /* console.log("Hola"); */

  $(".btn_login, .close_login").click(function () {
    $('.cont_login').toggleClass("slid");
  });

  $(".btn_register, .close_register").click(function () {
    $('.cont_register').toggleClass("slid");
  });

});

let user_id
let email
let name
let token

/* const selected_value = document.getElementById('type_prod_search').value; */
/* const selected_value_create = document.getElementById('type_prod_create').value; */
/* console.log(selected_value, selected_value_create); */

/* let list_products = [

] */

/* let Storage = localStorage.getItem()?JSON.parse(localStorage.getItem()):[]; */

let response_value = JSON.parse(window.localStorage.getItem('authenticate'))??{};
console.log(response_value);

const api_url = 'https://pricehbtn-login.azurewebsites.net/'


$(".submit_login").click(e => {
  e.preventDefault();
  get_user_api();
  get_all_products();
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
  
  get_only_product();
});

$('.create_pr_bttn').click(e => {
  e.preventDefault();
  console.log('Test bUTTON')
  create_product();
});


/* $(".bttn_categories").click(e => {
  e.preventDefault();
  get_all_categories();
});

$('.bttn_product').click(e => {
  e.preventDefault();
  get_a_product();
}); */


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
    console.log(data)
    window.localStorage.setItem('authenticate', JSON.stringify(data));
    response_value = JSON.parse(window.localStorage.getItem('authenticate'));
    location.assign('https://pricehbtn-demo.azurewebsites.net/home.html')

  } catch (error) {

    alert('Contraseña ó Usuario incorrectos');
  }

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
      location.assign('https://pricehbtn-demo.azurewebsites.net/index.html')
    }, 500);
  } catch (error) {
    console.error(error);
    alert('Error');
  }


}

/* async function get_all_products() {
  console.log('Llegué')
  var config = {
    method: 'get',
    url: 'https://pricehbtn-crud.azurewebsites.net/product/categories',
    headers: {
      'logintoken': response_value.token,
    }
  };

  const response = await axios(config)
  console.log(response.data)
  localStorage.setItem('products', JSON.stringify(response.data))

} */

async function get_only_product(){

  console.log(selected_value);
/*   const url_parameter = {
    category: document.getElementById('type_prod_create_datalist_search').value
  } */

/*   let get_value = document.getElementsByName('get_product')[0];
  get_value.addEventListener('input', function(){
    console.log('Valor seleccionado');
  }) */

/*   url_parameter = document.getElementById('type_prod_create_datalist_search').value
  console.log(console.log('Parameter: '), get_value); */
  var config = {
    method: 'get',
    url: 'https://pricehbtn-crud.azurewebsites.net/product/?key=category&value=' + selected_value,
    headers: {
      'logintoken': response_value.token,
    }
  };

  const response = await axios(config)
  console.log(response.data)

}

async function create_product(){
  let selected_value = document.getElementById('type_prod_create').value;
  console.log(selected_value);

/*   const data_product = {



  } */
/* 
  console.log(data_product); */
/*   const response = await axios.post(
    "https://pricehbtn-crud.azurewebsites.net/product",{
      headers: {
        'logintoken': response_value.token,
      },
      data: {
        name: document.getElementById('create_nom').value,
        price: document.getElementById('create_prec').value,
        measure_unity: document.getElementById('create_unic').value,
        category: selected_value,
        user_id: response_value.user_id
      }
    }
    ) */

    const response = await axios.post(
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
      ).then(response => console.log('Hola')).catch(error => console.log(error));











/*   try {
    await axios.post('https://pricehbtn-crud.azurewebsites.net/product/', data_product,);
    alert('Clave cambiada éxitosamente. Por favor inicia sesión de nuevo.')
    setTimeout(() => {
      location.assign('https://pricehbtn-demo.azurewebsites.net/index.html')
    }, 500);
  } catch (error) {
    console.error(error);
    alert('Error');
  } */







/*   const reg_product = {

    name: document.getElementById('create_nom').value,
    price: document.getElementById('create_prec').value,
    measure_unity: document.getElementById('create_unic').value,
    category: selected_value,
    user_id: response_value.user_id

  } */
  /* console.log(reg_product) */

  
/*   const config = {
    awai
  }; */

/*   

    MOEEEEZ

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















/*   let selected_value = document.getElementById('type_prod_create').value;
  console.log(selected_value);

  const reg_product = {

    name: document.getElementById('create_nom').value,
    price: document.getElementById('create_prec').value,
    measure_unity: document.getElementById('create_unic').value,
    category: selected_value,
    user_id: response_value.user_id

  }
  console.log('Llegué hasta justo antes del Try')
  console.log(reg_product)
  try {
    await axios.post('https://pricehbtn-login.azurewebsites.net/product' , reg_product);
    alert('Product created successfully');
  } catch (error) {
    console.error('Error', error);
  } */


}

/* function get_selected_value(){

} */

/* async function get_all_categories() {

  var config = {
    method: 'get',
    url: 'https://pricehbtn-crud.azurewebsites.net/product/categories',
    headers: {
      'logintoken': response_value.token,}
  };
  


} */

/* async function get_a_product() {

  var config = {
    method: 'patch',
    url: 'https://pricehbtn-crud.azurewebsites.net/product/by_product',
    headers: {
      'logintoken': response_value.product,
      'path': response_value.product
    }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

} */






/* async function get_all_productsII() {

  try{
    await axios.get('https://41f6-181-54-0-71.ngrok.io/product/', {
      headers:{
        'logintoken': response_value.token,
      }
    });
  }catch(error){
    console.error('Error', error);
  }

} */

/* console.log('El producto es:' + list_products[0]); */
/* console.log('Llegué'); */

/* token = (response_value.token)
console.log(token) */



















/* =============================== */

particlesJS({
  "particles": {
    "number": {
      "value": 142,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#41d404"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 7
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});