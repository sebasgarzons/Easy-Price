function showHome() {
  console.log("Hola entré a la función");
  setTimeout(function () {
    $('#home_greeting').fadeIn();
  }, 1888);
  console.log("Hola salí de la función");
}



jQuery(document).ready(function ($) {
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

let response_value = JSON.parse(window.localStorage.getItem('authenticate'))??{};
console.log(response_value);

const api_url = 'https://pricehbtn-login.azurewebsites.net/'


$(".submit_login").click(e => {
  e.preventDefault();
  get_user_api();

});

$(".submit_register").click(e => {
  e.preventDefault();
  register_user_api();

});


$("#boton_test").click(e => {
  e.preventDefault();
  register_new_password();
});


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
    location.assign('http://127.0.0.1:5500/home.html')

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
      window.location.reload(true);
    }, 500);
  } catch (error) {
    console.error('Error', error);
    alert(error.message);
  }
}

async function register_new_password(){

  const reg_new_password = {

    email: response_value.email,
    password: document.getElementById('actual_password').value,
    new_password: document.getElementById('reg_nw_password').value

  }

  console.log(reg_new_password);

  try{
    await axios.patch('https://pricehbtn-login.azurewebsites.net/login/update/password/', reg_new_password);
    setTimeout(() => {
      location.assign('http://127.0.0.1:5500/index.html')
    }, 500);
  }catch(error){
    console.error(error);
    alert('Error');
  }


}

console.log('Llegué');



















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