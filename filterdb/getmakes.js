export async function getMakes(){
    const url = "https://api.jsonbin.io/b/601fbcb8d5aafc6431a519a2/4";
    const response = await fetch(url);
    const result = await response.json();
    let makes = {};
    let filtered = result.cars.reduce((acc, car )=>({
        ...acc,
        [car.make] :(acc[car.make] ||0) +1

    }), {})
    
    return  filtered;//Object.entries(makes); 
}