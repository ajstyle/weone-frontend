angular.module('weone').directive('userTree', function() {
console.log("***************888");
  return {
    restrict: 'A',
    link: function(scope, element,attr) {
        console.log("directive running.."+attr.userTree);
      var canvas = d3.select(document.getElementById("hello")).append("svg")
.attr("width",500)
.attr("height",500)
.append("g")
.attr("transform","translate(50,50)");

var tree = d3.layout.tree()
.size([400,400])

d3.json("app/tpls/users/myData.json", function(data){
console.log("data** is.."+data);
    console.log("data***json ne is..."+JSON.parse(attr.userTree));
   // var ob = new Object();
    //var ob.test = attr.userTree
var nodes = tree.nodes(JSON.parse(attr.userTree));
   // console.log("nodes are..."+JSON.stringify(nodes));
var links = tree.links(nodes);

var node = canvas.selectAll(".node")
.data(nodes)
.enter()
.append("g")
.attr("class","node")
.attr("transform", function(d){
return "translate(" + d.x +","+d.y+")";

})


node.append("circle")
.attr("r", 5)
.attr("fill","steelblue");

node.append("text")
.text(function(d){
return d.name;
})

var diagonal = d3.svg.diagonal()

canvas.selectAll(".link")
.data(links)
.enter()
.append("path")
.attr("class","link")
.attr("fill","none")
.attr("stroke","#ADADAD")
.attr("d",diagonal)


})
        
        
        
        
        
        
        
    }
  };
})