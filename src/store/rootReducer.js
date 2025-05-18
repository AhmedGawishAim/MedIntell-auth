import layout from "./layout";
import AuthSlice from "@/store/slices/AuthSlice";

const rootReducer = {
  layout,
  auth:AuthSlice

};
export default rootReducer;
