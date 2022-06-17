const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        if(a<0 || b<0){
            return reject('number is less than 0')
        }
        resolve(a+b);
    })
}


const dowork = async ()=>{
    // throw new Error('this is error')
    const sum = await add(1,-3);
    return sum;
}



// console.log(dowork())
dowork().then((re)=>{
    console.log(re)
}).catch((e)=>{
    console.log(e)
})