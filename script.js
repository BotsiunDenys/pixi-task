const app = new PIXI.Application({
  view: document.getElementById("canvas"),
  width: 600,
  height: 600,
  backgroundColor: 0x228b22,
});

PIXI.Assets.load("ball.png").then((texture) => {
  const ball = new PIXI.Sprite(texture);

  ball.x = app.renderer.width / 2;
  ball.y = app.renderer.height / 2;
  ball.width = 100;
  ball.height = 100;

  ball.anchor.set(0.5);

  app.stage.addChild(ball);

  let vx = 0;
  let vy = 0;
  let rotation = 0;
  let isMoving = false;

  function startMovement() {
    const angle = Math.random() * Math.PI * 2;
    const strength = Math.random() * 50 + 5;
    rotation = (Math.random() * strength) / 25;
    vx = Math.cos(angle) * strength;
    vy = Math.sin(angle) * strength;
    isMoving = true;

    app.ticker.add(moveball);
  }

  function moveball() {
    if (isMoving) {
      ball.x += vx;
      ball.y += vy;
      ball.rotation += rotation;

      vx *= 0.98;
      vy *= 0.98;
      rotation *= 0.98;

      const radius = 50;

      if (ball.x - radius <= 0 || ball.x + radius >= app.renderer.width) {
        vx *= -1;
        ball.x = ball.x - radius <= 0 ? radius : app.renderer.width - radius;
      }

      if (ball.y - radius <= 0 || ball.y + radius >= app.renderer.height) {
        vy *= -1;
        ball.y = ball.y - radius <= 0 ? radius : app.renderer.height - radius;
      }

      if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
        isMoving = false;
        app.ticker.remove(moveball);
      }
    }
  }

  ball.interactive = true;
  ball.buttonMode = true;
  ball.on("pointerdown", startMovement);
});
