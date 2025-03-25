import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [
    { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
    { name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2 },
    { name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3 },
    { name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4 },
    // Nous stockerons nos combattants ici sous forme de tableau
    // Exemple: 1: { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
  ],
  monster: {
    // Notre boss à combattre
    // Exemple: { name: "Dragon", pv: 200, pvMax: 200, strength: 15 }
    name: "Crypto",
    pv: 850,
    pvMax: 850,
    monsterMessage: ""
  },
  gameOver: false,
  winner: null, // 'players' ou 'monster'
  playersWhoAttacked: [] // Liste des joueurs ayant attaqué
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    hitMonster: (state, action) => {
      if (state.gameOver) return;
      // Le payload de l'action contient la force de frappe
      const { playerId, damage } = action.payload;
      const player = state.players.find((p) => p.id === playerId); 
      // Avec Redux Toolkit, nous pouvons "muter" l'état directement
      // grâce à Immer qui fonctionne sous le capot
      if (player.pv <= 0) {
        return ; // Si le joueur est KO, on n'exécute pas l'attaque
      }
      state.monster.pv = Math.max(0, state.monster.pv - damage);
      // Pas besoin de return car Immer s'occupe de créer un nouvel état
      if (state.monster.pv === 0) {
        state.gameOver = true;
        state.winner = "players"; // Victoire des joueurs
      }
    },
    hitBack: (state, action) => {
      if (state.gameOver) return;
      const damage = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
      const {playerId} = action.payload;
      const missChance = Math.random();
            // Calcul des dégâts aléatoires entre 3 et 8
      const player = state.players.find(p => p.id === playerId);
      if (player.pv <= 0) {
        return ;
      }
      if (missChance < 0.2) {
        // Si le monstre rate son attaque
        state.monsterMessage = "Le monstre rate son attaque !";
      } else {
        // Si l'attaque réussit, on applique les dégâts
        player.pv = Math.max(0, player.pv - damage);
        state.monsterMessage = `Le monstre frappe ${player.name} pour ${damage} points de dégâts.`;
      }
      if (state.players.every((p) => p.pv === 0)) {
        state.gameOver = true;
        state.winner = "monster"; // Défaite des joueurs
      }
    },
    restartGame: (state) => {
      // Remettre le jeu à son état initial
      Object.assign(state, initialState);
    },
    }
       
    // Nous ajouterons nos actions ici plus tard
  },
  
 
);

// Export des actions
export const { hitMonster, hitBack, restartGame } = fightSlice.actions;
// Nous exportons le reducer généré automatiquement
export default fightSlice.reducer;
