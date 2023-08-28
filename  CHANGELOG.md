## 1.2.0

### Added new propery `spanLastRow`

Property of type `number` (default is 0), should be in range [0,100]. Allows to set when the last row should leave remaining space empty instead of filling it with images. If last row would take more percent of width than `spanLastRow`, it will be expanded to fill the remaining space.

## 2.0.0

### Moved resize handling from JS to CSS

Image dimensions are now determined in the initial component render and stored in CSS variables. It allows to server render the component with images of proper dimensions. If the Gallery component is used as a **Server Component**, it is shipped to the user with 0kB of JS.
