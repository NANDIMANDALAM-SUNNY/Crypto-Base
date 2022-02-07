import React,{useState ,useEffect} from 'react';
import millify from 'millify';
import {Card, Row, Col, Input} from 'antd';
import Loader from './Loader'

import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = ({simplified}) => {
  const count = simplified ?10 : 100;

  const {data:cryptosList,isFetching} = useGetCryptosQuery(count);
  
  const [cryptos, setCryptos] = useState([]);
  console.log(cryptos)

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{
    // setCryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  },[cryptosList,searchTerm]);

  if(isFetching) return <Loader />;
  return (
  <>
    {!simplified && (
      <div className="search-crypto">
      <Input placeholder='Search Crypto Currency' onChange={(e)=>setSearchTerm(e.target.value)}/>
  </div>

    )}
    
    <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos?.map((currency)=>(
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
              
                  <Card 
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl}/>}
                  hoverable
                  >
                    <p>Price:{millify(currency.price)}</p>
                    <p>Market Cap:{millify(currency.marketCap)}</p>
                    <p>Daily Change:{millify(currency.change)}%</p>
                  </Card>
              
          </Col>
        ))}
    </Row>
  </>
  );
};

export default Cryptocurrencies;
