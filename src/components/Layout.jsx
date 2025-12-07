import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';


function Layout({ children }) {

    // SEO Nativo con UseEffect
    useEffect(() => {
      document.title = "Strychi Tech - Tu tienda de tecnología de confianza";

      const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Meta tags básicos
    updateMetaTag('description', 'Explora el catálogo de Strychi Tech. Encuentra los mejores perifericos y componentes del mercado.');
    updateMetaTag('keywords', 'perifericos, componentes, tecnología, hardware, gamer, Strychi Tech');
    updateMetaTag('author', 'Tomas Strycharski');
    updateMetaTag('robots', 'index, follow');

    // Open Graph para redes sociales
    updateMetaTag('og:title', 'Tienda de Strychi Tech', 'property');
    updateMetaTag('og:description', 'Explora el catálogo de Strychi Tech.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', window.location.origin + '/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.origin, 'property');
    updateMetaTag('og:site_name', 'Strychi Tech', 'property');

    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Tienda de Strychi Tech');
    updateMetaTag('twitter:description', 'Compra los mejores componentes en Strychi Tech.');
    updateMetaTag('twitter:image', window.location.origin + '/logo.jpg');

    // Canonical link
    let linkCanonical = document.querySelector("link[rel='canonical']");
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = window.location.origin;
    
    }, []);
    
  return (
    <LayoutContainer>
      <Header>
        <Navbar />
      </Header>

      <Main>
        {children}
      </Main>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LayoutContainer>
  );

} export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 100%;
`;

const Main = styled.main`
  flex: 1 1 auto;
  width: 100%;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  margin-top: auto;
`;
