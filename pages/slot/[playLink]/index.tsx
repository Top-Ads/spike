import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../../components/Layout'

const Slot = () => {

    const router = useRouter()

    const [url, setUrl] = useState<string>('')
    const [name, setName] = useState<string>('')

    useEffect(() => {
        setUrl(String(router.query.playLink))
        setName(String(router.query.name))
    }, [router.query])

    return (
        <Layout title="Slot"> 
            <Main>
                <h2>{name}</h2>
                <IframeContainers src={url}></IframeContainers>
            </Main>
        </Layout>       
    )
}
 
const Main = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`

const IframeContainers = styled.iframe`
    width:80vw;
    height:80vh;
`

export default Slot
