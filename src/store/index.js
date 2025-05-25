import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/services/auth";
import { accountsApi } from "@/services/accounts";
import { reportsApi } from "@/services/reports";
import { billingApi } from "@/services/billing";
import { processingApi } from "@/services/processing";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
          .concat(
              authApi.middleware,
              accountsApi.middleware,
              reportsApi.middleware,
              billingApi.middleware,
              processingApi.middleware,
          );
  },
});

export default store;
