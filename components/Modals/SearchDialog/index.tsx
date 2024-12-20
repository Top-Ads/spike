import React, { FunctionComponent, useEffect, useState } from 'react'
import Image from 'next/image'
import {
	createStyles,
	makeStyles,
	Theme,
	withStyles,
	WithStyles,
} from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import CustomTextField from '../../Commons/Inputs/Textfield'
import { SearchIndex } from 'algoliasearch/lite'
import { AlgoliaBlogType, AlgoliaSpikeType } from '../../../lib/schemas'
import {
	APPLICATIONID,
	SPIKE_APIKEY,
	BLOG_APIKEY,
	CDN,
} from '../../../public/environment'
import SearchHits from '../../SearchHits'
import SearchHitReview from '../../SearchHitReview'
import { styledTheme } from '../../../lib/theme'
import styled from 'styled-components'
import { device } from '../../../lib/utils/device'

const styles = (theme: Theme) =>
	createStyles({
		root: {
			margin: 0,
			padding: theme.spacing(2),
		},
		closeButton: {
			position: 'absolute',
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500],
		},
	})

const useStyles = makeStyles<DialogPaperProps>(() =>
	createStyles({
		paper: {
			'& .MuiPaper-root': {
				position: 'absolute',
				top: '5vh',
				maxHeight: '80vh',
				height: showSearchResult =>
					showSearchResult ? '100%' : 'auto',
				[`@media ${device.mobileL}`]: {
					width: '100%',
					top: '0vh',
					maxHeight: '100%',
					margin: 0,
				},
			},
		},
	})
)

interface DialogPaperProps {
	showSearchResult: boolean
}

interface DialogTitleProps extends WithStyles<typeof styles> {
	id: string
	children: React.ReactNode
	onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
	const { children, classes, onClose, ...other } = props

	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	)
})

const DialogContent = withStyles(() => ({
	root: {
		padding: 0,
		display: 'flex',
	},
}))(MuiDialogContent)

const DialogActions = withStyles((theme: Theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
		backgroundColor: styledTheme.palette.background,
	},
}))(MuiDialogActions)

type Props = {
	open: boolean
	setOpen: Function
}

const TO_EXCLUDE = [
	'20Bet',
	'22Bet',
	'7BitCasino',
	'Buran Casino',
	'Cadoola',
	'Casinia',
	'Casino Empire',
	'Casino Intense',
	'Casinomia',
	'Cobra Casino',
	'Malina',
	'PlayAmo',
	'Rabona',
	'SlotsPalace',
	'Wazamba',
	'WildTornado',
]

const SearchDialog: FunctionComponent<Props> = ({ open, setOpen }) => {
	const [searchResult, setSearchResult] = useState<any>([])
	const [algoliaSpikeIndex, setAlgoliaSpikeIndex] = useState<
		SearchIndex | undefined
	>(undefined)
	const [algoliaBlogIndex, setAlgoliaBlogIndex] = useState<
		SearchIndex | undefined
	>(undefined)
	const [searchReview, setSearchReview] = useState<any>()
	const [showSearchResult, setShowSearchResult] = useState<boolean>(false)

	const classes = useStyles(showSearchResult)

	const handleClose = () => {
		setOpen(false)
	}

	const handleOnSearch = async (searchItem: string) => {
		if (!searchItem.length) {
			setSearchResult([])
			setShowSearchResult(false)
			return
		} else {
			const spikeData = await algoliaSpikeIndex!
				.search<AlgoliaSpikeType[] | undefined>(searchItem, {
					filters: `country: it`,
				})
				.then(resp => {
					console.log(resp.hits)
					return resp.hits.filter(
						it => !TO_EXCLUDE.includes((it as any).name)
					)
				})

			// const blogData = await algoliaBlogIndex!
			// 	.search<AlgoliaBlogType[] | undefined>(searchItem)
			// 	.then(resp => {
			// 		return resp.hits
			// 	})

			const spikeSearchFormat = spikeData.map((obj: any) => {
				return {
					name: obj.name,
					type: obj.type,
					slug: obj.slug,
					country: obj.country,
					link: obj.link,
					image: obj.image,
					rating: obj.rating,
					objectID: obj.objectID,
				}
			})

			// const blogSearchFormat = blogData.map((obj: any) => {
			// 	return {
			// 		imageUrl: obj.imageUrl,
			// 		link: obj.link,
			// 		title: obj.title,
			// 		_highlightResult: obj._highlightResult,
			// 		objectID: obj.objectID,
			// 		type: 'blog',
			// 	}
			// })

			// setSearchResult([...spikeSearchFormat, ...blogSearchFormat])

			setSearchResult([...spikeSearchFormat])

			setShowSearchResult(true)
		}
	}

	const handleMouseOnHit = (hit: AlgoliaSpikeType) => {
		setSearchReview(hit)
	}

	useEffect(() => {
		setSearchReview(searchResult[0])
	}, [searchResult])

	useEffect(() => {
		if (algoliaSpikeIndex === undefined || algoliaBlogIndex === undefined) {
			import('algoliasearch').then().then(algoliasearch => {
				const spikeIndex = algoliasearch
					.default(APPLICATIONID, SPIKE_APIKEY)
					.initIndex('entities')

				// const blogIndex = algoliasearch.default(APPLICATIONID, BLOG_APIKEY).initIndex('casinosquad-articles')

				setAlgoliaSpikeIndex(spikeIndex)
				// setAlgoliaBlogIndex(blogIndex)
			})
		}
	}, [])

	return (
		<MuiDialog
			className={classes.paper}
			maxWidth={'md'}
			fullWidth={true}
			onClose={handleClose}
			aria-labelledby='customized-dialog-title'
			open={open}
		>
			<DialogTitle id='customized-dialog-title' onClose={handleClose}>
				<CustomTextField
					autoFocus
					zIndex={100}
					onChange={handleOnSearch}
					size={'small'}
					searchIcon
					placeholder='Cerca una slot, un casino...'
					clearField={true}
				/>
			</DialogTitle>

			{showSearchResult && (
				<DialogContent dividers>
					<SearchHits
						data={searchResult}
						mouseOnHit={handleMouseOnHit}
						searchReviewName={
							searchReview?.name || searchReview?.title
						}
					/>
					<SearchHitReview data={searchReview} />
				</DialogContent>
			)}
			<DialogActions>
				<Thumbnail>
					<Image
						alt='Casino Squad'
						src={`${CDN}/png/logo_header.png`}
						layout='intrinsic'
						quality={100}
						priority={true}
						width={640}
						height={299}
					/>
				</Thumbnail>
			</DialogActions>
		</MuiDialog>
	)
}

const Thumbnail = styled.div`
	width: 60px;
`

export default SearchDialog
