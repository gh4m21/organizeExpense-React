    import React from 'react'
    import { makeStyles } from '@material-ui/core/styles'
    import AppBar from '@material-ui/core/AppBar'
    import ToolBar from '@material-ui/core/Toolbar'
    import Typography from '@material-ui/core/Typography'
    import Button from '@material-ui/core/Button'
    import IconButton from '@material-ui/core/IconButton'
    import MenuIcon from '@material-ui/icons/Menu'
    import Menu from '@material-ui/core/Menu'
    import MenuItem from '@material-ui/core/MenuItem'

    const useStyles = makeStyles ((theme) => ({
        root : {
            flexGrow : 1,
        },
        menuButton : {
            marginRight : theme.spacing(2),
        },
        title : {
            flexGrow : 1,
        },
    }));

    export default function Navbar () {
        const [anchorEL, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const classes = useStyles();

        return (
            <div className = {classes.root}>
                <AppBar position = "static">
                    <ToolBar>
                        <Typography variant = "h6" className = {classes.title} >
                            OrganizExpenses
                        </Typography>
                        <Button color = "inherit"> Login </Button>
                    </ToolBar>
                </AppBar>
            </div>

        );
    }