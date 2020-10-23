const TheDAG = require('the-dag');
const Dag=require('D:/myDesktop/tangle/mytangle/Tangle.js');

const aDAG = new TheDAG();
 
   nodesToDag(nodes=>{
     
      
      if (nodes.length>0){   
             aDAG.addNodes(nodes)  
             getEdges(edges=>{

               if (edges.length>0) {
                  aDAG.addEdges(edges)
                  
               }
      
            })
            console.log("edges loading....");
            console.log(aDAG.getEdges());
            
      }

      tangle= new Dag(aDAG)
      
testData={

   price:0.03167165,
   status:"pending",
   dataSource:"bitrex",
   timestamp:"2020-10-22T11:21:19.47"
   
}


/* tangle.addNodeToDag(4,testData)  */
tangle.addNodeToDag(testData).then(resp=>{

 /*   if(resp){ 
 
   tangle.displayNodes()} */
  
}) 


   })




    
