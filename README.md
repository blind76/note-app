# Notes app

Simple note-taking web app using React.
List of notes with create note functionality and note details with edit and delete functionality.

---

# Running the app

### Run online

Open [https://blind76.github.io/note-app/](https://blind76.github.io/note-app/) to view it in online.

### Run locally

1. `yarn install`
2. `yarn start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

It requires Node 10.16.0 or later and yarn (or npm)

---

# Solution

### NotesProvider
`src/components/Notes/NotesProvider.js` is a central part of the application and contains all the app logic and state. 

### NoteList
`src/components/Notes/NoteList.js` component is used for showing note previews. It also contains child component NoteItem which is used for displaying single note preview or for adding new notes.

### NoteModal
`src/components/Notes/NoteModal.js` is used for detailed preview and editing notes. 

### Modal and Button
These two components are examples of very customizable reusable UI components which are used all over the application.

`src/components/ui/Box.js` and `src/components/ui/Text.js`

### Custom hooks
Examples of custom and reusable hooks.

`src/hooks/useBoolean.js` - easy way for working with booleans
`src/hooks/useLocalStorage.js` - local storage communication via hook
`src/hooks/useNotes.js` - for working with NotesContext

### Custom helpers

`src/util/helpers.js`

These are example of using vanilla JS ES6 custom helpers which are used all over the application.
(isFunction, getPixelsOrString, getStyleForMargins, findNextId...)

### Theme
Global style definition and animation examples.

---

### Tests

These are just examples of unit and e2e tests.

Run tests locally with `yarn test` or if you just want to run e2e tests `yarn test:e2e`



