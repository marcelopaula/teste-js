import './App.css';
import { useEffect, useState } from 'react';
import { InputLabel, MenuItem, Select, FormControlLabel, Checkbox, List, ListItem } from '@material-ui/core';

function App() {

  const [product, setProduct] = useState([])
  const [type, setType] = useState('')
  const [removed, setRemoved] = useState([])
  const [allItems, setAllItems]= useState([])
  const [allFlavors, setAllFlavors] = useState([])


  const data = {
    "Classic": ["strawberry", "banana", "pineapple", "mango", "peach", "honey", "ice", "yogurt"],
    "Forest Berry": ["strawberry", "raspberry", "blueberry", "honey", "ice", "yogurt"],
    "Freezie": ["blackberry", "blueberry", "black currant", "grape juice", "frozen yogurt"],
    "Greenie": ["green apple", "kiwi", "lime", "avocado", "spinach", "ice", "apple juice"],
    "Vegan Delite": ["strawberry", "passion fruit", "pineapple", "mango", "peach", "ice", "soy milk"],
    "Just Desserts": ["banana", "ice cream", "chocolate", "peanut", "cherry"]
   }

  const filterProduct = (queryArr, action) => {
    return queryArr.filter((item) => {
      const index = item.indexOf(action);
      if ( index > -1) {
        return item;
      }
    }).map((item) => {
      item = item.replace(action, '').trim();
      return item;
    })
  }

  const mountAllFlavors = (data) => {
    let _flavors = [];

    Object.keys(data).map((type) => {
      _flavors = [..._flavors, ...data[type]];
      return type
    })

    _flavors = [...new Set(_flavors)];

    setAllFlavors(_flavors)
  }

  const mountProduct = (query) => {
    let _product= [];
    const queryArr = query.split(',');

    const add = filterProduct(queryArr, '+');
    const remove = filterProduct(queryArr, '-');

    _product = product.filter((item) => {
      return !remove.includes(item)
    })

    _product = [..._product, ...add];

    setProduct(_product);
  }

  useEffect(() => {
    mountAllFlavors(data)
  }, [])

  useEffect(() => {
    console.log(product)
  }, [product])

  const handleChange= (e) => {
    const value = e.target.value;
    setType(value);
    setProduct(data[value]);
  }

  const handleItem = (e) => {
    const query = `${e.target.checked ? '+' : '-'}${e.target.value}`;
    mountProduct(`${type}, ${ query }`)
  }

  return (
    <div className="App">

      <div>        
          <InputLabel id="demo-simple-select-label">Selecione o tipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={(e) => {handleChange(e)}}
          >
            <MenuItem value="">Selecione um tipo</MenuItem>
            {
                Object.keys(data).map((item, i) => (
                  
                  <MenuItem 
                    value={item}
                    key={i}>
                    { item }
                  </MenuItem>
                ))
            }
          </Select>
      </div>
      
      <div>
        <div>
          <h4>Itens Incluidos</h4>
        </div>
        {

          allFlavors.map((item, i) => (
            <FormControlLabel 
              control={
                <Checkbox checked={product.includes(item) ? true : false} />
              } 
              label={item}
              value={item}
              onChange={handleItem}
              key={i} />
          ))
        }
      </div>
  

      {
        product.length> 0 &&
          <div>
            <div>
              <h4>Itens finais</h4>
            </div>
            <List>
                {
                  product.map((item) => (
                    <ListItem>{item}</ListItem>
                  ))
                }
              
            </List>
          </div>
      }
    </div>
  );
}

export default App;
