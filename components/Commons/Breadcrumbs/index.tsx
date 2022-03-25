import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import Link from 'next/link'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
       '& .MuiBreadcrumbs-li': {
          fontSize: '0.9rem',
          lineHeight: '1.3',
          '& >p': {
            fontSize: '0.9rem'
          },
        },
        '& .MuiBreadcrumbs-separator': {
          marginBottom: '2px'
        },
        '& .links': {
          color: '#fff',
          borderBottom: '1px solid transparent',
          fontSize: 'inherit',
          '&:hover': {
              textDecoration: 'none',
              borderBottom: '1px solid #fff',
              cursor: 'pointer'
          }
        },
        '& .last-link': {
          color: 'rgb(145 124 69)',
          fontSize: 'inherit'
        },
    },
  }),
);

function CombineAccumulatively(segments: any) {
  const links = segments.reduce((acc: [string], cur: number, curIndex: number) => {
    const last = curIndex > 1 ? acc[curIndex - 1] : "";
    const newPath = last + "/" + cur;
    acc.push(newPath);
    return acc;
  }, []);
  return links;
}

interface Crumb {
  link: string,
  segment: string,
  segmentsPath: string
}

const CustomBreadcrumbs: FunctionComponent = ({}) => {
  const classes = useStyles()

  const router = useRouter()
  
  const [crumbs, setCrumbs] = useState<[Crumb]>()
  const [show, setShow] = useState<boolean>(true)

  const inactiveLinks = ['slot', 'software']

  useEffect(() => {
    const segmentsPath = router.asPath.split("/")
    const segmentsRoute = router.route.split("/")

    const crumbLinks = CombineAccumulatively(segmentsPath)

    const crumbs: [Crumb] = crumbLinks.map((link: string, index: number) => {
      return {
        link: link,
        segment:  segmentsRoute[index],
        segmentsPath: segmentsPath[index] === "" ? "home" : segmentsPath[index],
      };
    });

    setCrumbs(crumbs)

    if( crumbs && crumbs[crumbs.length-1].link === '/') 
      setShow(false)

  }, [router.route]);

  return (
    <div className={classes.root}>

      { show && <Breadcrumbs separator="›" aria-label="breadcrumb">
        {crumbs?.map( (crumb: Crumb, index) => 
          <div key={index}>
            {
              (index !== crumbs.length - 1 && !inactiveLinks.includes(crumb.segmentsPath) ) ? 
                <Link  href={crumb.link}>
                  <Typography color="inherit" className="links">{crumb.segmentsPath}</Typography>
                </Link> :
                <Typography color="inherit" className="last-link">{crumb.segmentsPath}</Typography>
            }
          </div>
          )
        }
      </Breadcrumbs>
      }
    </div>
  );
}

export default CustomBreadcrumbs