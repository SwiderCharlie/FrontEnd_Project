<template>
  <div class="map-view">
    <div id="main"></div>
  </div>
</template>

<script>
import geoJson from '@/assets/data.json'
export default {
  name: 'MapView',
  mounted() {
    let myChart = this.$echarts.init(document.getElementById('main'));
    this.$echarts.registerMap('china', geoJson);
    let option = {
      backgroundColor: 'rgb(121, 145, 209)',
      geo: {
        map: 'china',
        aspectScale: 0.75,  // scale地图长宽比
        zoom: 1.1,  // 缩放比
        itemStyle: {
          normal: {
            areaColor: {  // 设置每一块区域的颜色
              type: 'radial',  // 径向渐变
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [{
                offset: 0,
                color: '#09132c',  // 0%处的颜色
              }, {
                offset: 1,
                color: '#274d68',  // 100%处的颜色
              }],
              globalCoord: true
            },
            shadowColor: 'rgb(58, 115, 192)',
            shadowOffsetX: 10,
            shadowOffsetY: 10,
          }
        },
        regions: [{
          name: '南海诸岛',
          itemStyle: {
            opacity: 0
          }
        }]
      },
      series: [{  // 配置地图相关参数，绘制地图，这个独享是关于地图图表的相关设置
        type: 'map',
        label: {
          normal: {
            show: true,  // 普通状态下展示标签
            textStyle: {
              color: '#1de9b6'
            }
          },
          emphasis: {
            textStyle: {
              color: 'rgb(183, 185, 14)'
            }
          }
        },
        zoom: 1.1,
        map: 'china',
        itemStyle: {
          normal: {
            backgroundColor: 'rgb(147, 235, 248)',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [{
                offset: 0,
                color: 'rgb(31, 54, 150)',  // 0%处的颜色
              }, {
                offset: 1,
                color: 'rgb(89, 128, 142)',  // 100%处的颜色
              }],
              globalCoord: true
            }
          },
          emphasis: {  // 高亮
            areaColor: 'rgb(46, 229, 206)',
            borderWidth: 0.1,
          }
        },
      }]
    };
    myChart.setOption(option);
  }
}
</script>

<style lang="less">
  .map-view {
    width: 100%;
    #main {
      width: 100%;
      height: 600px;
    }
  }
</style>