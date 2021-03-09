const getRandomValue = (min, max) => {
    return (Math.floor(Math.random() * (max - min)) + min)
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: '',
            battleLog: []
        };
    },
    computed: {
        monsterHealthBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },

        playerHealthBarStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },

        buttonDisabled() {
            return (this.currentRound % 3 != 0);
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },

        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            const log = 'Monster loses ' + attackValue + ' health';
            this.battleLog.push(log);
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
            const log = 'Player loses ' + attackValue + ' health';
            this.battleLog.push(log);
        },

        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
            const log = 'Monster loses ' + attackValue + ' health';
            this.battleLog.push(log);
        },

        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth = this.playerHealth + healValue;
            }
            const log = 'Player gains ' + healValue + ' health';
            this.battleLog.push(log);
            this.attackPlayer();
        },

        surrender() {
            this.winner = 'monster';
            const log = 'Player surrenders!';
            this.battleLog.push(log);
        },

        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = '';
            this.battleLog = [];
        }
    }
});

app.mount('#game');