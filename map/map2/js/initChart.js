
Array.prototype.max = function () {   //最大值
    return Math.max.apply({}, this)
}
Array.prototype.min = function () {   //最小值
    return Math.min.apply({}, this)
}

var initChart = function(mapData){
	var data = mapData.valueMap;
  var geoCoordMap = mapData.geoCoordMap;

  function convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        });
      }
    }
    return res;
  };

  const option = {
    visualMap: {
      min: 100,
      max: 0,
      right: '14%',
      bottom: '30%',
      calculable: true,
      inRange:{
        color: ['rgba(0,147,240,0.1)', '#0093f0'],
      },
      outOfRange:{
        opacity:0
      },
      textStyle:{
        color:'#0093f0'
      },
      formatter:function (value) {
        return value + '%'
      }
    },
    geo: {
      map: 'china',
      roam: true,
      zoom:1.15,
      itemStyle: {
        normal:{
          borderColor: '#12172b',
          borderWidth:2
        },
        emphasis:{
          areaColor: null,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    series : [{
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),//显示新增开户数
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return '+' + params.data.value[2];
            },
            position: 'inside',
            padding: [4, 5],
            color: '#ff0221',
            fontSize:16,
            fontWeight:'bold'
          },
        },
        symbolSize: function (data) {
          return 1;
        }
      },
      {
        type: 'map',
        geoIndex: 0,
        data:mapData.percentMap//百分比
      }
    ]};

  let myChart;
  if(document.querySelector('.mapChart').getAttribute("_echarts_instance_")){
    myChart = echarts.getInstanceByDom(document.querySelector('.mapChart'));
  }else{
    myChart = echarts.init(document.querySelector('.mapChart'));
  }
  myChart.setOption(option);

}

var getChartData = function(){
	function randomValue(){
		return parseInt(Math.random()*100)
	}
	return {
		valueMap:[//增加的开户数值 排序返回
          {"name":"鄂尔多斯","value":randomValue()},
          {"name":"上海市","value":randomValue()},
          {"name":"大同","value":randomValue()},
          {"name":"龙岩市","value":randomValue()},
          {"name":"北京市","value":randomValue()},
          {"name":"乌鲁木齐","value":randomValue()},
          {"name":"枣庄","value":randomValue()},
          {"name":"拉萨","value":randomValue()},
          {"name":"淄博","value":randomValue()},
          {"name":"鞍山","value":randomValue()},
          {"name":"溧阳","value":randomValue()},
          {"name":"库尔勒","value":randomValue()},
          {"name":"日照","value":randomValue()},
          {"name":"重庆市","value":randomValue()},
          {"name":"厦门","value":randomValue()},
          {"name":"合肥","value":randomValue()},
          {"name":"太原","value":randomValue()},
          {"name":"南宁","value":randomValue()},
        ],
        percentMap:[//各省的开户数占比
          {name: '北京', value: randomValue()},
          {name: '天津', value: randomValue()},
          {name: '上海', value: randomValue()},
          {name: '重庆', value: randomValue()},
          {name: '河北', value: randomValue()},
          {name: '河南', value: randomValue()},
          {name: '云南', value: randomValue()},
          {name: '辽宁', value: randomValue()},
          {name: '黑龙江', value: randomValue()},
          {name: '湖南', value: randomValue()},
          {name: '安徽', value: randomValue()},
          {name: '山东', value: randomValue()},
          {name: '新疆', value: randomValue()},
          {name: '江苏', value: randomValue()},
          {name: '浙江', value: randomValue()},
          {name: '江西', value: randomValue()},
          {name: '湖北', value: randomValue()},
          {name: '广西', value: randomValue()},
          {name: '甘肃', value: randomValue()},
          {name: '山西', value: randomValue()},
          {name: '内蒙古', value: randomValue()},
          {name: '陕西', value: randomValue()},
          {name: '吉林', value: randomValue()},
          {name: '福建', value: randomValue()},
          {name: '贵州', value: randomValue()},
          {name: '广东', value: randomValue()},
          {name: '青海', value: randomValue()},
          {name: '西藏', value: randomValue()},
          {name: '四川', value: randomValue()},
          {name: '宁夏', value: randomValue()},
          {name: '海南', value: randomValue()},
          {name: '台湾', value: randomValue()},
          {name: '香港', value: randomValue()},
          {name: '澳门', value: randomValue()},
          {name: '南海诸岛', value: randomValue()}
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

