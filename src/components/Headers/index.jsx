import { useState } from 'react';
import {Container, Anchor, Group, Burger, Box, Title} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './DoubleHeader.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mainLinks = [
  {
    link: '?vista',
    label: 'With VISTA watermark',
    dialogLabel: 'success set vista watermark',
    store: 'vista',
  },
  {
    link: '?marvin',
    label: 'With MARVIN watermark',
    dialogLabel: 'success set marvin watermark',
    store: 'marvin',
  },
];

export function DoubleHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0);

    const MySwal = withReactContent(Swal);

    const showSwal = ({ label = '', store = '' }) => {
        if (store === 'vista') {
            window.localStorage.setItem('store', 'vista');
        } else if (store === 'marvin') {
            window.localStorage.setItem('store', 'marvin');
        }
        MySwal.fire({
            icon: 'success',
            title: <p>{label}</p>,
            timer: 1000
        })
    };

    const mainItems = mainLinks.map((item, index) => (
        <Anchor
            href={item.link}
            key={item.label}
            data-active={index === active || undefined}
            onClick={(event) => {
                event.preventDefault();
                showSwal({
                    label: item.dialogLabel,
                    store: item.store
                });
                setActive(index);
            }}
        >
            {item.label}
        </Anchor>
    ));

    return (
        <header className={classes.header}>
            <Container className={classes.inner}>
                <div style={{
                    display: 'flex',
                    gap: 10
                }}>
                    <Title order={3}>QR Generator</Title>
                </div>
                {/* <Box className={classes.links} visibleFrom="sm">
                    <Group justify="flex-end" className={classes.mainLinks}>
                        {mainItems}
                    </Group>
                </Box>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    // className={classes.burger}
                    size="sm"
                    hiddenFrom="sm"
                /> */}
            </Container>
        </header>
    );
}

export default DoubleHeader;