import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Counter from './Counter'
import KnowledgeBase from './KnowledgeBase'

const Home = () => <h2>Home</h2>

const AppRouter = () =>
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/counter'>Counter Example</Link>
                    </li>
                    <li>
                        <Link to='/knowledge'>Knowledge Base</Link>
                    </li>
                </ul>
            </nav>

            <Route path='/' exact component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/knowledge' component={KnowledgeBase} />
        </div>
    </Router>

render(<AppRouter />, document.getElementById('main'))