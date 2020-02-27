import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Counter from './Counter'
import KnowledgeBase from './KnowledgeBase'
import ManageInterests from './ManageInterests'
import {PATHS} from '../utils/constants'

const Home = () => <h2>Home</h2>

const AppRouter = () =>
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to={PATHS.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={PATHS.COUNTER}>Counter Example</Link>
                    </li>
                    <li>
                        <Link to={PATHS.INTERESTS}>Knowledge Base</Link>
                    </li>
                    <li>
                        <Link to={PATHS.MANAGE}>Manage Interests</Link>
                    </li>
                </ul>
            </nav>

            <Route path={PATHS.HOME} exact component={Home} />
            <Route path={PATHS.COUNTER} component={Counter} />
            <Route path={PATHS.INTERESTS} component={KnowledgeBase} />
            <Route path={PATHS.MANAGE} component={ManageInterests} />
        </div>
    </Router>

render(<AppRouter />, document.getElementById('main'))