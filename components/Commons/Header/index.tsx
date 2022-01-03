import React, { Fragment, FunctionComponent, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import Link from 'next/link'
import { device } from '../../../lib/utils/device'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Category } from '../../../lib/utils/constants'
import FavoriteCard from '../../Cards/FavoriteCard'
import ShoppingCard from '../../Cards/ShoppingCard'
import { removeLikeSlotContext } from '../../../lib/contexts'
import { CDN } from '../../../public/environment'
import DialogSlider from '../../Modals/SliderDialog'
import NavBrowserProvider from '../NavProvider/BrowserView'
import NavMobileProvider from '../NavProvider/MobileView'
import SearchDialog from '../../Modals/SearchDialog'
import { Slot } from '../../../lib/schemas'

type Props = {
  isBrowserView: boolean
}

const Header: FunctionComponent<Props> = ({isBrowserView}) => {
  
  const [showNav, setShowNav] = useState<boolean>(isBrowserView)
  const [openSearchDialog, setOpenSearchDialog] = useState<boolean>(false)
  const [openDialogSlider, setOpenDialogSlider] = useState<boolean>(false)
  const [category, setCategory] = useState<string>('')
  const [contentSlider, setContentSlider] = useState<any[]>([])

  const {setRemoveLikeSlotId} = useContext(removeLikeSlotContext)

  const handleMenu = (event: React.MouseEvent) => { 
    event.stopPropagation()
    
    setShowNav(!showNav) 
  }

  const handleDialogSlider = (category: string) => {
    setCategory(category)
    setOpenDialogSlider(!openDialogSlider)
  }

  const deleteItem = (id: string) => {

    setRemoveLikeSlotId(id)

    const newContent: any[] = contentSlider.filter( (card: Slot) => {
          return card.id !== id
    })

    if (newContent) {
      setContentSlider(newContent)
      localStorage.setItem(Category.FAVORITES, JSON.stringify(newContent))
    }
  }

  useEffect(() => {
    if (openDialogSlider) {
      if (category === Category.FAVORITES) {
        const currentItem = localStorage.getItem(category)
        if (currentItem) {
          setContentSlider(JSON.parse(currentItem))
        }
      }
    }
  }, [openDialogSlider, category])

  return (
    <Fragment>
        <Main>
          <TopHeader>

            <Link href={'/'}>
              <Logo>
                <Image
                  alt="Casino Squad"
                  src={`${CDN}/png/logo_header.png`}
                  layout="intrinsic"
                  priority={true}
                  width={640}
                  height={299}
                />
              </Logo>
            </Link>

            <Actions>
              <SearchIcon className="search-icon icons" onClick={() => setOpenSearchDialog(true) }/> 
          
              <FavoriteBorderIcon className='icons' onClick={ () => handleDialogSlider(Category.FAVORITES)} />
              { showNav ? 
                <CloseIcon className='icons' onClick={handleMenu}/> 
              : <MenuIcon className='icons' onClick={handleMenu}/> }
            </Actions>

          </TopHeader> 

          { isBrowserView ? <NavBrowserProvider showNav={showNav} setShowNav={setShowNav}/> : 
          <NavMobileProvider showNav={showNav} setShowNav={setShowNav}/>}
           
          <DialogSlider
            category={category} 
            open={openDialogSlider} 
            setOpen={setOpenDialogSlider}
            content={contentSlider.map( (content: Slot, index: number) => 
              category === Category.FAVORITES ? 
              <FavoriteCard key={index} data={content} deleteItem={deleteItem} /> : <ShoppingCard key={index} data={content}/> )}
          />

          <SearchDialog
            open={openSearchDialog}
            setOpen={setOpenSearchDialog}
          />

        </Main>
    </Fragment>
  )
}

const Main = styled.div`    
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-image: ${({theme}) => theme.palette.backgroundImage};;
  color: ${({theme}) => theme.text.color.white};
  padding: 5px 10%;
  overflow: hidden;
  
  @media ${device.tablet} {
    position: fixed;
    top: 0px;
    width: fill-available;
    z-index: 100;
    background-image: linear-gradient(180deg, rgb(226,185,109) 0%, rgb(224 198 133) 50%);
  }

  @media ${device.mobileL} {
    padding: 5px 5%;
  }
`

const TopHeader = styled.div`    
  display: inherit;
  flex-wrap: inherit;
  flex-direction: row;
  height: auto;
  width: 100%;
  margin: 5px 0px;
`

const Logo = styled.div`    
  display: inherit;
  position: relative;
  flex-direction: column;
  width: 130px;

  @media ${device.mobileL} {
    width: 100px;
  }
`

const Actions = styled.div` 
  cursor: pointer; 
  align-items: center;
  display: inherit;
  flex-grow: 2;

  justify-content: flex-end;

  .icons {
    color: ${({theme}) => theme.text.color.white};
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

export default Header