import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Projects from '../../pages/Projects'
import Skills from '../../pages/Skills'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default class NavTop extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.tooltipToggle = this.tooltipToggle.bind(this)
    this.state = {
      isOpen: false,
      tooltipOpen: false
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.windowResize)
  }

  windowResize = () => {
    if (window.innerWidth >= 768 && this.state.isOpen) {
      this.handleDropDownClick()
    }
  }

  toggle () {
    if (!this.state.isOpen) {
      document.addEventListener('click', this.handleDropDownClick)
      this.props.toggleOverlay()
    }
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  tooltipToggle () {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  handleDropDownClick = () => {
      this.setState({
        isOpen: false
      })
      this.props.toggleOverlay()
      document.removeEventListener('click', this.handleDropDownClick)
  }

  style = () => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0
    },
    navbar: {
      justifyContent: 'center',
      alignContent: 'center',
      border: 'none',
      boxShadow: 'none',
      fontFamily: `'Nunito', sans-serif`,
      color: this.props.backgroundLight ? '#333' : '#fff',
      transition: 'all 1s ease',
      fontWeight: 300
    },
    brand: {
      position: 'absolute',
      top: 0,
      color: this.props.backgroundLight ? '#333' : '#fff',
      transition: 'all 1s ease'
    },
    toggler: {
      fontSize: '20px',
      outline: 'none',
      color: this.props.backgroundLight ? '#333' : '#fff',
    },
    link: {
      fontSize: 16,
      fontWeight: 400,
      color: this.props.backgroundLight ? '#333' : '#fff',
      transition: 'all 1s ease'
    }
  })

  findRoute = page => {
    console.log(page)
  }

  render () {
    let toggleIcon = this.state.isOpen ? 'angle-up' : 'angle-down'

    return (
      <Router>
        <Container style={this.style().container} fluid>
          <Navbar
            style={this.style().navbar}
            className='transparent fixed-top'
            expand='md'
          >
            <Link
              style={this.style().brand}
              className='navbar-brand mt-2 mt-md-3'
              to='/'
              onClick={() => this.props.updatePage('Home')}
            >
              Joseph Emswiler
            </Link>
            <NavbarToggler
              style={this.style().toggler}
              className='mr-auto border-0'
              onClick={this.toggle}
            >
              <FontAwesomeIcon icon={['fas', toggleIcon]} />
            </NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='mr-auto' navbar>
                <NavItem>
                  <Link
                    className='nav-link'
                    style={this.style().link}
                    to='/projects'
                    onClick={() => this.props.updatePage('Projects')}
                  >
                    Projects
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className='nav-link'
                    style={this.style().link}
                    to='/about'
                    onClick={() => this.props.updatePage('About')}
                  >
                    About
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className='nav-link'
                    style={this.style().link}
                    to='/skills'
                    onClick={() => this.props.updatePage('Skills')}
                  >
                    Skills
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>

          <Route
            exact
            path='/'
            render={props => <Home updatePage={this.props.updatePage} />}
          />
          <Route
            exact
            path='/about'
            render={props => <About updatePage={this.props.updatePage} />}
          />
          <Route
            path='/projects'
            render={props => <Projects updatePage={this.props.updatePage} />}
          />
                <Route
            path='/projects/apps'
            render={props => <Projects updatePage={this.props.updatePage} />}
          />
          <Route
            path='/skills'
            render={props => <Skills updatePage={this.props.updatePage} />}
          />
          

        </Container>
      </Router>
    )
  }
}