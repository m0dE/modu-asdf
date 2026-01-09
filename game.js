const { createGame, AutoRenderer, Transform2D, Sprite } = Modu;

// Get canvas and create game
const canvas = document.getElementById('game');
const game = createGame();

// Add the auto renderer plugin
game.addPlugin(AutoRenderer, canvas);

// Define a text entity
game.defineEntity('helloText')
  .with(Transform2D, { x: 400, y: 250 })
  .with(Sprite, {
    shape: 'text',
    text: 'Hello World!',
    fontSize: 48,
    color: '#4CAF50',
    textAlign: 'center'
  })
  .register();

// Define a subtitle entity
game.defineEntity('subtitle')
  .with(Transform2D, { x: 400, y: 320 })
  .with(Sprite, {
    shape: 'text',
    text: 'Welcome to Modu Engine',
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center'
  })
  .register();

// Define a pulsing circle decoration
game.defineEntity('decoration')
  .with(Transform2D, { x: 400, y: 400 })
  .with(Sprite, {
    shape: 'circle',
    radius: 30,
    color: '#2196F3'
  })
  .register();

// Spawn entities
game.spawn('helloText');
game.spawn('subtitle');
const decoration = game.spawn('decoration');

// Add some animation
let time = 0;
game.onUpdate((delta) => {
  time += delta;
  
  // Make the decoration pulse
  const decoration = game.getEntity('decoration');
  if (decoration) {
    decoration.sprite.radius = 30 + Math.sin(time * 3) * 10;
    decoration.sprite.color = `hsl(${200 + Math.sin(time * 2) * 60}, 70%, 50%)`;
  }
  
  // Make the title gently float
  const helloText = game.getEntity('helloText');
  if (helloText) {
    helloText.transform.y = 250 + Math.sin(time * 1.5) * 5;
  }
});

// Start the game
game.start();

console.log('Hello World game started!');