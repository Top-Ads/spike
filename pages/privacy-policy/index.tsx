import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { device } from '../../lib/utils/device'

const PrivacyPolicyPage = () => { 
    
    return (
        <Layout title="Casino Squad | Privacy">  
            <Head>
                <meta 
                property="og:description" 
                content="Informativa sulla privacy" 
                key="description"/>
            </Head>

            <Main className="layout-container">

            <h2><strong>Privacy Policy</strong></h2>

            <p>

            According to The Data Protection Act, specifically Chapter 440 of the Laws of Malta, 
            and with the European Union Directive 2002/58/EC which concerns processing 
            personal data and safeguarding privacy in electronic communications sector, it is possible to highlight the privacy practices used in this website.
            <br/> <br/>
            Precisely, these ground rules are used as a basis for our users and visitors, and they have been matured because of the continuous 
            evolution of the Internet technologies, which are rapidly changing, as well as the guidelines taken into consideration. 
            Every change will be certainly published and explained in this page. So, we suggest you to often check on the website, 
            in order to see if there have been any changes. If the changes taken into account concern a material departure from our 
            actual guidelines with respect to personal information, it will be our commitment to post them in this page thirty days prior to taking effect and to send 
            them via email to all of our registered users. However, we are not liable for the content or private policies of webpages to which we might link. 
            </p>

            <h3><strong>Information acquired </strong></h3>        
            <ul>
                <li>Registration : During the registration process, prior to activating your account, you are required to supply a unique email address.</li>
                <li>IP Addresses : We also log IP addresses, or the location of your computer on the Internet, for systems administration and 
                troubleshooting purposes. We do not use IP address logs to track your session or your behavior on our site.</li>
                <li>Cookies : When one visits our website, a cookie may be sent to this person. A cookie is a small piece of data sent from a 
                website and stored in a user's web browser while the user is browsing our website. Every time the user loads the website, 
                the browser sends the cookie back to the server to notify the website of the user's previous activity. Your browser sends 
                these cookies back to the website every time you visit the site again, so it can recognize you and can customize what you 
                see on the screen according to your registered preferences. You are not obliged to accept cookies and most browsers allow you to turn off cookies. 
                However, certain cookies are essential for the functioning of the website, thus disabling them may hinder the full functioning of the website.</li>
            </ul>

            <h3><strong>For what purpose are the informations acquired used?</strong></h3>        
            
            <ul>
                <li> Statistical Analysis :
                We may perform statistical analyses of user behavior. In this statistical analyses, we will disclose information to third parties 
                only in aggregate form, meaning any process in which information is gathered and expressed in a summary form, for purposes such as 
                statistical analysis. Personal information about you as an individual will not be provided to any third party without your consent.</li>

                <li>Google Analytics : Through Google Analytics we determine how often users visit our site, what pages they visit when they do so, 
                and what other sites they used prior to coming to this site. We use the information we get from Google Analytics only to improve this site. 
                Google Analytics collects only the IP address assigned to you on the date you visit this site, rather than your name or other identifying information. 
                We do not combine the information collected through the use of Google Analytics with personally identifiable information. 
                Although Google Analytics plants a permanent cookie on your web browser to identify you as a unique user the next time you visit this site, 
                the cookie cannot be used by anyone but Google. Google’s ability to use and share information collected by Google Analytics about your 
                visits to this site is restricted by the Google Analytics Terms of Use and the Google Privacy Policy. You can prevent Google Analytics from 
                recognizing you on return visits to this site by disabling cookies on your browser.</li>

                <li>Email : We use email links located in our contact us page to allow you to contact us directly with any questions or comments you may have. 
                We will use your email address to respond directly to these questions or comments.</li>

                <li>Information Security : We use email links located in our contact us page to allow you to contact us directly with any questions or comments you may have. 
                To prevent unauthorized access, maintain data accuracy, and ensure the appropriate use of information, we have put in 
                place appropriate physical, electronic, and managerial procedures to protect the information we collect online.</li>

                <li>Requirements for Processing.</li>
            </ul>
           
            <p>
            It’s our responsibility to ensure that:
            </p>

            <ul>
                <li>Personal data is processed adequately and in accordance to law.</li>
                <li>Personal data is always handled according to group practice.</li>
                <li>Personal data is only gathered for specific, explicitly stated and lawful purposes.</li>
                <li>Personal data is not handled for any aim that is not consistent with the aim for which the information is gathered.</li>
                <li>Personal data is not handled for any aim that is not consistent with the aim for which the information is gathered.</li>
                <li>The collection of personal data for historical, statistical or scientific aims should not be observed as incompatible with
                     the aims for which the information was collected.</li>
                <li>Personal data that is handled is acceptable and admissible to the purposes of the processing; no more personal data than 
                    the ones absolute necessary for the purposes of processing are processed.</li>
                <li>Personal data is collected precisely and up to date; All reasonable measures are adopted to complete, revise, block or delete incomplete or incorrect data.</li>
                <li>No personal data is kept in the database for a period longer than necessary.</li>
                <li>Personal data is not lost.</li>
            </ul>

            <p>
        
            In cases where the law does not require otherwise, we will only collect personal information after having received your consent. 
            It is requested that explicit consent is given in order to allow us to process your data. 
            In order to secure your personal data, we will never sell personal data without the explicit written approval of the person to whom the data relates. 
            Our partners and sponsors should never be held responsible for any unauthorized deeds of third parties or for data errors in transmission not occasioned by itself. 
            </p>

            <h3><strong>Data exchange</strong></h3>        
            <p>
            All the informations gathered are shared, in any form, with partners and advertisers. 
            Except under specific circumstances explained in Compliance with Legal Process below,
            we won’t discharge your personal information as single individual with third parties. 
            Only on request, we will send to you all your personal information related to your subscription on the email address associated with the file taken into account. 
            <br/> <br/>

            In case in which the data subject reveals the data controller that he or she is not allowed to gather information regarding direct marketing, 
            this should be respected, according to the arrangements of the Data Protection Act, Chapter 440 of the Laws of Malta. 
            It is duty of the controller to appropriately inform the subject about his or her right to oppose such processing, without any additional cost. 
            </p>

            <h3><strong>Conformity with legal Process</strong></h3>        
            <p>
            Taken into account the Data Protection Act, we might reveal personal information if we are allowed to do so by law or if we believe that such action is fundamental 

            </p>

            <ol>
                <li>to observe the law and the legal process.</li>
                <li>preserve and defend our rights and property.</li>
                <li>secure our website against any unauthorized use of its content.</li>
                <li>protect user’s personal security and property or the public (this basically means that if you reveal fake information.</li>
                <li>you try to affect someone else, your personal information may be disclosed in order to be able to investigate your actions).</li>
            </ol>
        
            <p>
            <br/> 

            Data may be released to prevent, investigate, detect, and prosecute criminal offences or breaches of ethics 
            for regulated professions by abusing the functions of the website to commit illegal acts, such as, but not restricted to threats that result in criminal liability and other offenses that lead to criminal liability.
            <br/> <br/>

            The processing of personal data may also be carried out without the consent of the data subject in the following circumstances: 
            The processing is necessary for the performance of a contract to which the data subject is a party or to take steps 
            at the request of the data subject before entering into a contract;
            <br/> <br/>

            Processing is necessary for the performance of a task that is in the public interest or for the exercise of 
            official authority vested in the controller or in a third party whom the data is disclosed to;
            <br/> <br/>

            The processing is necessary for a purpose that relates to the legitimate interests of the controller or such a 
            third party to whom personal data is provided, unless this interest is outweighed by the need to safeguard the rights 
            and freedoms of the data subject, and in particular the right to privacy.

            </p>

            <h3><strong>Modifications and cancellations</strong></h3>        
            <p>
            If you request it, we will:
            </p>

            <ul>
                <li>Remove you and your personal information from our database</li>
                <li>Cancelling your registration</li>
                <li>Correct any personal information you claim is inaccurate</li>
            </ul>

            </Main>
        </Layout>
    ) 
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
   

    h3 {
        margin-bottom: 0px;
    }
   
    li {
        margin-bottom: 15px;
        width: 80%;
        @media ${device.mobileL} {  width: auto;  }
    }
`

export default PrivacyPolicyPage
