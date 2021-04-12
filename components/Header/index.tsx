import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Divider from '../Divider'
import TextInput from '../Inputs/Textfield'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import Link from 'next/link'
import { device } from '../../utils/device'
import SearchIcon from '@material-ui/icons/Search'

type NavProps = {
  expand: boolean
};

const Header = () => { 
  
  const [showNav, setShowNav] = useState<boolean>(false)

  const handleMenu = () => setShowNav(!showNav)
  
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
                  src="/png/it-legal-logos.png"
                  layout="responsive"
                  priority={true}
                  width={295}
                  height={56}
                />
              </div>
              <div className="legal-text">
                <p>Il gioco e vietato ai minori e puo causare dipendenza patologica - probabilita di vincita</p>
              </div>
            </LegalContainer>

            <SearchContainer>
              <div className="text-input">
                <TextInput searchIcon={true} placeholder="cerca una slot, un casino..."/>
              </div>

              <SearchIcon className="search-icon" style={{ color: '#ec564', fontSize: '40px', cursor: 'pointer'}}/> 

            </SearchContainer>
           
            <MenuContainer>
              {showNav ? 
                   <CloseIcon className='icons' onClick={handleMenu}/> :
                   <MenuIcon className='icons' onClick={handleMenu}/> }
            </MenuContainer>
          
          </MainContainer>
          
          <Fragment>
            <NavContainer expand={showNav}>
            <Divider color={'#fff'}/>

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

        </HeaderContainer>
      </header>
    </Fragment>
  )
}

const HeaderContainer = styled.div`    
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-image: linear-gradient(${({theme}) => theme.colors.primary}, ${({theme}) => theme.colors.gradient});
  border-radius: ${({theme}) => theme.header.borderRadius};
  box-shadow: 0px 0px 10px 10px rgb(0 0 0 / 40%);
  color: ${({theme}) => theme.text.color};
  padding: 10px 10%;
`

const MainContainer = styled.div`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 100%;
`

const LogoContainer = styled.div`    
  display: inherit;
  flex-grow: 1;
  position: relative;
  height: 60px;
  width: 100px; 
  
  @media ${device.tablet} {
    height: 40px;
  }
`

const LegalContainer = styled.div`
  display: inherit;
  align-items: inherit;
  flex-grow: 2;
  flex-wrap: inherit;
  justify-content: center;

  .legal-image {
    width: 170px;
    margin-right: 15px;
  }

  .legal-text {
    display: inherit;
    align-items: center;
    font-size: 10px;
    width: 220px;
    font-family: Montserrat-light;
     p { color: #fff; }
  }

  @media ${device.tablet} {
    display: none;
  } 
`

const SearchContainer = styled.div` 
  display: inherit;
  flex-grow: 0;
  margin: auto 10px;

  .search-icon {
    display: none;
  }

  @media ${device.tablet} {
    .text-input {
      display: none;
    }
    .search-icon {
      display: flex;
    }
  } 
`

const MenuContainer = styled.div` 
  cursor: pointer; 
  align-items: center;
  display: inherit;
  
  .icons {
    color: #fff;
    font-size: 40px;
  }  
`

const NavContainer = styled.nav<NavProps>`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  flex-grow: 0;
  justify-content: center;
 
  height: auto;
  max-height: ${({expand}) => expand ? "120px" : "0px"};
  
  overflow: hidden;
  transition: max-height 0.2s linear;

  a { 
    color: #fff;
    margin: 0px 10px;
    padding: 8px 15px;
    border-radius: 10px;
    font-size: 17px;
    font-weight: bold;
  }

  a:hover {
    color: ${({theme}) => theme.colors.primary};
    background-color: #fff;
  }
`

export default Header
