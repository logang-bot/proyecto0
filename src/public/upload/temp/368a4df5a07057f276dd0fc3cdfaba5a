var inpArr = [];
var readline = require('readline');
var rl = readline.createInterface(process.stdin,process.stdout);
var n=0;
console.log("Introducir las cadenas una por una, si desea terminar de introducir datos presione ENTER")
rl.on('line', (input) => {
    if(input.trim() === ''){
        //console.log("valor: " + n);
        for (var i = 0; i<inpArr.length; i++){
            if (inpArr[i].length>=n){
                console.log(inpArr[i] + " ");
            }
        }
        process.exit();
    }
    inpArr.push(input.trim());
    if(input.trim().length>n){
        n=input.trim().length;
    }
})