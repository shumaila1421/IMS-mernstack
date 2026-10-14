import { useEffect } from "react";
import { checkHealth } from "../services/health.service";

function Home() {
  async function health() {
    let res = await checkHealth();
    console.log(res);
  }
  useEffect(function () {
    health();
  }, []);

  return <h1>Hello</h1>;
}

export default Home;
