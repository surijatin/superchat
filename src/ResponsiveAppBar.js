import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

const ResponsiveAppBar = ({ isUserLoggedIn, signIn, signOut, user, isMobile }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleSignIn = () => {
        handleCloseUserMenu()
        signIn()
    }

    const handleSignOut = () => {
        handleCloseUserMenu()
        signOut()
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            px: isMobile ? '20px' : '214px',
                            width: '100%',
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                SUPERCHAT
                            </Typography>
                        </Box>
                        <Box>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Profile Pic" src={isUserLoggedIn ? user.photoURL : ''} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={isUserLoggedIn ? handleSignOut : handleSignIn}>
                                    <Typography textAlign="center">
                                        {isUserLoggedIn ? 'Logout' : 'Sign In with Google'}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
