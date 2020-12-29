export class LocationsArray{
    private locationsArray: any[] =[];
    constructor(obj){
        obj.features.forEach(element => {
            this.locationsArray.push(element.properties);
        });
    }   
}