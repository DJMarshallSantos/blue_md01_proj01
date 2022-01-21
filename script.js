var prompt = require("prompt-sync")();

const ques = ["P1", "P2", "P3", "P4", "P5"]
const ans = []



for (let i = 0; i<5; i++){
    console.log(ques[i])
    const answers = ans.push(prompt("Entre 1 = Sim or 2 = Não: "))
}

//console.log(ans);

const ocorre = {};
for(let i=0; i<ans.length; i++){
    let num = ans[i]
    ocorre[num] = ocorre[num] ? ocorre[num] + 1 :1;
}


//console.log(ocorre);

if (ocorre[1] >=4 ) {
    console.log("Culpado")
}else if(ocorre[1] == 3) {
    console.log("Suspeito")
}else{
    console.log("Inocente")
}
