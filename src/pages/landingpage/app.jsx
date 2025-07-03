import "./styles-app.css";
import "../../styles/scroll-animations.css";

import AppAgricultor from "./AppAgricultor";
import AppTechPlat from "./AppTecPlat";
import AppSubs from "./AppSubs";
import AppForms from "./AppForms";
import AppFAQ from "./AppFAQ";
import AppTestimonials from "./AppTestimonials";

const App = () => {
  return (
    <>
      <AppAgricultor />
      <AppTechPlat />
      <AppSubs />
      <AppTestimonials />
      <AppFAQ />
      <AppForms />
    </>
  );
};

export default App;
