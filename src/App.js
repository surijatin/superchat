import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { Button, TextField, Box, Typography, CircularProgress, Container, IconButton } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useEffect, useRef, useState } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import SendIcon from '@mui/icons-material/Send'
import Avatar from '@mui/material/Avatar'
import useMediaQuery from '@mui/material/useMediaQuery'
import Filter from 'bad-words'

firebase.initializeApp({
    apiKey: 'AIzaSyCrTrASB0BlaEop6g0zsT8-J24rXpQbMdI',
    authDomain: 'superchat-91e97.firebaseapp.com',
    projectId: 'superchat-91e97',
    storageBucket: 'superchat-91e97.appspot.com',
    messagingSenderId: '550617271661',
    appId: '1:550617271661:web:e228a51dfa92c8c82f1e64',
    measurementId: 'G-HKZ7R8KVH9',
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
    const [user, loading] = useAuthState(auth)
    const isMobile = useMediaQuery('(max-width:480px)')

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    const signOut = () => auth.signOut()

    return (
        <>
            <ResponsiveAppBar
                isUserLoggedIn={!!user}
                signIn={signInWithGoogle}
                signOut={signOut}
                user={user}
                isMobile={isMobile}
            />
            <Container
                maxWidth="xl"
                sx={{
                    backgroundColor: '#282c34',
                    p: 0,
                    m: 0,
                    height: '92vh',
                }}
            >
                {loading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            px: isMobile ? '20px' : '238px',
                        }}
                    >
                        {user ? (
                            <ChatRoom />
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '70vh',
                                }}
                            >
                                <SignIn signIn={signInWithGoogle} />
                            </Box>
                        )}
                    </Box>
                )}
            </Container>
        </>
    )
}

const SignIn = ({ signIn }) => {
    return (
        <Button onClick={signIn} variant={'contained'}>
            Sign in with Google
        </Button>
    )
}

const ChatRoom = () => {
    const messagesRef = firestore.collection('messages')
    const query = messagesRef.orderBy('createdAt')

    const [messages, loading] = useCollectionData(query, { idField: 'id' })
    const [msgValue, setMsgValue] = useState('')

    const dummy = useRef()

    const sendMessage = async e => {
        if (msgValue) {
            const { uid, photoURL } = auth.currentUser
            setMsgValue('')
            const filter = new Filter()
            if (!filter.isProfane(msgValue)) {
                await messagesRef.add({
                    text: msgValue,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid,
                    photoURL,
                })
                dummy.current.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }, [loading, messages])

    const handleOnChange = e => setMsgValue(e.target.value)

    return (
        <Box
            position={'relative'}
            sx={{
                borderRadius: '12px',
                backgroundColor: '#282535',
            }}
        >
            <Box
                sx={{
                    height: '70vh',
                    border: '1px solid #5B4B8A',
                    borderRadius: '8px',
                    overflow: 'auto',
                    px: '20px',
                    mt: '12px',
                    pt: 0,
                    m: 0,
                }}
            >
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={dummy}></div>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #5B4B8A',
                    borderRadius: '8px',
                    mt: 0.5,
                    backgroundColor: '#282c34',
                }}
            >
                <TextField
                    value={msgValue}
                    onChange={handleOnChange}
                    multiline
                    minRows={4}
                    placeholder={'Write something..'}
                    InputProps={{ inputProps: { style: { color: '#fff' } } }}
                    sx={{ fontFamily: 'monospace', width: '90%', height: '100%', lineHeight: '1.5' }}
                />
                <IconButton
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    onClick={sendMessage}
                    sx={{ flex: 1, borderRadius: '50%', color: 'rgb(11, 147, 246)' }}
                >
                    <SendIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    )
}

const ChatMessage = ({ message }) => {
    const { text, uid, photoURL } = message

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: messageClass === 'sent' ? 'row' : 'row-reverse',
                justifyContent: messageClass === 'sent' ? 'end' : 'start',
                gap: '12px',
                py: '12px',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    borderRadius: '25px',
                    backgroundColor: messageClass === 'sent' ? 'rgb(11, 147, 246)' : 'rgb(229, 229, 234) ',
                    px: '20px',
                    py: '10px',
                }}
            >
                <Typography variant="body2" color={messageClass === 'sent' ? 'white' : 'black'}>
                    {text}
                </Typography>
            </Box>
            <Avatar alt="User Profile Pic" src={photoURL} />
        </Box>
    )
}

export default App
