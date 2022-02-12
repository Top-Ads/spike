import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { device } from '../../lib/utils/device'

const PrivacyPolicyPage = () => { 
    
    const { t } = useTranslation()

    return (
        <Layout title="Casino Squad | Privacy">  
            <Head>
                <meta 
                property="og:description" 
                content="Informativa sulla privacy" 
                key="description"/>
            </Head>

            <Main className="layout-container">

            <h2><strong>{t("Privacy Policy")}</strong></h2>

            <p>

            {t(" According to The Data Protection Act, specifically Chapter 440 of the Laws of Malta,")} 
            {t("and with the European Union Directive 2002/58/EC which concerns processing")} 
            {t(" personal data and safeguarding privacy in electronic communications sector, it is possible to highlight the privacy practices used in this website. ")}
            <br/> <br/>
            {t("Precisely, these ground rules are used as a basis for our users and visitors, and they have been matured because of the continuous")} 
            {t("evolution of the Internet technologies, which are rapidly changing, as well as the guidelines taken into consideration. ")} 
            {t("Every change will be certainly published and explained in this page. So, we suggest you to often check on the website,")} 
            {t("in order to see if there have been any changes. If the changes taken into account concern a material departure from our")} 
            {t("actual guidelines with respect to personal information, it will be our commitment to post them in this page thirty days prior to taking effect and to send")} 
            {t("them via email to all of our registered users. However, we are not liable for the content or private policies of webpages to which we might link. ")} 
            </p>

            <h3><strong>{t("Information acquired")} </strong></h3>        
            <ul>
                <li>{t("Registration : During the registration process, prior to activating your account, you are required to supply a unique email address. ")}</li>
                <li>{t("IP Addresses : We also log IP addresses, or the location of your computer on the Internet, for systems administration and")} 
                {t("troubleshooting purposes. We do not use IP address logs to track your session or your behavior on our site. ")}</li>
                <li>{t("Cookies : When one visits our website, a cookie may be sent to this person. A cookie is a small piece of data sent from a")} 
                {t("website and stored in a user's web browser while the user is browsing our website. Every time the user loads the website,")} 
                {t("the browser sends the cookie back to the server to notify the website of the user's previous activity. Your browser sends")} 
                {t("these cookies back to the website every time you visit the site again, so it can recognize you and can customize what you")} 
                {t("see on the screen according to your registered preferences. You are not obliged to accept cookies and most browsers allow you to turn off cookies. ")} 
                {t("However, certain cookies are essential for the functioning of the website, thus disabling them may hinder the full functioning of the website. ")}</li>
            </ul>

            <h3><strong>{t("For what purpose are the informations acquired used?")}</strong></h3>        
            
            <ul>
                <li> {t("Statistical Analysis")} :
                {t("We may perform statistical analyses of user behavior. In this statistical analyses, we will disclose information to third parties")} 
                {t("only in aggregate form, meaning any process in which information is gathered and expressed in a summary form, for purposes such as")} 
                {t("statistical analysis. Personal information about you as an individual will not be provided to any third party without your consent. ")}</li>

                <li>{t("Google Analytics : Through Google Analytics we determine how often users visit our site, what pages they visit when they do so,")} 
                {t("and what other sites they used prior to coming to this site. We use the information we get from Google Analytics only to improve this site. ")} 
                {t("Google Analytics collects only the IP address assigned to you on the date you visit this site, rather than your name or other identifying information. ")} 
                {t("We do not combine the information collected through the use of Google Analytics with personally identifiable information. ")} 
                {t("Although Google Analytics plants a permanent cookie on your web browser to identify you as a unique user the next time you visit this site,")} 
                {t("the cookie cannot be used by anyone but Google. Google’s ability to use and share information collected by Google Analytics about your")} 
                {t("visits to this site is restricted by the Google Analytics Terms of Use and the Google Privacy Policy. You can prevent Google Analytics from")} 
                {t("recognizing you on return visits to this site by disabling cookies on your browser. ")}</li>

                <li>{t("Email : We use email links located in our contact us page to allow you to contact us directly with any questions or comments you may have. ")} 
                {t("We will use your email address to respond directly to these questions or comments. ")}</li>

                <li>{t("Information Security : We use email links located in our contact us page to allow you to contact us directly with any questions or comments you may have. ")} 
                {t("To prevent unauthorized access, maintain data accuracy, and ensure the appropriate use of information, we have put in")} 
                {t("place appropriate physical, electronic, and managerial procedures to protect the information we collect online. ")}</li>

                <li>{t("Requirements for Processing. ")}</li>
            </ul>
           
            <p>
           {t(" It’s our responsibility to ensure that:")}
            </p>

            <ul>
                <li>{t("Personal data is processed adequately and in accordance to law. ")}</li>
                <li>{t("Personal data is always handled according to group practice. ")}</li>
                <li>{t("Personal data is only gathered for specific, explicitly stated and lawful purposes. ")}</li>
                <li>{t("Personal data is not handled for any aim that is not consistent with the aim for which the information is gathered. ")}</li>
                <li>{t("Personal data is not handled for any aim that is not consistent with the aim for which the information is gathered. ")}</li>
                <li>{t("The collection of personal data for historical, statistical or scientific aims should not be observed as incompatible with")}
                     {t("the aims for which the information was collected. ")}</li>
                <li>{t("Personal data that is handled is acceptable and admissible to the purposes of the processing; no more personal data than")} 
                    {t("the ones absolute necessary for the purposes of processing are processed. ")}</li>
                <li>{t("Personal data is collected precisely and up to date; All reasonable measures are adopted to complete, revise, block or delete incomplete or incorrect data. ")}</li>
                <li>{t("No personal data is kept in the database for a period longer than necessary. ")}</li>
                <li>{t("Personal data is not lost. ")}</li>
            </ul>

            <p>
        
            {t("In cases where the law does not require otherwise, we will only collect personal information after having received your consent. ")} 
            {t("It is requested that explicit consent is given in order to allow us to process your data. ")} 
            {t("In order to secure your personal data, we will never sell personal data without the explicit written approval of the person to whom the data relates. ")} 
            {t("Our partners and sponsors should never be held responsible for any unauthorized deeds of third parties or for data errors in transmission not occasioned by itself. ")} 
            </p>

            <h3><strong>{t("Data exchange")}</strong></h3>        
            <p>
            {t("All the informations gathered are shared, in any form, with partners and advertisers. ")} 
            {t("Except under specific circumstances explained in Compliance with Legal Process below,")}
            {t("we won’t discharge your personal information as single individual with third parties. ")} 
            {t("Only on request, we will send to you all your personal information related to your subscription on the email address associated with the file taken into account. ")} 
            <br/> <br/>

            {t("In case in which the data subject reveals the data controller that he or she is not allowed to gather information regarding direct marketing,")} 
            {t("this should be respected, according to the arrangements of the Data Protection Act, Chapter 440 of the Laws of Malta. ")} 
            {t("It is duty of the controller to appropriately inform the subject about his or her right to oppose such processing, without any additional cost. ")} 
            </p>

            <h3><strong>{t("Conformity with legal Process")}</strong></h3>        
            <p>
            {t("Taken into account the Data Protection Act, we might reveal personal information if we are allowed to do so by law or if we believe that such action is fundamental")} 

            </p>

            <ol>
                <li>{t("to observe the law and the legal process. ")}</li>
                <li>{t("preserve and defend our rights and property. ")}</li>
                <li>{t("secure our website against any unauthorized use of its content. ")}</li>
                <li>{t("protect user’s personal security and property or the public (this basically means that if you reveal fake information. ")}</li>
                <li>{t("you try to affect someone else, your personal information may be disclosed in order to be able to investigate your actions). ")}</li>
            </ol>
        
            <p>
            <br/> 

            {t("Data may be released to prevent, investigate, detect, and prosecute criminal offences or breaches of ethics")} 
            {t("for regulated professions by abusing the functions of the website to commit illegal acts, such as, but not restricted to threats that result in criminal liability and other offenses that lead to criminal liability. ")}
            <br/> <br/>

            {t("The processing of personal data may also be carried out without the consent of the data subject in the following circumstances:")} 
            {t("The processing is necessary for the performance of a contract to which the data subject is a party or to take steps")} 
            {t("at the request of the data subject before entering into a contract;")}
            <br/> <br/>

            {t("Processing is necessary for the performance of a task that is in the public interest or for the exercise of")}
            {t("official authority vested in the controller or in a third party whom the data is disclosed to;")}
            <br/> <br/>

            {t("The processing is necessary for a purpose that relates to the legitimate interests of the controller or such a")} 
            {t("third party to whom personal data is provided, unless this interest is outweighed by the need to safeguard the rights")} 
            {t(" and freedoms of the data subject, and in particular the right to privacy. ")}

            </p>

            <h3><strong>{t("Modifications and cancellations")}</strong></h3>        
            <p>
            {t("If you request it, we will:")}
            </p>

            <ul>
                <li>{t("Remove you and your personal information from our database")}</li>
                <li>{t("Cancelling your registration")}</li>
                <li>{t("Correct any personal information you claim is inaccurate")}</li>
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
