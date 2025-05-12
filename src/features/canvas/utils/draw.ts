export const drawHorizontalLine = (ctx: CanvasRenderingContext2D, startX: number, y: number, width: number) => {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + width, y);
    ctx.stroke();
};
