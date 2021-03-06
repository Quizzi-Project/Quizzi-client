import { useState,useEffect } from "react";
import { Link, AppBar, IconButton, SwipeableDrawer, Divider, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ToolBar from "@material-ui/core/ToolBar";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from '@material-ui/icons/Close';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import GradeIcon from '@material-ui/icons/Grade';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import jwt from "jsonwebtoken";

const Header = () => {
    const navigate = useNavigate();

    const useStyles = makeStyles((theme) => ({
        link: {
            marginRight: '18vh',
            color: '#F84570',
        },
        paper:{
            backgroundColor: '#2A0D2E',
        },
    }));

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token);
            if (!user) {
                localStorage.removeItem('token');
                navigate('/login')
            }
        } else {
            navigate('/login')
        }
    }, []);


    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/login')
    }
    const navigationLinks = [
        { name: "Home", href: "/", icon: <HomeIcon className={classes.icon} /> },
        { name: "Profile", href: "/profile", icon: <PersonIcon className={classes.icon} /> },
        { name: "Leaderboard", href: "/leaderboard", icon: <GradeIcon className={classes.icon} /> },
        { name: "logout", href: "/login", click: (logoutUser), icon: <ExitToAppIcon className={classes.icon} /> },

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
            <SwipeableDrawer className={{ paper: makeStyles.paper }} anchor="left" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} >
                <div onClick={() => setOpen(false)} onKeyPress={() => setOpen(false)} role="button" tabIndex={0} >
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                <List >
                    {navigationLinks.map((item) => (
                        <ListItem key={item.name}>
                            {item.icon}
                            <Link
                                className={styles.link} color="textPrimary" variant="button" underline="none" href={item.href} icon={item.icon}
                                onClick={item.click} >
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