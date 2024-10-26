import axios from "axios";
import { getSellerInfo } from "../user/seller";

export const fetchFlowerList = async (categoryID) => {
  const response = await axios.get(
    `https://localhost:7198/api/Category/${categoryID}/flowers`
  );
  return response.data;
};

export const fetchFlowerListByCategoryName = async (categoryName) => {
  const response = await axios.get(
    `https://localhost:7198/api/Category/flowers/${categoryName}`
  );
  return response.data;
};

export const fetchFlowerListBySellerId = async () => {
  const sellerInfo = await getSellerInfo();
  const response = await axios.get(
    `https://localhost:7198/api/FlowerInfo/flowers/${sellerInfo.sellerId}`
  );
  return response.data;
};
