window.onload=function(){ 

  

    setTimeout(() => {
  
      document.querySelector('.loading-bar').style.display = 'none';
      document.querySelector('body').setAttribute('style','overflow: scroll;');
    
    }, 6000);
    
   
  
    var disheImage = document.querySelectorAll('.image-handle');
    var disheName = document.querySelectorAll('.dish-heading-name');
    var dishTitle = document.querySelectorAll('.dish-title');
    var dishPrice= document.querySelectorAll('.price-food');
    var dropDownMenu = document.getElementById('myDropdown');
   
  
    // breakfeast
  
    BreakfastObj = [
      {
        name : 'Organic Oatmeal',
        desc : 'This oatmeal makes a delicious, chewy, wholesome hot cereal that will give you lasting energy throughout the morning. ',
        price: '$12.50 ',
        picture :'https://i.imgur.com/jLkQ4El.png'
      
      },
      {
        name : 'Grilled Panini',
        desc : 'Fresh toppings and perfectly melted cheese makes every bite of our Grilled Panini simply mouthwatering. ',
        price: '$13.90',
        picture :'https://i.imgur.com/BAAtOE5.png'
      },
      {
        name : 'Eggplant Sandwiches',
        desc : 'Roasted eggplant in a French roll with feta cheese, basil and garlic mayonnaise. It’s a No. 1 favorite of our clients.  ',
        price: '$10.90 ',
        picture : 'https://i.imgur.com/Quazh6g.png '
      },
      {
        name : 'Stack of Pancakes',
        desc : 'Taste this homey goodness of plain golden pancakes served with whipped butter cooked according to our chef’s recipe ',
        price: '$9.50 ',
        picture : 'https://i.imgur.com/DaMzoZS.png'
      }
    ]
    // lunch
  
    lunchObj = [
      {
        name : 'Medu Wada ',
        desc : 'Medu Wada is a traditional Indian snack, which is perfect to have during lunchtime, especially dunked in hot sambar ',
        price: '$12.50 ',
        picture :'https://i.imgur.com/INeudag.jpg '
      },
      {
        name : 'Zrazy',
        desc : 'Zrazy is a traditional Ukrainian snack, which tastes like small meat or potato pie and has a lot of other fillings. ',
        price: '$13.90',
        picture : 'https://i.imgur.com/MPHlVIV.jpg '
      },
      {
        name : 'Puff Pastry Bun ',
        desc : 'These tasty puff pastry buns are perfect sides to any hot drink like tea or coffee during lunch. Try them out at our restaurant! ',
        price: '$10.90 ',
        picture : 'https://i.imgur.com/QhIVVeK.jpg'
      },
      {
        name : 'Sandwiches with Cheese ',
        desc : 'Sandwiches have always been perfect snacks during lunch or dinner, but they taste even better with cheese and dried vegetables ',
        price:  '$9.50',
        picture : 'https://i.imgur.com/QJzWYjm.jpg'
      }
    ]
  
    // salads
  
    saladsObj = [
      {
        name : 'Mozzarella Salad ',
        desc : 'Fresh Mozzarella, roasted pepper, tomatoes, walnut, basil pesto, balsamic sauce and mixed green salad served in one bowl. ',
        price: '12.50 ',
        picture :'https://i.imgur.com/Y0nrHUR.jpg'
      },
      {
        name : 'Greek Salad ',
        desc : 'Cucumbers, grape tomatoes, red onions, banana peppers, black olives, and feta cheese add this salad a real Greek taste. ',
        price: '$13.90 ',
        picture : 'https://i.imgur.com/722myxX.jpg '
      },
      {
        name : 'Caesar Salad ',
        desc : 'All summer vegetables are packed into one salad, which is mixed with a truly Italian flavor. Enjoy this masterpiece at our restaurant! ',
        price: '$10.90 ',
        picture : 'https://i.imgur.com/diVS1Sf.jpg '
      },
      {
        name : 'Italian Chopped Salad ',
        desc : 'All summer vegetables are packed into one salad, which is mixed with a truly Italian flavor. Enjoy this masterpiece! ',
        price: '$9.50 ',
        picture : 'https://i.imgur.com/d1va70S.jpg '
      }
    ]
  
    // cake
  
    cakeObj = [
      {
        name : 'Strawberry Cake',
        desc : 'This cake truly lives up to its name! Three cake layers are filled with strawberry-studded whipped cream, which tastes delicious! ',
        price: '$12.50 ',
        picture :'https://i.imgur.com/QHBUQYT.jpg '
      },
      {
        name : 'Domino Cake',
        desc : 'Enjoy this classic dessert with cocoa powder, icing sugar, and chocolate filling combined with tasty sponge cakes. ',
        price: '$13.90',
        picture : 'https://i.imgur.com/9nTxw89.jpg '
      },
      {
        name : 'Coconut Cake',
        desc : 'With coconut baked into the cake and a generous sprinkle atop a buttery frosting, this decadent white cake is sure to be your No. 1.',
        price: '$10.90',
        picture : 'https://i.imgur.com/qRXEU0r.jpg'
      },
      {
        name : 'Cake with Lime',
        desc : 'If you enjoy lime and like tasty and sweet desserts, this one will quickly become your favorite.',
        price: '$9.50',
        picture : 'https://i.imgur.com/uy7o4Mj.jpg'
      }
    ]
    // drink
    DrinkObj = [
      {
        name : 'Lime juice',
        desc : 'This amazing lime juice is our favorite as it is healthy and energizing drink, which is also refreshing in summer.',
        price: '$12.50',
        picture :'https://i.imgur.com/mcO4hRx.jpg'
      },
      {
        name : 'Strawberry juice ',
        desc : 'When it comes to , strawberries get short shrift. This strawberry drink is our summer favorite. ',
        price: '$13.90 ',
        picture : 'https://i.imgur.com/J04Tjuj.jpg'
      },
      {
        name : 'Orange Juice ',
        desc : 'This quick, fresh, and delicious juice is loaded with carrots and oranges, and is a great way to start off your day! ',
        price: '$10.90 ',
        picture : 'https://i.imgur.com/YJZ4kxj.jpg',
      },
      {
        name :'Iced Water ',
        desc :'This drink is an old classic enjoyed by many, kids and adults. This will be sure to please especially on a hot day. ',
        price:'$9.50 ',
        picture :'https://i.imgur.com/oj0yU3J.jpg'
      },
    ]
    // catering
    CateringObj = [
      {
        name :'Noodle Soup ',
        desc :'Made-from-scratch noodles are the star of this soup, which is a true classic for all our clients. ',
        price:'$12.50 ',
        picture :'https://i.imgur.com/hNJHUv6.jpg '
      },
      {
        name :'Vegetable Soup',
        desc :'Based on vegetable broth, barley, and lots of veggies, this soup tastes really hearty and filling, and is perfect during dinner. ',
        price:'$13.90 ',
        picture :'https://i.imgur.com/DS2PxDr.jpg'
      },
      {
        name :'Falafel',
        desc :'Deep fried, and made with yellow split peas, onion, fresh mint, and spices, these falafel are great when served in pita with salad. ',
        price:'$10.90 ',
        picture :'https://i.imgur.com/UrWjZyT.jpg '
      },
      {
        name :'Mashed Potatoes ',
        desc :'These simple mashed potatoes are made with a touch of garlic for a supersavory flavor everyone will relish in.',
        price:'$9.50 ',
        picture :'https://i.imgur.com/wGstXhV.jpg '
      }
    ]
  
  
   
  
  
  
  function addLunch(){
     
      for(var i = 0 ; i < 4 ;i++ ){
        
          disheName[i].textContent = lunchObj[i].name;
          dishTitle[i].textContent = lunchObj[i].desc;
          dishPrice[i].textContent = lunchObj[i].price;
          disheImage[i].src = '';
          disheImage[i].src = lunchObj[i].picture;
      }
  
  }
  
   function addBreakfast(){
    for(var i = 0 ; i < 4 ;i++ ){
        
      disheName[i].textContent = BreakfastObj[i].name;
      dishTitle[i].textContent = BreakfastObj[i].desc;
      dishPrice[i].textContent = BreakfastObj[i].price;
      disheImage[i].src = '';
      disheImage[i].src = BreakfastObj[i].picture;
  }
     
  }
  function addSalads(){
    for(var i = 0 ; i < 4 ;i++ ){
        
      disheName[i].textContent =  saladsObj[i].name;
      dishTitle[i].textContent =  saladsObj[i].desc;
      dishPrice[i].textContent =  saladsObj[i].price;
      disheImage[i].src = '';
      disheImage[i].src =  saladsObj[i].picture;
  }
  
  }
  
   function addCake(){
    for(var i = 0 ; i < 4 ;i++ ){
        
      disheName[i].textContent = cakeObj[i].name;
      dishTitle[i].textContent =  cakeObj[i].desc;
      dishPrice[i].textContent = cakeObj[i].price;
      disheImage[i].src = '';
      disheImage[i].src =   cakeObj[i].picture;
  
    }
  }
   
  
  function addDrink(){
    for(var i = 0 ; i < 4 ;i++ ){
        
      disheName[i].textContent =  DrinkObj[i].name;
      dishTitle[i].textContent =  DrinkObj[i].desc;
      dishPrice[i].textContent =   DrinkObj[i].price;
      disheImage[i].src = '';
      disheImage[i].src =   DrinkObj[i].picture;
  }
  
  }
  function addcatering(){
    for(var i = 0 ; i < 4 ;i++ ){
        
      disheName[i].textContent =  CateringObj[i].name;
      dishTitle[i].textContent =  CateringObj[i].desc;
      dishPrice[i].textContent =   CateringObj[i].price;
      disheImage[i].src = '';
      disheImage[i].src =   CateringObj[i].picture;
  }
  
  }
  
  addBreakfast();
  
    dropDownMenu.addEventListener('click',function(e){
  
          var target = e.target.id;
  
    
  
          if( target === 'Breakfast')
              addBreakfast();
          else if( target === 'Lunch')
              addLunch();
          else if( target === 'Salads')
              addSalads();
          else if( target === 'Cake')
              addCake();
          else if ( target === 'Drink')
              addDrink();
          else if ( target === 'Catering')
              addcatering();
    });
  }
  
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
    
     