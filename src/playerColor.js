export default function getLineColor (playerName) { // we have traditional special colors
    const colorMap = {
        Price: '#66D',
        Tritz: '#D66',
        Elliott: '#8C8',
        Mark: '#B82',
        Joe: '#ADF',
        Erick: '#FA4',
        Bijan: '#C7D',
        Harsh: '#FAF'
    }

    // if not found, return random color
    return colorMap[playerName] || '#'+Math.floor(Math.random()*16777215).toString(16);
}