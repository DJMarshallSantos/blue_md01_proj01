// importar "prompt"
var prompt = require("prompt-sync")();

// importar "fs" e "path" para abrir e ler o arquivo txt com o background story
const fs = require("fs");
const { resolve } = require("path");
const bgStory = fs.readFileSync(resolve(__dirname, "story.txt"));
// transformar cada linha do texto em um elemento de array
const bgStoryArray = bgStory.toString().split("\n");
// criar uma array com as 5 perguntas impostas como requisitos no projeto
const ques = [
  "Jake Dour, você deseja treinar e aumentar o poder de foco ?",
  "Jake Dour, você acredita no amor do Rei ?",
  "Jake Dour, durante a sua jornada, quando possível, você descançou e se alimentou, repondo suas forças ?",
  "Jake Dour, você deseja retirar a calda do Waspion e guardar-la em seu inventário ?",
  "Jake Dour, você dará a sua espada e escudo a Burcu pela informação ?",
  "Jake Dour, deseja usar a calda de Waspion que encontra em seu iventário? ",
];
// criar uma array vazia para armazenar as entradas de respostas do usuário
let ans = [];
// ASCII 
const sword = ` 
                                  KINGDOM OF THE SAGES

                        <>
                       /
                      /
          <>(((((((({@}::::::::::::::::::::::::::::::::::::::::::::::::::::======-
                      \\
                       \\
                        <>                       `;

// função de validação de entrada de respostas
function validate(answer) {
  if (answer === 1 || answer === 2) {
    ans.push(answer);
  } else {
    while (answer != 1 && answer != 2) {
      console.log("Entre uma opção VÁLIDA do menu!");
      answer = +prompt("Entre 1 = Sim or 2 = Não: ");
    }
    ans.push(answer);
  }
}

// função que mostra as perguntas, recebe a entrada do usuário e valida a entrada
function askQuestion(question){
  console.log(ques[question]);
    let answerPicked = +prompt("Entre 1 = Sim ou 2 = Não: ");
    validate(answerPicked);
    console.clear();
}

// função que verifica quantas vezes o número 1 ocorre no array
const turns = () => {
  let counter = 0;
  for (let i = 0; i < ans.length; i++) {
    if (ans[i] === 1) counter += 1;
  }
  return counter;
};
// função que analisa e mostra o resultado do jogo
function result(turns) {
  if (turns == 0) {
    console.log("Você falha miseravelmente!");
  } else if (turns == 1|| turns ==2) {
    console.log("Você falha, mas ainda consegue fugir da situação!");
  } else if (turns == 3) {
    console.log(
      "Você chega perto de conseguir alcançar seu objetivo, mas acaba falhando por pouco!"
    );
  } else if (turns == 4) {
    console.log(
      "Depois de muito esforço você conquista seu objetivo, embora não de maneira perfeita!"
    );
  } else if (turns == 5) {
    console.log(
      "Você triunfa de maneira inquestionável e seus feitos serão lembrados por muitas gerações!"
    );
  }else {
	  console.log("\nVocê se tornou uma LENDA e seu nome será mencionado em inúmeras canções!");
  }
  let gap = setInterval(() => console.log(""), 1500); 
  clearInterval(gap);
}

// Função que valida a pergunta do capítulo extra
function validateLastQuestion(answer, time) {
  if (answer === 1 || answer === 2) {
    if (answer === 1) {
      ans.push(answer);
      let moveOn = 149;
      let lineEnd = 173;
      let inter = setInterval(() => {
        console.log(bgStoryArray[moveOn]);

        moveOn += 1;
        if (moveOn > lineEnd) {
          clearInterval(inter);
          result(turns());
        }
      }, time);
    } else {
      ans.push(answer);
      let moveOn = 175;
      let lineEnd = 200;
      let inter = setInterval(() => {
        console.log(bgStoryArray[moveOn]);

        moveOn += 1;
        if (moveOn > lineEnd) {
          clearInterval(inter);
          result(6);
        }
      }, time);
    }
    
  } else {
    while (answer != 1 && answer != 2) {
      console.log("Entre uma opção VÁLIDA do menu!");
      answer = +prompt("Entre 1 = Sim or 2 = Não: ");
    }
    if (answer === 1) {
      let moveOn = 149;
      let lineEnd = 173;
      let inter = setInterval(() => {
        console.log(bgStoryArray[moveOn]);

        moveOn += 1;
        if (moveOn > lineEnd) {
          clearInterval(inter);
        }
      }, time);
    } else {
      ans.push(answer);
      let moveOn = 175;
      let lineEnd = 201;
      let inter = setInterval(() => {
        console.log(bgStoryArray[moveOn]);

        moveOn += 1;
        if (moveOn > lineEnd) {
          clearInterval(inter);
          result(6);
        }
      }, time);
    }
    
  }
  
}



// Arrow function que chama o capítulo bonus
const alternativeEnding = (resume, end, speed) => {
  let inter = setInterval(() => {
    console.log(bgStoryArray[resume]);
    if (resume == 148) {
      console.log(ques[5]);
      answerPicked = +prompt("Entre 1 = Sim ou 2 = Não: ");
      clearInterval(inter);
      validateLastQuestion(answerPicked, speed);
      console.clear();
    }
    resume += 1;

  }, speed);
};

// Arrow function para controle de tempo de apresentação do texto no terminal
const narrateStory = () => {
  let time = +prompt("Entre a velocidade de leitura em segundos: ");
  time = time*1000;
  console.clear();
  console.log(sword);
  let counter = 0;
  let limit = bgStoryArray.length;
  let storyEnd = 93;
  let bonusChapter = 94;
  let inter = setInterval(() => {
    console.log(bgStoryArray[counter]);
    if (counter == 12) {
      askQuestion(0);
    } else if (counter == 31) {
      askQuestion(1);
    } else if (counter == 43) {
      askQuestion(2);
    } else if (counter == 71) {
      askQuestion(3);
    } else if (counter == 92) {
      askQuestion(4);
    }
    counter += 1;
    if (counter > storyEnd) {
      clearInterval(inter);
      result(turns());
      if(turns()===5){
        prompt("\nVocê desbloqueou um capítulo secreto. Pressione qualquer tecla para continuar.");
        alternativeEnding(bonusChapter, limit, time);
      }else{
        return;
      }
      
    }
  }, time);
};

narrateStory();
