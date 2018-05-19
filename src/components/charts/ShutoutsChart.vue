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
                }
            }
        }
    },
    mounted () {
        /*
            This creates an array like so:
            [
                {
                    playerName: "playerA",
                    shutouts: [
                        {
                            victimName: "playerB",
                            shutouts: numShutoutsOnPlayerB,
                        },
                        {
                            victimName: "playerC",
                            shutoutCount: numShutoutsOnPlayerC,
                        }
                    ]
                }
                ... and so on for each player
            ]
        */
        console.log('shutouts', this.leagueData.gameHistory.filter( game => {
            return (game.loser.score === 0)
        }))
        let shutoutCounts = {}

        this.leagueData.gameHistory.forEach( game => {
            let winner = game.winner.player.name
            let loser = game.loser.player.name

            shutoutCounts[winner] = shutoutCounts[winner] || {} // {} if nothing is there
            shutoutCounts[winner][loser] = shutoutCounts[winner][loser] || 0 // zero if nothing is there
            if (game.loser.score === 0) {
                shutoutCounts[winner][loser] = 1 + shutoutCounts[winner][loser]
            }
        })

        let shutoutData = Object.keys(shutoutCounts).map( playerName => {
            return {
                playerName: playerName,
                shutouts: Object.keys(shutoutCounts[playerName]).map( victimName => {
                    return {
                        victimName: victimName,
                        shutoutCount: shutoutCounts[playerName][victimName]
                    }
                })
            }
        })


        let datasets = []
        shutoutData.forEach( playerShutouts => {
            playerShutouts.shutouts.forEach ( victim => {
                datasets.push( {
                    label: victim.victimName,
                    stack: this.leagueData.players.indexOf(playerShutouts.playerName),
                    data: victim.shutoutCount,
                    borderColor: getPlayerColor(playerShutouts.playerName),
                    backgroundColor: getPlayerColor(victim.victimName)
                }) 
            })
        })

        console.log('datasets', datasets)

        this.chartData = {
            labels: this.leagueData.players, // however many samples there are, we want that as the x axis
            data: datasets
        }

        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style>

</style>
