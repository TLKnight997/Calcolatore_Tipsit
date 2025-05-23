/**
 * @description Lista dei giocatori della competizione
 * @var giocatori 
 */
export const giocatori = [];
/**
 * @description Classifica della competizione
 * @var classifica 
 */
export let classifica = [];
/**
 * @description Lista delle gare della competizione
 * @var gare 
 */
export const gare = [];
/**
 * @description Data odierna per la gestione del tempo
 * @var data 
 */
export const data = new Date();
/**
 * @function CreaGiocatore
 * @description Funzione che crea gli oggetti giocatore
 * @param {String} nome Nome del giocatore
 * @param {String} cognome Cognome del giocatore
 * @param {String} data_nascita Data di nascita del giocatore espressa secondo lo schema gg/mm/aaaa
 * @param {String} nazionalita Nazionalità del giocatore
 * @returns {Object} Oggetto giocatore
 */
export function CreaGiocatore(nome,cognome,data_nascita,nazionalita)
{
    let e = Math.floor(((new Date(data.toLocaleDateString('it-IT').split('/').reverse().join('-'))-new Date(data_nascita.split('/').reverse().join('-')))/1000/60/60/24)/365);
    return{Nome:nome,Cognome:cognome,Data_nascita:data_nascita,Nazionalita:nazionalita,eta:e,gare:[],media_punteggi:0,percentuale_vit:0,percentuale_pod:0,percentuale_fuoripod:0};
}
/**
 * @function NuovoGiocatore
 * @description Funzione che aggiunge gli oggetti giocatore alla lista di giocatori
 * @param {String} nome Nome del giocatore
 * @param {String} cognome Cognome del giocatore
 * @param {String} data_nascita Data di nascita del giocatore espressa secondo lo schema gg/mm/aaaa
 * @param {String} nazionalita Nazionalità del giocatore
 */
export function NuovoGiocatore(nome,cognome,data_nascita,nazionalita){
    giocatori.push(CreaGiocatore(nome,cognome,data_nascita,nazionalita));
}
/**
 * @function AggiornaClassifica
 * @description Funzione che aggiorna la classifica
 */
export function AggiornaClassifica(){
    let a = giocatori.map(x => {return {punti:x.gare.reduce((y,z)=>y+z.punti,0),cognome:x.Cognome}});
    classifica = a.sort((x,y) => y.punti-x.punti);
}
/**
 * @function NuovaGara
 * @description Funzione che aggiunge la nuova gara alla lista delle gare
 * @param {Object} a Oggetto che contiene il nome della gare e l'array che contiere i giocatori,i ripettivi pozionamenti e punteggi 
 */
export function NuovaGara(a) {
    gare.push({nome:a.nome,classifica:a.classifica});
        a.classifica.forEach(gara => {giocatori.forEach(giocatore => {if (giocatore.Cognome === gara.cognome) {giocatore.gare.push({...gara,cognome:a.cognome,nomed:a.nome});}});});
}
/**
 * @function AggiornaPunteggi
 * @description Funzione che controlla le gare inserite e aggiorna le statistiche
 * @param {Object} giocatore Giocatore a cui vanno aggiornate le statistiche
 */
export function AggiornaPunteggi(giocatore){
    let vit = 0,gioc = 0,percent_pod=0,percent_fuoripod=0,puntis=0;
    giocatore.gare.forEach((x)=>{
        gioc += 1;
        puntis += x.punti;
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
    giocatore.media_punteggi = puntis/gioc;
}
/**
 * @function StampaClassifica
 * @description Funzione che stampa i giocatori della competizione
 */
export function StampaGiocatori(){
    giocatori.forEach(x =>{
        console.log("Nome:"+x.Nome);
        console.log("Cognome:"+x.Cognome);
        console.log("Data Di nascita:"+x.Data_nascita);
        console.log("Età:"+x.eta);
        console.log("Nazionalità:"+x.Nazionalita);
        console.log("Gare effettuate:");
        x.gare.forEach(y=>{
            console.log("Nome della gara:"+y.nomed);
            console.log("Pos:"+y.pos);
            console.log("Punti:"+y.punti);
        })
        console.log("Media punti:"+x.media_punteggi);
        console.log("Percentuale piazzamenti podio:"+(x.percentuale_pod*100)+"%");
        console.log("Percentuale piazzamenti fuori podio:"+(x.percentuale_fuoripod*100)+"%");
        console.log("Percentuale Vittorie:"+(x.percentuale_vit*100)+"%\n");
        });
}
/**
 * @function StampaClassifica
 * @description Funzione che stampa la classifica
 */
export function StampaClassifica(){
    classifica.forEach((x,i) =>{
        console.log("Pos:"+(i+1));
        console.log("Cognome:"+x.cognome);
        console.log("Punti:"+x.punti+"\n");
    });
}
