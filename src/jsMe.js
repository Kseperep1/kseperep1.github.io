class Home{
    constructor(){
        this.objArray = [];
    }

    adoptPet(pet){
        try{
            if(this.objArray.indexOf(pet) !== -1){
                throw new Error;
            }
            this.objArray.push(pet);
        }
        catch(Error){
            console.error('Pet already adopted!... sorry');
        }
    }

    makeAllSounds(){
        for(let i = 0; i < this.objArray.length; i++){
            this.objArray[i].sounds();
        }
    }
}

class Animal{
    constructor(name){
        this.name = name;
    }

    eat(){
        console.log(`${this.name} eats`);
    }

    sounds(){
        console.log('Sound...');
    }
}

class Dog extends Animal{
    constructor(name = 'Rax'){
        super();
        this.name = name;
    }

    sounds(){
        console.log('Dog barks');
    }
}

class Cat extends Animal{
    constructor(name = 'Stormy'){
        super();
        this.name = name;
    }

    sounds(){
        console.log('Cat meows');
    }
}

const home = new Home();
home.makeAllSounds();

const dog = new Dog('Skippy');
dog.eat();
dog.sounds();

home.adoptPet(dog);
home.makeAllSounds();
home.adoptPet(dog);

const cat = new Cat();
cat.eat();
cat.sounds();

home.adoptPet(cat);
home.makeAllSounds();