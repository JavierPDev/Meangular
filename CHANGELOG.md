# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.18.0] - 2017-04-12
### Added
- Dynamic DOM document title added along with updated unit and e2e tests.

### Changed
- Change ActivatedRoute instance identifier to `_route`.

## [0.17.1] - 2017-04-10
### Changed
- Give pollyfill scripts their own bundle.
- Use `/client/src/index.html` as index template instead of Mean Stack JS's `/server/layout/index.html` and switch production build to use output hashing.

## [0.17.0] - 2017-04-07
### Added
- Travis CI support added.

### Changed
- #16 Make blog module lazy loaded.

## [0.16.0] - 2017-04-06
### Added
- Front-end linting added to `npm test`.

### Changed
- #15 Refactor blog routes to follow Angular convention of using modules for all feature module route configurations.

## [0.15.0] - 2017-04-04
### Added
- #14 Front-end linting support added.
- Blog e2e tests added for CanDeactivate guard.

### Changed
- Update code to pass front-end linting.

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
