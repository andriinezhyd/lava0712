import {Button} from "../common/Button/Button";
import {parseUsername} from "../../helpers/parseUsername";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';

const SaleCard = ({setData, telegramId, data, address, link = "", fullname, phone, paid, date, product, order, _id}) => {
  const deleteSale = async (id) => {
    const response = await fetch(`http://localhost:5000/sales/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Can't delete sale. Server error.");

    const filteredData = data.filter(
      (sale) => sale._id !== id
    );
    setData(filteredData)
    await fetch(`https://api.telegram.org/bot5346603542:AAFy1TKplf7w8EG2rdVigK-DvXTTjEjWDtg/deleteMessage?chat_id=@lava_expenses&message_id=${telegramId}`)
  }

  const changeSale = () => {}




  return (
  <>
    <div className="cell order">{order}</div>
    <div className="cell accountname"><a target="_blank" href={link}>{parseUsername(link)}</a></div>
    <div className="cell product" title={product}>{product}</div>
    <div className="cell paid">{paid}</div>
    <div className="cell fullname" title={fullname}>{fullname}</div>
    <div className="cell phone" title={phone}>{phone}</div>
    <div className="cell address" title={address}>{address}</div>
    <div className="cell date">{date}</div>
    <p>
      <IconButton onClick={() => deleteSale(_id)} color="primary" aria-label="upload picture" component="span">
        <Delete />
      </IconButton>
      <IconButton onClick={() => changeSale(_id)} color="primary" aria-label="upload picture" component="span">
        <SettingsIcon />
      </IconButton>
    </p>
  </>
)}

export default SaleCard;