import React from 'react'
import { Navbar, Container, Nav, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useSelector , useDispatch } from 'react-redux'
import { logout , logout_auth } from '../../actions'
import { Link } from 'react-router-dom'

const Navbarr = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const user_data = useSelector(state=>state.user)

    const onSearch = () => {
        const query = document.getElementById('search').value
        
        history.push(`/search/${query}`)
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(logout_auth())
        history.push('/')
    }

    return(
        <>
            <Navbar className="shadow-lg" bg="dark" variant="dark" expand="lg">
                <Container>
                    <Link to="/" className="navbar-brand mx-5"><b>MOVIES</b></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/movies" className="nav-link my-auto mx-2"><b>Movies</b></Link>
                        <Link to="/tvshows" className="nav-link my-auto mx-2" style={{width:'100px'}}><b>TV Shows</b></Link>
                        <Link to="/peoples" className="nav-link my-auto mx-2" style={{paddingRight:'40px'}}><b>People</b></Link>
                        
                        <div className="d-flex flex-row" style={{margin:'auto'}}>
                            <div className="p-2">
                                <Form.Control style={{width:'400px',marginTop:'3px'}} type="text" id="search" placeholder="Search..."/>
                            </div>
                            <div className="p-2">
                                <Button variant="dark" onClick={()=>{onSearch()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div className="mx-5"/>
                        <div className="mx-5"/>
                        <div className="mx-5"/>

                        {user_data!==null ? (
                            <>
                                <DropdownButton id="dropdown-button-dark-example2" variant="dark" menuVariant="dark" title={user_data.name} className="mt-2">
                                    <Dropdown.Item><Link to="/list" className="text-white" style={{textDecoration:'none'}}>My List</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/favorite" className="text-white" style={{textDecoration:'none'}}>Favorite</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/bookmark" className="text-white" style={{textDecoration:'none'}}>Bookmark</Link></Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{onLogout()}}>Logout</Dropdown.Item>
                                </DropdownButton>
                            </>
                        ):(
                            <>
                                <Nav.Link className="my-auto mx-2" href="/login" variant="white"><b>Login</b></Nav.Link>
                                <Nav.Link className="my-auto mx-2" href="/register" variant="white"><b>Register</b></Nav.Link>
                            </>
                        )}
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navbarr