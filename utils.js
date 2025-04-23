export const giocatori = [];
const data = new Date();
function CreaGiocatore(nome,cognome,data_nascita,nazionalita)
{
    e = Math.floor(((new Date(data.toLocaleDateString('it-IT').split('/').reverse().join('-'))-new Date(data_nascita.split('/').reverse().join('-')))/1000/60/60/24)/365);
    return{Nome:nome,Cognome:cognome,Data_nascita:data_nascita,Nazionalita:nazionalita,eta:e,gare:[]};
}
export function NuovoGiocatore(nome,cognome,data_nascita,nazionalita){
    giocatori.push(CreaGiocatore(nome,cognome,data_nascita,nazionalita));
}