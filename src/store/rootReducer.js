import layout from "./layout";
import actions from "@/store/action";
import reports from "@/app/(dashboard)/reports/store";
import { authApi } from "@/services/auth";
import { accountsApi } from "@/services/accounts";
import { reportsApi } from "@/services/reports";
import { billingApi } from "@/services/billing";
import { processingApi } from "@/services/processing"

const rootReducer = {
  layout,
  reports,
  actions,
  [authApi.reducerPath]: authApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [reportsApi.reducerPath]: reportsApi.reducer,
  [billingApi.reducerPath]: billingApi.reducer,
  [processingApi.reducerPath]: processingApi.reducer,
};
export default rootReducer;
