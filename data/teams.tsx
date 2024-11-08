import type { Team } from '../types/types'

export const teamData: Team = {
  position: 4,
  sessionNumber: 9,
  teamNumber: 9,
  kartNumber: 116,
  teamName: 'My Wonderful Team',
  pilotName: 'Winchester',
  lapsTotal: 501,
  lapsSession: 59,
  timeLapLast: 20.511,
  timeSessionTotal: '20:12',
  timeSessionAverage: 20.400,
  timeSessionBest: 20.330,
  timeRaceBest: 20.105,
  interval: '+10L 16.8',
  intervalDynamics: 0.8,
  incidents: [
    { 
      id: 1,
      name: 'Dangerous driving',
      time: '4:27'
    },
    { 
      id: 2,
      name: 'Ignoring the flag',
      time: '1:09:15'
    },
  ],
  finishedPilots: [
    {
      id: 1,
      name: 'Northface',
      totalTime: '68:15'
    },
    {
      id: 2,
      name: 'Garfield',
      totalTime: '66:23'
    },
    {
      id: 3,
      name: ' Caroline-Striderpuller',
      totalTime: '69:01'
    }
  ]
}