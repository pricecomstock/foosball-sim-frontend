<script>
import { Line } from 'vue-chartjs'
export default {
    extends: Line,
    props: {
        players: {required: true},
        elos: {required: true}
    },
    data () {
        return {
            chartData: null,
            options: {
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                }
            }
        }
    },
    methods: {
        getLineColor (playerName) { // we have traditional special colors
            const colorMap = {
                Price: '#F66',
                Tritz: '#66F',
                Elliott: '#6F6'
            }

            return colorMap[playerName]
        },
        getBackgroundColor (playerName) { // we have traditional special colors
            const colorMap = {
                Price: 'rgba(255, 0, 0, 0.05)',
                Tritz: 'rgba(0, 0, 255, 0.05)',
                Elliott: 'rgba(0, 255, 0, 0.05)'
            }

            return colorMap[playerName]
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
                    backgroundColor: this.getBackgroundColor(dataset.player)
                }
            })
        }

        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style>

</style>
