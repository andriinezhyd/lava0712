import {parseUsername} from "../../helpers/parseUsername";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";

const ProductCard = ({id, name, model, fabric, price, size, color, order, date, amount}) => {

  return(
    <>
      <div className="cell order">{order}</div>
      <div className="cell ">{name}</div>
      <div className="cell ">{model}</div>
      <div className="cell ">{fabric}</div>
      <div className="cell ">{size}</div>
      <div className="cell ">{color}</div>
      <div className="cell ">{price}</div>
      <div className="cell ">{amount}</div>
      <div className="cell date">{date}</div>
      {/*<div className="cell address">{address}</div>*/}
      {/*<div className="cell date">{date}</div>*/}
      {/*<p>*/}
      {/*  <IconButton onClick={() => deleteSale(_id)} color="primary" aria-label="upload picture" component="span">*/}
      {/*    <Delete />*/}
      {/*  </IconButton>*/}
      {/*  <IconButton onClick={() => changeSale(_id)} color="primary" aria-label="upload picture" component="span">*/}
      {/*    <SettingsIcon />*/}
      {/*  </IconButton>*/}
      {/*</p>*/}
    </>
  )
}

export default ProductCard;