import "./styles-app.css";

import AppAgricultor from "./AppAgricultor";
import AppTechPlat from "./AppTecPlat";
import AppSubs from "./AppSubs";
import AppForms from "./AppForms";
import AppTestimonials from "./AppTestimonials";

const App = () => {
  return (
    <>
      <AppAgricultor />
      <AppTechPlat />
      <AppSubs />
      <AppTestimonials />
      <AppForms />
    </>
  );
};

export default App;
