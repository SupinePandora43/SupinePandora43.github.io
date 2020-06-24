import * as React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Loadable from "react-loadable"
function loads() {
    return (<div>loader</div>)
}
const LoadableBar = Loadable({
    loader: () => import('./subpages/Me'),
    loading: loads,
});
class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    public render() {
        return (
            <div className="Main" id="Main">
                <div>1</div>
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/me">About</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/me">
                                <LoadableBar />
                            </Route>
                        </Switch>
                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        {/*<Switch>
                            <Route path="/about">
                                <Main />
                            </Route>
                            <Route path="/users">
                                <Main />
                            </Route>
                            <Route path="/">
                                <Main />
                            </Route>
                        </Switch> */}
                    </div>
                </Router>
            </div>
        );
    }

}
export default Main