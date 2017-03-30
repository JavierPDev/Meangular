# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.14.0] - 2017-03-30
### Added
- ng cli tool aliased to ng in npm scripts (ie. Use `npm run ng`)

### Changed
- #13 Update all angular packages to 4.0.0 (except cli which is 1.0.0) and make
necessary changes so everything works and all tests pass.

### Fixed
- Use get('field') method instead of controls['field'] for user template forms.

### Removed
- yarn.lock no longer needed.
