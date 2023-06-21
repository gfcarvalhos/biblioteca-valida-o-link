import fs from 'fs';
import chalk from "chalk";

function extraiLinks(texto){
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s#.][^\s]*)\)/gm;
  //const capturas = texto.match(regex); Método de string
  //metodo de regex
  //const capturas = regex.exec(texto);
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]:captura[2]}));
  return resultados.length !==0 ? resultados : 'não há links no arquivo';
}


function trataErro(erro) {
  console.log(erro)
  throw new Error(chalk.red(erro.code,'Não há arquivo no diretório'));
}

//async/await
async function pegaArquivo(caminhoDoArquivo){
  try{
    const encoding = 'utf-8'
    const result = await fs.promises.readFile(caminhoDoArquivo, encoding)
    return extraiLinks(result);
  }catch(erro){
    trataErro(erro)
  }
  }

export default pegaArquivo;

//promises com then()
/*
function pegaArquivo(caminhoDoArquivo){
  const encoding = 'utf-8'
  fs.promises.readFile(caminhoDoArquivo, encoding)
  .then((texto) => console.log(chalk.green(texto)))
  .catch(trataErro)
}
function pegaArquivo(caminhoDoArquivo){
  const encoding = 'utf-8'
  fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
    if(erro){
      trataErro(erro);
    }
    console.log(chalk.green(texto));
  })
}*/

// \[[^[\]]*?\]
// \(https?:\/\/[^\s#.][^\s]*\)

//Grupos: \[([^[\]]*?)\]\((https?:\/\/[^\s#.][^\s]*)\)