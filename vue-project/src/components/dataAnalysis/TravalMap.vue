<template>
  <div class="travel-map">
    <div id="main"></div>
  </div>
</template>

<script>
import geoJson from '@/assets/data.json'
import { travel } from '@/api/api.js'
export default {
  name: 'MapView',
  methods: {
    draw(points, linesData) {
      let myChart = this.$echarts.init(document.getElementById('main'))
      this.$echarts.registerMap('china', geoJson)
      let option = {
        backgroundColor: 'rgb(121, 145, 209)',
        geo: {
          map: 'china',
          aspectScale: 0.75, // scale地图长宽比
          zoom: 1.1, // 缩放比
          itemStyle: {
            normal: {
              areaColor: {
                // 设置每一块区域的颜色
                type: 'radial', // 径向渐变
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: '#09132c', // 0%处的颜色
                  },
                  {
                    offset: 1,
                    color: '#274d68', // 100%处的颜色
                  },
                ],
                globalCoord: true,
              },
              shadowColor: 'rgb(58, 115, 192)',
              shadowOffsetX: 10,
              shadowOffsetY: 10,
            },
          },
          regions: [
            {
              name: '南海诸岛',
              itemStyle: {
                opacity: 0,
              },
            },
          ],
        },
        series: [
          {
            // 配置地图相关参数，绘制地图，这个独享是关于地图图表的相关设置
            type: 'map',
            label: {
              normal: {
                show: true, // 普通状态下展示标签
                textStyle: {
                  color: '#1de9b6',
                },
              },
              emphasis: {
                textStyle: {
                  color: 'rgb(183, 185, 14)',
                },
              },
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
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgb(31, 54, 150)', // 0%处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgb(89, 128, 142)', // 100%处的颜色
                    },
                  ],
                  globalCoord: true,
                },
              },
              emphasis: {
                // 高亮
                areaColor: 'rgb(46, 229, 206)',
                borderWidth: 0.1,
              },
            },
          },
          // 关于地图中散点图的配置
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render', // 何时显示特效
            symbolSize: 10, // 散点大小
            zlevel: 1,
            data: points,
            rippleEffect: {
              // 涟漪特效配置
              period: 15, // 动画时间
              scale: 4, // 缩放比
              brushType: 'fill', // 波纹绘制方式
            },
          },
          // 关于地图中线路动画效果设置
          {
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 4,
                symbol: 'arrow',
                symbolSize: 7,
                trailLength: 0.4  // 箭头拖尾效果
            },
            lineStyle: {
                normal: {
                    color: '#1DE9B6',
                    width: 1,
                    opacity: 0.1,
                    curveness: 0.3  // 弯曲程度
                }
            },
            data: linesData
          },
        ],
      }
      myChart.setOption(option)
    },
  },
  created() {
    travel().then((res) => {
      if (res.data.status === 200) {
        let { points, linesData } = res.data.data;
        this.draw(points, linesData);
      }
    })
  },
}
</script>

<style lang="less">
.travel-map {
  width: 100%;
  #main {
    width: 100%;
    height: 600px;
  }
}
</style>
