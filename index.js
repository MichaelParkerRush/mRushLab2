(function() {
  var startButton = document.getElementById("startButton");
  var quitButton = document.getElementById("quitButton");
  var healButton = document.getElementById("healButton");
  var attackButton = document.getElementById("attackButton");
  var playerHealthBar = document.getElementById("playerHealthBar");
  var playerHealCount = document.getElementById("playerHealCount");
  var playerWins = document.getElementById("playerWins");
  var enemyHealthBar = document.getElementById("enemyHealthBar");
  var playerNameDisplay = document.getElementById("playerNameDisplay");
  var combatLog = document.getElementById("combatLog");
  var statBlockContainer = document.getElementById("statBlockContainer");
  var gui = document.getElementById("gui");
  class NPC {
    constructor(objName, objHealth) {
      this.name = objName;
      this.health = objHealth;
    }
    generateAttackDamage() {
      return getRandom(5);
    }
  }
  class PC extends NPC {
    constructor(objName, objHealth, healsRemaining, wins) {
      super (objName, objHealth);
      this.healsRemaining = healsRemaining;
      this.wins = wins;
    }
    generateAttackDamage() {
      return getRandom(3);
    }
    healSelf() {
      this.health += getRandom(10);
      this.healsRemaining --;
    }
  }
  var attackPrompt, playerName; 
  function getRandom(max) {
    return Math.floor(Math.random() * max) + 1;
  }
  function startGame() {
    playerName = prompt(`What is your name?`);
    gui.classList.remove("hidden");
    startButton.classList.add("hidden");
    startButton.classList.remove("start");
	statBlockContainer.classList.remove("hidden");
    startCombat();
  }
  function endGame() {
	gui.classList.add("hidden");
    startButton.classList.remove("hidden");
    startButton.classList.add("start");
	alert(`Thanks for playing!`);
  }
  function startCombat() {
    var playerCharacter = new PC(playerName, 40, 2, 0), grant = new NPC(`The Almighty Grant`, 10);
	console.log(playerCharacter);
	playerNameDisplay.innerText = playerName;
	playerHealthBar.value = playerCharacter.health;
	playerHealCount.value = playerCharacter.healsRemaining;
	playerWins.value = playerCharacter.wins;
	enemyHealthBar.value = grant.health;
	combatLog.innerText = `An enemy approaches...prepare yourself!`
    attackButton.onclick = function() {
	  if (playerCharacter.health > 0) {
        playerCharacter.health -= grant.generateAttackDamage();
        grant.health -= playerCharacter.generateAttackDamage();
        combatLog.innerText = `${playerCharacter.name} has ${playerCharacter.health} health remaining. ${grant.name} has ${grant.health} health remaining.`;
		playerHealthBar.value = playerCharacter.health;
		enemyHealthBar.value = grant.health;
        if (playerCharacter.health < 1) {
          combatLog.innerText = `${grant.name} has vanquished ${playerCharacter.name}! ${grant.name} has won!`;
		  statBlockContainer.classList.add("hidden");
        } else if (grant.health < 1) {
          playerCharacter.wins += 1;
		  playerWins.value = playerCharacter.wins;
          if (playerCharacter.wins < 5) {
            combatLog.innerText = `${playerCharacter.name} has defeated ${grant.name}...yet he returns, unvanquished! ${grant.name} has ${5 - playerCharacter.wins} lives left.`;
            grant.health = 10;
			enemyHealthBar.value = grant.health;
          } else {
            combatLog.innerText = `${playerCharacter.name} has vanquished ${grant.name}! ${playerCharacter.name} has won the game!`;
			statBlockContainer.classList.add("hidden");
          }
        }
	  }
    }
    healButton.onclick = function() {
      if (playerCharacter.healsRemaining > 0) {
		playerCharacter.healSelf();
		playerHealCount.value = playerCharacter.healsRemaining;
		playerHealthBar.value = playerCharacter.health;
        combatLog.innerText = `After healing, ${playerCharacter.name}'s health has increased to ${playerCharacter.health}!`;
      }
    }
  }
  startButton.onclick = function(){
    startGame();
  };
  quitButton.onclick = function() {
	endGame();
  }
})();