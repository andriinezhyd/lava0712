import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Link} from "react-router-dom";
import {Input} from "../components/common/Input/Input";
import {Button} from "../components/common/Button/Button";
import SaleCard from "../components/SaleCard/SaleCard";
import {useCallback, useEffect, useState} from "react";
import {ComboBox} from "../components/common/ComboBox/ComboBox";
import {parseUsername} from "../helpers/parseUsername";




export const Sales = () => {

  const [data, setData] = useState([]);
  const [messageId, setMessageId] = useState("");
  const [valueName, setValueName] = useState("");
  const [valueLink, setValueLink] = useState("");
  const [valuePaid, setValuePaid] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const [valueProduct, setValueProduct] = useState("");
  const [valuePhone, setValuePhone] = useState("");

  const products = [
    {label: "Платье накрест белое"},
    {label: "Платье накрест"},
    {label: "Костюм лен"},
    {label: "Костюм летний"},
    {label: "Костюм осенний"},
    {label: "Костюм зимний"},
    {label: "шорты лен"},
    {label: "футболка 2нитка"},
    {label: "рубашка лен"},
    {label: "рубашка"},
    {label: "комплект белья"},
    {label: "Костюм 2нитка шорты + футболка"},
    {label: "боди круг"},
    {label: "боди плечо"},
    {label: "боди квадрат"},
    {label: "боди горло"},
    {label: "боди заворот"},
    {label: "Костюм детский"},
    {label: "Куртка"},
    {label: "Пальто"},
    {label: "Жилет"},
    {label: "Топ рукав"},
    {label: "Топ на завязках"},
    {label: "Лонгслив"},
    {label: "Свитшот"},
    {label: "Худи", material: ["флис", "двухнитка", "петля", "лен"]},
    {label: "Джоггеры"},
    {label: "Прямые штаны"},
    {label: "Зип-худи"},
    {label: "Шапка"},
    {label: "Кардиган"},
  ]

  const handleInputAccount = (e) => {
    setValueLink(e.target.value)
  }
  const handleInputName = (e) => {
    setValueName(e.target.value)
  }
  const handleInputPaid = (e) => {
    setValuePaid(e.target.value)
  }
  const handleInputPhone = (e) => {
    setValuePhone(e.target.value)
  }
  const handleInputAddress = (e) => {
    setValueAddress(e.target.value)
  }
  const handleInputProduct = (e) => {
    setValueProduct(e.target.value)
  }





  const fetchData = useCallback(async () => {
    const response = await fetch('http://localhost:5000/sales/');
    const data = await response.json()
    setData(data);
  }, [])

  let message_id = ""
  const sendToTelegram = async () => {

    const botTOKEN = "bot5346603542:AAFy1TKplf7w8EG2rdVigK-DvXTTjEjWDtg";
    const chat_id = "@lava_expenses";
    const message = `${newSale.date}\n\n` +
      `<b>${newSale.fullname}</b>\n` +
      `${newSale.address}\n` +
      `${newSale.phone}\n\n` +
      `<b>${newSale.paid}</b>\n` +
      `${newSale.product}\n` +
      `<a href="${newSale.link}">${parseUsername(newSale.link)}</a>`

    console.log(message)


    const response = await fetch(`https://api.telegram.org/${botTOKEN}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${encodeURI(message)}`);
    const data = await response.json()
    newSale.telegramId = data.result.message_id
  }

  const getAllWareHouseNovaPoshta = async () => {
    const response = await fetch(`https://api.novaposhta.ua/v2.0/json/`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "modelName": "AddressGeneral",
        "calledMethod": "getWarehouses",
        "methodProperties": {
          "Language": "ru",
          "CityName": "Киев"
        },
        "apiKey": "db3237088c844dce33e0d8ef689dd0d1"
      }) // body data type must match "Content-Type" header
    });
    const data = await response.json()
    console.log("----getNovaPoshta data----", data)
  }

  useEffect(() => {
    fetchData()

  }, [])

  const newSale = {
    telegramId: '',
    fullname: valueName,
    phone: valuePhone,
    link: valueLink,
    paid: valuePaid,
    address: valueAddress,
    product: valueProduct,
    date: new Date()
    .toLocaleString()
  }


  const addSale = async (e) => {
    e.preventDefault()
    console.log("newSale", newSale)
    await sendToTelegram()
    const response = await fetch('http://localhost:5000/sales/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newSale)})
    const sale = await response.json()
    setData([...data, sale])
  }

  let count = 1

  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="container">
        <h2>Новая продажа</h2>
        <form action="#">
          <Input
            type="text"
            value={valueLink}
            placeholder="instagram account"
            label="Профиль клиента:"
            name="name"
            onChange={handleInputAccount}
          />
          <Input
            type="text"
            value={valueName}
            placeholder="Имя покупателя"
            label="ФИО:"
            name="name"
            onChange={handleInputName}
          />
          <Input
            type="text"
            value={valueAddress}
            placeholder="Адрес получателя"
            label="Адрес получателя:"
            name="name"
            onChange={handleInputAddress}
            required
          />
          <Input
            type="phone"
            value={valuePhone}
            placeholder="Телефон получателя"
            label="Телефон получателя:"
            name="name"
            onChange={handleInputPhone}
          />
          <Input
            type="number"
            value={valuePaid}
            placeholder="Оплачено"
            label="Оплачено:"
            name="name"
            onChange={handleInputPaid}
          />
          <ComboBox valueProduct={valueProduct} setValueProduct={setValueProduct} label="Наименование:" arrayItems={products} />
          <Button
            text="Добавить"
            onClick={addSale}
          />
        </form>
        <div className="table">
          <h2>Таблица продаж</h2>
          <div className="table-content">
            <div className="table-header">
              <div className="cell order">№</div>
              <div className="cell accountname">Профиль</div>
              <div className="cell product">Товар</div>
              <div className="cell paid">Оплачено</div>
              <div className="cell fullname">ФИО покупателя</div>
              <div className="cell fullname">Телефон</div>
              <div className="cell address">Адрес получателя</div>
              <div className="cell date">Дата продажи</div>
            </div>
            <div className="table-main">
              {data.map((card) => {
                const order = count++
                return (
                  <div className="table-item" key={card._id}>
                    <SaleCard {...card} order={order} data={data} setData={setData} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );

}