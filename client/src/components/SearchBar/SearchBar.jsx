import {Button} from "@mui/material";
import {Input} from "../common/Input/Input";

export const SearchBar = ({ searchValue, handleSearchProducts, handleSubmit }) => (
  <>
    <Input
      type="text"
      placeholder="Поиск"
      name="name"
      onChange={(e) => handleSearchProducts(e.target.value)}
    />
    {/*<Button onClick={handleSubmit} text="Найти" />*/}
  </>
);