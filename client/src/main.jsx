import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "@/components/ui/provider";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Contexts imp
import { AuthProvider } from "@/contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContext";



const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
       refetchOnMount:false, // ekran değiştirip geldiğimde api isteği tekrar atmasın diye
       refetchOnWindowFocus:true // başka sekemeye gecip gelince tekrar calışmasın diye 
    }
  }
});
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider>{/* chakra  provider */}
      <AuthProvider>{/* providerler en dıştan içe doğru veri aktarımı sağlar */}
        <BasketProvider>
        <App />
        {/* burada app jsx de yönlendirme aypacağım diyorum */}
        </BasketProvider>
        </AuthProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </BrowserRouter>
);
