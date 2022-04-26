import React, { FunctionComponent, useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import StatsCard from '../../../components/Cards/StatsCard'
import Divider from '../../../components/Commons/Divider'
import GridLayout from '../../../components/Commons/GridLayout'
import CustumSelect from '../../../components/Commons/Inputs/Select'
import Layout from '../../../components/Layout'
import { GridType, LiveStats } from '../../../lib/utils/constants'
import axios from 'axios'
import { APISOCKET } from '../../../public/environment'
import { io, Socket } from 'socket.io-client'
import { Bonus, Spin, Stat } from '../../../lib/schemas'
import SpinsTable from '../../../components/Commons/Tables/SpinsTable'
import LazyLoad from 'react-lazyload'
import BonusTable from '../../../components/Commons/Tables/BonusTable'
import BonusCard from '../../../components/Cards/BonusCard'
import { device } from '../../../lib/utils/device'
import { mergeWithUpdate } from '../../../lib/utils/mergeWithUpdate'
import { getBonuses } from '../../../lib/graphql/queries/bonuses'
import { format } from 'date-fns'
import italianLocale from 'date-fns/locale/it'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

type PageProps = {
	statsData: Stat[]
	spinsData: Spin[]
	bonusesData: Bonus[]
}

const CrazyTimePage: FunctionComponent<PageProps> = ({
	statsData,
	spinsData,
	bonusesData,
}) => {
	const { t } = useTranslation()

	const [stats, setStats] = useState<Stat[]>(statsData)
	const [spins, setSpins] = useState<Spin[]>(spinsData)
	const [socket, setSocket] = useState<Socket | undefined>()
	const [timeFrame, seTimeFrame] = useState<string>('24h')
	const [lastUpdate, setLastUpdate] = useState<Date>(new Date(Date.now()))

	const fetchStatsData = async (timeFrame: string) => {
		const dataStataResponse = await axios.get(
			`${APISOCKET.CRAZYTIME}/api/data-for-the-last-hours/${timeFrame}`
		)
		setStats(dataStataResponse.data.stats.stats)
	}

	useEffect(() => {
		setSocket(
			io(APISOCKET.CRAZYTIME, {
				secure: true,
				rejectUnauthorized: false,
				transports: ['websocket'],
			})
		)

		return () => {
			socket && socket.disconnect()
		}
	}, [])

	useEffect(() => {
		if (socket) {
			socket.emit(timeFrame)
			socket.on(timeFrame, data => {
				setStats(data.stats.stats)

				setSpins(
					mergeWithUpdate(
						spins,
						data.spins.map((r: Spin) => {
							r.timeOfSpin = r.timeOfSpin - 1000 * 60 * 60 * 2
							return r
						})
					)
				)

				setLastUpdate(new Date(Date.now()))
			})
		}

		return () => {
			socket && socket.disconnect()
		}
	}, [socket])

	useEffect(() => {
		if (timeFrame) fetchStatsData(timeFrame)
	}, [timeFrame])

	return (
		<Layout title='Casino Squad | Statistiche Crazy Time Live , Verifica le Vincite'>
			<Head>
				<meta
					property='og:description'
					content='Gira la ruota di Crazy Time in real time i risultati recenti più vincenti'
					key='description'
				/>
			</Head>

			<div className='layout-container'>
				<Header className='intro-header'>
					<h2>
						{t(
							'Statistiche Crazy Time Live: Tutte le Estrazioni in Tempo Reale'
						)}
					</h2>

					<Intro>
						<p>
							{t(
								'Benvenuto sulla pagina dedicata alle Statistiche Live di Crazy Time. Qui puoi seguire in tempo reale le statistiche della ruota Crazy Time. Esamina le statistiche live per selezionare i numeri vincenti e scoprire Bonus incredibili.'
							)}

							<br />
							<br />

							{t(
								`Hai a disposizione i dati sulle estrazioni in diretta dalla ruota Crazy 
                                Time. In questa sezione puoi confrontare le probabilità teoriche 
                                rispetto ai numeri usciti realmente a questi Game Show.
                                Inoltre, hai a disposizione i dati sui numeri ritardatari, in modo da 
                                elaborare la tua strategia di gioco, oltre a informazioni che raccontano
                                la storia di questo gioco digitale.`
							)}
						</p>

						<Thumbnail>
							<LazyLoad height={548}>
								<Image
									alt={'Crazy Time statistiche'}
									src={`https://spike-images.s3.eu-central-1.amazonaws.com/crazy-time-stats_1c1293a185.jpeg`}
									layout='responsive'
									priority={true}
									sizes={'30vw'}
									quality={70}
									width={975}
									height={548}
								/>
							</LazyLoad>
						</Thumbnail>
					</Intro>

					<Divider />
				</Header>

				<Main>
					<StatsContainer>
						<Header className='stats-card-header'>
							<div>
								<h3>{t('Statistiche Crazy Time')}</h3>
								<span
									style={{ textTransform: 'capitalize' }}
									suppressHydrationWarning
								>
									{t('Ultimo Aggiornamento')}:{' '}
									{format(
										new Date(lastUpdate),
										'dd MMM yyyy • HH:mm',
										{ locale: italianLocale }
									).toString()}
								</span>
							</div>

							<CustumSelect setSelected={seTimeFrame} />
						</Header>
						<Divider />

						<GridContainer className={'stats-cards'}>
							<GridLayout
								gridType={GridType.STATS}
								content={stats.map(
									(stats: Stat, index: number) => (
										<StatsCard
											key={index}
											data={stats}
											timeFrame={timeFrame}
											type={LiveStats.CRAZYTIME}
										/>
									)
								)}
								AlignItem={'center'}
								xs={12}
								sm={3}
								md={3}
								showBoxShadow
								bgColor='#fff'
								spacing={3}
							/>
						</GridContainer>
					</StatsContainer>

					<br />

					<BonusContainer>
						<h3>{t('Puoi giocare alla CRAZY TIME QUI')}</h3>
						<div className='bonus-table'>
							<BonusTable data={bonusesData} />
						</div>

						<GridContainer className={'bonus-cards'}>
							<GridLayout
								gridType={GridType.BONUS}
								content={bonusesData.map(bonus => (
									<BonusCard key={bonus.id} data={bonus} />
								))}
								AlignItem={'center'}
								xs={12}
								sm={12}
								md={12}
								showIndex
								showBoxShadow
								bgColor='#fff'
								spacing={2}
							/>
						</GridContainer>
					</BonusContainer>

					<br />

					<SpinsContainer>
						<h3>{t('Storico degli Spin')}</h3>
						<SpinsTable
							data={spins}
							gameType={LiveStats.CRAZYTIME}
						/>
					</SpinsContainer>
				</Main>

				<Footer>
					<section>
						<h3>
							{t(
								'Consulta i numeri ritardatari della ruota Crazy Time'
							)}
						</h3>
						<p>
							{t(
								`Fra i Live Casinò Game Show, la ruota Crazy Time è di certo il gioco più popolare. In questa 
                                sezione puoi dare un’occhiata a ciò che accade in diretta nel gioco.
                                In più, è possibile anche visionare il numero di volte in cui si è verificata l’estrazione, in 
                                considerazione dell’intervallo di tempo della previsione.`
							)}
						</p>
					</section>

					<section>
						<h3>{t('Perché questi dati sono utili?')}</h3>
						<p>
							{t(
								'Questi dati possono aiutarti perché rivelano la differenza tra previsioni statistiche e ciò che accade nel gioco reale.'
							)}
							<br />
							<br />
							{t(
								`Devi sapere che i produttori dichiarano il valore medio delle probabilità di uscita, tuttavia, nelle 
                                estrazioni reali, si contemplano discostamenti che possono variare dai valori attesi.
                                Quindi, se alcuni valori sono particolarmente distanti dal valore medio atteso, si può ipotizzare che 
                                ci saranno estrazioni tendenti a ristabilire le possibilità teoriche.
                                Come abbiamo spesso detto, devi comunque considerare che “la probabilità non ha memoria”. Ciò 
                                significa che un giro della ruota è indipendente dall’altro.
                                Però è possibile utilizzare le informazioni proposte per predisporre le puntate, rispetto alle 
                                dinamiche del gioco stesso.`
							)}
						</p>
					</section>
					<section>
						<h3>{t('Crazy Time: divertimento assicurato!')}</h3>

						<div>
							<p>
								{t(
									`Qualsiasi utente di Casinò Squad può sfruttare questo servizio esclusivo e totalmente gratis. La 
                                    ricerca attraverso questa sezione è immediata, semplice e comoda.
                                    Avendo la possibilità di valutare in tempo reale le probabilità, puoi adattare la tua strategia di gioco 
                                    e provare l’ottimizzazione del Budget a disposizione. Dobbiamo sottolineare che, sul lungo periodo,
                                    ogni tipo di giocata porta alla perdita del credito, se si considera l’RTP pari a 96,08%.
                                    Per tutte le informazioni dettagliate e per scoprire tutte le caratteristiche della Crazy Time, consulta 
                                    la guida al Live Game Show Crazy Time. `
								)}

								<br />
								{t(
									`Buon divertimento con la celeberrima ruota Crazy Time!
                                    Ricorda di giocare con coscienza e responsabilità, nella consapevolezza che il gioco da casinò può 
                                    causare dipendenza patologica.`
								)}
							</p>
						</div>
					</section>
				</Footer>
			</div>
		</Layout>
	)
}

const Header = styled.div`
	&.stats-card-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		h3 {
			display: flex;
			align-items: center;
		}

		span {
			font-size: 13px;
		}
	}
`

const Intro = styled.div`
	display: flex;
	margin-bottom: 15px;
	flex-wrap: wrap;

	p {
		width: 50%;
		@media ${device.mobileL} {
			width: 100%;
		}
	}
`

const Main = styled.div``

const Footer = styled.div`
	section {
		margin: 40px 0px;
	}
	h3 {
		color: ${({ theme }) => theme.palette.background};
	}
`

const StatsContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const BonusContainer = styled.div`
	.bonus-table {
		display: revert;

		@media ${device.mobileL} {
			display: none;
		}
	}

	.bonus-cards {
		display: none;
		@media ${device.mobileL} {
			display: revert;
		}
	}
`

const SpinsContainer = styled.div``

const GridContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`

const Thumbnail = styled.div`
	width: 450px;
	margin: auto;

	@media ${device.mobileL} {
		width: 100%;
	}
`

export async function getServerSideProps() {
	const dataResponse = await axios.get(
		`${APISOCKET.CRAZYTIME}/api/data-for-the-last-hours/24h`
	)

	const PAGE_BONUSES = [
		'LeoVegas',
		'StarCasinò',
		'888 Casino',
		'WinCasino',
		'Unibet',
	]

	const pageBonusesRemapping: any = {
		LeoVegas:
			'https://ads.leovegas.com/redirect.aspx?pid=3708703&bid=14965',
		'888 Casino': 'https://ic.aff-handler.com/c/43431?sr=1864253',
		StarCasinò:
			'http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/',
		WinCasino:
			'https://vincipromo.it/wincasino/?mp=42794b32-7604-49d2-92d0-8adf67a6b173',
		Unibet: 'https://b1.trickyrock.com/redirect.aspx?pid=74444446&bid=27508',
	}

	return {
		props: {
			statsData: dataResponse.data.stats.stats,
			spinsData: dataResponse.data.spinsInTimeFrame.map((r: Spin) => {
				r.timeOfSpin = r.timeOfSpin - 1000 * 60 * 60 * 2
				return r
			}),
			bonusesData: (
				await getBonuses({ names: PAGE_BONUSES, sort: 'rating:desc' })
			).map(b => {
				b.link = pageBonusesRemapping[b.name]
				return b
			}),
		},
	}
}

export default CrazyTimePage
