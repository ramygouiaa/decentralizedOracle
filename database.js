
const neo4j = require('neo4j-driver');
const { getEnabledCategories } = require('trace_events');
/* const uri = 'bolt://localhost:7687' */
const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', '0000'));
var session = driver.session({
    /* database: 'ramyDB', */
    /*  defaultAccessMode: neo4j.session.READ  */ 
   })
var session2 = driver.session({
/* database: 'ramyDB', */
/*  defaultAccessMode: neo4j.session.READ  */ 
})
var session3 = driver.session({
  /* database: 'ramyDB', */
  /*  defaultAccessMode: neo4j.session.READ  */ 
  })
  var session4 = driver.session({
    /* database: 'ramyDB', */
    /*  defaultAccessMode: neo4j.session.READ  */ 
    })
    var session5 = driver.session({
      /* database: 'ramyDB', */
      /*  defaultAccessMode: neo4j.session.READ  */ 
      })
createRelation=(sourceId,targetId)=>{
var query=`MATCH (a:Node),(b:Node) WHERE a.id = ${sourceId} AND b.id = ${targetId} CREATE (a)-[r:RELATION]->(b) RETURN type(r)`
session
.run(query)
.then(result => {

  console.log("Relation added successfully!");
})
.catch(error => {
  console.log(error)
})
.then(() => session.close()) 

}

storeInNeo4j=(id,price,status,dataSource,timestamp)=>{

    var query=`CREATE (n:Node { id:${id}, price:${price},status:"${status}",dataSource:"${dataSource}",timestamp:"${timestamp}" })`
    console.log(query);
  session2
  .run(query)
  .then(result => {

    console.log("fields added successfully!");
  })
  .catch(error => {
    console.log("StoreInNeo4j warning!");
    console.log(error)
  })
  .then(() => session2.close()) 


}

loadNodes=(callback)=>{
  
var nodes=[]
  var query="MATCH (x) RETURN x"
  session4
  .run(query)
  .then(result => {
    //the error is here............................ records must be processed
    if(result.records.length>0){
    result.records.forEach(node => {
     
      nodes.push(node._fields[0])
    });
    
      
      callback(nodes)
    }
else{callback(0)}
  })
  .catch(error => {
    console.log(error)
  })
  .then(() => session4.close()) 
  
 

 
}
/* aDAG.addNodes([
    { nodeID: 1, nodeData: { "price": 0.03240724, status: "pending", dataSource: "bitrex", timestamp: "2020-10-19T18:16:07.02" } },
  
    ]);
     */
nodesToDag=(myNodes)=>{
  
  loadNodes(nodes=>{
  
    
    var result=[]
    if(nodes.length>0){
     for (let index = 0; index < nodes.length; index++) {
       node=nodes[index]
      var obj={ nodeID: node.properties.id.low, nodeData: { "price": node.properties.price, status: node.properties.status, dataSource: node.properties.dataSource, timestamp: node.properties.timestamp }}
      result.push(obj)
       
     }

        
      
      
      
    }
    myNodes(result)

  })


}

loadIdentites=(callback)=>{


  var query="MATCH (x) RETURN x"
  session5
  .run(query)
  .then(result => {
      // that.aDAG.addEdges([{ source: { nodeID: nodeId }, target: { nodeID: id } }]);
    var indenties=[]
  result.records.forEach(element => {
     
      var obj={nodeIdentity:element._fields[0].identity.low,dagIdentity:element._fields[0].properties.id.low}
      indenties.push(obj)
  }); 
      callback(indenties)
    

  })
  .catch(error => {
    console.log(error)
  })
  .then(() => session5.close()) 
  




}

loadEdges=(callback)=>{
  
  var query="Match (n:Node)-[r:RELATION]->(:Node) return r"
  session3
  .run(query)
  .then(result => {
      // that.aDAG.addEdges([{ source: { nodeID: nodeId }, target: { nodeID: id } }]);
    var edges=[]
    result.records.forEach(element => {
     
      var obj={source:{nodeID:element._fields[0].start.low},target:{nodeID:element._fields[0].end.low}}
      edges.push(obj)
  });
      callback(edges)
    

  })
  .catch(error => {
    console.log(error)
  })
  .then(() => session3.close()) 
  

}


getEdges=(callback)=>{

  loadEdges(edges=>{

    loadIdentites(identities=>{

      for (let index = 0; index < edges.length; index++) {
        edge = edges[index];
    
        for (let index = 0; index < identities.length; index++) {
        
    
         if(edge.source.nodeID==identities[index].nodeIdentity){
          edge.source.nodeID=identities[index].dagIdentity
         }
         if(edge.target.nodeID==identities[index].nodeIdentity){
          edge.target.nodeID=identities[index].dagIdentity
         }
        
          
        }
        
        
      }
      
        
      callback(edges)

    })

  })



}

//StoreInNeo4j(2,200,'pending','bitrex','"2020-10-19T18:16:07.02"')
/* createRelation(1,2) */