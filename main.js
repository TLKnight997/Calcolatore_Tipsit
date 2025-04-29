import * as U from "./utils.js"
import promptSync from 'prompt-sync'
const Input = promptSync();
function main(){
    let scelta = 0;
    let nome = "";
    let a = [];
    
do{
        console.log("1-Aggiungere giocatore\n2-Aggiungere gara\n3-Visualizza Statistiche giocatori\n4-Visualizza classifica\n0-Uscita\nScegliere:");
        scelta = Number(Input());
    switch(scelta){
        case 1:
            U.NuovoGiocatore(Input("Nome:"),Input("Cognome:"),Input("Data di nascita (gg/mm/aaaa):"),Input("Nazionalità:"));
        break;
        case 2:
            nome = Input("Nome della gara:");
            scelta =Number(Input("Numero di partecipanti:"));
            for(let i = 0; i<scelta; i+=1 ){
                a.push({cognome:Input("Cognome:"),pos:Number(Input("Posizione:")),punti:Number(Input("Punti:"))});
            }
            console.log({nome:nome,classifica:a});
            U.NuovaGara({nome:nome,classifica:a});
            U.AggiornaClassifica();
            U.giocatori.forEach(x=>{U.AggiornaPunteggi(x)});
            scelta = 2;
        break;
        case 3:
            U.StampaGiocatori();
        break;
        case 4:
            U.StampaClassifica();
        break;
    }
}while(scelta!=0);
}
main();