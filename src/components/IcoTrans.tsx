import { Box, Link, Typography } from '@mui/material';
import { Trans } from 'i18next-ssg';

export interface LinkInfo {
    link: string;
    linkTitle?: string;
}

interface IcoTransProps {
    ns: string | string[];
    i18nKey: string;
    values?: any;
    listContent?: string[];
    h3?: string;
    links?: LinkInfo[];
}

const IcoTrans: React.FC<IcoTransProps> = (props) => {
    const renderHighlight = () => {
        return (
            <Box
                component="span"
                sx={{
                    backgroundColor: 'secondary.main',
                    padding: '0rem 0.5rem',
                    borderRadius: '0.2rem',
                }}
            />
        );
    };

    const linkComponent = (
        link: string | undefined,
        linkTitle: string | undefined,
    ) => (
        <Link
            href={link}
            target={link?.startsWith('http') ? '_blank' : '_self'}
            title={linkTitle}
        />
    );

    const sectionTitle = (titleSection: string | undefined) => (
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
            {titleSection}
        </Typography>
    );

    const linkMap: { [key: string]: React.ReactElement } = {};
    if (props.links && Array.isArray(props.links)) {
        props.links.forEach((linkInfo, index) => {
            linkMap[`link${index + 1}`] = linkComponent(
                linkInfo.link,
                linkInfo.linkTitle,
            );
        });
    }

    return (
        <Trans
            ns={props.ns}
            i18nKey={props.i18nKey}
            values={props.values}
            components={{
                h3: sectionTitle(props.h3),
                highlight: renderHighlight(),
                ...linkMap,
            }}
        />
    );
};

export default IcoTrans;
