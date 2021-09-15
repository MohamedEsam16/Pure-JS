//Globla variables
    // random background option
    let backgroundOption = true;

    //variable to control the interval
    let intervalControl;

// ================Random Backgroung images====================

//select landing page element
let landingPage = document.querySelector('.landing-page');

//Get array of images
let imgsArray = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];

landingPage.style.transition = '.5s all';



//function to randomize imgs
function randomizeImgs() {
    if(backgroundOption === true){

    intervalControl = setInterval(() => {
    //Get random number
    let randomNumber = Math.floor(Math.random() * imgsArray.length);
    console.log(randomNumber);
    //Change background image url
    landingPage.style.backgroundImage = 'url("images//'+ imgsArray[randomNumber] +'")';

},4000 );   
    }
}
randomizeImgs();

//===================================================== switch Background ===============================================
const reandomBackgrounds = document.querySelectorAll('.random-backgrounds span');



    //check if there is in local storage bacjground item
    let backgroundLocalItem = localStorage.getItem('background-item');

    //check if random background local storage is not empty
    if(backgroundLocalItem !== null){

        //Remove active class from all spans
       document.querySelectorAll(".random-backgrounds span").forEach(item=>{

           item.classList.remove("active");
       });

        if(backgroundLocalItem === 'true'){

            document.querySelector('.yes').classList.add('active');

            backgroundOption =true;

        }else{

            document.querySelector('.no').classList.add('active');

            backgroundOption = false;
    
        }
    }

    //loop the spans
    reandomBackgrounds.forEach(span=>{
        //click on every span
        span.addEventListener('click',(e)=>{
           
            handleActive(e);

            if(e.target.dataset.background === 'yes'){
                backgroundOption = true;
                randomizeImgs();
                localStorage.setItem('background-option',true);
            }else{
                backgroundOption = false;
                clearInterval(intervalControl);
                localStorage.setItem('background-option',false);

            }
        });

    });

//-----------------------------------------------------------------------

//==================Toggle settings Icon========================

let icon = document.querySelector('.toggle-settings i'),
    box = document.querySelector('.settings-box');
icon.addEventListener('click',()=>{
    //toggle for rotation
    icon.classList.toggle('fa-spin');
    
    //toggle for open
    box.classList.toggle('open');
});


//====================================================change color=================================================
const colorsLi = document.querySelectorAll('.colors-list li');

//loop on li elements
colorsLi.forEach(element=>{
    //click on li elements
    element.addEventListener('click',(e)=>{
      //set color on root
      document.documentElement.style.setProperty('--main-color',  e.target.dataset.color);
        //set color on local storage
        localStorage.setItem('color_option', e.target.dataset.color);

       handleActive(e);
    });

});

//check if there is local storage color
const mainColor = localStorage.getItem('color_option');
if( mainColor !== null ){
    document.documentElement.style.setProperty('--main-color',  mainColor);

    //Remove active class from all colors list item
    document.querySelectorAll('.colors-list li').forEach(ele=>{
        ele.classList.remove('active');
   
        //add active class on element with data color === local strage item
        if(ele.dataset.color === mainColor){
            ele.classList.add('active');
        }
    });

}




//======================Progress Bar =========================================

// Select skills selector
let ourSkills = document.querySelector('.skills');

window.onscroll = ()=>{

    /*
    Get the distance from element to edge of parenet
        here the parent is body, so it calculate 
        all distance above skills section
    */
    let skillsOffsetTop = ourSkills.offsetTop;

    /*
    here it calculates the height of skills section
    with padding and border and ...etc   */
    let skillsOuterHeight = ourSkills.offsetHeight;
    
    /*
        get window height the height of your browser screen
    */
    let windowHeight = window.innerHeight;

    /*
        get the distance you scrolled
    */
    let windowScrollTop = window.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');

        allSkills.forEach(skill=>{
            skill.style.width = skill.dataset.progress;
        });

    }

};

//===================================Gallery Pop Up==========================================
 
let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach(img=>{

    img.addEventListener('click',(e)=>{

        // create overlay element
        let overlay = document.createElement('div');

        //Add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to body
        document.body.appendChild(overlay);

        //create the pop up
        let popupbox = document.createElement('div');

        //Add class to popup box
        popupbox.className = 'popup-box';

        // add alt text as heading
        if(img.alt !== null){

            // create heading
            let imgHeading = document.createElement('h3');

            //create text for heading
            let imgText  = document.createTextNode(img.alt);

            //append the text tot the heading
            imgHeading.appendChild(imgText);

            //append the heading to the popup box
            popupbox.appendChild(imgHeading);


        }        

        //create the image
        let popupImage = document.createElement('img');

        //change source to clicked img src
        popupImage.src = img.src;

        //add image to popup box
        popupbox.appendChild(popupImage);

        //appen popup box to body
        document.body.appendChild(popupbox);

        //create the close span
        let closeBtn = document.createElement('span');

        //create close btn text
        let closeBtnText = document.createTextNode('x');

        //append text to close button
        closeBtn.appendChild(closeBtnText);

        //add class to close btn
        closeBtn.className = 'close-btn';

        //add close button to the popup box
        popupbox.appendChild(closeBtn);

    });


});

//Close Pop Up
document.addEventListener('click',(e)=>{
   
    if (e.target.className == 'close-btn'){
        //remove current popup
        e.target.parentNode.remove();

        //remove overlay
        document.querySelector('.popup-overlay').remove();
    }


});

//==================================Nav Bullets=====================================

//Select All Bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
    
    allBullets.forEach(ele=>{
        ele.addEventListener('click',(e)=>{
            
        
        //Remove active class from all children
        e.target.parentElement.querySelectorAll('.bullet-color').forEach(ele=>{
            ele.classList.remove('bullet-color');
        });

        //add active class on target
        e.target.classList.add('bullet-color');  
            
        });
    });



//Select All Links
const allLinks = document.querySelectorAll('.links a');

function smoothScroll(elements){

    elements.forEach(ele=>{

        ele.addEventListener('click',(e)=>{
            
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                
                behavior:'smooth',

            });
        });
    });
}
smoothScroll(allBullets);
smoothScroll(allLinks);


//==========Handlw Active Class=========

function handleActive(event){

    //Remove active class from all children
    event.target.parentElement.querySelectorAll('.active').forEach(ele=>{
        ele.classList.remove('active');
    });

    //add active class on target
    event.target.classList.add('active');    


}

//===========================Bullets Option=======================

const bulletsSpan = document.querySelectorAll('.bullets-option span');

const bulletsContainer = document.querySelector('.nav-bullets');

const bulletLocalItem = localStorage.getItem('bullets-option');

if(bulletLocalItem !== null){

    bulletsSpan.forEach(span=>{

        span.classList.remove('.active');

    });

    if(bulletLocalItem === 'block'){

        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');

    }else{

        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');


    }

}

bulletsSpan.forEach(span=>{

    span.addEventListener('click',(e)=>{

        if(span.dataset.display === "show"){

            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets-option', 'block');


        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets-option', 'none');

        }

        handleActive(e);

    });

});

//=======================Reset Button=====================
document.querySelector('.reset-options').onclick = function (){

    // localStorage.clear(); 
    localStorage.removeItem('color_option');
    localStorage.removeItem('background-option');
    localStorage.removeItem('bullets-option');

    //reload window
    window.location.reload();

};


//=======================Toggle menu ========================

const togglebtn = document.querySelector('.toggle-menu');
const links = document.querySelector('.links');

togglebtn.onclick = function(e){

    e.stopPropagation();

    this.classList.toggle('menu-active');
    
    links.classList.toggle('open');
};


//Click anywhere outside menu
document.addEventListener('click',(e)=>{

    if(e.target !== togglebtn && e.target !== links){

        //check if menu is open 
        if(links.classList.contains('open')){

            togglebtn.classList.toggle('menu-active');

            links.classList.toggle('open');

        }

    }

});

// stop propagation on menu
links.onclick = (e)=>{
    e.stopPropagation();
};




