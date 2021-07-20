var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
var fodStockValue;
var fedTime



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(660,95);
  feedTheDog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);



}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref("FeedTime");
  fedTime.on('value',function(data){
    lastFed=data.val()
  })
  //write code to read fedtime value from the database 
  fill("black");
  textSize(15)
  if(lastFed>=12){
    
    text("Last fed: "+lastFed%12 +"pm",350,30);
  }
  else if(lastFed==0){
    text("Last fed: 12am",350,30);

  }
  else{
    text("Last fed:" +lastFed+"am",350,30)
  }
 
  //write code to display text lastFed time here
  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodStockValue=foodObj.getFoodStock();
  if(foodStockValue<=0){
    foodObj.updateFoodStock(foodStockValue*0);
  }
  else{
    foodObj.updateFoodStock(foodStockValue-1);
  }
  database.ref("/").update({
    "Food":foodObj.getFoodStock(),
    "FeedTime":hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
