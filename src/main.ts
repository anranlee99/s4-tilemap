import "./style.css";


//setting up the multiple canvases
const gridCanvas = document.getElementById("gridCanvas") as HTMLCanvasElement;
const gridCtx = gridCanvas.getContext("2d") as CanvasRenderingContext2D;

const selectCanvas = document.getElementById("selectCanvas") as HTMLCanvasElement;
const selectCtx = selectCanvas.getContext("2d") as CanvasRenderingContext2D;


//defining the textures to use
const imageUrls = [
    "/tile1.png",
    "/tile2.png",
    "/tile3.png",
    "/tile4.png",
    "/tile5.png",
    "/tile6.png",
    "/tile7.png",
    "/tile8.png"
];
const templateImages: HTMLImageElement[] = new Array(imageUrls.length);
for (let i=0; i < imageUrls.length; i++) {
    const image = new Image();
    image.src = imageUrls[i];
    templateImages[i] = image;
}


//defining the size of the main grid
const numTiles = 32;
const tileSize = gridCanvas.width / numTiles;


//defining the size of the select grid
const numSelectables = imageUrls.length;
const selectHeight = selectCanvas.height / numSelectables;



//creating the tilemap nested array
let indices: number[][] = new Array(numTiles);
for(let i = 0; i < numTiles; i++) {
    indices[i] = new Array(numTiles);
    indices[i].fill(0);
}

//track the selected tile
let currentTile  = 0;

//draw the initial canvases
redrawTilemap();
drawSelectCanvas();


//Function that draws a texture to a specific canvas ctx
function drawTexture(row: number, col: number, ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, cellSize: number) {
    image.onload = () => {
        ctx.drawImage(image, row * cellSize, col * cellSize, width, height)
    };
    ctx.drawImage(image, row * cellSize, col * cellSize, width, height)
}


// ----- Interacting with the main tilemap -----

function redrawTilemap()
{
  gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    for (let i = 0; i < numTiles; i++) {
        for (let j = 0; j < numTiles; j++) {
            drawTexture(i, j, gridCtx, templateImages[indices[i][j]], gridCanvas.width / numTiles, gridCanvas.height / numTiles, tileSize);
        }
    }
}


gridCanvas.addEventListener("click", (e) => {
    const coordX = Math.trunc(e.offsetX / tileSize);
    const coordY = Math.trunc(e.offsetY / tileSize);

    
    indices[coordX][coordY] = currentTile;
    redrawTilemap();
})
// redrawTilemap();


// ----- Interacting with the selectable tilemap -----

// Loop through the selectable tiles and draw textures in each cell
function drawSelectCanvas()
{
    for (let i = 0; i < templateImages.length; i++) {
        const selectableImage = templateImages[i];
        drawTexture(0, i, selectCtx, selectableImage, selectCanvas.width, selectHeight, 64);
    }
}

selectCanvas.addEventListener("click", (e) => {
    currentTile = Math.trunc(e.offsetY / selectHeight);
})