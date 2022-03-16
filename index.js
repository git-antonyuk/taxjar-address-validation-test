import addresses from './data.js';
import KEY from './env.js';

import Taxjar from 'taxjar';

const client = new Taxjar({
  apiKey: KEY
});

(async () => {
  let errors = []

  for (let index = 0; index < addresses.length; index++) {
    const address = addresses[index];
    try {
      const res = await client.validateAddress({
        country: 'US',
        state: address.state,
        zip: address.zip,
        city: address.city
        // street: address.address
      }) 

      if (!res.addresses[0]) {
        errors.push({
          error: 'no returned address',
          index,
          ...address
        })
      } 
    } catch (error) {
      errors.push({
        error,
        index,
        ...address
      })
    }
    
  
  }

  console.log(errors)
})();
