<template>
    <div class="ct-chart ct-minor-seventh"></div>
</template>


<script>
import Chartist from 'chartist'
export default {
    props: {
        players: {required: true},
        elos: {required: true}
    },
    data () {
        return {
            chartData: {},
            options: {
                showPoint: false,
                lineSmooth: false,
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    offset: 60
                }
            }
        }
    },
    methods: {
        getLineColor (playerName) { // we have traditional special colors
            const colorMap = {
                Price: '#66F',
                Tritz: '#F66',
                Elliott: '#6F6'
            }

            return colorMap[playerName]
        },
        getBackgroundColor (playerName) { // we have traditional special colors
            const colorMap = {
                Price: 'rgba(0, 0, 255, 0.05)',
                Tritz: 'rgba(255, 0, 0, 0.05)',
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
            // series: datasets.map( dataset => {
            //     return {
            //         label: dataset.player,
            //         data: dataset.elos,
            //         borderColor: this.getLineColor(dataset.player),
            //         backgroundColor: this.getBackgroundColor(dataset.player)
            //     }
            // })
            series: datasets.map( dataset => dataset.elos)
        }



        // this.renderChart(this.chartData, this.options)
        let chart = new Chartist.Line('.ct-chart', this.chartData, this.options)
        chart.on('draw', (context) => {
            if (context.type === 'line') {
                context.element.attr({
                    style: 'stroke:' + this.getLineColor(this.players[context.index])
                })
            }
        })
    }
}
</script>

<style lang="scss">
@import "../node_modules/chartist/dist/scss/chartist.scss";

@mixin pathseries($length, $delay, $strokecolor) {
  stroke-dasharray: $length;
  stroke-dashoffset: $length;
  animation: draw 1s $delay ease both;
  fill: none;
  stroke: $strokecolor;
  opacity: 0.8;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
