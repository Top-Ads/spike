import Head from 'next/head'
import React, { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import { getSlots } from '../../lib/graphql/queries/slots'
import { Slot, Bonus } from '../../lib/schemas'
import BonusCard from '../../components/Cards/BonusCard'
import GridLayout from '../../components/Commons/GridLayout'
import { GridType } from '../../lib/utils/constants'
import { device } from '../../lib/utils/device'
import BonusTable from '../../components/Commons/Tables/BonusTable'
import SlotCard from '../../components/Cards/SlotCard'
import { format } from 'date-fns'
import italianLocale from 'date-fns/locale/it'
import LazyLoad from 'react-lazyload'
import { CDN } from '../../public/environment'
import { useTranslation } from 'react-i18next'
import { MarkdownStyleProvider } from '../blog/[firstLevel]/[secondLevel]/[slug]'
import Markdown from 'markdown-to-jsx'

type PageProps = {
	topSlotsData: Slot[]
	pagesBonusesData: Bonus[]
}

const BonusCasinoPage: FunctionComponent<PageProps> = ({
	topSlotsData,
	pagesBonusesData,
}) => {
	const { t } = useTranslation()

	const TOP_BONUSES = ['StarCasinò', 'LeoVegas', 'BetRoom', 'WinCasino']

	console.log(pagesBonusesData)

	const MAIN_BONUSES = [
		'LeoVegas',
		'StarCasinò',
		'BetRoom',
		'WinCasino',
		'PokerStars Casino',
		'NetBet',
		'GoldBet',
		'888 Casino',
		'King Casino',
		'Eurobet',
		'Betway',
		'Gioco Digitale',
	]

	// const topBonusesData = pagesBonusesData.filter(bonus => {
	// 	if (TOP_BONUSES.includes(bonus.name)) {
	// 		return bonus
	// 	}
	// })

	const topBonusesData = TOP_BONUSES.map(
		b => pagesBonusesData.filter(bonus => bonus.name === b)[0]
	)

	const mainBonusesData = MAIN_BONUSES.map(
		b => pagesBonusesData.filter(bonus => bonus.name === b)[0]
	)

	console.log(topBonusesData, mainBonusesData)

	return (
		<Layout title='Casino Squad | Offerte Attuali Bonus Casino e Promo Aggiornate Giornalmente'>
			<Head>
				<meta
					property='og:description'
					content='Confronta le offerte selezionate tra I migliori bonus casino esistenti e le ultime promo proposte in tempo reale'
					key='description'
				/>
			</Head>

			<Main className='layout-container'>
				<MarkdownStyleProvider>
					<Markdown>
						{`# Lista Italiana dei Migliori Casino con Bonus Senza Deposito  

A partire dal 2019, la competizione tra le diverse piattaforme di casinò digitali è aumentata in maniera esponenziale, portando all’introduzione di una serie di offerte di benvenuto, volte a rendere l’esperienza di gioco responsabile e intrattenitiva.<br><br>


## Le migliori piattaforme di Casinò Digitali Italiani secondo Casinò Squad

Tutti **i casinò che consideriamo dispongono della licenza italiana ADM** necessaria per operare in questo settore, sono quindi validi e sicuri.<br>Inoltre, nella scelta della piattaforma bisogna sempre tenere conto di alcuni fattori tra cui:

- Le tempistiche relative a depositi e prelievi, insieme ai metodi di pagamento offerti.
- L’offerta di giochi e giochi Live.
- Le promozioni periodiche rivolte agli utenti della piattaforma e ai nuovi arrivati.
- L’efficienza dell’assistenza e la presenza di una sezione FAQ all’interno del sito web.

**L’elenco che segue racchiude tutte le migliori piattaforme di casinò digitali che possono adattarsi alle tue preferenze** e che hanno i migliori Bonus Benvenuto Senza Deposito.<br>Tra queste sono incluse anche le industrie di casinò online utilizzate da Casinò Squad durante le live, impiegando l’utilizzo di soldi veri.

Come sarà possibile notare nella lista sotto elencata, i Bonus di Benvenuto possono variare a seconda del sito considerato e, generalmente, offrono: giri gratis su alcune slot online già prestabilite o un importo che può essere differente tra il Bonus Senza Deposito e il Bonus Con Deposito.<br>
In linea generale, però, i Bonus dei casinò online ti permettono di giocare con soldi veri a tutte le migliori slot machine online, conferendoti un importo maggiore rispetto a quello depositato in precedenza per usufruire dell’offerta.`}
					</Markdown>
				</MarkdownStyleProvider>
				{/* <h2>
					<strong>
						{t(
							'Lista Italiana dei Migliori Casino con Bonus Senza Deposito'
						)}
					</strong>
				</h2>

				<Thumbnail>
					<Image
						alt='Bonus e promo casino online'
						src={`${CDN}/jpeg/casinosquad_poster_bonus.jpg`}
						layout='responsive'
						priority={true}
						sizes={'50vw'}
						width={1920}
						height={600}
					/>
				</Thumbnail>

				<p>
					{t(
						`A partire dal 2019, la competizione tra le diverse piattaforme di casinò digitali è aumentata in maniera esponenziale, portando all’introduzione di una serie di offerte di benvenuto, volte a rendere l’esperienza di gioco ancora più entusiasmante.`
					)}
				</p>

				<h3>
					<strong>
						{
							'Le migliori piattaforme di Casinò Digitali Italiani secondo Casinò Squad'
						}
					</strong>
				</h3>
				<p>
					{t(
						'Tutti i casinò che consideriamo dispongono della licenza italiana ADM necessaria per operare in questo settore, sono quindi validi e sicuri. Inoltre, nella scelta della piattaforma bisogna sempre tenere conto di alcuni fattori tra cui:'
					)}
				</p>

				<ul>
					<li>
						{t(
							'Le tempistiche relative a depositi e prelievi, insieme ai metodi di pagamento offerti.'
						)}
					</li>
					<li>{t('L’offerta di giochi e giochi Live.')}</li>
					<li>
						{t(
							'Le promozioni periodiche rivolte agli utenti della piattaforma e ai nuovi arrivati.'
						)}
					</li>
					<li>
						{t(
							'L’efficienza dell’assistenza e la presenza di una sezione FAQ all’interno del sito web.'
						)}
					</li>
				</ul>

				<p>
					{t(
						'L’elenco che segue racchiude tutte le migliori piattaforme di casinò digitali che possono adattarsi alle tue preferenze e che hanno i migliori Bonus Benvenuto Senza Deposito; tra queste sono incluse anche le industrie di casinò online utilizzate da Casinò Squad durante le live, impiegando l’utilizzo di soldi veri.'
					)}
				</p>

				<p>
					{t(
						'Come è possibile notare nella lista sopra elencata, i Bonus di Benvenuto possono variare a seconda del sito considerato e, generalmente, offrono: giri gratis su alcune slot online già prestabiliti o un importo che può essere differente tra il Bonus Senza Deposito e il Bonus Con Deposito. In linea generale, però, i Bonus dei casinò online ti permettono di giocare con soldi veri a tutte le migliori slot machine online, conferendoti un importo maggiore rispetto a quello depositato in precedenza per usufruire dell’offerta.'
					)}
				</p> */}
			</Main>

			<div className='layout-container topBonus'>
				<GridContainer id='grid-topBonus'>
					<GridLayout
						gridType={GridType.TOPBONUS}
						content={topBonusesData.map(bonus => (
							<BonusCard key={bonus.id} data={bonus} />
						))}
						label='Migliori Casino Italiani per servizi offerti'
						AlignItem={'center'}
						xs={12}
						sm={4}
						md={3}
						showBoxShadow
						bgColor='#fff'
						spacing={2}
					/>
				</GridContainer>
			</div>

			<Main className='layout-container'>
				<GridContainer id='grid-bonuses'>
					<div className='bonus-table'>
						<BonusTable data={mainBonusesData} />
					</div>

					<div className='bonus-cards'>
						<GridLayout
							gridType={GridType.BONUS}
							content={mainBonusesData.map(bonus => (
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
					</div>
				</GridContainer>

				<MarkdownStyleProvider>
					<Markdown>
						{`## Come funzionano i Bonus di Benvenuto?

I Bonus di Benvenuto rappresentano un servizio di marketing perché gli operatori vorrebbero che i giocatori si iscrivano sulla loro piattaforma di casinò online.<br>
I Bonus Senza Deposito Immediato sono rivolti ai nuovi iscritti di un casino digitale, e possono essere utilizzati per provare le migliori slot online in maniera totalmente gratuita, valutando successivamente se si ha un reale interesse nel giocare utilizzando soldi reali.

Proprio per questo motivo, per usufruire di un Bonus di Benvenuto, ti basta consultare l’elenco che puoi trovare nella parte superiore della pagina, ed eventualmente contattare sui profili social i membri di Casinò Squad per ottenere maggiori informazioni a riguardo.<br>
Inoltre, durante le live di Casinò Squad vi è sempre la possibilità di consultare un comparatore ulteriore, in cui sono presenti i siti in cui si effettuano frequentemente le sessioni di gioco.

Una volta selezionato uno dei casinò virtuali compresi nella lista superiore, la procedura da seguire richiede alcuni semplici e brevi passaggi.<br>
Innanzitutto, cliccando sul link inserito all’interno del comparatore, si ha la possibilità di raggiungere direttamente la pagina del sito, e più nello specifico dell’offerta di benvenuto.

A questo punto, **è necessario compilare alcuni moduli che richiedono l’inserimento di dati personali e bancari**, tenendo in considerazione che tutte le piattaforme di casino online assicurano il massimo della riservatezza, attraverso l’utilizzo di sistemi di crittografia certificati.<br>
Tra i dati richiesti, è sempre necessario inserire il proprio codice fiscale ed allegare successivamente una copia del proprio documento d’identità, in modo tale che la piattaforma possa assicurarsi della maggiore età del nuovo utente.

Una volta conclusa la procedura di registrazione, il giocatore dovrà effettuare un deposito, per poter in seguito usufruire del cosiddetto Welcome Bonus con Deposito.<br>Come già accennato in precedenza, le migliori industrie di casino digitali mettono a disposizione dei propri utenti i migliori metodi di pagamento da poter utilizzare per effettuare depositi e prelievi.<br>Tra questi possiamo infatti considerare le carte di credito o di debito, i portafogli elettronici come Skrill o Neteller, e la PostePay.

Inoltre, c’è sempre la possibilità di effettuare un deposito attraverso il Bonifico Bancario, tenendo a mente che richiede tempistiche più lunghe rispetto agli altri metodi considerati. Per quanto riguarda i prelievi, questa è una delle modalità più consigliate.<br>
Per essere totalmente sicuri di aver compreso tutti i passaggi da seguire per aprire un conto di gioco, si può consultare questa breve sintesi che li racchiude:

- Selezionare il casino con certificazione legale ADM che più rispecchia le tue preferenze;
- Compilare i moduli richiesti e convalidare i propri documenti d’identità;
- Effettuare un primo deposito con i migliori metodi di pagamento;
- Attendere l’accredito del Bonus Con Deposito sul proprio conto di gioco.<br><br>


## Bisogna inserire i Codici Bonus per ottenere i Bonus di Benvenuto dei casinò online?

Solitamente, alcuni casinò digitali offrono codici bonus da inserire per ottenere un bonus specifico.<br>Questi bonus, generalmente vengono inviate per e-mail o per SMS. Inoltre, ogni codice bonus è personalizzato per ogni utente.<br><br>


## Esistono giochi live?

Molto spesso, le industrie di casino digitali sono popolari per la gamma di slot online gratis che offrono. Tuttavia, si può affermare che l’offerta di giochi include anche altre cose, tra cui giochi Live, giochi da tavolo, Poker e scommesse sportive.

I giochi Live sono distribuiti in tutto il mondo e anche in Italia, in quanto rendono l’esperienza di gioco più reale e meno solitaria. Cosa significa questo? Significa che tutti i partecipanti del gioco possono interagire tra di loro utilizzando una Live chat disponibile nella sessione di gioco.<br>Inoltre, questa interazione può essere estesa anche al Dealer, che cerca di rispondere alle domande dei giocatori il più possibile.

I giochi Live più seguiti  da Casinò Squad, e più popolari in generale, sono: Monopoly Live, Deal or No Deal, Crazy Time e Dream Catcher.

In aggiunta, per ampliare ulteriormente l’offerta, le migliori piattaforme mettono a disposizione dei giocatori la possibilità di effettuare sessioni di gioco al Blackjack o alla Roulette, sia in versione Live sia in versione normale.<br>In entrambi i casi, gli utenti possono mettere alla prova le proprie abilità e testare le proprie strategie.<br>
Attraverso queste modalità, i clienti del casinò virtuale possono avere un’esperienza di gioco uguale a quella dei casinò tradizionali, se non migliore, in quanto a volte c’è anche una sezione dedicata alle scommesse sportive.<br><br>


## Riservatezza dei dati personali

I casinò digitali richiedono sempre l’invio del proprio documento d’identità, in modo tale da accertarsi della maggiore età del giocatore. Tuttavia, come sopra menzionato, i sistemi di crittografia garantiscono assoluta privacy e riservatezza dei dati personali di tutti i giocatori.

**Giocare online è quindi sicuro sotto ogni punto di vista, in quanto le piattaforme che dispongono della certificazione sono controllate ed affidabili**. Inoltre, talvolta effettuare una sessione di gioco nei casinò tradizionali o nei punti di gioco specifici può risultare complesso per alcuni giocatori, mentre nei casinò online questo problema non è presente.<br>
Si può giocare da soli o in compagnia di qualche amico, così come i membri di Casinò Squad giocano in compagnia della propria community.<br><br>


## Effettuare depositi e prelievi nel massimo della sicurezza

Molto spesso questo rappresenta un tabù per la maggior parte dei giocatori, i quali ritengono non sia sicuro condividere i propri dati bancari con il <br>
Ancora una volta, viene garantita la massima riservatezza di tali informazioni, che possono transitare soltanto presso società di competenza del settore.

Inoltre, sia per quanto riguarda la sezione delle scommesse sia per quella del casino in generale, i ticket delle vincite sono automaticamente inseriti in un database all’interno della piattaforma ed è quindi sempre possibile consultarli.<br><br>


## Inserimento dei limiti di perdita o limiti di deposito

I siti di casinò online prevedono l’impostazione da parte degli utenti di limiti di perdita o limiti di deposito, che possono essere sia settimanali sia mensili. In questo modo, i giocatori stabiliscono un determinato bilancio dedicato al gioco, a cui doversi attenere.

In aggiunta, tali piattaforme mettono a disposizione dei propri iscritti la possibilità di autoescludersi in maniera temporanea o permanente, qualora la situazione fosse fuori controllo.<br>L’autoesclusione è quindi una scelta propria del giocatore, il quale può decidere di procedere alla richiesta di attuare tale misura, nel momento in cui ad esempio si rende conto di aver giocato troppo durante gli ultimi giorni.

Una volta effettuata la richiesta di autoesclusione, il codice fiscale del soggetto considerato viene schedato come non idoneo al gioco durante il periodo di tempo dell’autoesclusione stessa.<br>
Tuttavia, una volta effettuata l’autoesclusione permanente, bisogna attendere un minimo di sei mesi prima di poter essere inseriti nuovamente.

Questa rappresenta una delle misure più efficaci volte a prevenire la dipendenza patologica, che rappresenta un serio problema. Proprio per questo l’Agenzia Dogane e Monopoli ha deciso di attuarla su tutte le piattaforme di casinò online certificate, cosa che invece non è ancora attuata per le tradizionali Slot da Bar.<br><br>


## Sezione scommesse sportive

Le scommesse sportive possono essere abbastanza ricercate, ed è per questo che vi è un’intera sezione a loro dedicata sui casinò virtuali. I migliori campionati sportivi sono sempre disponibili, così come gli eventi più importanti a livello nazionale e mondiale.<br><br>


## Le migliori slot machine online

La sessione di gioco alle migliori slot machine online è assicurata su tutte le piattaforme di casinò digitali, che mettono a disposizione dei giocatori la versione Demo per provare tutti i giochi disponibili all’interno del sito, in modo tale da permettere agli utenti di capirne bene il meccanismo.<br>Inoltre, è sempre possibile fare pratica con migliori slot online gratis sul sito di Casinò Squad, così da migliorare ulteriormente l’esperienza.<br><br>


## L’importanza del gioco consapevole
È importante ricordare sempre di giocare in maniera responsabile, consapevole e moderata, in quanto bisogna sempre capire quando è il momento di fermarsi.<br>Giocare online è un piacevole passatempo e divertimento, ma deve rimanere tale.<br>
Non bisogna rincorrere le perdite, e lasciare che il gioco da casino diventi una dipendenza da cui è molto difficile uscire. Gioca responsabilmente.
`}
					</Markdown>
				</MarkdownStyleProvider>

				{/* <h3>
					<strong>
						{t('Come funzionano i Bonus di Benvenuto?')}
					</strong>
				</h3>
				<p>
					{t(
						'I Bonus di Benvenuto rappresentano un incentivo che spinge i giocatori ad iscriversi su una determinata piattaforma di casinò online, in quanto permettono agli appassionati di migliorare notevolmente l’esperienza di gioco con soldi veri.'
					)}
				</p>

				<p>
					{t(
						'I Bonus Senza Deposito Immediato sono, infatti, rivolti ai nuovi iscritti di un casino digitale, e possono essere utilizzati per provare le migliori slot online gratis in maniera totalmente gratuita, valutando successivamente se si ha un reale interesse nel giocare utilizzando soldi reali.'
					)}
				</p>

				<p>
					{t(
						'Proprio per questo motivo, per usufruire di un Bonus di Benvenuto, ti basta consultare nuovamente l’elenco che puoi trovare nella parte superiore della pagina, ed eventualmente contattare sui profili social i membri di Casinò Squad per ottenere maggiori informazioni a riguardo.'
					)}
				</p>

				<p>
					{t(
						'Inoltre, durante le live di Casinò Squad vi è sempre la possibilità di consultare un comparatore ulteriore, in cui viene indicato il sito su cui si sta attualmente effettuando la sessione di gioco.'
					)}
				</p>

				<p>
					{t(
						'Una volta selezionato uno dei casinò virtuali compresi nella lista superiore, la procedura da seguire è molto semplice e richiede alcuni semplici e brevi passaggi.'
					)}
				</p>

				<p>
					{t(
						'Innanzitutto, cliccando sul link inserito all’interno del comparatore, si ha la possibilità di raggiungere direttamente la pagina del sito, e più nello specifico dell’offerta di benvenuto. A questo punto, è necessario compilare alcuni moduli che richiedono l’inserimento di dati personali e bancari, tenendo in considerazione che tutte le piattaforme di casino online assicurano il massimo della riservatezza, attraverso l’utilizzo di sistemi di crittografia certificati.'
					)}
				</p>

				<p>
					{t(
						'Tra i dati richiesti, è sempre necessario inserire il proprio codice fiscale ed allegare successivamente una copia del proprio documento d’identità, in modo tale che la piattaforma possa assicurarsi della maggiore età del nuovo utente.'
					)}
				</p>

				<p>
					{t(
						'Una volta conclusa la procedura di registrazione, il giocatore dovrà effettuare un deposito, per poter in seguito usufruire del cosiddetto Welcome Bonus con Deposito. Come già accennato in precedenza, le migliori industrie di casino digitali mettono a disposizione dei propri utenti i migliori metodi di pagamento da poter utilizzare per effettuare depositi e prelievi; tra questi possiamo infatti considerare le carte di credito o di debito, i portafogli elettronici come Skrill o Neteller, e la PostePay.'
					)}
				</p>

				<p>
					{t(
						'Inoltre, c’è sempre la possibilità di effettuare un deposito attraverso il Bonifico Bancario, ma questa procedura è generalmente sconsigliata in quanto richiede tempistiche più lunghe rispetto agli altri metodi considerati. Per quanto riguarda i prelievi invece, questa è una delle modalità più consigliate.'
					)}
				</p>

				<p>
					{t(
						'Per essere totalmente sicuri di aver compreso tutti i passaggi da seguire per aprire un conto di gioco, si può consultare questa breve sintesi che li racchiude:'
					)}
				</p>

				<ul>
					<li>
						{t(
							'Selezionare il casino con certificazione legale ADM che più rispecchia le tue preferenze;'
						)}
					</li>
					<li>
						{t(
							'Compilare i moduli richiesti e convalidare i propri documenti d’identità;'
						)}
					</li>
					<li>
						{t(
							'Effettuare un primo deposito con i migliori metodi di pagamento;'
						)}
					</li>
					<li>
						{t(
							'Attendere l’accredito del Bonus Con Deposito sul proprio conto di gioco.'
						)}
					</li>
				</ul>

				<Thumbnail>
					<LazyLoad height={400} offset={300}>
						<Image
							alt='Bonus e promo casino online'
							src={`${CDN}/jpeg/casinosquad_poster_bigwin.jpg`}
							layout='responsive'
							priority={true}
							sizes={'50vw'}
							width={1920}
							height={600}
						/>
					</LazyLoad>
				</Thumbnail>

				<h3>
					<strong>
						{t(
							'Bisogna inserire i Codici Bonus per ottenere i Bonus di Benvenuto dei casinò online?'
						)}
					</strong>
				</h3>
				<p>
					{t(`Solitamente, alcuni casinò digitali offrono codici bonus da inserire per ottenere un bonus specifico. Questi bonus, generalmente vengono inviate per e-mail o per SMS. 
					Inoltre, ogni codice bonus è personalizzato per ogni utente.`)}
				</p>

				<h3>
					<strong>{t('Esistono giochi live?')}</strong>
				</h3>

				<p>
					{t(
						'Molto spesso, le industrie di casino digitali sono popolari per la vasta gamma di slot online gratis che offrono. Tuttavia, si può affermare con assoluta certezza che l’offerta di giochi include tante altre cose, tra cui giochi Live, giochi da tavolo, Poker e persino scommesse sportive.'
					)}
				</p>

				<p>
					{t(
						'I giochi Live sono molto amati in tutto il mondo e anche in Italia, in quanto rendono l’esperienza di gioco più reale e meno solitaria. Cosa significa questo? Significa che tutti i partecipanti del gioco possono interagire tra di loro utilizzando una Live chat disponibile nella sessione di gioco; inoltre, questa interazione può essere estesa anche al Dealer, che cerca di rispondere alle domande dei giocatori il più possibile.'
					)}
				</p>

				<p>
					{t(
						'I giochi Live più amati da Casinò Squad, e più popolari in generale, sono: Monopoly Live, Deal or No Deal, Crazy Time e Dream Catcher.'
					)}
				</p>

				<p>
					{t(
						'In aggiunta, per ampliare ulteriormente l’offerta, le migliori piattaforme mettono a disposizione dei giocatori la possibilità di effettuare sessioni di gioco al Blackjack o alla Roulette, sia in versione Live sia in versione normale. In entrambi i casi, gli appassionati possono mettere alla prova le proprie abilità e testare le proprie strategie.'
					)}
				</p>

				<p>
					{t(
						'Attraverso questa vasta offerta di giochi, gli utenti del casinò virtuale possono avere un’esperienza di gioco uguale a quella dei casinò tradizionali, se non migliore, in quanto c’è anche un’intera sezione dedicata alle scommesse sportive.'
					)}
				</p>

				<h3>
					<strong>{t('Riservatezza dei dati personali')}</strong>
				</h3>
				<p>
					{t(
						'I casinò digitali richiedono sempre l’invio del proprio documento d’identità, in modo tale da accertarsi della maggiore età del giocatore. Tuttavia, come sopra menzionato, i sistemi di crittografia garantiscono assoluta privacy e riservatezza dei dati personali di tutti i giocatori.'
					)}
				</p>

				<p>
					{t(
						'Giocare online è quindi sicuro sotto ogni punto di vista, in quanto le piattaforme che dispongono della certificazione sono sicure ed affidabili. Inoltre, talvolta effettuare una sessione di gioco nei casinò tradizionali o nei punti di gioco specifici può risultare complesso per alcuni appassionati, mentre nei casinò online questo problema non è presente.'
					)}
				</p>

				<p>
					{t(
						'Si può giocare da soli o in compagnia di qualche amico, così come i membri di Casinò Squad giocano in compagnia della propria community!'
					)}
				</p>

				<h3>
					<strong>
						{t(
							'Effettuare depositi e prelievi nel massimo della sicurezza'
						)}
					</strong>
				</h3>
				<p>
					{t(
						'Molto spesso questo rappresenta un tabù per la maggior parte dei giocatori, i quali ritengono non sia sicuro condividere i propri dati bancari con il casinò. Ancora una volta, viene garantita la massima riservatezza di tali informazioni, che possono transitare soltanto presso società di competenza del settore.'
					)}
				</p>

				<p>
					{t(
						'Inoltre, sia per quanto riguarda la sezione delle scommesse sia per quella del casino in generale, i ticket delle vincite sono automaticamente inseriti in un database all’interno della piattaforma ed è quindi sempre possibile consultarli.'
					)}
				</p>

				<h3>
					<strong>
						{t(
							'Inserimento dei limiti di perdita o limiti di deposito'
						)}
					</strong>
				</h3>
				<p>
					{t(
						'I siti di casinò online prevedono l’impostazione da parte degli utenti di limiti di perdita o limiti di deposito, che possono essere sia settimanali sia mensili. In questo modo, i giocatori stabiliscono un determinato bilancio dedicato al gioco, a cui doversi attenere.'
					)}
				</p>

				<p>
					{t(
						'In aggiunta, tali piattaforme mettono a disposizione dei propri iscritti la possibilità di autoescludersi in maniera temporanea o permanente, qualora la situazione fosse fuori controllo. L’autoesclusione è quindi una scelta propria del giocatore, il quale può decidere di procedere alla richiesta di attuare tale misura, nel momento in cui ad esempio si rende conto di aver giocato troppo durante gli ultimi giorni.'
					)}
				</p>

				<p>
					{t(
						'Una volta effettuata la richiesta di autoesclusione, il codice fiscale del soggetto considerato viene schedato come non idoneo al gioco durante il periodo di tempo dell’autoesclusione stessa. Tuttavia, una volta effettuata l’autoesclusione permanente, bisogna attendere un minimo di sei mesi prima di poter essere inseriti nuovamente.'
					)}
				</p>

				<p>
					{t(
						'Questa rappresenta una delle misure più efficaci volte a prevenire la dipendenza patologica, che rappresenta un serio problema. Proprio per questo l’Agenzia Dogane e Monopoli ha deciso di attuarla su tutte le piattaforme di casinò online certificate, cosa che invece non è ancora attuata per le tradizionali Slot da Bar.'
					)}
				</p>

				<h3>
					<strong>{t('Sezione scommesse sportive')}</strong>
				</h3>
				<p>
					{t(
						'Le scommesse sportive sono attualmente molto ricercate, ed è per questo che vi è un’intera sezione a loro dedicata sui casinò virtuali. I migliori campionati sportivi sono sempre disponibili, così come gli eventi più importanti a livello nazionale e mondiale.'
					)}
				</p>

				<h3>
					<strong>{t('Le migliori slot machine online')}</strong>
				</h3>
				<p>
					{t(
						'La sessione di gioco alle migliori slot machine online è assicurata su tutte le piattaforme di casinò digitali, che mettono a disposizione dei giocatori la versione Demo per provare tutti i giochi disponibili all’interno del sito, in modo tale da permettere agli appassionati di capirne bene il meccanismo. Inoltre, è sempre possibile fare pratica con migliori slot online gratis sul sito di Casinò Squad, così da migliorare ulteriormente l’esperienza.'
					)}
				</p>

				<h3>
					<strong>{t('L’importanza del gioco consapevole')}</strong>
				</h3>
				<p>
					{t(
						'È importante ricordare sempre di giocare in maniera responsabile, consapevole e moderata, in quanto bisogna sempre capire quando è il momento di fermarsi. Giocare online è un piacevole passatempo e divertimento, ma deve rimanere tale. Non bisogna rincorrere le perdite, e lasciare che il gioco da casino diventi una dipendenza da cui è molto difficile uscire. Gioca responsabilmente.'
					)}
				</p> */}
			</Main>

			<GridContainer id='grid-topSlot'>
				<div className='layout-container'>
					<GridLayout
						gridType={GridType.SLOTS}
						content={topSlotsData.map((slot: Slot) => (
							<Fragment>
								<SlotCard key={slot.name} data={slot} />
							</Fragment>
						))}
						width={'100%'}
						xs={12}
						sm={4}
						md={2}
					/>
				</div>
			</GridContainer>

			<Main className='layout-container'>
				<h2>
					<strong>{t('FAQ - Domande Frequenti')}</strong>
				</h2>
				<MarkdownStyleProvider>
					<Markdown>
						{`## Cosa si intende per Bonus di Benvenuto Senza Deposito?

Questa offerta è riservata ai nuovi iscritti di un **casino online**, e può variare in base alla piattaforma considerata.<br>Generalmente consiste in **Giri Gratuiti** o in un importo di soldi. Per usufruire di tale **Bonus** non vi è la necessità di effettuare un deposito.

Anzi, questo viene spesso utilizzato come un sistema di marketing per invogliare i giocatori ad effettuare la procedura di registrazione che, una volta completata, ti permette di usufruire dell’offerta considerata.<br><br>


## Dove posso consultare l’elenco dei Migliori Casino Italiani con Bonus Senza Deposito?

L’elenco dei **migliori casino online** viene sempre aggiornato, tenendo anche in considerazione le offerte periodiche delle diverse piattaforme.<br>
Qui, puoi avere un’idea completa su tutti i migliori casino online, accessibili tramite un semplice link inserito all’interno della guida di ogni singolo sito.<br><br>


## Esistono altri tipi di Bonus?

Oltre ai **Bonus Senza Deposito**, possiamo trovare i Bonus Con Deposito, i quali vengono generalmente distribuiti su più depositi, piuttosto che su uno solo.<br>Anche in questo caso, l’offerta può consistere in giri gratuiti o Free Spin, così come in importi che variano a seconda della piattaforma.<br><br>


## Si può definire un Bonus di Benvenuto più conveniente?

**I Bonus di Benvenuto** vengono sempre scelti tenendo in considerazione le preferenze del giocatore.<br>Infatti, non è possibile definire un solo Bonus più conveniente.<br>
Tuttavia, ciò che li accomuna sono termini e condizioni previsti dalla piattaforma, che devono sempre essere consultati prima di effettuare una determinata scelta.<br><br>


## Il Bonus di Benvenuto può essere utilizzato una tantum?

Essendo un’offerta riservata ai nuovi clienti, il Bonus di Benvenuto può essere utilizzato soltanto al momento della registrazione, e quindi una volta sola. In realtà però, tutte le piattaforme di **casinò digitali** offrono **promozioni periodiche** volte a fidelizzare il maggior numero possibile di clienti.`}
					</Markdown>
				</MarkdownStyleProvider>
				{/* <h2>
					<strong>{t('FAQ - Domande Frequenti')}</strong>
				</h2>
				<h3>
					<strong>
						{t(
							'Cosa si intende per Bonus di Benvenuto Senza Deposito?'
						)}
					</strong>
				</h3>
				<p>
					{t('Questa offerta è riservata ai nuovi iscritti di un')}{' '}
					<b>casino online</b>,
					{t(
						'e può variare in base alla piattaforma considerata. Generalmente consiste in'
					)}{' '}
					<b>{t('Giri Gratuiti')}</b>{' '}
					{t('o in un importo di soldi. ')}
					{t('Per usufruire di tale')} <b>Bonus</b>{' '}
					{t('non vi è la necessità di effettuare un deposito. ')}{' '}
					<br />
					{t(
						'Anzi, questo viene spesso utilizzato come un incentivo per invogliare i giocatori ad effettuare la procedura di registrazione che, una volta completata,'
					)}
					{t(' ti permette di usufruire dell’offerta considerata. ')}
				</p>

				<h3>
					<strong>
						{
							'Dove posso consultare l’elenco dei Migliori Casino Italiani con Bonus Senza Deposito?'
						}
					</strong>
				</h3>
				<p>
					{t('L’elenco dei')} <b>{t('migliori casino online')}</b>{' '}
					{t(
						'viene sempre aggiornato, tenendo anche in considerazione le offerte periodiche delle diverse piattaforme. '
					)}
					{t(
						'Qui, puoi avere un’idea completa su tutti i migliori casino online, accessibili tramite un semplice link inserito all’interno della guida di ogni singolo sito. '
					)}
				</p>

				<h3>
					<strong>{t('Esistono altri tipi di Bonus?')}</strong>
				</h3>
				<p>
					{t('Oltre ai')} <b>{t('Bonus Senza Deposito')}</b>,{' '}
					{t('possiamo trovare i Bonus Con Deposito,')}
					{t(
						'i quali vengono generalmente distribuiti su più depositi, piuttosto che su uno solo. Anche in questo caso,'
					)}
					{t(
						'l’offerta può consistere in giri gratuiti o <b>Free Spin</b>, così come in importi che variano a seconda della piattaforma. '
					)}
				</p>

				<h3>
					<strong>
						{t(
							'Si può definire un Bonus di Benvenuto più conveniente?'
						)}
					</strong>
				</h3>
				<p>
					<b> {t('I Bonus di Benvenuto')}</b>{' '}
					{t(
						'vengono sempre scelti tenendo in considerazione le preferenze del giocatore. Infatti, non è possibile definire un solo Bonus più conveniente. '
					)}
					{t(
						'Tuttavia, ciò che li accomuna sono termini e condizioni previsti dalla piattaforma, che devono sempre essere consultati prima di effettuare una determinata scelta. '
					)}
				</p>

				<h3>
					<strong>
						{t(
							'Il Bonus di Benvenuto può essere utilizzato una tantum?'
						)}
					</strong>
				</h3>
				<p>
					{t(
						'Essendo un’offerta riservata ai nuovi clienti, il Bonus di Benvenuto può essere utilizzato soltanto al momento della registrazione, e quindi una volta sola. '
					)}
					{t('In realtà però, tutte le piattaforme di')}{' '}
					<b>{t('casinò digitali')}</b> {t('offrono')}{' '}
					<b>{t('promozioni periodiche')}</b>{' '}
					{t(
						'volte a rendere l’esperienza di gioco tutti gli appassionati sempre dinamica. '
					)}{' '}
					<br />
					{t(
						'Sui migliori casino online il divertimento è sempre assicurato!'
					)}
				</p>

				<p>
					{t('Pubblicato: 19 Ott 2021 • Ultimo aggiornamento')}
					<span style={{ textTransform: 'capitalize' }}>
						{' '}
						{format(new Date(Date.now()), 'dd MMM yyyy', {
							locale: italianLocale,
						}).toString()}{' '}
					</span>
				</p>

				<br /> */}
			</Main>
		</Layout>
	)
}

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	li {
		margin-bottom: 15px;
		width: 80%;
	}
`

const Thumbnail = styled.div`
	width: 100%;
`
const GridContainer = styled.div`
	display: flex;
	margin: 10px 0px;
	color: ${({ theme }) => theme.palette.background};

	&#grid-topSlot {
		color: #fff;
		background-color: ${({ theme }) => theme.palette.background};
	}

	&#grid-topSlot {
		padding: 10px 0px;

		@media ${device.tablet} {
			width: 100%;
			overflow-x: scroll;
		}
	}

	&#grid-bonuses {
		flex-direction: column;

		p {
			text-align: center;
		}
	}

	.bonus-cards {
		display: none;
	}
	.bonus-table {
		display: contents;
	}

	@media ${device.mobileL} {
		.bonus-cards {
			display: contents;
		}
		.bonus-table {
			display: none;
		}
	}

	@media ${device.tablet} {
		&#grid-slots {
			flex-direction: column;
		}
	}
`

export async function getStaticProps() {
	const PAGE_BONUSES = [
		'LeoVegas',
		'StarCasinò',
		'Starvegas',
		'WinCasino',
		'PokerStars Casino',
		'BetRoom',
		'NetBet',
		'GoldBet',
		'888 Casino',
		'King Casino',
		'Eurobet',
		'Betway',
		'Gioco Digitale',
		'Snai',
		'Unibet',
	]

	const pageBonusesRemapping: any = {
		LeoVegas:
			'https://ads.leovegas.com/redirect.aspx?pid=3708703&bid=14965',
		StarCasinò:
			'http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/',
		Starvegas:
			'https://www.starvegas.it/gmg/refer/61782b177358340001a18ac7',
		BetRoom:
			'https://www.promovt.info/betroomcasino/?page=user&p=registration&mp=b76750fa-ea90-424c-85d2-00e33416391e',
		WinCasino:
			'https://www.vincipromo.it/wincasino/?mp=7f1d8788-3f9e-4111-b205-e49d29661715',
		NetBet: 'https://banners.livepartners.com/view.php?z=151484',
		GoldBet:
			'https://media.goldbetpartners.it/redirect.aspx?pid=5116&bid=1495',
		'888 Casino': 'https://ic.aff-handler.com/c/43431?sr=1864253',
		'King Casino': 'https://spikeslot.kingcasino.it',
		Eurobet:
			'https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/113/',
		Betway: 'https://betway.it/bwp/welcome-5gratis/it-it/?s=bw210475&a=AFF3009702735911860&utm_source=210475&utm_medium=Affiliate&utm_campaign=AFF3009702735911860',
		'Gioco Digitale':
			'https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2031706',
		Snai: 'https://informatoriads.snai.it/redirect.aspx?pid=30830&bid=2194',
		Unibet: 'https://b1.trickyrock.com/redirect.aspx?pid=74444446&bid=27508',
		'PokerStars Casino':
			'https://secure.starsaffiliateclub.com/C.ashx?btag=a_186177b_6907c_&affid=100976968&siteid=186177&adid=6907&c=',
	}

	return {
		props: {
			topSlotsData: await getSlots({
				limit: 18,
				start: 0,
				sort: 'updated_at:desc',
			}),
			pagesBonusesData: (
				await getBonuses({ names: PAGE_BONUSES, sort: 'rating:desc' })
			).map(b => {
				b.link = pageBonusesRemapping[b.name]
				return b
			}),
		},
	}
}

export default BonusCasinoPage
