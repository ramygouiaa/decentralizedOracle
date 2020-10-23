const neo4j = require('neo4j-driver')
require('D:/myDesktop/tangle/mytangle/database.js');
const request = require('request');
 const TheDAG = require('the-dag'); 



class Dag {

    constructor(dag) {
     
        this.aDAG=dag
            
    }
lastNodeId(){
   var lastNode=Object.keys(this.aDAG.getNodes())
    lastNode=lastNode[lastNode.length-1]
    console.log(this.aDAG.getNodes());
return lastNode

}

initiateNode(givenNodeData){
    var lastNdId=1
 
   if(this.lastNodeId()!=undefined){
    
    var lastNdId=parseInt(this.lastNodeId(),10)+1

   }
    this.aDAG.addNodes([
        { nodeID: lastNdId, nodeData:givenNodeData  }
    
        ]);    
storeInNeo4j(lastNdId,givenNodeData.price,givenNodeData.status,givenNodeData.dataSource,givenNodeData.timestamp)

}
    edges(){
console.log(this.aDAG.getEdges());
      
    }
nodes(){
console.log(this.aDAG.getNodes());
    
}
findtips ()  {
    var allInfoNodes = this.aDAG.getNodes()
    var tips = []
    var elements = []
    var nodes = Object.keys(allInfoNodes)

    nodes.forEach(nodeId => {

        /* if(!allInfoNodes[nodeId].possibleSources) { */
            if(this.getNodeIndegree(nodeId,this.aDAG)<5){
                tips.push(nodeId)
            }
    
    });
    const randomElement1 = tips[Math.floor(Math.random() * tips.length)];
    elements.push(randomElement1)
    var tips = tips.filter(function (value, index, arr) { return value != randomElement1; })

    if (tips.length > 1) {
        const randomElement2 = tips[Math.floor(Math.random() * tips.length)];
        elements.push(randomElement2)
    }
    return elements
}

displayNodes = () => {


    var allInfoNodes = this.aDAG.getNodes()

    var nodes = Object.keys(allInfoNodes)
    nodes.forEach(nodeId => {
        /*  allInfoNodes[nodeId].nodeData.status="confirmed"; */
        console.log(allInfoNodes[nodeId].nodeData);

    });

}

getNodesNumber=()=>{


    var allInfoNodes = this.aDAG.getNodes()

    var nodes = Object.keys(allInfoNodes)
    return nodes.length

}
dataValid = (timestamp,price) => {
    
    return new Promise(function (resolve, reject) {
    
  var find=false
  
      request('https://api.bittrex.com/api/v1.1/public/getmarkethistory?market=BTC-ETH', function (error, response, body) {
          
          const res = JSON.parse(body);
      
    
          res.result.forEach(obj => {
            
            if(timestamp==obj.TimeStamp&&price==obj.Price){
            
              find=true
            }
          });
  
          if(find==true){
            resolve(true)
          }else resolve(false)
        }); 
      })
  }

getNodeIndegree = (nodeId) => {
    var indegree = 0
    var allInfoNodes = this.aDAG.getEdges()
    var nodes = Object.keys(allInfoNodes)
     nodes.forEach(node => {
        if (allInfoNodes[node].targetID == nodeId) {
            indegree++
        }
    });

    return indegree
}

addNodeToDag = ( nodeData) => {
    var that=this
    return new Promise(function (resolve, reject) {
    
    
   
    
    if (that.getNodesNumber()>=1){
        console.log("inside................................");
        var tips = that.findtips()
        that.initiateNode(nodeData)
    var nodeId= that.lastNodeId()
    
     tips.forEach(id => {
        var Tip=that.aDAG.getNode({
            nodeID: parseInt(id, 10)
          })
          
     
        that.dataValid( Tip.nodeData.timestamp, Tip.nodeData.price).then(resp=>{
        
         if(resp==true){
             
             that.aDAG.addEdges([{ source: { nodeID: nodeId }, target: { nodeID: id } }]);
             createRelation(nodeId,id)
             if(that.getNodeIndegree(id)==5){
                 
                   Tip.nodeData.status="verified"
           
             }}
                })  
             })
             resolve(true)
            }else{
                console.log("Warning (node added!): insuficient number of nodes for verification");
                resolve(true)
            }
            })
         
                }
            

}



module.exports = Dag