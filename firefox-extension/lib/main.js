const Widget = require("widget").Widget;
const Request = require("request").Request;
const Panel = require("panel").Panel;
const setInterval = require("timer").setInterval;

var panel = Panel({
   contentURL: "http://bitcoincharts.com/charts/chart.png?width=500&height=200&m=thUSD&k=&r=5&i=Hourly&c=0&s=&e=&Prev=&Next=&v=1&cv=0&ps=0&l=0&p=0&t=S&b=&a1=&m1=10&a2=&m2=25&x=0&i1=&i2=&i3=&i4=&SubmitButton=Draw&",
   width: 500,
   height: 248,
});

var widget = Widget({
   label: "Current Bitcoin price",
   id: "bitcoin-price-widget",
   content: "<div style='font-size:12px'>$N/A</div>",
   width: 55,
   panel: panel,
   onClick: function() {
      update();
   }
});

function update() {
   Request({
      url: "https://data.mtgox.com/api/1/BTCUSD/ticker",
      onComplete: function (response) {
         price = response.json.ticker["buy"];
         price = Math.round(price*100)/100;
         price = price.toFixed(2);
         widget.content = "<div style='font-size:12px'>$" + price + "</div>";
      }
   }).get();
}

update();
setInterval(update, 4 * 60 * 1000); // rerun every 4 mintues 
