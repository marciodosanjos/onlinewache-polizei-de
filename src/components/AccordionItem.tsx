import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React, { useRef } from 'react';
import IcoTrans from './IcoTrans';

export interface LinkInfo {
    link: string;
    linkTitle?: string;
}

export default function AccordionItem(props: {
    accordionTitle: React.ReactNode;
    accordionContent: string;
    id: string;
    expanded: string;
    panelHeaderID: number;
    panelHeaderContentID: number;
    links?: LinkInfo[];
    handleExpanded: (id: string) => void;
}) {
    const headerRef = useRef<HTMLDivElement>(null);

    const handleChange = (panel: string, newExpanded: boolean) => {
        props.handleExpanded(newExpanded ? panel : '');
    };

    const handleEntered = () => {
        headerRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <MuiAccordion
            disableGutters
            elevation={0}
            square
            // {...props}
            expanded={props.expanded === props.id}
            onChange={(event, newExpanded) =>
                handleChange(props.id, newExpanded)
            }
            TransitionProps={{
                onEntered: handleEntered,
            }}
        >
            <MuiAccordionSummary
                ref={headerRef}
                expandIcon={
                    <ExpandCircleDownOutlinedIcon
                        sx={{
                            fontSize: '3em',
                            color: 'primary.main',
                        }}
                    />
                }
                //{...props}
                aria-controls={`panel1d-content${props.panelHeaderContentID}`}
                id={`panel1d-header${props.panelHeaderID}`}
            >
                <Typography variant="h3">{props.accordionTitle}</Typography>
            </MuiAccordionSummary>

            <MuiAccordionDetails>
                <IcoTrans
                    ns="common"
                    links={props.links}
                    i18nKey={props.accordionContent}
                />
            </MuiAccordionDetails>
        </MuiAccordion>
    );
}
