/*
 * @Date: 2023-10-11 13:53:06
 * @Description: main 总入口
 */
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";
import "./global.less";
import store from "@/store";
import { Provider as ProviderAuth } from "@/utils/useAuth.tsx";
import { ClickToComponent } from "click-to-react-component"; // alt + 鼠标左键找到对应点

const { Provider } = store;



Sentry.init({
  dsn: "https://150ab2d46e88b83fbeddf9d0faa32bce@o4509450396434432.ingest.de.sentry.io/4509505941930064",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <>
    {/*<React.StrictMode>*/}
    <ProviderAuth value={{}}>
      <Provider>
        <ClickToComponent />
        <App />
      </Provider>
    </ProviderAuth>
    {/*</React.StrictMode>*/}
  </>
);
