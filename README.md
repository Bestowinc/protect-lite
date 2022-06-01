# Welcome to Bestow's Protect Lite Docs!

This site was developed to make a beautiful standardized documentation.

ProtectLite is accessable throught the Developer Portal!

Live Developer Portal: https://developer.bestow.com/

Live ProtectLite Docs: https://bestowinc.github.io/protect-lite

This page uses: https://github.com/slatedocs/slate

- [Welcome to Bestow's Protect Lite Docs!](#welcome-to-bestows-protect-lite-docs)
  - [Setup](#setup)
    - [Getting Set Up](#getting-set-up)
    - [Running Protect Lite Docs](#running-protect-lite-docs)
    - [Production mode](#production-mode)
  - [Adding new sections](#adding-new-sections)
  - [Publishing](#publishing)
  - [Dependencies](#dependencies)

## Setup

### Getting Set Up

1. Clone this repository and branch. `https://github.com/Bestowinc/protect-lite/tree/SlateDocs` 
2. `git clone git@github.com:Bestowinc/protect-lite.git -b SlateDocs`
* `NOTE: If the branch do not exist that means we've move it to main, if so, ignore -b SlateDocs`
3. `cd protect-lite` 
4. Install ruby gems for slate:
```shell
# either run this to run locally
bundle install
```

Note: if the above fails on installing nokogiri and using macOS see
[here](https://github.com/sparklemotion/nokogiri.org/blob/master/docs/tutorials/installing_nokogiri.md#macos)
for some helpful tips on things that might help.


## Running ProtectLite Docs

You can run in two ways, either as a server process for development, or just build html files.

To do the first option, run:

```bash
bundle exec middleman server
```

and you should see your docs at http://localhost:4567. Whoa! That was fast!

The second option (building html files), run:

```bash
bundle exec middleman build
```

Middleman config: http://localhost:4567/__middleman/config/


## Adding new sections

All sections regarding ProtectLite live in the `incluces` folder. 
Simply create a new `md file`:
  * For example: `example.md` 
  * Fill it with the information you need
  * Add it to: `index.html.md.erb`
    * <%= partial "includes/quote-api/example" %> 

Thats it! ^_^

## Publishing
Save your changes.
 1. Send your changes to: https://github.com/Bestowinc/protect-lite/tree/SlateDocs
 2. PR to SlateDocs and wait for it to be approved.
 3. Merge the changes and update as needed. 

In order to ACTUALLY publish your page, you need to generate the html build in order to do so: 
(If you are waiting for other changes on SlateDocs, don't do this yet.)
 1. Determinate your publishing branch.
 2. Add it to: `deploy.sh` line `74`.
  * ```new_deploy_branch=release-branch``` 
  * change `release-branch` to your publishing branch
 3. Run `./deploy.sh`    
 4. Done! Create a PR to ´gh-pages´ https://github.com/Bestowinc/protect-lite/tree/gh-pages


## Dependencies

Minimally, you will need the following:

* [Ruby](https://www.ruby-lang.org/en/) >= 2.5
* [Bundler](https://bundler.io/)
* [NodeJS](https://nodejs.org/en/)
* [Git](https://git-scm.com/)

Please note, only Linux and macOS are officially supported at this time. While slate should work on Windows, it is unsupported.

See below for installation instructions for different OSes / distros.

### Installing Dependencies on Linux

Install Ruby, NodeJS, and tools for compiling native ruby gems:

**On Ubuntu 18.04+**

```bash
sudo apt install ruby ruby-dev build-essential libffi-dev zlib1g-dev liblzma-dev nodejs patch
```

**On Fedora 31+**

```bash
sudo dnf install @development-tools redhat-rpm-config ruby ruby-devel libffi-devel zlib-devel xz-devel patch nodejs
```


Then, update RubyGems and install bundler:

```bash
sudo gem update --system
sudo gem install bundler
```

### Installing Dependencies on macOS

First, install [homebrew](https://brew.sh/), then install xcode command line tools:

```bash
xcode-select --install
```

Agree to the Xcode license:

```bash
sudo xcodebuild -license
```

Install nodejs runtime:

```bash
brew install node
```

Update RubyGems and install bundler:

```bash
gem update --system
gem install bundler
```

### Other Potential Dependencies

1. Check if you have access to Bestow's design
   system ([Check here the repo](https://github.com/Bestowinc/design-system))
   * If you do not have access to it check: ([Instructions on how to set up .npmrc](https://bestowinc.atlassian.net/wiki/spaces/BT/pages/2579595461/Setting+up+.npmrc)) 
   * FYI: PAT is a Personal Access Token

