import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { CDN } from '../../public/environment'
import AquaClient from '../api/graphql/aquaClient'
import { BONUSES } from '../api/graphql/queries/bonuses'
import GridCards from '../../components/GridCards'
import { GridType } from '../../utils/constants'
import BonusCard from '../../components/Cards/BonusCard'
import FreqentlyAsked from '../../components/FrequentlyAsked'
import { device } from '../../utils/device'
import FreeBonusList from '../../components/FreeBonusList'
import Article from '../../components/Article'
import Divider from '../../components/Divider'
import { squadTeam } from '../../assets/mockSquadTeam'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../interfaces'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

type PageProps = {
    freeBonusData: Bonus [],
    topBonusData: Bonus [],
  }
  

const SquadPage: FunctionComponent<PageProps> = ({freeBonusData, topBonusData}) => {
        
    return (
        <Layout title="Squad">
            <div className="space-around">
                {squadTeam.sort((a, b) => a.name > b.name ? 1 : -1).map( (member, index) => 
                    <Main key={index}>
                        <Container>
                            <Resume>
                                <Name>{member.name}</Name>
                                <Info dangerouslySetInnerHTML={{__html:member.info}} className="resume-info"/>
                            </Resume>

                            <Profile> 
                                <Thumbnail>
                                    <LazyLoad height={200} offset={200}>
                                        <Image
                                            alt={member.name}
                                            src={`${CDN}/${member.thumbnail}`}
                                            layout="responsive"
                                            priority={true}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 

                                <SocialLinks>
                                        {member.social.facebook && <a href={member.social.facebook}><FacebookIcon/></a>}
                                        {member.social.instagram && <a href={member.social.instagram}><InstagramIcon/></a>}
                                </SocialLinks>

                            </Profile> 
                        </Container>
                        { index < squadTeam.length - 1 ? <Divider/> : '' }
                    </Main>
                )}

            </div>

            <FreqentlyAsked/>

            <div className="space-around">

                <Grids>
                    <GridCards
                        type={GridType.TOPBONUS} 
                        content={ topBonusData.map( (bonus) => 
                            <BonusCard key={bonus.id} data={bonus}/>
                        )}
                        label="I top bonus dei casinò online in Italia."
                        AlignItem={"center"}
                        xs={12} sm={4} md={4}
                        showIndex
                        showBoxShadow
                        bgColor="#fff"
                        spacing={2}/>
                </Grids>

                <Divider/>  

                <Section>
                    <div className="article"><Article/></div>

                    <div className="free-bonus-list">
                        <FreeBonusList data={freeBonusData.slice(0, 5)} label="I MIGLIORI CASINÒ"/>
                        <FreeBonusList data={freeBonusData.slice(5, 10)} label="I MIGLIORI CASINÒ CON GIRI GRATIS"/>
                    </div>
                </Section>
             </div>

        </Layout>
    )
} 

const Main = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
`
const Container = styled.div`
   display: inherit;
   flex-direction: row;
   flex-wrap: wrap;
`

const Resume = styled.div`
    display: inherit;
    flex-direction: column;
    flex-grow: 2;
    width: min-content;

    .resume-info {
        width: 90%;
        @media ${device.mobileL} {
            width: 100%;
        }
    }

    @media ${device.mobileL} {
        width: 100%;
    }
`

const Name = styled.span`
    font-weight: bold;
    font-size: 22px;
`

const Info = styled.p`
    @media ${device.mobileL} {
        width: 100%;
    }
`

const Profile = styled.div`
    flex-grow: 1;
    margin: auto;
`

const Thumbnail = styled.div`
    height: 220px;
    overflow: hidden;
    border: 5px solid ${({theme}) => theme.colors.background};
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.background};

    @media ${device.laptop} {
        height: auto;
    }
`

const SocialLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 5px;

    a { color: ${({theme}) => theme.text.color.secondary}; }
`

const Grids = styled.div`
    margin: 30px 0px;
`

const Section = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;

  @media ${device.mobileL} {
    flex-wrap: wrap-reverse;
  }

  .article {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    width: 300px;
    padding: 10px;
  }

  .free-bonus-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: min-content;
  }
`

export async function getStaticProps() {
 
    const aquaClient = new AquaClient()
  
    const freeBonusRequest =  await aquaClient.query({ 
      query: BONUSES, 
      variables: { countryCode: 'it', limit: 10, start: 0 } })
      
    const topBonusRequest = await aquaClient.query({ 
      query: BONUSES, 
      variables: { countryCode: 'it', limit: 3, start: 0 } })
  
    return {
      props: {
        freeBonusData: freeBonusRequest.data.data.bonuses,
        topBonusData: topBonusRequest.data.data.bonuses,
      }
    }
}
  
export default SquadPage
