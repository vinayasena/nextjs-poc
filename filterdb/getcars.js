export async function getCars(query){
    const url = "https://api.jsonbin.io/b/601fbcb8d5aafc6431a519a2/4";
    const response = await fetch(url);
    const result = await response.json();
    let make = query.make?query.make:null
    let model = query.model?query.model:null

    let filtered = result.cars.filter((car)=>{ 
        if(make === 'all') return car;
        if(car.make === make && car.model === model){
            return car;
        }
        if(car.make === make && model === 'all') return car;
    })
    
    
    return  filtered;//Object.entries(makes); 
}