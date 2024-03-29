import styled, { createGlobalStyle } from 'styled-components'

import BackgroundImage from './assets/desk.jpg'

export const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
}

body {
  margin:0;
  padding:0 20px;
  display: flex;
  justify-content: center;
  background-image: url(${BackgroundImage});
  background-size: cover;
}

* {
  box-sizing: border-box;
}
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;

  > p {
    color: #fff;
  }

  .score {
    margin:0;
    color: #fff;
    font-size: 2rem;
  }

  h3 {
    margin: 20px;
    font-size: 50px;
    font-weight:400;
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-image: linear-gradient(100deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip:text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
  }

  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  
  .start {
    max-width: 200px;
  }
`

