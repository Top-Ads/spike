import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { removeLikeSlotContext } from '../lib/contexts'
import { GlobalStyle, styledTheme } from '../lib/theme'
import { Category } from '../lib/utils/constants'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18n'
import { showTranslations } from 'translation-check'
import i18next from 'i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface IProps {
	Component: FunctionComponent
	pageProps: any
}

export default function App({ Component, pageProps }: IProps) {
	const router = useRouter()

	const translationUIPath = '/?showtranslations'

	useEffect(() => {
		if (localStorage.getItem(Category.FAVORITES) === null)
			localStorage.setItem(Category.FAVORITES, '[]')

		if (router.asPath === translationUIPath) showTranslations(i18next)
	}, [])

	const ContextProvider: FunctionComponent = ({ children }) => {
		const [removeLikeSlotId, setRemoveLikeSlotId] = useState('')

		return (
			<Fragment>
				<removeLikeSlotContext.Provider
					value={{ removeLikeSlotId, setRemoveLikeSlotId }}
				>
					{children}
				</removeLikeSlotContext.Provider>
			</Fragment>
		)
	}

	return (
		<ContextProvider>
			<ThemeProvider theme={styledTheme}>
				<Head>
					{/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
					<script
						async
						src='https://www.googletagmanager.com/gtag/js?id=G-5VB78R4HV0'
					></script>
					<script
						async
						src='https://www.googletagmanager.com/gtag/js?id=G-046QNHB3VY'
					></script>

					<script
						dangerouslySetInnerHTML={{
							__html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-046QNHB3VY');
                        `,
						}}
					/>
					{/* <!-- END - Google Analytics --> */}
				</Head>
				<I18nextProvider i18n={i18n}>
					<GlobalStyle />
					<Component {...pageProps} />
				</I18nextProvider>
			</ThemeProvider>
		</ContextProvider>
	)
}
