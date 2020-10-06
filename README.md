# codenow

What we have here is a Node CLI to facilitate managing multiple repositories locally from a single terminal. Right now it supports options to open your IDE and shell of choice in a repository, where the root directory of your source code is configured.

Built with [Commander](https://github.com/tj/commander.js.) and [Chalk](https://github.com/chalk/chalk)!

## Installation

This package isn't published on npm (yet) so for now you can clone the repo and install globally.

```bash
$ npm i -g
```

## Help

```bash
$ codenow --help
```

## Supported (Tested) Operating Systems

| Operating System | Option | Supported |
|------------------|--------|-----------|
|Windows 10        |IDE     |VS Code, Atom |
|Windows 10        |Shell   |Powershell |
|Xubuntu           |IDE     |VS Code, Atom |
|Xubuntu           |Shell   |xfce4-terminal |