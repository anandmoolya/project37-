var dog,dogimg;
var foodStock, foodS;
var fed,addFood;
var database,lastFed

function preload()
{
 dogImg= loadImage("images/dogImg.png");
 dogImg1= loadImage("images/dogImg1.png");
 milk = loadImage("milk.png")
}

function setup() {
 
	createCanvas(800, 800);
  database=firebase.database();
  

dog=createSprite(250,350,10,60)
dog.addImage(dogImg)
dog.scale=0.3
 
feed=createButton("eat the dog"); 
  feed.position(350,95); 
  feed.mousePressed(feedDog); 
  addFood=createButton("Add Food"); 
  addFood.position(450,95); 
  addFood.mousePressed(addFoods);   
  foodStock = database.ref("Food");
  foodStock.on("value",function(data){
    foodS = data.val();
  })
  foodObj = new Food(foodS,lastFed);
}

function draw() {  
  background(46,139,87);
  
  fedTime = database.ref('hour');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill("black");
  textSize(30);
 
  text("Food Available:" + foodS,200,500);
   drawSprites();
  fedTime=database.ref("feedTime")
  fedTime.on("value",function(data){
lastFed=data.val();
  })




  foodObj.display();
  fill(255,255,254); 
  textSize(15); 
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }else if(lastFed==0){ 
    text("Last Feed : 12 AM",350,30); 
  }else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  } 
  
}




function feedDog(){ 
  dog.addImage("dog",dogImg); 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    hour:hour()
  })
} 
function addFoods(){ 
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
} 
