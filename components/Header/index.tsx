import React, { Fragment, FunctionComponent, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import CustomTextField from '../Inputs/Textfield'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import Link from 'next/link'
import { device } from '../../utils/device'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import { Category } from '../../utils/constants'
import FavoriteCard from '../Cards/FavoriteCard'
import ShoppingCard from '../Cards/ShoppingCard'
import { DislikedSlotContext } from '../../contexts'
import { APIKEY, APPLICATIONID, CDN } from '../../public/environment'
import { SearchIndex } from 'algoliasearch/lite'
import SearchHit from '../SearchHit'
import DialogSlider from '../Modals/DialogSlider'
import { AlgoliaSearchData, Slot } from '../../interfaces'
import NavBrowserProvider from '../NavProvider/BrowserView'
import NavMobileProvider from '../NavProvider/MobileView'

type PageProps = {
  isBrowserView: boolean
}

const Header: FunctionComponent<PageProps> = ({isBrowserView}) => { 
  
  const [showNav, setShowNav] = useState<boolean>(isBrowserView)
  const [showTextInput, setShowTextInput] = useState<boolean>(false)
  const [overlay, setOverlay] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [category, setCategory] = useState<string>('')
  const [item, setItem] = useState<any[]>([])
  const [algoliaIndex, setAlgoliaIndex] = useState<SearchIndex | undefined>(undefined)
  const [searchResult, setSearchResult] = useState<AlgoliaSearchData[]>([])

  const  {setSlotDislikedId}  = useContext(DislikedSlotContext)

  const handleMenu = (event: React.MouseEvent) => { 
    event.stopPropagation()
    
    setShowNav(!showNav) 
  }

  const handleDialogSlider = (category: string) => {
    setCategory(category)
    setOpenDialog(!openDialog)
  }

  const deleteItem = (id: string) => {

    setSlotDislikedId(id)

    const newItems: any[] = item.filter( (card: Slot) => {
          return card.id !== id
    })

    if (newItems) {
      setItem(newItems)
      localStorage.setItem(Category.FAVORITES, JSON.stringify(newItems))
    }
  }

  const handleOnSearch = async (searchItem: string) => {
    
    if (!searchItem.length) {
      setSearchResult([])
      return
    }
    else {
      const results = await algoliaIndex!.search<AlgoliaSearchData[] | undefined>(searchItem, { 
        filters: `country: it`,
      })

      setSearchResult(results.hits.map((obj: any) => {
        return {
            name: obj.name,
            type: obj.type,
            slug: obj.slug,
            country: obj.country,
            link: obj.link,
            image: obj.image,
            bonuses: obj.link,
            rating: obj.rating
        }
      }))
    }
  }

  useEffect(() => {
    if (algoliaIndex === undefined) {
      import('algoliasearch').then().then(algoliasearch => {
          const client = algoliasearch.default(APPLICATIONID, APIKEY)
          const index = client.initIndex('entities')
          setAlgoliaIndex(index)
      })
    }
  }, [])

  useEffect(() => {
    if (openDialog) {
      if (category === Category.FAVORITES) {
        const currentItem = localStorage.getItem(category)
        if (currentItem) {
          setItem(JSON.parse(currentItem))
        }
      }
      
      if (category === Category.SHOPPINGCART) {
         setItem([])
      }
    }
  }, [openDialog, category])

  return (
    <Fragment>
        <Main>

          { showTextInput ? 
              <Fragment>
                <Overlay onClick={() => setShowTextInput(!showTextInput)}/>
                <div className="textFieldMobile">
                  <CustomTextField
                        zIndex={100}
                        onChange={handleOnSearch}
                        autoFocus
                        searchIcon
                        borderRadius={'20px'}
                        placeholder="Cerca una slot, un casino..."/>
                  <SearchHit data={searchResult}/>
                </div>
              
              </Fragment> :

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

                { overlay ? <Overlay onClick={() => setOverlay(!overlay)}/> : '' }

                <Actions>
                  <Search>
                    <div className="textFieldDesktop">
                      <CustomTextField
                        zIndex={100}
                        onChange={handleOnSearch}
                        width="30ch" 
                        borderRadius={'20px'}
                        searchIcon
                        placeholder="Cerca una slot, un casino..."
                        handleOnFocus={() => setOverlay(true)}/>

                        { overlay ? <SearchHit data={searchResult}/> : '' }
                    </div>

                    <SearchIcon className="search-icon icons" onClick={() => setShowTextInput(true) }/> 
                  </Search>
              
                  <ShoppingCartOutlinedIcon className='icons' onClick={ () => handleDialogSlider(Category.SHOPPINGCART)} />

                  <FavoriteBorderIcon className='icons' onClick={ () => handleDialogSlider(Category.FAVORITES)} />
                  {showNav ? 
                    <CloseIcon className='icons' onClick={handleMenu}/> 
                  : <MenuIcon className='icons' onClick={handleMenu}/> }
                </Actions>

              </TopHeader>
          }     
          
          { isBrowserView ? <NavBrowserProvider showNav={showNav} setShowNav={setShowNav}/> : 
          <NavMobileProvider showNav={showNav} setShowNav={setShowNav}/>}
            
          <DialogSlider
            category={category} 
            open={openDialog} 
            setOpen={setOpenDialog}
            content={item.map( (element: Slot, index: number) => 
              category === Category.FAVORITES ? 
              <FavoriteCard key={index} data={element} deleteItem={deleteItem} /> : <ShoppingCard key={index} data={element}/> )}
          />

        </Main>
    </Fragment>
  )
}

const Main = styled.div`    
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-image: linear-gradient(180deg, ${({theme}) => theme.colors.background} 0%, ${({theme}) => theme.colors.gradient} 50%);
  border-radius: 0px 0px 20px 20px;
  box-shadow: ${({theme}) => theme.button.boxShadowX};
  color: ${({theme}) => theme.text.color.primary};
  padding: 5px 10%;

  @media ${device.tablet} {
    position: fixed;
    top: 0px;
    width: fill-available;
    z-index: 100;
  }

  @media (orientation: landscape) {
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
  width: 120px;

  @media ${device.mobileL} {
    width: 100px;
  }
`

const Overlay = styled.div`    
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.25);
  z-index: 100;
`

const Search = styled.div` 
  display: inherit;

  .search-icon { display: none; }

  @media ${device.mobileL} {
    .textFieldDesktop { display: none; }
    .search-icon { display: flex; }
  } 
`

const Actions = styled.div` 
  cursor: pointer; 
  align-items: center;
  display: inherit;
  flex-grow: 2;

  justify-content: flex-end;

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

export default Header