<script>
import { Line } from 'vue-chartjs'
export default {
    name: 'elochart',
    extends: Line,
    props: {
        players: {required: true},
        elos: {required: true},
        games: {required: false}
    },
    data () {
        return {
            chartData: null,
            options: {
                elements: {
                    line: {
                        tension: 0.5, // disables bezier curves
                    }
                }
            }
        }
    },
    methods: {
        getLineColor (playerName) { // we have traditional special colors
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
    },
    mounted () {
        let datasets = this.players.map( (playerName, index) => {
            return {
                player: playerName,
                elos: this.elos.map( eloSet => {
                    return eloSet[index]
                })
            }
        })

        this.chartData = {
            labels: this.elos.map( (eloSet, index) => index ), // however many samples there are, we want that as the x axis
            datasets: datasets.map( dataset => {
                return {
                    label: dataset.player,
                    data: dataset.elos,
                    borderColor: this.getLineColor(dataset.player),
                    backgroundColor: 'rgba(0,0,0,0)'
                }
            })
        }

        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style>

</style>
