# Remirror

[![Build Status](https://travis-ci.org/ifiokjr/remirror.svg?branch=master)](https://travis-ci.org/ifiokjr/remirror) [![Maintainability](https://api.codeclimate.com/v1/badges/cfd42ff63704a1cbe232/maintainability)](https://codeclimate.com/github/ifiokjr/remirror/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/cfd42ff63704a1cbe232/test_coverage)](https://codeclimate.com/github/ifiokjr/remirror/test_coverage)

Remirror is an extensible text-editor for react, built on top of Prosemirror. It aims to be **the** goto editor for a reliable editing experience across all JavaScript and user-facing environments.

The project is still in its early days and several of the ideas featured here still need to be fleshed out.

## Getting Started

### Prerequisites

You can use either npm or yarn for managing packages. This project has been built with yarn workspaces so all further instructions will assume you're using `yarn`. For help translating commands refer to this helpful [document](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison)

#### TypeScript Users

This project is built with and should work with version `>=3.0`.

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```bash
yarn add remirror
```

Then import the main component into your codebase.

Import and use the component with the child component as a render function.

```ts
import { Remirror } from 'remirror';

const Editor = props => (
  <Remirror
    onChange={onChange}
    placeholder='This is a placeholder'
    autoFocus={true}
    initialContent={initialJson}
  >
    {({ getMenuProps, actions }) => {
      const menuProps = getMenuProps({
        name: 'floating-menu',
      });
      return (
        <div>
          <div
            style={{
              position: 'absolute',
              top: menuProps.position.top,
              left: menuProps.position.left,
            }}
            ref={menuProps.ref}
          >
            <button
              style={{
                backgroundColor: actions.bold.isActive() ? 'white' : 'pink',
                fontWeight: actions.bold.isActive() ? 600 : 300,
              }}
              disabled={!actions.bold.isEnabled()}
              onClick={runAction(actions.bold.run)}
            >
              B
            </button>
          </div>
        </div>
      );
    }}
  </Remirror>
);
```

React hooks can also be used to pull the Remirror Context from a parent provider. This api relies on the new(ish) hooks specification and React Context.

```ts
import { RemirrorProvider, useRemirror } from 'remirror';

// ...

function HooksComponent(props) {
  // This pull the remirror props out from the context.
  const { getMenuProps } = useRemirror();

  // ...
  return <Menu {...getMenuProps()} />;
}

class App extends Component {
  // ...
  render() {
    return (
      <RemirrorProvider>
        <HooksComponent />
      </RemirrorProvider>
    );
  }
}
```

In a similar fashion Higher Order Components (HOC's) can be used to wrap a component.

```ts
import { RemirrorProvider, withRemirror, InjectedRemirrorProps } from 'remirror';

// ...

function EditorComponent(props: InjectedRemirrorProps) {
  const { getMenuProps } = props;

  // ...
  return <Menu {...getMenuProps()} />;
}

const WrappedEditorComponent = withRemirror(EditorComponent);

class App extends Component {
  // ...
  render() {
    return (
      <RemirrorProvider>
        <WrappedEditorComponent />
      </RemirrorProvider>
    );
  }
}
```

## Running the tests

From the root of this repository run the following to trigger a full typecheck, linting and jest tests.

```bash
yarn checks
```

By default these checks are run on every push but eventually this will be configurable.

- [ ] Add private config option for switching off precommit and prepush checks.

## Built With

- [React](https://github.com/facebook/react) - The web framework used
- [Prosemirror](https://prosemirror.net) - A beautiful and elegant text editor for DOM environments.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/ifiokjr/remirror/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ifiokjr/remirror/tags).

## Contributors

- **Ifiok Jr.** - _Initial work_ - [ifiokjr](https://github.com/ifiokjr)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Many ideas were ~~stolen~~ borrowed from **[tiptap](https://github.com/heyscrumpy/tiptap)** which is a prosemirror editor for Vue. The concept of extensions and a lot of the early code was a direct port from this library.
- At the time I started thinking about building an editor [Slate](https://github.com/ianstormtaylor) didn't have great support for Android devices (they've since addressed [this here](https://github.com/ianstormtaylor/slate/pull/2553))
