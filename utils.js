export const giocatori = [];
export let classifica = [];
export const gare = [];
export const data = new Date();
export function CreaGiocatore(nome,cognome,data_nascita,nazionalita)
{
    let e = Math.floor(((new Date(data.toLocaleDateString('it-IT').split('/').reverse().join('-'))-new Date(data_nascita.split('/').reverse().join('-')))/1000/60/60/24)/365);
    return{Nome:nome,Cognome:cognome,Data_nascita:data_nascita,Nazionalita:nazionalita,eta:e,gare:[],media_punteggi:0,percentuale_vit:0,percentuale_pod:0,percentuale_fuoripod:0};
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
export function AggiornaPunteggi(giocatore){
    let vit = 0,gioc = 0,percent_pod=0,percent_fuoripod=0;
    giocatore.gare.forEach((x)=>{
        gioc += 1;
        if(x.pos<=3){
            percent_pod += 1;
            if(x.pos==1){
                vit += 1;
            }
        }else
        {
            percent_fuoripod += 1;
        }
    });
    giocatore.percentuale_vit = vit/gioc;
    giocatore.percentuale_pod = percent_pod/gioc;
    giocatore.percentuale_fuoripod = percent_fuoripod/gioc;
}
export function mediaPunteggi(giocatori)
 {
    let p =0; 
    let g = 0;
    giocatori.gare.forEach(x=>{
        p += x.punti;
        g +=1;
    })
    giocatori.media_punteggi = p/g;
 }
