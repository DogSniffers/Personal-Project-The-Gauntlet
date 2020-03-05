// Current Classes: Goblin, Beast, Spectre, Human,

// Current Attack Types: Slash, Blunt, Fire, Ice, Holy, Arcane, Poison, Heal, Block, Dark,

// Attack Types Used: Slash: 4 , Blunt: 1 , Fire: 2 , Ice: 1 , Holy: 2 , Arcane: 1 , Poison: 1 , Heal: 1 , Block: 1 , Dark: 1 ,

// Weaknesses: Slash: 3 , Blunt: 1 , Fire: 2, Ice: 0, Holy: 1, Arcane: 1, Poison: 3,  Dark: 0,

// Resistances: Slash: 2 , Blunt: 0 , Fire: 0, Ice: 3, Holy: 0, Arcane: 5, Poison: 1,  Dark: 0,

module.exports =  [
    {
        class:'Crusader',
        desc:``,
        health:25,
        attack1name:'Holy Blade',
        attack1damage:4,
        attack1type:'Slash',
        attack2name:'Holy Water',
        attack2damage:6,
        attack2type:'Holy',
    },
    {
        class:'Hunter',
        desc:``,
        health:22,
        attack1name:'Arrow Shot',
        attack1damage:5,
        attack1type:'Slash',
        attack2name:'Club',
        attack2damage:5,
        attack2type:'Blunt',
    },
    {
        class:'Wizard',
        desc:``,
        health:20,
        attack1name:'Fireball',
        attack1damage:4,
        attack1type:'Fire',
        attack2name:'Ice Spike',
        attack2damage:4,
        attack2type:'Ice',
    },
    {
        class:'Rogue',
        desc:``,
        health:24,
        attack1name:'Back-Stab',
        attack1damage:4,
        attack1type:'Slash',
        attack2name:'Poisoned-Stab',
        attack2damage:4,
        attack2type:'Poison',
    },
    {
        class:'Conjurer',
        desc:``,
        health:18,
        attack1name:'Arcane Bolt',
        attack1damage:6,
        attack1type:'Arcane',
        attack2name:'Arcane Spear',
        attack2damage:6,
        attack2type:'Slash',
    },
    {
        class:'Pyromancer',
        desc:``,
        health:20,
        attack1name:'Fire Spear',
        attack1damage:5,
        attack1type:'Slash',
        attack2name:'Immolate',
        attack2damage:4,
        attack2type:'Fire',
    },
    {
        class:'Priest',
        desc:``,
        health:18,
        attack1name:'Smite',
        attack1damage:4,
        attack1type:'Holy',
        attack2name:'Pray',
        attack2damage:+2,
        attack2type:'Heal',
    },
    {
        class:'Black Knight',
        desc:``,
        health:20,
        attack1name:'Decapitate',
        attack1damage:3,
        attack1type:'Dark',
        attack2name:'Raise Shield',
        attack2damage:4,
        attack2type:'Block',
    },
    // {
    //     class:'',
    //     desc:``,
    //     health:0,
    //     attack1name:'',
    //     attack1damage:0,
    //     attack1type:'',
    //     attack2name:'',
    //     attack2damage:0,
    //     attack2type:'',
    // },
    
]