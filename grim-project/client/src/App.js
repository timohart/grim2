import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CharacterCreation from './components/CharacterCreation';
import CharacterList from './components/CharacterList';
import CharacterOverview from './components/CharacterOverview';
import CheckedInCharacters from './components/CheckedInCharacters';
import ClassCreation from './components/ClassCreation';
import ClassList from './components/ClassList';
import ClassOverview from './components/ClassOverview';
import EventCreation from './components/EventCreation';
import EventCheckIn from './components/EventCheckIn';
import EventCheckOut from './components/EventCheckOut';
import EventOverview from './components/EventOverview';
import PlayerCreation from './components/PlayerCreation';
import PlayerOverview from './components/PlayerOverview';
import RaceCreation from './components/RaceCreation';
import RaceList from './components/RaceList';
import RaceOverview from './components/RaceOverview';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/characters/new" component={CharacterCreation} />
        <Route path="/characters" component={CharacterList} exact />
        <Route path="/characters/:id" component={CharacterOverview} />
        <Route path="/checked-in-characters" component={CheckedInCharacters} />
        <Route path="/classes/new" component={ClassCreation} />
        <Route path="/classes" component={ClassList} exact />
        <Route path="/classes/:id" component={ClassOverview} />
        <Route path="/events/new" component={EventCreation} />
        <Route path="/events/:id/check-in" component={EventCheckIn} />
        <Route path="/events/:id/check-out" component={EventCheckOut} />
        <Route path="/events/:id" component={EventOverview} />
        <Route path="/players/new" component={PlayerCreation} />
        <Route path="/players/:id" component={PlayerOverview} />
        <Route path="/races/new" component={RaceCreation} />
        <Route path="/races" component={RaceList} exact />
        <Route path="/races/:id" component={RaceOverview} />
        <Route path="/" component={CharacterList} exact />
      </Switch>
    </Router>
  );
}

export default App;
