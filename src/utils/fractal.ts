const anglesList = [0.3, 0.6, 0.7, 2, 3, 4, 5];

export const fractal = () => {
  const canvas = document.querySelector("canvas")!;
  const ctx = canvas.getContext("2d")!;

  let len = 150;
  let angle =
    Math.PI / anglesList[Math.floor(Math.random() * anglesList.length)];
  type Props = { ctx: CanvasRenderingContext2D; len: number };

  window.addEventListener("resize", () => {
    init();
  });

  const init = () => {
    var heightRatio = 1;
    canvas.height = canvas.width * heightRatio;

    draw({ ctx, len });
  };

  // animate
  let forward = true;
  setInterval(() => {
    if (forward) {
      angle += 0.0015;
      if (angle > Math.PI / 4) forward = false;
    } else if (!forward) {
      angle -= 0.0015;
      if (angle < Math.PI / 17) forward = true;
    }

    init();
  }, 1000 / 20);

  const draw = ({ ctx, len }: Props) => {
    // shift origin to bottom center
    ctx.translate(canvas.width / 2, canvas.height);

    // initially draw line
    line({ ctx, len });

    //shift origin to the top of the line
    ctx.translate(0, -len);

    branch({ ctx, len: len / 1.5 });
  };

  //draws staright line from reference
  const line = ({ ctx, len }: Props) => {
    ctx.beginPath();
    ctx.strokeStyle = window
      .getComputedStyle(document.body)
      .getPropertyValue("color");

    if (window.devicePixelRatio !== 1) {
      // ctx.lineWidth = 2;
    }

    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();
  };

  // recursive branch
  const branch = ({ ctx, len }: Props) => {
    if (len > 5) {
      ctx.save();

      ctx.rotate(angle);
      line({ ctx, len });
      ctx.translate(0, -len);
      branch({ ctx, len: len / 1.65 });

      ctx.restore();
      ctx.rotate(-angle);
      line({ ctx, len });
      ctx.translate(0, -len);
      branch({ ctx, len: len / 1.65 });
    }
  };

  init();
  draw({ ctx, len });
};
