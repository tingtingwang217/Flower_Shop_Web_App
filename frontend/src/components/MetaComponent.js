import { Helmet, HelmetProvider } from "react-helmet-async";

 const MetaComponent = ({ title = "Sara's Flower Shop", description="Welcome to Sara's Flower Shop" }) => {
    return (
       <HelmetProvider>
           <Helmet>
              <title>{title}</title> 
              <meta name="description" content={description} />
           </Helmet>
       </HelmetProvider> 
    )
 }

 export default MetaComponent