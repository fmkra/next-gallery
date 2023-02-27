## 1.2.0

### Added new propery `spanLastRow`

Property of type `number` (default is 0), should be in range [0,100]. Allows to set when the last row should leave remaining space empty instead of filling it with images. If last row would take more percent of width than `spanLastRow`, it will be expanded to fill the remaining space.