<script>
import { Bar } from 'vue-chartjs'
import getPlayerColor from '../../playerColor.js'
export default {
    name: 'shutouts-chart',
    extends: Bar,
    props: {
        leagueData: {required: true}
    },
    data () {
        return {
            chartData: null,
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                },
                title: {
                    display: true,
                    text: 'Shutouts Colored by Victim',
                    fontSize: 24,
                    fontFamily: "'Ubuntu', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                }
            }
        }
    },
    mounted () {
        /*
            This creates a 2d array like so:
            [
                [playerAShutoutbyPlayerA, playerAShutoutbyPlayerB, playerAShutoutbyPlayerC],
                [playerBShutoutbyPlayerA, playerBShutoutbyPlayerB, playerBShutoutbyPlayerC],
                [playerCShutoutbyPlayerA, playerCShutoutbyPlayerB, playerCShutoutbyPlayerC],
            ]
        */
        console.log('shutouts', this.leagueData.gameHistory.filter( game => {
            return (game.loser.score === 0)
        }))
        
        // array of zeroes of length 8
        let shutoutData = Array(this.leagueData.players.length).fill(0)
        
        // array of length 8, each item is an array of zeroes of length 8
        shutoutData = shutoutData.map( () => {
            return Array(this.leagueData.players.length).fill(0)
        })

        this.leagueData.gameHistory.forEach( game => {
            if (game.loser.score === 0) {
                let winner = game.winner.player.name
                let loser = game.loser.player.name
                let winnerIndex = this.leagueData.players.indexOf(winner)
                let loserIndex = this.leagueData.players.indexOf(loser)
                console.log(winner, loser)
                shutoutData[loserIndex][winnerIndex] = 1 + shutoutData[loserIndex][winnerIndex]
            }
        })
        console.log('shutoutData', shutoutData)

        let datasets = shutoutData.map( (victimShutoutCounts, victimIndex) => {
            return {
                label: this.leagueData.players[victimIndex],
                data: victimShutoutCounts,
                borderColor: getPlayerColor(this.leagueData.players[victimIndex]),
                backgroundColor: getPlayerColor(this.leagueData.players[victimIndex])
            }
        })

        // console.log('datasets', datasets)

        this.chartData = {
            labels: this.leagueData.players, // however many samples there are, we want that as the x axis
            datasets: datasets
        }

        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style>

</style>
