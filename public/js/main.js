class Patient {
    constructor(nom, maladie, argent, poche, etat) {
        this.nom = nom;
        this.maladie = maladie;
        this.argent = argent;
        this.poche = poche;
        this.etat = etat;
        this.lieu = "s";
    }
    traitement() {
        this.etat = 'traitement';
        console.log(`${this.nom} est en ${this.etat}.`);
    }
    goTo(lieu) {

        eval(this.lieu).personne.splice(eval(this.lieu).personne.indexOf(this));
        lieu.personne.push(this);
        this.lieu = lieu.nom;
        console.log(`${this.nom} est allé vers ${this.lieu}`);


    }
    takeCare() {
        this.etat = 'bonne santé';
    }
    paye(prix) {
        this.argent -= prix;
    }
}

let marcus = new Patient('Marcus', 'mal indenté', 100, 'vide', 'malade', 'salleAttente');
let optimus = new Patient('Optimus', 'unsave', 100, 'vide', 'malade', 'salleAttente');
let sangoku = new Patient('Sangoku', '404', 80, 'vide', 'malade', 'salleAttente');
let vader = new Patient('DarthVader', 'azmatique', 110, 'vide', 'malade', 'salleAttente');
let semi = new Patient('SemiColon', 'syntaxError', 60, 'vide', 'malade', 'salleAttente');

class Docteur {
    constructor(nom, argent, cabinet) {
        this.nom = nom;
        this.argent = argent;
        this.cabinet = cabinet;
    }
    diagnostique(malade) {
        let traitement;
        switch (malade.maladie) {
            case 'mal indenté':
                traitement = 'ctrl+maj+f';
                break;
            case 'unsave':
                traitement = 'saveOnFocusChange';
                break;
            case '404':
                traitement = 'CheckLinkRelation';
                break;
            case 'azmatique':
                traitement = 'Ventoline';
                break;
            case 'syntaxError':
                traitement = 'f12+doc';
                break;
            default:
                traitement = "T'es pas malade";
        }
        this.argent += 50;
        malade.argent -= 50;
        console.log(`${malade.nom} a payé 50€`);
        console.log(`il lui reste ${malade.argent}€`);

        return traitement;
    }
    patientIn(malade) {
        // eval(malade.lieu).personne.splice(eval(malade.lieu).personne.indexOf(malade));
        this.cabinet.personne.push(malade);
        malade.lieu = this.cabinet.nom;
        console.log(`${malade.nom} est entré dans le ${this.cabinet.nom}`);

    }
    patientOut(malade) {
        malade.goTo(salleAttente);
    }
}

class Lieu {
    constructor(nom, personne) {
        this.nom = nom;
        this.personne = personne;
    }
}
let chat = {
    nom: 'chat',
    miauler() {
        setInterval(() => {
            console.log('Miauouuuuww');

        }, 2000)
    }
}
let cabinet = new Lieu('cabinet', ['chat']);
let doc = new Docteur('Debugger', 0, cabinet);
let salleAttente = new Lieu('salleAttente', [marcus, optimus, sangoku, vader, semi]);
let cime = new Lieu('cimetière', []);
class Pharmacie extends Lieu {
    constructor(nom, personne) {
        super(nom, personne);
    }
    vendre(patient) {
        let prix;
        let poche = patient.poche;
        switch (poche[0]) {
            case 'ctrl+maj+f':
                prix = 60;
                break;
            case 'saveOnFocusChange':
                prix = 100;
                break;
            case 'CheckLinkRelation':
                prix = 35;
                break;
            case 'Ventoline':
                prix = 40;
                break;
            case 'f12+doc':
                prix = 20;
                break;
            default:
                prix = 0;
        }
        return prix;
    }
}
let time = 2000;
let pharmacie = new Pharmacie('pharmacie', []);
while (salleAttente.personne.length > 0) {

    setTimeout(() => {
        let patient = salleAttente.personne.shift();;
        console.log(`Le tour de ${patient.nom} est arrivé`);
        time += 2000;
    }, time);

    setTimeout(() => {
        doc.patientIn(patient);
        chat.miauler;
        time += 2000;
    }, time);

    setTimeout(() => {
        console.log(`${patient.nom} souffre de ${patient.maladie}`);
        patient.poche = doc.diagnostique(patient);
        time += 2000;
    }, time);

    setTimeout(() => {
        console.log(`${doc.nom} lui a prescrit un ${patient.poche}`);
        patient.traitement();
        time += 2000;
    }, time);

    setTimeout(() => {
        doc.patientOut(patient);
        patient.goTo(pharmacie);
        time += 2000;
    }, time);

    setTimeout(() => {
        if (pharmacie.vendre(patient) < patient.argent) {
            console.log(`${patient.nom} a assez d'argent pour payé son médoc`);
            patient.paye(pharmacie.vendre(patient));
            console.log(`${patient.nom} a pu payé son médoc`);
            patient.takeCare();
            console.log(`${patient.nom} a pris son médoc et est en ${patient.etat}`);
            time += 2000;
        } else {
            console.log(`${patient.nom} a assez d'argent pour payé son médoc`);
            console.log(`${patient.nom} est mort.`);
            patient.goTo(cime);
            time += 2000;
        }
    }, time);


}