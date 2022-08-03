import {Input} from "../components/common/Input/Input";
import {ComboBox} from "../components/common/ComboBox/ComboBox";
import {Button} from "../components/common/Button/Button";
import SaleCard from "../components/SaleCard/SaleCard";
import {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { v4 as uuidv4 } from "uuid";
import {SearchBar} from "../components/SearchBar/SearchBar";
import {BasicTable} from "../components/common/BasicTable/Table";
export const Products = () => {






  // class Clothes {
  //   constructor(name, models, colors, sizes, fabricType, price, costPrice, fabricConsumption) {
  //     this.name = name;
  //     this.models = models;
  //     this.colors = colors;
  //     this.sizes = sizes;
  //     this.fabricType = fabricType;
  //     this.price = price;
  //     this.costPrice = costPrice;
  //     this.fabricConsumption = fabricConsumption;
  //   }
  // }
  //
  const bodyConfig = [
    ["Боди"],
    ["горло", "круг", "квадрат", "заворот", "плечо", "подплечик"],
    ["черный", "белый", "бежевый", "коричневый"],
    ["XS", "S", "M", "L"],
    ["вискоза"],
    [650],
    [new Date().toLocaleDateString()],
    [0]
  ]
  const hoodieConfig = [
    ["Худи"],
    ["", "Zip"],
    ["черный", "молоко", "бежевый", "графит", "хаки"],
    ["XS", "oversize"],
    ["флис", "петля"],
    [900],
    [new Date().toLocaleDateString()],
    [0]
  ]
  
  const underwearConfig = [
    ["Белье"],
    [""],
    ["черный", "белый"],
    ["XS", "S", "M", "L"],
    ["хлопок"],
    [675],
    [new Date().toLocaleDateString()],
    [0]
  ]

  const joggersConfig = [
    ["Джоггеры"],
    [""],
    ["черный", "белый"],
    ["XS", "S", "M", "L"],
    ["флис", "петля", "хлопок"],
    [750],
    [new Date().toLocaleDateString()],
    [0]
  ]

  function combinator(config) {
    const arrStrings = config.reduceRight((combination, x) => {
      let result = [];
      [...x].forEach((a) => {
        [...combination].forEach((b) => {
          result.push(a + " " + b)

        });
      });
      return result;
    });
    const result = []
    arrStrings.forEach(str => {
      const arrValuesProduct = str.split(" ")
      const arrKeysProduct = [
        "name",
        "model",
        "color",
        "size",
        "fabric",
        "price",
        "date",
        "amount"
      ]
      const obj = {}

      arrKeysProduct.forEach( (key, i) => {
          obj[key] = arrValuesProduct[i];
        }
      )
      obj.id = uuidv4()
      result.push(obj)
    })
    return result
  }

  let bodies = combinator(bodyConfig);
  let hoodies = combinator(hoodieConfig);
  let underwear = combinator(underwearConfig);
  let joggers = combinator(joggersConfig);

  const [products, setProducts] = useState([...bodies, ...hoodies, ...underwear, ...joggers])
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchValue, setSearchValue] = useState("")

  const headerTable = {
    name: "Название",
    model: "Модель",
    fabric: "Ткань",
    size: "Размер",
    color: "Цвет",
    price: "Стоимость",
    amount: "Наличие",
    date: "Дата прихода",
  }

  const handleSearchProducts = (value) => {
    setSearchValue(value);
    !!value.length
      ? setFilteredProducts(
        filteredProducts.filter(product => {
          return Object.values(product).join('').toLowerCase().includes(value.toLowerCase())
        })
      )
      : setFilteredProducts(products);
  };

  let count = 1

  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="container">
        <h2>Добавление товара</h2>
        <form action="#">

          {/*<ComboBox valueProduct={valueProduct} setValueProduct={setValueProduct} label="Наименование:" arrayItems={products}/>*/}
          {/*<Button*/}
          {/*  text="Добавить"*/}
          {/*  onClick={addSale}*/}
          {/*/>*/}
        </form>
        
        <h2>Склад</h2>
        <div className="holder-search">
          <SearchBar searchValue={searchValue} handleSearchProducts={handleSearchProducts} />
        </div>

        <BasicTable rows={filteredProducts} header={headerTable}/>

      </div>
    </main>
  )
}