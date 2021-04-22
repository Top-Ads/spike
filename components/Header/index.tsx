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
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'

type NavProps = {
  expand: boolean
};

const Header = () => { 
  
  const [showNav, setShowNav] = useState<boolean>(false)
  const [showTextInput, setShowTextInput] = useState<boolean>(false)
  const [overlay, setOverlay] = useState<boolean>(false)

  const handleMenu = () => setShowNav(!showNav)
  
  const handleFavorites = () => null

  const handleNotifications = () => null

  return (
    <Fragment>
      <header>
        <Main>

          { showTextInput ? 
              <Fragment>
                { showTextInput ? <Overlay onClick={() => setShowTextInput(!showTextInput)}/> : '' }
                <TextInput
                      autoFocus={true}
                      searchIcon={true}
                      placeholder="cerca una slot, un casino..."/>
              </Fragment> :

              <TopHeader>

                <Logo>
                <div className="logo-image">
                  <Image
                    alt="Casino Legal Information"
                    src="/svg/logo-spike.svg"
                    layout="responsive"
                    priority={true}
                    width={150}
                    height={60}
                  />
                  </div>
                </Logo>
                
                { overlay ? <Overlay onClick={() => setOverlay(!overlay)}/> : '' }

                <Action>
                  <Search>
                    <div className="text-input">
                      <TextInput 
                        width="30ch" 
                        searchIcon={true}
                        placeholder="cerca una slot, un casino..."
                        handleOnFocus={() => setOverlay(true)}/>
                    </div>

                    <SearchIcon 
                      className="search-icon icons" 
                      onClick={() => setShowTextInput(true) }/> 
                  </Search>
              
                  <NotificationsNoneIcon className='icons' onClick={handleNotifications}/>

                  <FavoriteBorderIcon className='icons' onClick={handleFavorites}/>
                  {showNav ? 
                    <CloseIcon className='icons' onClick={handleMenu}/> : <MenuIcon className='icons' onClick={handleMenu}/> }
                </Action>

              </TopHeader>
          }       

          <Nav expand={showNav}>
              <Divider color={'#fff'}/>

              <Link href={'/'}>
                  <a><Button>Home</Button></a>
              </Link>

              <Link href={'/video'}>
                  <a><Button>Video</Button></a>
              </Link>

              <Link href={'/slots'}>
                  <a><Button>Giochi Slot Machine Gratis</Button></a>
              </Link>
           </Nav> 

        </Main>
      </header>
    </Fragment>
  )
}

const Main = styled.div`    
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-image: linear-gradient(180deg, ${({theme}) => theme.colors.backGround} 0%, ${({theme}) => theme.colors.gradient} 50%);
  border-radius: 0px 0px 20px 20px;
  box-shadow: ${({theme}) => theme.button.boxShadowX};
  color: ${({theme}) => theme.text.color.primary};
  padding: 10px 10%;

  @media ${device.tablet} {
    position: fixed;
    top: 0px;
    width: fill-available;
    z-index: 999;
  }
`

const TopHeader = styled.div`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 100%;
  margin: 5px 0px;
`

const Logo = styled.div`    
  display: inherit;
  flex-grow: 1;
  position: relative;

  .logo-image {
    display: inherit;
    flex-direction: column;
    width: 150px;

    @media ${device.mobileL} {
      width: 110px;
    }
  }
`

const Overlay = styled.div`    
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.25);
  z-index: 99;
`

const Search = styled.div` 
  display: inherit;

  .search-icon {
    display: none;
  }

  @media ${device.mobileL} {
    .text-input {
      display: none;
    }
    .search-icon {
      display: flex;
    }
  } 
`

const Action = styled.div` 
  cursor: pointer; 
  align-items: center;
  display: inherit;
  
  .icons {
    color: ${({theme}) => theme.text.color.primary};
    margin-left: 5px;
    font-size: 40px;

    @media ${device.mobileM} {
      font-size: 35px;
    }

    @media ${device.mobileS} {
      font-size: 30px;
    }
  }  
`

const Nav = styled.nav<NavProps>`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  flex-grow: 0;
  justify-content: flex-start;
  height: auto;
  max-height: ${({expand}) => expand ? "120px" : "0px"};
  transition: max-height 0.2s linear; 
  overflow: ${({expand}) => expand ? "visible" : "hidden"};
`

const Button = styled.div`
    color: ${({theme}) => theme.text.color.primary};
    margin: 0px 10px;
    padding: 10px 15px;
    font-weight: bold;

    &:hover {
      color: ${({theme}) => theme.colors.backGround};
      background-color: #fff;
    }
`

export default Header