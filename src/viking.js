// Soldier

class Soldier {
    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health -= damage;
    }
}

// Viking
class Viking extends Soldier {
    constructor(name, health, strength) {
        super(health, strength);
        this.name = name;
    }
    receiveDamage(damage) {
        this.health -= damage;

        if (this.health > 0) {
            return `${this.name} has received ${damage} points of damage`;
        } else {
            return `${this.name} has died in act of combat`;
        }
    }

    battleCry() {
        return `Odin Owns You All!`;
    }

}
// Saxon
class Saxon extends Soldier {

    receiveDamage(damage) {

        this.health -= damage;

        if (this.health > 0) {
            return `A Saxon has received ${damage} points of damage`

        } else {
            return `A Saxon has died in combat`
        }
    }
}

// War
class War {

    constructor() {
        this.vikingArmy = [];
        this.saxonArmy = [];
    }

    addViking(viking) {
        this.vikingArmy.push(viking);
    }

    addSaxon(saxon) {
        this.saxonArmy.push(saxon);
    }

    vikingAttack() {

        return this.armyAttack(this.vikingArmy, this.saxonArmy);

    }

    saxonAttack() {

        return this.armyAttack(this.saxonArmy, this.vikingArmy);

    }

    armyAttack(attackerArmy, defendingArmy) {

        const posAttacker = Math.floor(Math.random() * attackerArmy.length);
        const attacker = attackerArmy[posAttacker];

        const posDefender = Math.floor(Math.random() * defendingArmy.length);
        const defender = defendingArmy[posDefender];

        const retDamage = defender.receiveDamage(attacker.attack());

        if (defender.health <= 0) {
            defendingArmy.splice(posDefender, 1);
        }

        return retDamage;

    }

    showStatus() {

        if (!this.saxonArmy.length)
            return `Vikings have won the war of the century!`;

        if (!this.vikingArmy.length)
            return `Saxons have fought for their lives and survived another day...`;

        return `Vikings and Saxons are still in the thick of battle.`;

    }
}



function run() {

}


// FAZENDO A GUERRA!

console.log();
console.log(`PREPARING THE WAR`);

// instancia a guerra
const war = new War();

// monta os VIKINGS com 10 soldados com forca e saude aleatorios

console.log('\nPreparing viking army...')

for (let i = 0; i < 10; i++) {

    const health = Math.floor(Math.random() * 100) + 1;

    const strength = Math.floor(Math.random() * 100) + 1;

    const viking = new Viking(`Thor ${i + 1}`, health, strength);

    war.addViking(viking);

    console.log(`"> ${viking.name}" added to viking army with health ${health} and strength ${strength}`);

}

const avgVikingHealth = war.vikingArmy.reduce((acc, obj) => acc + obj.health, 0) / war.vikingArmy.length;
const avgVikingStrength = war.vikingArmy.reduce((acc, obj) => acc + obj.strength, 0) / war.vikingArmy.length;

console.log(`Viking army average health is ${avgVikingHealth} and strength is ${avgVikingStrength}`);



// monta os SAXOES com 10 soldados com forca e saude aleatorios

console.log('\nPreparing saxon army...')

for (let i = 0; i < 10; i++) {

    const health = Math.floor(Math.random() * 100) + 1;

    const strength = Math.floor(Math.random() * 100) + 1;

    const saxon = new Saxon(health, strength);

    war.addSaxon(saxon);

    console.log(`> An saxon added to saxon army with health ${health} and strength ${strength}`);

}

const avgSaxonHealth = war.saxonArmy.reduce((acc, obj) => acc + obj.health, 0) / war.saxonArmy.length;
const avgSaxonStrength = war.saxonArmy.reduce((acc, obj) => acc + obj.strength, 0) / war.saxonArmy.length;

console.log(`Saxon army average health is ${avgSaxonHealth} and strength is ${avgSaxonStrength}`);


// realiza ataques ate haver um vencedor

console.log('\n\n*** WAR TIME!!! ***\n\n');

let round = 0;

while (war.vikingArmy.length > 0 && war.saxonArmy.length > 0) {

    round++;

    // sorteia quem vai atacar

    const codeAttacker = Math.random() > 0.5 ? 'viking' : 'saxon';


    // realiza o ataque

    let msgAttack;

    if (codeAttacker === 'viking')
        msgAttack = war.vikingAttack();
    else
        msgAttack = war.saxonAttack();

    // mostra resultado do ataque e status da guerra

    console.log(`Round ${round}. Attacker: ${codeAttacker}`);
    console.log(`--> ${msgAttack}`);
    console.log(`--> Remaining: ${war.vikingArmy.length} vikings and ${war.saxonArmy.length} saxons`);
    console.log(`--> War status: ${war.showStatus()}`);
    console.log();

}


