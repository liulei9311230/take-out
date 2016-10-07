function router(){var t=location.hash,t=t.slice(1),t=t.replace(/^\//,"");if(t.indexOf("/")>-1)var t=t.slice(0,t.indexOf("/"));var e={home:!0,list:!0,product:!0};e[t]?app.view=t:app.view="home",app.query=t.slice(1)}var Util={tpl:function(t){return document.getElementById(t).innerHTML},ajax:function(t,e){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var t=JSON.parse(n.responseText);console.log(t),e&&e(t)}},n.open("GET",t,!0),n.send(null)}};Vue.filter("price",function(t){return t+"元"}),Vue.filter("orignPrice",function(t){return"门市价："+t+"元"}),Vue.filter("sales",function(t){return"已售"+t});var Homecomponent=Vue.extend({template:Util.tpl("tpl_home"),data:function(){return{types:[{id:1,title:"美食",url:"01.png"},{id:2,title:"电影",url:"02.png"},{id:3,title:"酒店",url:"03.png"},{id:4,title:"休闲娱乐",url:"04.png"},{id:5,title:"外卖",url:"05.png"},{id:6,title:"KTV",url:"06.png"},{id:7,title:"周边游",url:"07.png"},{id:8,title:"丽人",url:"08.png"},{id:9,title:"小吃快餐",url:"09.png"},{id:10,title:"火车票",url:"10.png"}],typesagain:[],ad:[],list:[]}},created:function(){var t=this;for(var e in t.types)t.typesagain.push(t.types[e]);t.typesagain.reverse(),console.log(t.typesagain,4444444444444);var n=t.typesagain.slice(5);console.log(n,555555555);var i=t.typesagain.slice(0,5);t.typesagain=n.concat(i),Util.ajax("data/home.json",function(e){console.log(e),e&&0===e.errno&&(t.ad=e.data.ad,t.list=e.data.list,console.log(t))})}}),Listcomponent=Vue.extend({template:Util.tpl("tpl_list"),data:function(){return{types:[{value:"价格排序",key:"price"},{value:"销量排序",key:"sales"},{value:"好评排序",key:"evaluate"},{value:"优惠排序",key:"discount"}],list:[],other:[]}},methods:{loadMore:function(){this.list=this.list.concat(this.other),this.other=[]}},sortBy:function(t){"discount"===t?this.list.sort(function(t,e){var n=t.orignPrice-t.price,i=e.orignPrice-e.price;return n-i}):this.list.sort(function(e,n){return n[t]-e[t]})},created:function(){var t=this;this.$dispatch("show-search",!0);var t=this,e=t.$parent.query,n="?";e[0]&&e[1]&&(n+=e[0]+"="+e[1]),Util.ajax("data/list.json",function(e){if(e&&0===e.errno){var n=e.data.slice(0,3),i=e.data.slice(3);t.$set("list",n),t.$set("other",i)}})}}),Productcomponent=Vue.extend({template:Util.tpl("tpl_product"),props:["csearch"],data:function(){return{data:{src:"01.jpg"}}},created:function(){this.$dispatch("show-search",!1);var t=this;Util.ajax("data/product.json",function(e){e&&0===e.errno&&(t.data=e.data,console.log(t))})}});Vue.component("home",Homecomponent),Vue.component("list",Listcomponent),Vue.component("product",Productcomponent);var app=new Vue({el:".app",data:{view:"",query:[],search:"",dealSearch:"",showSearch:!0},methods:{goSearch:function(){this.dealSearch=this.search},goBack:function(){history.go(-1)}},events:{"show-search":function(t){this.showSearch=t}}});window.addEventListener("load",router),window.addEventListener("hashchange",router);for(var arrow=document.getElementById("box"),tutu=document.getElementById("appp"),zu=document.getElementById("app"),zi=document.getElementById("sm"),btn=document.getElementById("btn"),sear=document.getElementById("search"),ps=document.getElementById("appp").getElementsByTagName("p"),i=0;i<ps.length;i++)ps[i].style.animationDelay=.1*i+"s";console.log(zi),arrow.onclick=function(){location.hash="#"},setTimeout(function(){tutu.style.opacity=0,tutu.style.display="none",zu.style.display="block"},5e3);var a=zi.innerHTML=5;setInterval(function(){a--,zi.innerHTML=a},1e3),btn.onclick=function(){"none"==sear.style.display?sear.style.display="block":sear.style.display="none"},$("#appp .ss").on("click",function(){tutu.style.opacity=0,tutu.style.display="none",zu.style.display="block"});