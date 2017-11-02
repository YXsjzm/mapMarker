
Array.prototype.max = function () {   //最大值
    return Math.max.apply({}, this)
}
Array.prototype.min = function () {   //最小值
    return Math.min.apply({}, this)
}

var initChart = function(mapData){
	//数据按照降序返回
  let data = mapData.data;
  let geoCoordMap = mapData.geoCoordMap;

  const topLimit = 5;
  const color = ['#ff7800','#41f4fb']
  let valueArr = [];
  for (var i = 0; i < data.length; i++) {
    valueArr.push(data[i].value)
  }
  const scale = d3.scale.linear();
  scale.domain([valueArr.min(),valueArr.max()])
    .range([3,20]);//光标大小控制在10 - 20像素

  let result = [];
  for (var i = 0; i < data.length; i++) {
    const value = data[i].value
    const name = data[i].name;
    var geoCoord = geoCoordMap[name];
    if (geoCoord) {
      result.push({
        name: name,
        value: geoCoord.concat(value),
        symbol: 'circle',
        symbolSize: (function (val) {
          return scale(val);
        })(value),
        itemStyle:{
          normal:{
            color:(function (i) {
                return i < topLimit ? color[0] : color[1]
            })(i)
          }
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            offset:[5, 0],
            formatter: function (data) {
              return data.dataIndex < topLimit ? data[2] : ''
            },
            fontSize:(function (val) {
              return scale(val)
            })(value)
          },
          emphasis: {
            show: true
          }
        }
      });
    }
  }

  const option = {
    geo: {
      map: 'china',
      zoom:1.15,
      layoutCenter: ['53%', '50%'],
      itemStyle: {
        normal: {
          areaColor: 'rgba(12,33,64,0.2)',
          borderColor: '#0b4e68',
          borderWidth: '1.3',
          shadowColor: 'rgba(0, 0, 0, 1)',
          shadowBlur: 10
        },
        /*移动到省市后的颜色设置*/
        emphasis: {
          areaColor: 'rgba(18,224,202,0.25)',
          borderColor: '#0cefeb',
          borderWidth: '2'
        }
      }
    },
    series: {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        period:4,
        brushType: 'fill',
        scale: 4
      },
      itemStyle: {
        normal: {
          show: false,
          color: '#64f9ff'
        }
      },
      data: result
    }
  };
  let myChart;
  if(document.querySelector('.mapChart').getAttribute("_echarts_instance_")){
    myChart = echarts.getInstanceByDom(document.querySelector('.mapChart'));
  }else{
    myChart = echarts.init(document.querySelector('.mapChart'));
  }
  myChart.setOption(option);
}

var getChartData = function(){
	return {
      data:[//光点大小依返回数据排序确定、排序返回
        {"name":"漳州市","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"上海市","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"福州市","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"龙岩市","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"北京市","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"深圳市","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"重庆市","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"南京","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"南宁","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"南昌","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"呼和浩特","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"哈尔滨","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"唐山","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"威海","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"鄂尔多斯","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"日照","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"拉萨","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"乌鲁木齐","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"枣庄","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"杭州","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"淄博","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"鞍山","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"溧阳","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"库尔勒","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"安阳","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"开封","value":parseFloat((Math.random()*100).toFixed(2))},
        {"name":"济南","value":parseFloat((Math.random()*100).toFixed(2))},
      ],
      geoCoordMap:{
        '枣庄':[117.57,34.86],
        '杭州':[120.19,30.26],
        '淄博':[118.05,36.78],
        '鞍山':[122.85,41.12],
        '溧阳':[119.48,31.43],
        '库尔勒':[86.06,41.68],
        '安阳':[114.35,36.1],
        '开封':[114.35,34.79],
        '济南':[117,36.65],

        '乌鲁木齐': [87.9236,43.5883],
        '日照': [119.2786,35.5023],
        "三明市":[117.61,26.23],
        "上海市":[121.48,31.22],
        "北京市":[116.46,39.92],
        "泉州市":[118.58,24.93],
        "深圳市":[114.07,22.62],
        "漳州市":[117.35,24.52],
        "福州市":[119.3,26.08],
        "莆田市":[119,25.44],
        "重庆市":[106.54,29.59],
        "龙岩市":[117.01,25.12],
        '鄂尔多斯': [108.9734,39.2487],
        '拉萨': [91.1865,30.1465],
        '南京': [118.8062,31.9208],
        '南宁': [108.479,23.1152],
        '南昌': [116.0046,28.6633],
        '南通': [121.1023,32.1625],
        '厦门': [118.1689,24.6478],
        '台州': [121.1353,28.6688],
        '合肥': [117.29,32.0581],
        '呼和浩特': [111.4124,40.4901],
        '咸阳': [108.4131,34.8706],
        '哈尔滨': [127.9688,45.368],
        '唐山': [118.4766,39.6826],
        '嘉兴': [120.9155,30.6354],
        '大同': [113.7854,39.8035],
        '大连': [122.2229,39.4409],
        '天津': [117.4219,39.4189],
        '太原': [112.3352,37.9413],
        '威海': [121.9482,37.1393],
      }
    }
}

var chartData = getChartData();
initChart(chartData);

setInterval(()=>{
	var chartData = getChartData();
	initChart(chartData);
},5000)

