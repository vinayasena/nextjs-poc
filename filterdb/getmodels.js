export async function getModels(make){
    const url = "https://api.jsonbin.io/b/601fbcb8d5aafc6431a519a2/4";
    const response = await fetch(url);
    const result = await response.json();
    
    let filtered = result.cars.filter((car)=>{ return car.make === make})
    
    
    return  filtered;//Object.entries(makes); 
}