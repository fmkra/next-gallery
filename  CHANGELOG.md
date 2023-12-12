## 1.2.0

### Added new propery `spanLastRow`

Property of type `number` (default is 0), should be in range [0,100]. Allows to set when the last row should leave remaining space empty instead of filling it with images. If last row would take more percent of width than `spanLastRow`, it will be expanded to fill the remaining space.

## 2.0.0

### Moved resize handling from JS to CSS

Image dimensions are now determined in the initial component render and stored in CSS variables. It allows to server render the component with images of proper dimensions. If the Gallery component is used as a **Server Component**, it is shipped to the user with 0kB of JS.

### Removed all state logic

Including `initialState` property as well as `state` and `setState` arguments of `overlay` function if favor of user defined state management (for example using react context API).

### Removed `name` optional attribute of `images` property

Also changed first (and now only) overlay function argument from `name` to `index` which is the element index in `images` array.

### Removed `spanLastRow` property in favor of `lastRowBehavior`

## 2.0.1 / 2.0.2

### Fixed documentation

### Removed unused files
