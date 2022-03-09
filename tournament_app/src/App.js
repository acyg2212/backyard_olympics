import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Components/home-page/home.js';
import React, { useState, useEffect } from "react";
import TeamsContext from './TeamsContex';
import Team from './Models/Team';
import MatchContext from './MatchContext';
import AddTeam from './Components/add-team/AddTeam';
import Teams from './Components/teams/teams';
import AddEvent from './Components/add-event/addEvent';
import EventContext from './EventContext';
import Events from './Components/events/events';
import UserContext from './UserContext';
import ProtectedRoute from './Components/auth-route/AuthRoute';
import LogIn from './Components/user-login/Login';
import SignUp from './Components/sign-up/SignUp';

function App() {

  let [teams, setTeams] = useState([]);
  let [match, setMatch] = useState(null);
  let [events, setEvents] = useState([])
  let [role, setRole] = useState('')
  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const authContextValue = {
    fetchWithCSRF,
    currentUserId,
    setCurrentUserId,
    currentUser,
    setCurrentUser,
    role,
    setRole
  };

  const teamContextValue = {
    teams,
    setTeams
  }

  const matchContextValue = {
    match,
    setMatch
  }

  const eventContextValue = {
    events,
    setEvents
  }

  useEffect(() => {
    let renderTeams = () => {
      let defaultTeams = []
      defaultTeams.push(new Team("France", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAARVBMVEX///8AJlPOEScAJlQAFFEAKE0BJVZ2hpjOEiXPAB3TgYTQDyno6OjQECf//f/q6OoGK1gAG1ZsfZDq8O/r7ujPd3vNEyqjTlYkAAABTUlEQVR4nO3TSQ7CMBREQeMwJCTEme9/VCBrtl/IUr0jlLrTNF0iau63eVnLEFPZ9q49ckx9ChE5Ta6PFNWYnl2OMjnqNWmDSHKu2MR3fpi8gqrYpA8iqXQn6TTxHSZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyb/NWkCTcYgkfFjko8gk5ymEJKvybysZYipbHvXRpn0bznrALRzpDS4AAAAAElFTkSuQmCC"))
      defaultTeams.push(new Team("Spain", "data:image/png;base64,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"))
      defaultTeams.push(new Team("Brazil", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAABOFBMVEUAmzr+3wAAJ3b/////4gD/3wAAlzwAmTsAmDsAJXUAI3T/5QD/5wAAJHcAH3MAmzkAG3kAHXIAH3gAEHoAF3AAAGwAAHoADG7l2AvT0hI3pTMAFXqCuCcAHnMADXsAHHkAEm94tSnIzhWMuyWdwSDAyxhKqTFWrC5usir22gBOWGG1yBrw2wSUviLx1g9oa1gAK3LM59QwR4fz9fmlwx8goDba1A/cxSGroDiTik84SmJPVWbGszK5qjV4d1NqeKSAxJOXzqfk8+m+wNZyv4l8ia5EWJGirMernUReZFgvQmonPG4jN3IoQYRZX17SvSaBf06ZkUSFkrba2ufKzd3x2Tat3LtVt3I+r2Ejp1Lo6vLp4asAlSHB4cphuHqKyZ3c7uHq2GqbosHo479VZZf031rPwXTJztPd1M+4AAAMv0lEQVR4nO1deX/axhaVNTJCAskICysJMSFNmsZOarPEcRbXYjEiS5UFeGyNbUrpe9//G7wZCRwwGm2AETDn5z8Sr9LR3ebMnSuKIiAgICAgICAgICAgICAgICAgICAgICBYAljjgwAh9OzevWehZV9FIMDuvGK2tphXO8Q4qNBv95jtLcjGvd823TjCJy+gWZhgfj0JL/t6lgg29PjlDReQjZePQxvrK+GTX8aoMOj4ZUONg2WfbN3iArLBPGE30DhCD+4bgfMWtpnXDzYtkLLU71NWcWMdTzcry47yKYaNTcqyLPUCaxZDOl5siHGw4ecvbcxiGDkOnoc3gI7wya8OZjE0jvUvwdjw4+l8imFj6+F6Gwcmn+J85f4aZ1k29Ltbsxjh93U1jvAzu3yKMY57z9YxcpiyhXeso9AR+s0xn+KM4+WalWDhHXf5FGMc65Rlb8kWPthYH6FjWrbwQcf9tTAONmwhW/hgYx2ybOjBa7v1KROJjiHC4GlbfaGDpZ7iZYsIc3T65u3xu8/S7t7ervT53fHbN6dH8NPYn3i1yntNeNmCiR6cfXvPpZKxuChwHE1znCDGY8kU/f7b2VEUw8cKCx3sDka2YCJbf3ykkzFRoKcgiLEk/eWPLYx9rKjQwYaeW+dTJnJ6zu/GLYgYgYvvxs9PrelgXj5fvSyLky2Y6NmXWMyGiSEfseThmbW3rFwJhpMtmMjX96k450SFaR6p918trYNhVkrowMkWkaPjVNwNEyb2946PIha/ZpWEDlyZxUQ/8DH3VCDEuA8YX1mREiyEkS0iR4cpx1hxG0LqPcY4VqGjg6UwskX0jPbgIT8R586ilr8w+EIHVrZg3u56Nouhcey+taTXEDoCTMd4t8UkFcxxylUOsQKX+ohZswQ4y2LLLBhOD5N+qUBIHmIWvoEVOsIn93FLioNPHrPIbcQ+HeB+dxCFDphPsde79W5GLmj60TucKMJsPQlalrWVLQ5n5gLaxiHut8MsG6gSzE622IoczxQvRkgeW9UbQ+sIUJbFlVkGot9T8+CCplPfresN0zgCInRgZQvTLs52fefUSXDJM7xtIKEjAIEUm0/NazzK+Ky1piFkjuz+0vKFjvCO/TZA9MujeXEBU8oXrKMYdCy3b5INP7TfBoi8mVPAMJF6Y+MoS86yjt0W83QSBHtHWabQwYYduy2i53OoMMYRO7d1FGQcT5dhHKFndrtD5pWd7s2XC5reO3XgfxlZlmVddFtEPxoKBkdz/Bg4boZcG//oYBroGby6245rV90WzNeULKeVRHqfzuh6zoCuZ2hBhp+TZZH3QQaX/Or4ELbvNMtiZYtbZBxraq1arte73XwejJDPd7v1RrlfGeTiCSUt8d7s5JFNVT72p1/cUZbFyxa3HtB/8qAE777Zal8B0Op0CgC0O50O/Hep1DR46Zarqp72xAiXtE8oIzYO7kToCD1w2W2x/RdotdgSKDTBRRO0S6DVA+0epKf047L4wzQTRFa+UVVziiKN8WHnQLG3bkwDlWALz7JsyKHM+omDfPYKwI9ip01BJkrgOgva14Ue6LULVx2Di0KrVTBZ6ZZVIZEWzYcv5SQ8GULGHRmoBFuscdh3W0xg+2/ERK8FmtAysqBVbEICOpfZLMgWTwotg4Kri6bJxfUV/Ee9r8WVfY7LaA0tg2dj98zl09hmXi9wO8FWtpi6lH/gzV51suDyEkAGmsUi9InideECZC+vIE0I7d6lSUa7hKjKgm51oKTlKijb+Mkjp8JrDIs7umIrW0xxcYBusmcEBZg9GuUhGo169ya1UO2LkhE6flxc7gBw0oEcdau6WqnJNn7y+cD9E1lQCRa2lS2mL+PffLdR7as5IYGg/AT6b0wfwKQLWekZpDSL2WIPNAugaVhMvUIroo2fOFWhE1hAlnWbT28Q+U6j0koSrZMmL6JyjNPUfqMLwKVhH1dX7XYTZDvQtfJlLYENosnvLkPokI15l2DeuxcjHx+h5iRRx7BhgBOltLKvq+Uu8pUOKMG4CpOxkWrqalq2/tH4R09kzFnoYMMPbdrwLLHNoMU7R+fKmu5UUPFSOpGpIEJ6BVBqA0TGNbSRbkVIW32/kPHaeD1HoSN04uGQyAhHxoJVrIG67mYNwsuKoFWRgbSLrSIoFmCmgaG3plhZx96R16uZV9+k3aFLPJizXYOMQblq+XQtwInpRA7y0cyiVNuDiajYKuVr0jQdriuNiSt6OnvfpAvZwgqRD+ZmSSbtaR0mppVBGWbe6+vijxJoZ9tF6CxToTT5wQcZs3d0uJItLMn4NtK4PIoXnKRkal1QvCqA65NmD0aQUneQmPS02DePEXQI5sUsQkfI+dAlBkNdxxdEOTFoGNmlcJIFxZ1r0NCV8W9wo/BYwRA6fFIxyyGR6Pt9v1xImkKLiVwZLmmzMLuc9Jpwndcf95X9Q39kbKGODl97TWz4MW5b3Q0Zn/zK4ryer8JinFcyVZDtwdU/jBtoWaspNw4nfPJNBhI6vGfZsFvZAkPGZ79kcEJlYNTiBh2gA2tSWKJCRqrSyDiEz/7JgL7iXejwfOjyFhl/2rVD21YenDRal/AKdJZrCpJx1WxeQONImMYh/DkDGcbRleCQwacHNovSCYgJrV7qgete5/Ia+kpVFpdCxuLchNcb3YHNonQS+0olD8uOHgVA9qJUz6ES7s7dZIEBVCk3XHMBIQtVUERKB9VsZYEKXeXOAyi1uNTKZeSMl1KMT2ho0dK8bCGBDLrK3adWhAUVXZ731KR4H67tobcYa3taWULRRc2lHHf38B1WtpyS65babViDtTqXeW0p5Tg180Jt7H7tblZVbeRwA+J+FWmE7WwJhtL/LmWhRs24hB/jIodng9e7XZsvD78poYKR9PO39wuayxKemkncGd4HB7no2og8cr/vYl0nZ+qgXby6AODI6+XM8VCsb9lveBMaDVMp1g8QR7JRhdnsoxkQ02WYU+A6xSMVc+5v8iMIj561qDZqsMjCJRA5Nyo60qpTYcolKiif/ONVAp1z55uPrYJRBBUHoJvBuohUG4YLTuiDimMxpmh5AP7yRMYiujU8biIxp6MIymuVPt4BRLU/MpFKw0WVLutd8K8XMhbUquFpe3HrAK1OjPUpL9+Yv8XNijInmXYjKjYJ58bLxPT/DjwMdFpYhxe742HjOXr+iKM1dfKxahb6MEf3HXcTeN2sU9BPx87dl1wLnZnooSWBQU3j9bw2ZgyS2u0L02zIVacig9OrA7QXJSHT2nXu6jKx2JYEykuzynYkI0i1/niDEp/LV6wShuxkGFIFIFYlta7xwWlWoTy0MUXexmhp4t45XXTca7QEn6uWFZSXGjofoDYmyn2WZY6St+8cW204LdRgVYb8i0tzwWpwo1y3PkaOb50oUDRM6pQ1zaneSqtmlA1Y6yOCy6bYSdOQqnnrtCGq9bpqX2Lsq6COzCp4TbGUt3bpm3seVDDyl5LPK9ZfGYHPVI3WpiC2S1O+GulFsxDlbxsBpw8G9pEV5qS0QWQgG+kp/0csJF29bQaciOt2Mr9MV1RTKQzqEQvK5+EbcVDP1/ABghtfxsg6+kaezwFTDREy9m0qS50y4utYVqIB9m0yaWVoE9BWxEo9x3OyzksVM74G+VgW5efAHpfRBA1LhlwDZm2eG0AjUcsCJ1TrkA3DXoJ9YA/B81FOjrfZa+VzOpLEuP1GV0ArVLSgGXXIBv4oJ+V8yHeqDrXFsBYVNVSg8cifhjloJQ75UvM//o0IMUjRq/rPz67E8W9q3oMBxNywON+vgdpNckke4wNGkAYDUHMdGcHnukMVRFQrN0Lg6oyMoOY6TCTd7w9rMFG+4WKVholQ9mNmvLExCpk0P2qIjb1bqTEz1AIGEPEwgBpsrN4AImqG0VSiZX0uqUbwWMnRVAj+hpaJqqWcwWXoDLeyQ8so/Di77egZjR2lwemYFTxcq8bps6g1vcHKp9bwM+gQ28ojpA5XeNAhZTsCk9u0EZiU3XDUcy/DUeOp1R+OStmOzT3ctLG5lN1A5a8uByp/+bomA5WpmUZtC+s2aptyGML+JbNJQ9gRnMbz09bj+Q/WcDw/5frFDcm9veTav7iBIq/0mAR52csEyGuAxkFeEDUB8uqwCZCXyo2DvG5wAuRFlOMgryidAHl57TjIa40nQF54PQ7yKvQJsJRTU+0KyxbegRc6DCpWWrbwDrsDogs9JBJMYLLsWsgW3sGyFkIHwzy5817nYGBa6AhA9+LScEvoWC/ZwjvGOzo2o8yyxSjLblo+tYYpdKypbOEdoWf3VqTb4i7AUiu+O0RAQEBAQEBAQEBAQEBAQEBAQEBAQECwsvg/lgjdwDvgytsAAAAASUVORK5CYII="))
      defaultTeams.push(new Team("Macedonia", "data:image/png;base64,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"))


      setTeams(defaultTeams)
    }
    renderTeams()

  }, [])

  useEffect(() => {
    async function restoreCSRF() {
      const response = await fetch('/api/csrf/restore', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const authData = await response.json();
        setFetchWithCSRF(() => {
          return (resource, init) => {
            if (init.headers) {
              init.headers['X-CSRFToken'] = authData.csrf_token;
            } else {
              init.headers = {
                'X-CSRFToken': authData.csrf_token
              }
            }
            return fetch(resource, init);
          }
        });
        if (authData.current_user_id) {
          setRole(authData.role)
          setCurrentUserId(authData.current_user_id)
        }
      }
      setLoading(false)
    }
    restoreCSRF();
  }, []);



  return (
    <UserContext.Provider value={authContextValue}>
      <TeamsContext.Provider value={teamContextValue}>
        <EventContext.Provider value={eventContextValue}>
          <MatchContext.Provider value={matchContextValue}>
            <div className="App">
              <BrowserRouter>
                <div>
                  <Routes>
                    <Route exact path="/" element={<ProtectedRoute />}>
                      <Route exact path='/' element={<HomePage />} />
                    </Route>
                    <Route exact path="/login" element={<LogIn />} />
                    <Route exact path="/sign-up" element={<SignUp />} />
                    <Route path="/add-team" element={<AddTeam />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/events" element={<Events />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </div>
          </MatchContext.Provider>
        </EventContext.Provider>
      </TeamsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
