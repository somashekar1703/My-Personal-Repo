let people ={
    name:"Rahul",
    age:35,
    occupational : function()
    {
        console.log('Private Employee')
        
    }

}
people.occupational();
console.log(people.name)

var x=1
let a=5
const t=15

if(true)
{
    var x=2;
}
function vars()
{
    var x=3;
    return x;
}
console.log(x)
console.log(vars())

if(true)
{
    let a=10
    
}
console.log(a)
function lets()
{
    let a= 1;
    return a;
}
console.log(lets())

let vegetables = ["onions","tamato","aloo","binjal","bhendi"]

vegetables.push("spinach");
console.log(vegetables)

vegetables.pop()
console.log(vegetables)

vegetables.unshift("ladyfinger")
console.log(vegetables)

vegetables.shift()
console.log(vegetables)

console.log("aloo index value: "+vegetables.indexOf('aloo'))
let alooindex = vegetables.indexOf('aloo')
console.log("slice method "+vegetables.slice(alooindex,alooindex+1))
let sliceveg = vegetables.slice(alooindex-1,alooindex+1)

console.log(sliceveg)

vegetables.forEach((veg,index)=>
{
    console.log(`${index} : ${veg}`)
})
/*
array.foreach((a,b)=>
{

})

*/


function fetchdata(callback)
{
    setTimeout(() => {
        const data = 'Data received';
        console.log("fetching the data");
        callback(data)

    }, 3000);
}
function processdata(data)
{
    console.log("processing...! "+data)
}
function modifying(data)
{
    console.log("modifying....."+data)
}
fetchdata(processdata)
fetchdata(modifying)
