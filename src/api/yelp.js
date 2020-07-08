import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer WRmwWrxdSo3gj83lf-2lfUhakIsjXixbmHiFTr-sl93sS8iMsq1-pn-tpd37U4UFU1-fr_RfbYbSubW64GgE-F_eUMFly5R894036s22WA-hEskGTYyzjZrBkqlRXnYx'
  }
});

axios.get('/search')
