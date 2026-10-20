import { useEffect } from "react";
import { checkHealth } from "../services/health.service";
import Header from "../components/Header";

function Home() {
  async function health() {
    let res = await checkHealth();
    console.log(res);
  }
  useEffect(function () {
    health();
  }, []);

  return <Header />;
}

export default Home;
