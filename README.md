

# Race Dashboard

The Race Dashboard app helps in making strategic decisions during a race by providing necessary metrics. Developed and tested by go-kart racers.

This is a demonstration repository showcasing the implementation of the front-end side of the project. The code is isolated and provided for viewing purposes.

At the moment, only the mobile version is available. See the [Design Section](#visual-design) for complete UI/UX design details.

![Main App Screenshot](./readme/cover2.png)

## Key Features

- Real-time race and teams data update: team position, time of the current race session, best lap time, interval before the leader of the race and other metrics.
- Customization of the race parameters. 
- Keeping track of pilots and cars for all teams.
- Calculating parameters needed for the decision making during the race.

## Expectations from the app:

- Each screen contains as much information as possible.
- The data is easily scannable and suitable for quick evaluation and comparison.
- Different pieces of information should be easily distinguishable.
- All visual noise should be reduced; cognitive load and distractions should be kept to a minimum.
- All user tasks should be made with the least effort possible.

## User Experience Considerations

- **Navigation**: 
  - All navigation related to the teams' data is implemented via informational elements (like names of the teams), and tap zones are much bigger than corresponding icons; intuitiveness is sacrificed for the screen real estate and cleanness; additional navigation is implemented as a bottom toolbar and is designed to be easily used with fingers of one hand.
  - The primary app navigation provides a step-by-step interaction style: starting with the name of the race, the user gradually accesses more and more detailed information until they reach the end where they can add new data via forms; access to all information and actions that are not directly related to teams are isolated to the toolbar; filling out the forms automatically brings the user to the previous screen.
- **Content**: 
  - Information related to the teams and the race is organised in tables that can be easily compared with each other; the main information is always visible on the screens most used during the race; headers display general information about the race and the team that is viewed at the moment.

## Technical Implementation

### Technology Stack
- TypeScript 5.2.2
- React 18.2.0
- Redux 9.1.2
- SignalR & Redux middleware for SignalR (redux-signalr) 1.2.0
- React Router for screen navigation, CSS Modules
- Vite 5.2.0

### Project Structure
```
src/
├── app/         # Store, hooks, SignalR Middleware
├── components/  # React components
├── data/        # UI copy and icons
├── features/    # Redux slices
├── styles/      # CSS variables for the design tokens, common styles
├── types/       # Data types
└── utils/       # Helper functions
```

## Accessibility Features

Visual implementation doesn't consider a number of accessibility principles due to the specifics of the app and the main requirement to fit as much data as possible on a small screen. That said, the WCAG 2.2 guidance was followed anywhere it was possible (for example, tap zone sizes). The app will benefit from following the technical accessibility principles like keyboard navigation and screen reader support especially for viewing the results of past races. Currently, this part is under development.

- **HTML Semantics**
  - Only native HTML elements are used (buttons, inputs, tables, and others).
  - Headings and other hierarchy are respected partly with the use of visually hidden elements.

- **Keyboard Navigation**
  - Under development.

- **Screen Reader Optimization**
  - Under development.

- **Visual Accessibility**
  - Color contrast ratios meet WCAG 2.2 criteria (minimum Level AA).
  - Text scaling support.

## Visual Design
- **Color Palette**: The dark theme was chosen because it is traditional for such systems and is familiar to the user. The palette includes a number of different bright colors to highlight aspects of race data. All colors comply with the WCAG 2.2 at least at the Level AA.
- **Text and background**: Light and dark shades of grey are used for text and background; true black is used as an alternative background color for element differentiation.
- **Main accent colors**: Shades of purple; A less saturated variant is used for highlighting a team in the list and dividers; A more saturated color is used for controls.
- **Additional accent colors**: A number of colors with semantic and/or traditional meaning in the racing sport are used to communicate different signals to the user; They help to draw the attention, distinguish between numbers, show the level of success of teams.

![Color choices](./readme/demoColors2.png)
*Screenshot of the app or figma to showcast the colors*

- **Typography**
  - Font family: Ubuntu Mono; Mono font face was chosen because of the large amount of numbers used and visual organisation of data.
  - Font variety: Besides color differentiations, only text case is used to establish a hierarchical order between the elements; The links are traditionally underlined.
  - Sizing: 15px font size is set for all elements because it is the biggest size that adequately fits the layout at the default screen size (mobile); Below the default screen size, the font size is scaled automatically alongside with other elements; An additional font size of 18px is used for inputs to prevent zooming in on input (may be revisited at the next development stage).

- **Component Design**
  - The screens consist of traditional elements.
  - Almost all information is organised in tables; even though there are no lines that form table cells, the pattern forces data in corresponding table cells to remain in strict rows - this is needed for quick scanning and comparison; this pattern is followed in all elements that represent the race data.


### Figma Project
Complete UI/UX design available on [Figma](https://www.figma.com/design/wXrteEcg8uDTsmtVstEKRm/Design?node-id=1-2&t=7gwSXWcHseae3ilt-1)

### Key Screens
![Components](./readme/demoComponents2.png)
*Reusable components: the smallest elements and composite elements that are reused across the project*

![Screens](./readme/demoScreens2.png)
*Overview of the default screens*

![Variants](./readme/demoVariants2.png)
*Screens that show different states of components and variations to the screens*

![Design Tokens](./readme/demoDesignTokens2.png)
*Design tokens with several levels of abstractions are used to keep reusable and co-dependent units*

![Design Approach](./readme/demoDesignApproach2.png)
*How design is handeled: underlying structure is implemented in the compoenents; for example, invisible tap zones around the elements that have smaller visual size*

## Viewing the Code

This repository is for code review purposes. To explore the codebase, please, browse the source code directly on GitHub.

## Contact

Elena Zvereva (Beograd, Serbia)

[LinkedIn](https://www.linkedin.com/in/elena-zvereva-722b3177/)  [Telegram](https://t.me/zverolen)
