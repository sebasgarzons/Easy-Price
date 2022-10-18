function showHome(){
  console.log("Hola entré a la función");
    setTimeout(function(){
        $('#home_greeting').fadeIn();
    }, 1888);
  console.log("Hola salí de la función");

}

particlesJS(
    {
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
      }
);

jQuery(document).ready(function ($) {
	console.log("Hola");

    $(".btn_login, .close_login").click(function () {
		$('.cont_login').toggleClass("slid");
	});

    $(".btn_register, .close_register").click(function () {
		$('.cont_register').toggleClass("slid");
	});

});


/* login(function(){
    input = [];
    input = [
        user_email = document.getElementById('input').value(),
        user_password = document.getElementById('input1').value()
    ];

    const data = {
        email = input[0],
        password = input[1]
    };

    response = fetch("", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: data
    });


}); */
