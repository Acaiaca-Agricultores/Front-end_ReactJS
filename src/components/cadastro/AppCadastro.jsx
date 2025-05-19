import Header from "../header/AppHeader";
import { Image } from "@chakra-ui/react";
import AgricultorForms from '../../assets/agricultor-forms.jpg'

function AppCadastro() {
    return(
        <>
          <Header/>
           <Image 
                src={AgricultorForms}
                width='100%;'
           />
        </>
    )
}

export default AppCadastro;