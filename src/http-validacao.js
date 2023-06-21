import chalk from "chalk";

function extLinks(arrLinks){
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function checaStatus(listaURLs){
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try{
        const response = await fetch(url, {method: 'HEAD'})
        return response.status;
      } catch(erro){
        return manejaErros(erro);
      }
    })
  )
  return arrStatus;
  }

  function manejaErros(erro){
    if(erro.cause.code = 'ENOTFOUND'){
      return 'link não encontrado';
    } else {
      return 'ocorreu algum erro';
    }
  }
  
  export default async function listaValidade(listadeLinks){
  const links = extLinks(listadeLinks);
  const status = await checaStatus(links);
  return listadeLinks.map((objeto,indice) =>({
    ...objeto,
    status: status[indice]
  }))
}
