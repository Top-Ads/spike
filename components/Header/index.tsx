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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

type NavProps = {
  expand: boolean
};

const Header = () => { 
  
  const [showNav, setShowNav] = useState<boolean>(false)
  const [showSearchMobile, setShowSearchMobile] = useState<boolean>(false)
  const [overlay, setOverlay] = useState<boolean>(false)

  const handleMenu = () => setShowNav(!showNav)
  
  const handleFavorites = () => null

  return (
    <Fragment>
      <header>
        <HeaderContainer>

          { showSearchMobile ? 

              <Fragment>
                <OverlayContainer/> 
                <TextInput
                      autoFocus={true}
                      width="100%" 
                      searchIcon={true}
                      placeholder="cerca una slot, un casino..."
                      handleOnBlur={() => setShowSearchMobile(false)}/>
              </Fragment> :

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

                { overlay ? <OverlayContainer/> : '' }
                
                <SearchContainer>
                  <div className="text-input">
                    <TextInput 
                      searchIcon={true}
                      placeholder="cerca una slot, un casino..."
                      handleOnFocus={() => setOverlay(true)}
                      handleOnBlur={() => setOverlay(false)}/>
                  </div>

                  <SearchIcon 
                    className="search-icon" 
                    style={{ color: '#ec564', fontSize: '40px', cursor: 'pointer'}}
                    onClick={() => setShowSearchMobile(true)}/> 

                </SearchContainer>
              
                <MenuContainer>
                  <FavoriteBorderIcon className='icons' onClick={handleFavorites}/>
                  {showNav ? 
                    <CloseIcon className='icons' onClick={handleMenu}/> : <MenuIcon className='icons' onClick={handleMenu}/> }
                </MenuContainer>

              </MainContainer>
          
          }       

          <NavContainer expand={showNav}>
              <Divider color={'#fff'}/>

              <Link href={'/'}>
                  <a><ButtonContainer>Home</ButtonContainer></a>
              </Link>

              <Link href={'/video'}>
                  <a><ButtonContainer>Video</ButtonContainer></a>
              </Link>

              <Link href={'/slots'}>
                  <a><ButtonContainer>Giochi Slot Machine Gratis</ButtonContainer></a>
              </Link>
           </NavContainer> 

        </HeaderContainer>
      </header>
    </Fragment>
  )
}

const HeaderContainer = styled.div`    
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-image: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 0%, ${({theme}) => theme.colors.gradient} 50%);
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 0px 10px 10px rgb(0 0 0 / 40%);
  color: ${({theme}) => theme.text.color.primary};
  padding: 10px 10%;
`

const MainContainer = styled.div`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 100%;
  margin: 5px 0px;
`

const LogoContainer = styled.div`    
  display: inherit;
  flex-grow: 1;
  position: relative;
  width: 100px; 
  height: 60px;

  @media ${device.tablet} {
    height: 40px;
  }
`

const LegalContainer = styled.div`
  display: inherit;

  @media ${device.tablet} {
    display: none;
  }

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
    width: 160px;
     p { color: ${({theme}) => theme.text.color.primary}; }
  }
`

const OverlayContainer = styled.div`    
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.25);
  z-index: 99;
`

const SearchContainer = styled.div` 
  display: inherit;
  flex-grow: 0;

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
    color: ${({theme}) => theme.text.color.primary};;
    font-size: 40px;

    @media ${device.mobileL} {
      font-size: 35px;
    }

    margin-left: 5px;
  }  
`

const NavContainer = styled.nav<NavProps>`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  flex-grow: 0;
  justify-content: flex-start;
  height: auto;
  max-height: ${({expand}) => expand ? "120px" : "0px"};
  transition: max-height 0.2s linear; 
  overflow: ${({expand}) => expand ? "visible" : "hidden"};;
`

const ButtonContainer = styled.div`
    color: ${({theme}) => theme.text.color.primary};
    margin: 0px 10px;
    padding: 10px 15px;
    font-weight: bold;

    &:hover {
      color: ${({theme}) => theme.colors.primary};
      background-color: #fff;
    }
`

export default Header
