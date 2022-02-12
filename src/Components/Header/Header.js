import { useState } from "react";
import { Link, AppBar, IconButton, SwipeableDrawer, Divider, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ToolBar from "@material-ui/core/ToolBar";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from '@material-ui/icons/Close';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();

    const useStyles = makeStyles((theme) => ({
        link: {
            marginRight: '18vh',
            color: '#F84570',
            // fontWeight: 'bold',
        },
    }));


    const logoutUser = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    const navigationLinks = [
        { name: "Home", href: "/" },
        { name: "Leaderboard", href: "/leaderboard" },
        { name: "logout", href: "/login", click: (logoutUser) },
    ];
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <AppBar id={classes.nav} position="sticky" >
            <ToolBar disableGutters>
                <IconButton onClick={() => setOpen(true)}>
                    <MenuIcon className={classes.menuIcon} />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Quizzi
                </Typography>
            </ToolBar>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <div
                    onClick={() => setOpen(false)}
                    onKeyPress={() => setOpen(false)}
                    role="button"
                    tabIndex={0}
                >
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                <List >
                    {navigationLinks.map((item) => (
                        <ListItem key={item.name}>
                            <Link
                                className={styles.link}
                                color="textPrimary"
                                variant="button"
                                underline="none"
                                href={item.href}
                                onClick={item.click}
                            >
                                {item.name}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
        </AppBar>
    );
}
export default Header;