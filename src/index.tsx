import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
// import QueryClientProvider from "react-query"; 설치 필요함

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //<React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        {/* <QueryClientProvider client={queryClient}> */}
        <App />
        {/* </QueryClientProvider> */}
      </BrowserRouter>
    </RecoilRoot>
 // </React.StrictMode>
);
