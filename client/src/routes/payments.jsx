import {useCallback, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import "react-datepicker/dist/react-datepicker.css";
import {Button} from "@mui/material";


const cyrillicToTranslit = new CyrillicToTranslit({ preset: 'uk' });

registerLocale('ru', ru)

export const Payments = () => {

  const whiteCard = "dWNWNGgBTJZspJE2ibm3Eg"
  const fopCard = "MMVeAbvNh6lqMfpQEgW55w"

  const [mono, setMono] = useState([]);
  const [nameCard, setNameCard] = useState(fopCard);
  const [startDate, setStartDate] = useState(new Date());

  const getDateString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  let count = 1
  let total = 0
  const isLastDay = false;

  const currentDate = new Date();
  const prevDate = new Date(currentDate - 86400000)

  const urlLastDay = `https://api.monobank.ua/personal/statement/dWNWNGgBTJZspJE2ibm3Eg/${Math.floor(prevDate.getTime()/1000)}/${Math.floor(currentDate.getTime()/1000)}`
  const urlSpecificDate = `https://api.monobank.ua/personal/statement/${nameCard}/${Math.floor(startDate.setHours(0,0,0)/1000)}/${Math.floor(startDate.setHours(23,59,59)/1000)}`

  const monoUrl = isLastDay ? urlLastDay : urlSpecificDate;
  const fetchMonobank = useCallback(async () => {
    try {
      console.log("+++++++++++++++++++++monoUrl", monoUrl)
      console.log("nameCard", nameCard)
      const response = await fetch(monoUrl,{
        headers: {
          "X-Token": 'uhgVID-JEkgLHX1iEQyBzQNFJdDGxyKcm_Oc9qCXvFqw'
        }
      });
      if (!response.ok) {
        console.error(`Ошибка загрузки ${response.status}`)
        if (response.status === 429) {
          alert("Слишком часто, попробуй позже")
        }

        setMono([])
      }
      const monoUpdated = await response.json()
      const monoUpdatedReversed = await monoUpdated.reverse()
      setMono(monoUpdatedReversed);
    } catch (e) {
      console.log("e.message", e)
    }
  }, [startDate])

  useEffect( () => {
     fetchMonobank()
    // setInterval(() => fetchMonobank(), 120000)
  }, [startDate])

  const arrExceptions = [
    "З чорної картки",
    "З гривневого рахунка ФОП",
  ]

  const getCard = (cardId) => {
    // setNameCard(cardId)
    // await fetchMonobank()
    // fetchMonobank()
  }

  const monoFiltered = mono.filter(sale => !arrExceptions.some((exception) => exception === sale.description))
  console.log("monoFiltered", monoFiltered)

  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="container">
        <h3>Оплаты:</h3>
        {/*<div style={{ display: "flex" }}>*/}
        {/*  <div><Button variant="outlined" onClick={()=>getCard(fopCard)}>Карта ФОП</Button></div>*/}
        {/*  <div><Button variant="outlined" onClick={()=>getCard(whiteCard)}>Карта белая</Button></div>*/}
        {/*</div>*/}
        <DatePicker locale="ru" selected={startDate} onChange={date => setStartDate(date)} />
        <ul className="list-mono-data">
          {monoFiltered.map(sale => {
            total = sale.amount > 0 ? total + sale.amount/100 : total
            return (
              sale.amount > 0 ? (<li className="mono-data-item" key={sale.id}>
                <div className="order">{count++}</div>
                <div className="time">{getDateString(sale.time)}</div>
                <div className="amount">{sale.amount/100} грн.</div>
                <div className="description">{  cyrillicToTranslit.reverse(sale.description.toLowerCase().split(' ').filter(item => item !== 'від:').map(word => word[0].toUpperCase() + word.substring(1)).join(' '))
                }</div>
              </li>) : ""
            )
          })}
        </ul>
        {/*<p>Сумма оплат за день: <strong>{total}</strong> грн.</p>*/}
      </div>
    </main>
  );
}