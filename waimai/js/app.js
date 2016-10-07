
 //定义工具方法
 var Util = {
    tpl:function (id){
        return document.getElementById(id).innerHTML;
    },
    ajax:function(url,fn){
    	//创建xhr对象
    	var xhr = new XMLHttpRequest();
    	//订阅事件
    	xhr.onreadystatechange = function(){
    		if(xhr.readyState == 4){
    			if(xhr.status == 200){
    				var strr = JSON.parse(xhr.responseText);
    				console.log(strr)
    				fn && fn(strr)
    			}
    		}
    	}

    	xhr.open('GET',url,true);
    	xhr.send(null);
    }
 }

// 定义价格过滤器
Vue.filter('price', function (price) {
  return price + '元';
})
// 定义原价过滤器
Vue.filter('orignPrice', function (price) {
  return '门市价：' + price + '元';
})
// 定义销售过滤器
Vue.filter('sales', function (num) {
  return '已售' + num;
})

//定义组件
var Homecomponent = Vue.extend({
	 template:Util.tpl('tpl_home'),
   // 设置分类按钮的数据
   data:function(){
       return {
          types: [
              {id: 1, title: '美食', url: '01.png'},
              {id: 2, title: '电影', url: '02.png'},
              {id: 3, title: '酒店', url: '03.png'},
              {id: 4, title: '休闲娱乐', url: '04.png'},
              {id: 5, title: '外卖', url: '05.png'},
              {id: 6, title: 'KTV', url: '06.png'},
              {id: 7, title: '周边游', url: '07.png'},
              {id: 8, title: '丽人', url: '08.png'},
              {id: 9, title: '小吃快餐', url: '09.png'},
              {id: 10, title: '火车票', url: '10.png'}
          ],
          typesagain:[],
          ad:[],
          list:[]
        }
   },
   created:function(){
       var me = this;
       
       for(var k in me.types){
         me.typesagain.push(me.types[k])
       }
       me.typesagain.reverse();
       console.log(me.typesagain,4444444444444)
       var arr1 = me.typesagain.slice(5);
       console.log(arr1,555555555)
       var arr2 = me.typesagain.slice(0,5);
       me.typesagain = arr1.concat(arr2);
       Util.ajax('data/home.json', function (res){
            console.log(res)
           if(res && res.errno === 0){

               // me.$set('ad',res.data.ad)
               // me.$set('list',res.data.list)
               me.ad = res.data.ad;
               me.list = res.data.list;
               console.log(me)

           }
       })
   }
})

var Listcomponent = Vue.extend({
	 template:Util.tpl('tpl_list'),
   data:function(){
      return {
         types: [
            {value: '价格排序', key: 'price'},
            {value: '销量排序', key: 'sales'},
            {value: '好评排序', key: 'evaluate'},
            {value: '优惠排序', key: 'discount'}
          ],
          list:[],
          other:[]
      }
   },
   methods:{
      loadMore:function(){
         this.list = this.list.concat(this.other)
         this.other = []
      }
   },
   // 列表排序方法
    sortBy: function (type) {
      if (type === 'discount') {
        // 优惠排序，市场价 - 现价
        this.list.sort(function (a, b) {
          var ap = a.orignPrice - a.price;
          var bp = b.orignPrice - b.price;
          // 得到优惠排序，就是做ap与bp的差值
          return ap - bp;
        })
      } else {
        this.list.sort(function (a, b) {
          // 正序
          // return a[type] - b[type]
          // 倒序
          return b[type] - a[type]
        })
      }
      
    },
   created:function(){
      var me = this;
        this.$dispatch('show-search', true)
      var me = this;
      // 获取父组件中的query字段拼接url中query部分
      var query = me.$parent.query;
      // str 保留query字段 ?type=1
      var str = '?';
      if (query[0] && query[1]) {
        str += query[0] + '=' + query[1]
      }

      Util.ajax('data/list.json',function(res){
          if(res && res.errno === 0){
            var  str = res.data.slice(0,3);
            var  str2 = res.data.slice(3);
            me.$set('list',str);
            me.$set('other',str2);

          }
      })
   }
});

var Productcomponent = Vue.extend({
	 template: Util.tpl('tpl_product'),
  props: ['csearch'],
  data: function () {
    return {
      data: {
        src: '01.jpg'
      }
    }
  },
  created: function () {
    // 隐藏搜索框
    this.$dispatch('show-search', false)
    // 保存this
    var me = this;
    // 获取数据
    Util.ajax('data/product.json', function (res) {
      if (res && res.errno === 0) {
        me.data = res.data;
        console.log(me)
      }
    })
  }
});

//注册组件
Vue.component('home',Homecomponent)
Vue.component('list',Listcomponent)
Vue.component('product',Productcomponent)

var app = new Vue({
	el: '.app',
  data: {
    view: '',
    // 保留hash中的动态query部分
    query: [],
    search: '',
    dealSearch: '',
    // 控制搜索框的显隐
    showSearch: true
  },
  methods: {
    goSearch: function () {
      // 将search 内容复制给dealSearch，将dealSearch传递给子组件
      this.dealSearch = this.search
    },
    goBack: function () {
      history.go(-1);
    }
  },
  events: {
    'show-search': function (val) {
      this.showSearch = val;
    }
  }
})


//当进入页面时 出发load事件 根据hash事件判断进入那个页面
window.addEventListener('load', router);

//当页面改变时的 hashchange交互事件
window.addEventListener('hashchange', router);

//路由函数
function router(){
	//获取页面hash
  var str = location.hash;
   //截取#或#/ 到 下一个/之间的 即可判断到那个页面
     //第一步先处理#
   var str = str.slice(1);
     //第二步处理#后的/ 处理
   var str= str.replace(/^\//,'');
     //第三步 判断后面是否有/ 有就截取之前的部分
    if(str.indexOf('/') > -1){
        var str= str.slice(0,str.indexOf('/'))
     	
     }

   //第四步 一共有三个映射列表
   var map = {
   	     home:true,
   	     list:true,
   	     product:true
   }

   //第五步 判断 str是否在上面的映射列表中
   if(map[str]){
   	  app.view = str
   }else{
   	  app.view = 'home'
   }
   app.query = str.slice(1);
}

var arrow = document.getElementById('box')
var tutu = document.getElementById('appp')
var zu = document.getElementById('app')
var zi = document.getElementById('sm')
var btn = document.getElementById('btn')
var sear = document.getElementById('search')
var ps = document.getElementById('appp').getElementsByTagName('p');

  for(var i = 0 ; i<ps.length;i++){
    ps[i].style.animationDelay = i * 0.1  + "s";
  }
 console.log(zi)

 arrow.onclick = function(){
   location.hash = '#'
 }

 setTimeout(function(){
  tutu.style.opacity = 0
  tutu.style.display = 'none'
  zu.style.display = 'block'
 },5000)
  var a = zi.innerHTML = 5;

 setInterval(function(){
     a--;
     zi.innerHTML = a;
 },1000)

 btn.onclick = function(){
   if(sear.style.display == 'none'){
      sear.style.display = 'block'
   }else{
      sear.style.display = 'none'
   }
 }

 $('#appp .ss').on('click',function(){
    tutu.style.opacity = 0
  tutu.style.display = 'none'
  zu.style.display = 'block'
 })