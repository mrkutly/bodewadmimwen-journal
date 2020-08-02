import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "./Link";
import SEO from "./SEO";
import { randomColor, randomShape } from "../utils";

const randomShapesStyles = () => {
  let style = "";
  let i = 1;

  while (i <= 10) {
    style += ` 
			#random-shape-${i}:before {
				content: "";
				opacity: 0.07;
        clip-path: ${randomShape()};
        -webkit-clip-path: ${randomShape()};
        height: 100vh;
        background: ${randomColor()};
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        z-index: -1;
			}
		`;
    i += 1;
  }

  return style;
};

const Layout: React.FC<{ title: string }> = ({ children, title }) => {
  useEffect(() => {
    const css = `
      body:after {
				content: "";
				opacity: 0.07;
        height: 100vh;    
        clip-path: polygon(0 79%, 100% 100%, 100% 0);
        -webkit-clip-path: polygon(0 79%, 100% 100%, 100% 0);
        background: ${randomColor()};
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        z-index: -1;
      }

      ${randomShapesStyles()}
    `;

    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.append(style);
  }, []);

  return (
    <>
      <SEO lang="en" title={title} />
      <div id="random-shape-1" />
      <div id="random-shape-2" />
      <div id="random-shape-3" />
      <div id="random-shape-4" />
      <div id="random-shape-5" />
      <div id="random-shape-6" />
      <div id="random-shape-7" />
      <div id="random-shape-8" />
      <div id="random-shape-9" />
      <div id="random-shape-10" />
      <HeaderStyles>
        <h1>Mark's Bodéwadmimwen Journal</h1>
        <nav>
          <Link to="/">home</Link>
          <Link to="/new">new entry +</Link>
        </nav>
      </HeaderStyles>
      <main>{children}</main>
    </>
  );
};

const HeaderStyles = styled.header`
  color: var(--primary-500);
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;

  a {
    margin-left: 24px;
  }

  h1 {
    font-size: 3rem;
    margin-top: 0;
  }
`;
export default Layout;
