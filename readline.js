const request = require('request');
dataValid = (price, timestamp, resp) => {

    request('https://api.bittrex.com/api/v1.1/public/getmarkethistory?market=BTC-ETH', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        const res = JSON.parse(body);
      
   
        res.result.forEach(obj => {
            
         
          if(timestamp==obj.TimeStamp&&price==obj.Price){
       return true
      
          }
        });
        return false
      }); 

}
dataValid(0.02590065,"2020-07-20T15:03:19.58")