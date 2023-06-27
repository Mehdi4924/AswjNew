import axios from "axios";
import { post_request, get_request, put_request } from "./Requests";
const youtubeApiKey = "AIzaSyCiIXh43ZR6zZFoBZ5pih_eNh4NnQj0TUI";
const youtubeChannelId = "UC9aLYD43e6KQ254Xb75DG-g";
const getVideos = async (page) => {
  const data = await get_request({
    target: "/users/94972939/videos?per_page=10&&page=" + page,
  });
  return data;
};
const getVideosFromYoutTube = async (page) => {
  const data = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${youtubeChannelId}&part=snippet,id&order=date&maxResults=${
      page * 10
    }`
  );
  return data;
};
const ForgetPassword = async (body) => {
  const data = await post_request({
    target: "User/ForgotPassword",
    body: body,
  });
  return data;
};

const Signout = async (body) => {
  const data = await post_request({ target: "User/Signout", body: body });
  return data;
};
const Signup = async (body) => {
  const data = await post_request({ target: "User/SignUp", body: body });
  return data;
};

const MakePayment = async (body) => {
  const data = await post_request({
    target: "PaymentApi/AddPayment",
    body: body,
  });
  return data;
};
const getProfile = async (id) => {
  const data = await get_request({ target: "user/GetUser/" + id });
  return data;
};
const getCountries = async () => {
  const data = await get_request({ target: "itemapi/GetCountries" });
  return data;
};
const EditProfile = async (body) => {
  const data = await post_request({ target: "User/EditUser", body: body });
  return data;
};
const getCategories = async () => {
  const data = await get_request({ target: "CatApi/GetCategories" });
  return data;
};
const getCategoryDetails = async (categoryId, subCategoryId) => {
  const data = await get_request({
    target:
      "TabCatApi/GetTabCategories?categoryId=" +
      categoryId +
      "&subCategoryId=" +
      subCategoryId,
  });
  return data;
};

const getAllNews = async (id) => {
  const data = await get_request({ target: "Nps/GetAllNps/" + id });
  return data;
};
const getAllClassifieds = async () => {
  const data = await get_request({ target: "AdvertisementApi/getall" });
  return data;
};
const getPaymentPlans = async () => {
  const data = await get_request({ target: "PaymentApi/GetPaymentPlans" });
  return data;
};
const getCardTypes = async () => {
  const data = await get_request({ target: "PaymentApi/GetCardTypes" });
  return data;
};
const getClassified = async (id) => {
  const data = await get_request({
    target: "AdvertisementApi/NewGetAdvertisementDetails/" + id,
  });
  return data;
};

const Contact_Us = async (body) => {
  const data = await post_request({ target: "User/ContactUs", body: body });
  return data;
};

const SocialLogin = async (body) => {
  const data = await post_request({
    target: "User/SignInUsingAuth",
    body: body,
  });
  return data;
};
const getDeviceInfo = async (id) => {
  const data = await get_request({ target: "user/GetDeviceInfo/" + id });
  return data;
};
const newEditProfile = async (body) => {
  const data = await post_request({ target: "user/NewEditUser/", body: body });
  return data;
};
export {
  ForgetPassword,
  Signout,
  Signup,
  getPaymentPlans,
  getCardTypes,
  getProfile,
  getCountries,
  EditProfile,
  getCategories,
  getCategoryDetails,
  getAllNews,
  MakePayment,
  getAllClassifieds,
  getClassified,
  Contact_Us,
  SocialLogin,
  getDeviceInfo,
  newEditProfile,
  getVideos,
  getVideosFromYoutTube,
};
