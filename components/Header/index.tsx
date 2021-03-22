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
            <LogoContainer>
              <Image
                alt="Casino Legal Information"
                src="/svg/logo-spike.svg"
                layout="fill"
                priority={true}
              />
            </LogoContainer>
            
            <LegalContainer>
              <div className="legal-image">
                <Image
                  alt="Casino Legal Information"
                  src="/svg/it-legal-logos.svg"
                  layout="fill"
                  priority={true}
                />
              </div>
              <div className="legal-text">
                <p>Il gioco è vietato ai minori e può causare
                 dipendenza patologica</p>
              </div>
            </LegalContainer>

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
              <Divider color={'#fff'} marginBottom="5px"/>

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
  padding: 10px ${(props) => props.theme.sideSpace};
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

const LogoContainer = styled.div`    
  display: inherit;
  flex-grow: 1;
  position: relative;
  width: 200px;
  height: 60px;
  margin-right: 20px;
`

const LegalContainer = styled.div`
  display: inherit;
  align-items: inherit;
  flex-grow: 2;
  flex-wrap: inherit;
  height: 60px;

  .legal-image {
    position: relative; 
    width: 170px;
    height: inherit;
    margin-right: 10px;
  }

  .legal-text {
    display: inherit;
    align-items: center;
    font-size: 10px;
    width: 220px;
    height: inherit;
  }
`

const SearchContainer = styled.div` 
  margin-right: 20px;
  display: inherit;
  flex-grow: 0;
  height: 60px;

`

const MenuContainer = styled.div` 
  cursor: pointer; 
  height: 60px;
  align-items: center;
  display: inherit;
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
    padding: 6px 15px;
    border-radius: 10px;
    font-size: 17px;
  }

  a:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: #fff;
  }
`

export default Header
