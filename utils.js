export const giocatori = [];
export let classifica = [];
export const gare = [];
const data = new Date();
function CreaGiocatore(nome,cognome,data_nascita,nazionalita)
{
    e = Math.floor(((new Date(data.toLocaleDateString('it-IT').split('/').reverse().join('-'))-new Date(data_nascita.split('/').reverse().join('-')))/1000/60/60/24)/365);
    return{Nome:nome,Cognome:cognome,Data_nascita:data_nascita,Nazionalita:nazionalita,eta:e,gare:[]};
}
export function NuovoGiocatore(nome,cognome,data_nascita,nazionalita){
    giocatori.push(CreaGiocatore(nome,cognome,data_nascita,nazionalita));
}
export function AggiornaClassifica(){
    let a = giocatori.map(x => {return {punti:x.gare.reduce((y,z)=>y+z.punti,0),nome:x.Nome}});
    classifica = a.sort((x,y) => y.punti-x.punti);
}
export function NuovaGara(a) {
    gare.push({nome:a.nome,classifica:a.classifica});
        a.classifica.forEach(gara => {giocatori.forEach(giocatore => {if (giocatore.Nome === gara.nome) {giocatore.gare.push(gara);}});});
}