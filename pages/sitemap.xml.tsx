import React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { getTotalSlots, getTotalBonuses, getTotalProducers } from '../lib/api'
import { getBonuses } from '../lib/graphql/queries/bonuses'
import { getProducers } from '../lib/graphql/queries/producers'
import { getSlots } from '../lib/graphql/queries/slots'
import { Slot, Producer, Bonus } from '../lib/schemas'
import { GetServerSideProps } from 'next'

const SLOTS = `
    query slots(
        $limit: Int,
        $start: Int, 
        $sort: String, 
        ) {
        slots( 
                where : { 
                country : {code : "it"},
                type: "online"
                },
                limit: $limit,
                start: $start,
                sort: $sort
                ) {
                    id
                    slug
                    name
            }
    }
`

const BONUSES = `
    query bonuses(
        $limit: Int,
        $start: Int, 
        $sort: String,
        ) {
        bonuses( 
                where : { 
                country : {code : "it"}, 
                },
                limit: $limit,
                start: $start
                sort: $sort
        ) {
            id
            link
            name
        }
    }
`

const PRODUCERS = `
    query producers(
        $start: Int, 
        $sort: String, 
        ) {
        producers(
            start: $start,
            sort: $sort,
            where : { 
                country : {code : "it"}, 
            },
            ) {
            id
            name
            slug
        }
    }
`

type PageProps = {
	slotsData: Slot[]
	producersData: Producer[]
	bonusesData: Bonus[]
	totalSlots: number
	totalBonuses: number
	totalProducers: number
}

enum MapMenu {
	CASINO,
	FORNITORI,
	SLOT,
}

const SiteMap: FunctionComponent<PageProps> = props => {
	console.log(props)

	return <div></div>
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const slots = await getSlots(
		{ start: 0, limit: 2000, sort: 'name:asc' },
		SLOTS
	)

	const producers = await await getProducers(
		{ start: 0, limit: 100, sort: 'name:asc' },
		PRODUCERS
	)

	const bonusesData = await getBonuses(
		{ start: 0, limit: 50, sort: 'name:asc' },
		BONUSES
	)

	const BASE_URL = 'https://casinosquad.it'

	const staticPages = [
		'/',
		'/live-stats/crazy-time',
		'/live-stats/dream-catcher',
		'/live-stats/monopoly',
		'/live-stats',
		'/offerte-bonus-casino',
		'/giochi',
	]

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages
			.map(staticPage => {
				return `
                <url>
                    <loc>${BASE_URL}${staticPage}</loc>
                    <changefreq>daily</changefreq>
                    <priority>1</priority>
                </url>
            `
			})
			.join('')}
        ${slots
			.map(page => {
				return `
                <url>
                <loc>${BASE_URL}/slot/${page.slug}</loc>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
                </url>
            `
			})
			.join('')}

        ${producers
			.map(page => {
				return `
                <url>
                <loc>${BASE_URL}/software/${page.slug}</loc>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
                </url>
            `
			})
			.join('')}         
    </urlset>
  `

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {
			slotsData: await getSlots(
				{ start: 0, limit: 2000, sort: 'name:asc' },
				SLOTS
			),
			producersData: await getProducers(
				{ start: 0, limit: 100, sort: 'name:asc' },
				PRODUCERS
			),
			bonusesData: await getBonuses(
				{ start: 0, limit: 50, sort: 'name:asc' },
				BONUSES
			),
			totalSlots: await getTotalSlots(),
			totalBonuses: await getTotalBonuses(),
			totalProducers: await getTotalProducers(),
		},
	}
}

export default SiteMap
