import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import { FunctionComponent } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  }
}))(MuiAccordionDetails)


type Props = {
  videoDescription?: string,
  tips?: string
}

const CustomizedAccordions: FunctionComponent<Props> = ({videoDescription, tips}) => {
  const [expanded, setExpanded] = React.useState<string | false>('')

  const handleChange = (panel: string) => (_event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        
        <AccordionSummary 
          aria-controls="panel1d-content" 
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}>
          <Typography >Video Description</Typography>
        </AccordionSummary>

        <AccordionDetails>
            <Typography style={{width: '100%', overflow: 'hidden'}} dangerouslySetInnerHTML={{__html: String(videoDescription)}}/>
        </AccordionDetails>
      </Accordion>
      

      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        
        <AccordionSummary 
        aria-controls="panel2d-content" 
        id="panel2d-header"
        expandIcon={<ExpandMoreIcon />}>
          <Typography>Tips</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography style={{width: '100%', overflow: 'hidden'}} dangerouslySetInnerHTML={{__html: String(tips)}}/>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}

export default CustomizedAccordions