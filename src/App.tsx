import { Suspense, useState } from "react";
import "./App.css";
import { DataLoader } from "./components/DataLoader";
import { fetchData1, fetchData5s } from "./data/fetchData1";
import { Loadable } from "./utils/Loadable";
import { sleep } from "./utils/sleep";

function App() {
  const [data1] = useState(
    () =>
      new Loadable(fetchData5s(), async () => {
        await sleep(6000);
        throw Error("キャンセル");
      })
  );
  const [data2] = useState(
    () =>
      new Loadable(fetchData1(), async () => {
        await sleep(10000);
        throw Error("キャンセル");
      })
  );
  const [data3] = useState(
    () =>
      new Loadable(fetchData1(), async () => {
        await sleep(10000);
        throw Error("キャンセル");
      })
  );
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data1} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data2} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data3} />
      </Suspense>
    </div>
  );
}

export default App;
