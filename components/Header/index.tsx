import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Divider from '../Divider'
import TextInput from '../Inputs'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import { device } from '../../utils/device'

const Header = () => { 
  
  const [showNav, setShowNav] = useState<boolean>(true)

  const openMenu = () => {
    setShowNav(!showNav)
  }

  return (
    <Fragment>
      <header>
        <HeaderContainer>

          <MainContainer>
            <TitleContainer>
              <div className="image-container">
                  <Image
                    alt="Casino Legal Information"
                    src="/svg/logo.svg"
                    layout="fill"
                    priority={true}         
                  />
                </div>
            </TitleContainer>
            
            <PolicyContainer>
              <div className="image-container">
                <Image
                  alt="Casino Legal Information"
                  src="/svg/it-legal-logos.svg"
                  layout="fill"
                  priority={true}
                />
              </div>
              <div className="policy-text">
                <p>Il gioco è vietato ai minori e può causare
                 dipendenza patologica</p>
              </div>
            </PolicyContainer>

            <SearchContainer>
              <TextInput/>
            </SearchContainer>
            
            <MenuContainer>
              <MenuIcon 
              style={{ color: '#fff', fontSize: '40px'}}
              onClick={openMenu}/>
            </MenuContainer>
          </MainContainer>
          
          {showNav ? 
            <Fragment>
              <Divider/>

              <NavContainer>
                <Link href={'/'}>
                    <a>Home</a>
                </Link>
                <Link href={'/video'}>
                    <a>Video</a>
                </Link>
                <Link href={'/slots'}>
                    <a>Giochi Slot Machine Gratis</a>
                </Link>
              </NavContainer> 
              
            </Fragment>
            : ''}

        </HeaderContainer>
      </header>
    </Fragment>
  )
}

const HeaderContainer = styled.div`    
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-image: linear-gradient(180deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.gradient});
  border-radius: ${(props) => props.theme.header.borderRadius};
  box-shadow: 0px 0px 10px 10px rgb(0 0 0 / 40%);
  padding: 10px 50px;
  color: ${(props) => props.theme.text.color};
`

const MainContainer = styled.div`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  height: auto;
  align-items: center;

  @media ${device.laptop} { 
    height: 60px;
  }
`

const TitleContainer = styled.div`    
  display: inherit;
  flex-grow: 1;
  font-size: 50px;
  margin-right: 20px;

  .image-container {
    position: relative; 
    width: 200px;
    height: 60px;
  }
`

const PolicyContainer = styled.div`
  display: inherit;
  align-items: inherit;
  flex-grow: 2;
  flex-wrap: inherit;

  .image-container {
    position: relative; 
    width: 170px;
    height: 60px;
    margin-right: 10px;
  }

  .policy-text {
    display: inherit;
    font-size: 10px;
    width: 220px;
  }
`

const SearchContainer = styled.div` 
  margin-right: 20px;
  display: inherit;
  flex-grow: 0;

`

const MenuContainer = styled.div` 
  cursor: pointer; 
`

const NavContainer = styled.nav`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  flex-grow: 0;
  justify-content: center;

  a { 
    color: #fff;
    margin: 0px 10px;
    padding: 7px 15px;
    border-radius: 10px;
    font-size: 17px;
  }

  a:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: #fff;
  }
`

export default Header
