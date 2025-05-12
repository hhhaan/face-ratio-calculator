export const drawHorizontalLine = (ctx: CanvasRenderingContext2D, startX: number, y: number, width: number) => {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + width, y);
    ctx.stroke();
};

export const drawBox = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    style: string,
    lineWidth: number
) => {
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
};
