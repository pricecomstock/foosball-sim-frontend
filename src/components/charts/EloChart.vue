<script>
import { Line } from 'vue-chartjs'
import getPlayerColor from '../../playerColor.js'
export default {
    name: 'elochart',
    extends: Line,
    props: {
        leagueData: {required: true}
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
    mounted () {
        let datasets = this.leagueData.players.map( (playerName, index) => {
            return {
                player: playerName,
                elos: this.leagueData.elos.map( eloSet => {
                    return eloSet[index]
                })
            }
        })

        this.chartData = {
            labels: this.leagueData.elos.map( (eloSet, index) => index ), // however many samples there are, we want that as the x axis
            datasets: datasets.map( dataset => {
                return {
                    label: dataset.player,
                    data: dataset.elos,
                    borderColor: getPlayerColor(dataset.player),
                    backgroundColor: 'rgba(0,0,0,0)',
                    pointRadius: 0,
                    pointHitRadius: 8
                }
            })
        }

        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style>

</style>
