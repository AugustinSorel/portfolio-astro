export const fractal = () => {
  const canvas = document.querySelector("canvas")!;
  const ctx = canvas.getContext("2d")!;

  let len = 175;
  let angle = Math.PI / (Math.floor(Math.random() * 8) + 2);
  type Props = { ctx: CanvasRenderingContext2D; len: number };

  window.addEventListener("resize", () => {
    init();
  });

  const init = () => {
    // mobile responsive
    if (window.innerWidth < 600) {
      canvas.width = window.innerWidth;
      canvas.height = 300;
      len = 110;
    } else {
      const headerHeight = parseInt(
        getComputedStyle(document.body).getPropertyValue("--header-height")
      );
      canvas.width = window.innerWidth / 3;
      canvas.height = window.innerHeight - headerHeight;
      len = 175;
    }
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
