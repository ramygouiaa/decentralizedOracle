const request = require('request');
dataValid = (price, timestamp) => {
  return new Promise(function (resolve, reject) {

find=false
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
preis=0.02590963
dataValid(preis,"2020-07-20T16:25:45.17").then(resp=>{

  console.log(resp);

  for (let index = 0; index < 10; index++) {
   console.log(index);
    
  }
})
