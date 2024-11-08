export interface RaceType {
  id: string;
  name: string;
  start: string;
  finish: null | boolean;
}

export type RacesListType = Array<RaceType>

export interface RacesSliceState {
  races: RacesListType;
  raceDetails: {id: string; raceName: string} | null;
}

export interface SessionMiniType {
  number: number;
  laps: number;
  elapsedTimeMs: number;
  bestLap: string;
  bestLapRank: number;
  averageLap: string;
}

export interface PositionType {
  pos: number;
  lapTimeRank: number;
  laps: number;
  teamNumber: string;
  teamName: string;
  lastLap: string;
  gapToAhead: string;
  tempDeficit: number;
  session: SessionMiniType;
  driverName: string;
  carNumber: string;
  remainingSessionsStats: RemainingSessionsStatsType;
}

export type PositionsListType = Array<PositionType>

export interface PositionsSliceState {
  fullRace: FullRaceType | null;
  currentTeam: string;
  currentLap: string;
  time: number;
  myTeamName: string;
}

export interface LapType {
  id: string;
  number: number;
  time: string;
  isBestInSession: boolean;
  lapEvent: number;
  raceElapsedTimeMs: number;
  quality: number;
}

export type LapsListType = Array<LapType>

export interface SessionType {
  number: number;
  driverName: string;
  carNumber: string;
  lapCount: number;
  elapsedTimeMs: number;
  bestLap: string;
  bestLapNumber: number;
  averageLapMs: number;
  laps: LapsListType;
}

export type SessionsListType = Array<SessionType>

export interface SessionsSliceState {
  sessions: SessionsListType
}

export interface BestLapType {
  lapNumber: number;
  time: string;
  racerNumber: string;
  racerName: string;
  carNumber: string;
}

export interface FullRaceType {
  raceId: string;
  elapsedTimeMs: number;
  bestLap: BestLapType;
  positions: PositionsListType;
  racerNumberToHighlight: string;
  raceName: string;
}

export interface TimeSliceState {
  time: number;
}

export interface IncidentType {
  id: number;
  name: string;
  time: string;
}

export interface FinishedPilot {
  id: number;
  name: string;
  totalTime: string;
}

export interface Team {
  position: number;
  sessionNumber: number;
  teamNumber: number;
  kartNumber: number;
  teamName: string;
  pilotName: string;
  lapsTotal: number;
  lapsSession: number;
  timeLapLast: number;
  timeSessionTotal: string;
  timeSessionAverage: number;
  timeSessionBest: number;
  timeRaceBest: number;
  interval: string;
  intervalDynamics: number;
  incidents: IncidentType[];
  finishedPilots: FinishedPilot[];
}

// export type Teams = Team[]

// export interface Session extends Team {
//   isExpanded: boolean;
// }

// export type Sessions = Session[]


// export type Form = "add event" | "edit session" | ""

export interface Lap {
  lapNumber: number;
  lapTime: number;
  teamPosition: number;
  crossingFinishTime: string;
  isBadLap: boolean;
  efficiencyPercent: number;
  isBest: boolean;
  hasPit: boolean;
}

export type LapList = Lap[]

export type Event = string

export interface EventInput {
  id: string;
  value: Event;
  checked: boolean;
}

export type EventInputList = EventInput[]

export interface RaceInputRadio {
  id: string;
  value: string;
  checked: boolean;
}

export type RaceInputRadiosList = RaceInputRadio[]

export interface RaceInputText {
  id: string;
  name: string;
  value: string;
}

export type RaceInputTextsList = RaceInputText[]

export interface RaceProfileSliceState {
  id: string;
  name: string;
  raceTimeLimitType: number;
  maxRaceLaps: number;
  maxRaceTimeMs: number;
  minPitTimeMs: number;
  minLapTimeMs: number;
  maxSessionDurationMs: number;
  minNumberOfSessions: number;
}

export interface RemainingSessionsStatsType {
  minNumberOfRemainingSessions: number;
  remainingSessionMinDurationMs: number
}

export interface RaceStatsSliceState {
  fullRaceStats: FullRaceStatsType;
  carsOnPit: [];
}


export type FullRaceStatsType = RaceStatsListItemType[]

export interface RaceStatsListItemType {
  avgBestLapTimeDiff: number;
  avgBestLapTimeMs: number;
  bestLapTimeDiff: number;
  bestLapTimeMs: number;
  number: string;
  sessions: SessionsStatsType;
  totalRaceTimeMs: number;
}

export interface SessionsStatsType {
  avgLapTimeMs: number;
  bestLapTimeMs: number;
  driverName: string;
  racerName: string;
  racerNumber: string;
  sessionEndLapNumber: number;
  sessionStartLapNumber: number;
}

export interface OutletContextType {
 positions: PositionsListType;
 raceId: string;
 teamNumber: string;
}